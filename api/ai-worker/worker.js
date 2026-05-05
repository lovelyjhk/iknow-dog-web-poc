const DEFAULT_MODEL = "gpt-4.1-mini";
const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, model: env.OPENAI_MODEL || DEFAULT_MODEL }, corsHeaders);
      }

      if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, corsHeaders, 405);
      }

      if (!env.OPENAI_API_KEY) {
        return json({ error: "OPENAI_API_KEY is not configured on the Worker." }, corsHeaders, 500);
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

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "*";
  const configured = (env.ALLOWED_ORIGINS || "https://lovelyjhk.github.io,http://localhost:8787")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const allowedOrigin = origin === "*" || origin === "null" || configured.includes(origin) ? (origin === "null" ? "*" : origin) : configured[0] || "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Vary": "Origin",
    ...JSON_HEADERS,
  };
}

function json(data, headers, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, ...JSON_HEADERS } });
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
1. 앞/뒤/좌/우 시점이 충분하지 않더라도 프레임에서 보이는 자세, 체중 지지, 좌우 균형, 보폭, 다리 들림, 통증 회피 행동을 관찰합니다.
2. 보호자 메모와 최근 건강기록을 함께 반영합니다.
3. 호흡 이상, 반복 구토/설사, 급격한 무기력, 통증 반응은 상담 권장도를 높입니다.
4. 결과는 반드시 아래 JSON 형태만 반환합니다.

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
1. 원재료: 자일리톨, 양파/마늘류, 포도/건포도류, 과도한 당류/염분, 초콜릿/카카오, 카페인, 모호한 부산물 표현을 찾습니다.
2. 보증성분: 조단백, 조지방, 조섬유, 조회분, 수분, 칼슘/인, 나트륨 등 표기값을 읽고 제품 유형과 반려견 프로필에 맞춰 주의 신호를 안내합니다.
3. 알레르기/기존 질환 메모가 있으면 해당 원재료와 교차 확인합니다.
4. 결과는 반드시 아래 JSON 형태만 반환합니다.

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
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || DEFAULT_MODEL,
      input: [{ role: "user", content }],
      max_output_tokens: 1400,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI request failed (${response.status})`);
  }

  const outputText = extractOutputText(data);
  return parseJsonObject(outputText);
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

function safeJson(value) {
  return JSON.stringify(value, (_, item) => (typeof item === "string" && item.length > 500 ? `${item.slice(0, 500)}...` : item));
}
