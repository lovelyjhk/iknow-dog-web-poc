const DEFAULT_MODEL = "gpt-4.1-mini";
const CONFIG_KEY = "ai-config-v1";
const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

export default {
  async fetch(request, env) {
    const corsHeaders = await getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (url.pathname.startsWith("/admin/")) {
        return handleAdmin(request, env, corsHeaders);
      }

      if (request.method === "GET" && url.pathname === "/health") {
        const aiConfig = await getOpenAiConfig(env);
        return json(
          {
            ok: true,
            model: aiConfig.model,
            apiKeyConfigured: Boolean(aiConfig.apiKey),
            keySource: aiConfig.keySource,
          },
          corsHeaders,
        );
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, corsHeaders, 405);
      }

      const payload = await request.json();

      if (url.pathname === "/analyze/gait") {
        const result = await analyzeGait(payload, env);
        return json(result, corsHeaders);
      }

      if (url.pathname === "/analyze/nutrition-label") {
        const result = await analyzeNutritionLabel(payload, env);
        return json(result, corsHeaders);
      }

      return json({ error: "Unknown endpoint" }, corsHeaders, 404);
    } catch (error) {
      return json({ error: error.message || "Worker error" }, corsHeaders, 500);
    }
  },
};

async function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "*";
  const stored = await readStoredConfig(env).catch(() => null);
  const configured = (stored?.allowedOrigins || env.ALLOWED_ORIGINS || "https://lovelyjhk.github.io,http://localhost:8787")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const allowedOrigin =
    origin === "*" || origin === "null" || configured.includes(origin)
      ? origin === "null"
        ? "*"
        : origin
      : configured[0] || "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Vary": "Origin",
    ...JSON_HEADERS,
  };
}

function json(data, headers, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, ...JSON_HEADERS } });
}

async function handleAdmin(request, env, corsHeaders) {
  const authFailure = authenticateAdmin(request, env, corsHeaders);
  if (authFailure) return authFailure;

  const url = new URL(request.url);
  if (url.pathname !== "/admin/config") {
    return json({ error: "Unknown admin endpoint" }, corsHeaders, 404);
  }

  if (request.method === "GET") {
    const stored = await readStoredConfig(env);
    return json(
      {
        ok: true,
        hasEnvKey: Boolean(env.OPENAI_API_KEY),
        hasStoredKey: Boolean(stored?.openAiApiKeyEncrypted),
        model: stored?.model || env.OPENAI_MODEL || DEFAULT_MODEL,
        allowedOrigins: stored?.allowedOrigins || env.ALLOWED_ORIGINS || "",
        updatedAt: stored?.updatedAt || null,
        storageReady: Boolean(env.AI_CONFIG),
      },
      corsHeaders,
    );
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, corsHeaders, 405);
  }

  if (!env.AI_CONFIG) {
    return json({ error: "AI_CONFIG KV binding is required to save admin config." }, corsHeaders, 500);
  }

  if (!env.CONFIG_ENCRYPTION_KEY) {
    return json({ error: "CONFIG_ENCRYPTION_KEY secret is required to encrypt API keys." }, corsHeaders, 500);
  }

  const body = await request.json();
  const existing = (await readStoredConfig(env)) || {};
  const next = {
    model: sanitizeModel(body.model) || existing.model || env.OPENAI_MODEL || DEFAULT_MODEL,
    allowedOrigins: sanitizeOrigins(body.allowedOrigins) || existing.allowedOrigins || env.ALLOWED_ORIGINS || "",
    openAiApiKeyEncrypted: existing.openAiApiKeyEncrypted || null,
    updatedAt: new Date().toISOString(),
  };

  if (typeof body.openAiApiKey === "string" && body.openAiApiKey.trim()) {
    next.openAiApiKeyEncrypted = await encryptString(body.openAiApiKey.trim(), env);
  }

  await env.AI_CONFIG.put(CONFIG_KEY, JSON.stringify(next));

  return json(
    {
      ok: true,
      hasEnvKey: Boolean(env.OPENAI_API_KEY),
      hasStoredKey: Boolean(next.openAiApiKeyEncrypted),
      model: next.model,
      allowedOrigins: next.allowedOrigins,
      updatedAt: next.updatedAt,
    },
    corsHeaders,
  );
}

function authenticateAdmin(request, env, corsHeaders) {
  if (!env.ADMIN_PASSWORD) {
    return json({ error: "ADMIN_PASSWORD secret is not configured." }, corsHeaders, 500);
  }

  const header = request.headers.get("Authorization") || "";
  if (!header.startsWith("Basic ")) {
    return new Response(JSON.stringify({ error: "Admin authentication required." }), {
      status: 401,
      headers: { ...corsHeaders, "WWW-Authenticate": 'Basic realm="iknow-dog-admin"', ...JSON_HEADERS },
    });
  }

  const decoded = atob(header.slice("Basic ".length));
  const separator = decoded.indexOf(":");
  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  const expectedUsername = env.ADMIN_USERNAME || "admin";

  if (username !== expectedUsername || password !== env.ADMIN_PASSWORD) {
    return json({ error: "Invalid admin username or password." }, corsHeaders, 401);
  }

  return null;
}

async function readStoredConfig(env) {
  if (!env.AI_CONFIG) return null;
  return env.AI_CONFIG.get(CONFIG_KEY, "json");
}

async function getOpenAiConfig(env) {
  const stored = await readStoredConfig(env).catch(() => null);
  let apiKey = env.OPENAI_API_KEY || "";
  let keySource = apiKey ? "env" : "missing";

  if (!apiKey && stored?.openAiApiKeyEncrypted) {
    apiKey = await decryptString(stored.openAiApiKeyEncrypted, env);
    keySource = "admin-kv";
  }

  return {
    apiKey,
    keySource,
    model: stored?.model || env.OPENAI_MODEL || DEFAULT_MODEL,
  };
}

function sanitizeModel(value) {
  const text = String(value || "").trim();
  return /^[a-zA-Z0-9._:-]{2,80}$/.test(text) ? text : "";
}

function sanitizeOrigins(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^https?:\/\/[^,\s]+$/.test(item))
    .join(",");
}

function requireDataUrl(value, name) {
  if (typeof value !== "string" || !value.startsWith("data:image/")) {
    throw new Error(`${name} must be a base64 image data URL.`);
  }
  return value;
}

async function analyzeGait(payload, env) {
  const frames = Array.isArray(payload.frames) ? payload.frames.slice(0, 8).map((item) => requireDataUrl(item, "frame")) : [];
  if (!frames.length) throw new Error("At least one video frame is required.");

  const prompt = `
당신은 반려견 보행/증상 영상의 1차 위험 신호를 안내하는 LLM 분석 엔진입니다.
질병명을 확정하거나 처방하지 마세요. "진단" 대신 "위험 신호", "상담 권장", "관찰 필요"로 표현하세요.

입력:
- 반려견 프로필: ${safeJson(payload.dog)}
- 최근 건강기록: ${safeJson(payload.recentHealthLogs || [])}
- 보호자 증상 체크: ${safeJson(payload.symptoms || [])}
- 보호자 메모: ${payload.ownerNote || "-"}
- 영상 유형: ${payload.videoType || "gait"}
- 영상 메타: ${safeJson(payload.videoMeta || {})}
- 샘플 데이터셋 요약: ${safeJson(payload.sampleDatasetProfile || {})}

분석 관점:
1. 자세, 체중 지지, 좌우 균형, 보폭, 다리 들림, 통증 회피 행동을 관찰합니다.
2. 보호자 메모와 최근 건강기록을 함께 반영합니다.
3. 호흡 이상, 반복 구토/설사, 급격한 무기력, 통증 반응은 상담 권장도를 높입니다.
4. 결과는 반드시 JSON만 반환합니다.

{
  "riskLevel": "NORMAL|WATCH|CAUTION|VET_RECOMMENDED|EMERGENCY",
  "summary": "한국어 한두 문장",
  "dogMessage": "강아지 입장에서 하고 싶을 말처럼 조심스럽게 표현",
  "modelSummary": "LLM이 어떤 입력을 보고 판단했는지",
  "modelMetrics": {
    "modelProvider": "OpenAI Responses API",
    "frameCount": ${frames.length},
    "inputModality": "video_frames+profile+memo",
    "sampleSimilarity": "낮음|중간|높음|판단 불가",
    "gaitSignalScore": "0-100 사이 숫자 또는 판단 불가",
    "keypointCoverage": "프레임 가시성 기준 설명",
    "confidence": "낮음|중간|높음",
    "limitation": "한계",
    "primaryFeatures": ["관찰 특징"]
  },
  "observedSignals": ["관찰 신호"],
  "recommendations": ["보호자 행동"],
  "vetConsultationRecommended": true,
  "disclaimer": "수의사의 진료를 대체하지 않는다는 문장"
}
`.trim();

  const content = [{ type: "input_text", text: prompt }, ...frames.map((image_url) => ({ type: "input_image", image_url }))];
  return callOpenAIJson(content, env);
}

async function analyzeNutritionLabel(payload, env) {
  const image = requireDataUrl(payload.image, "image");
  const prompt = `
당신은 반려견 사료/간식 성분표 사진을 읽고 영양 관점의 1차 위험 신호를 안내하는 LLM 분석 엔진입니다.
질병명을 확정하거나 처방하지 마세요. 성분표가 흐리면 "판독 제한"을 명확히 말하세요.

입력:
- 반려견 프로필: ${safeJson(payload.dog || {})}
- 제품 유형: ${payload.productType || "-"}
- 보호자 메모/급여 목적: ${payload.notes || "-"}

분석 관점:
1. 자일리톨, 양파/마늘류, 포도/건포도류, 과도한 당류/염분, 초콜릿/카카오, 카페인, 모호한 부산물 표현을 찾습니다.
2. 조단백, 조지방, 조섬유, 조회분, 수분, 칼슘/인, 나트륨 등을 읽고 반려견 프로필에 맞춰 주의 신호를 안내합니다.
3. 알레르기/기존 질환 메모가 있으면 해당 원재료와 교차 확인합니다.
4. 결과는 반드시 JSON만 반환합니다.

{
  "riskLevel": "NORMAL|WATCH|CAUTION|VET_RECOMMENDED|EMERGENCY",
  "summary": "한국어 한두 문장",
  "dogMessage": "강아지 입장에서 하고 싶을 말처럼 조심스럽게 표현",
  "nutritionSignals": ["영양 위험 신호"],
  "ingredientsOfConcern": ["주의 성분"],
  "guaranteedAnalysis": ["보증성분 해석"],
  "allergyNotes": ["개별 알레르기/질환 메모 관련"],
  "recommendations": ["보호자 행동"],
  "disclaimer": "수의사의 진료를 대체하지 않는다는 문장"
}
`.trim();

  return callOpenAIJson(
    [
      { type: "input_text", text: prompt },
      { type: "input_image", image_url: image },
    ],
    env,
  );
}

async function callOpenAIJson(content, env) {
  const aiConfig = await getOpenAiConfig(env);
  if (!aiConfig.apiKey) {
    throw new Error("OpenAI API key is not configured. Set OPENAI_API_KEY or save it through /admin/config.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.apiKey}`,
    },
    body: JSON.stringify({
      model: aiConfig.model,
      input: [{ role: "user", content }],
      max_output_tokens: 1400,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI request failed (${response.status})`);
  }

  return parseJsonObject(extractOutputText(data));
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text;

  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function parseJsonObject(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) throw new Error("The model returned an empty response.");

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("The model did not return JSON.");
    return JSON.parse(match[0]);
  }
}

async function encryptString(value, env) {
  const key = await getEncryptionKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(value);
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded));
  return { iv: bytesToBase64(iv), ciphertext: bytesToBase64(ciphertext) };
}

async function decryptString(payload, env) {
  const key = await getEncryptionKey(env);
  const iv = base64ToBytes(payload.iv);
  const ciphertext = base64ToBytes(payload.ciphertext);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new TextDecoder().decode(plain);
}

async function getEncryptionKey(env) {
  if (!env.CONFIG_ENCRYPTION_KEY) {
    throw new Error("CONFIG_ENCRYPTION_KEY secret is not configured.");
  }
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(env.CONFIG_ENCRYPTION_KEY));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function safeJson(value) {
  return JSON.stringify(value, (_, item) => (typeof item === "string" && item.length > 500 ? `${item.slice(0, 500)}...` : item));
}
