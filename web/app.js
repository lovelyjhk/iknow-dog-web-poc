const STORAGE_KEY = "iknow-web-poc-state-v5";
const LEGACY_KEYS = ["iknow-web-poc-state-v4", "iknow-web-poc-state-v3", "iknow-web-poc-state-v2", "iknow-web-poc-state"];
const POC_APP_URL = "https://lovelyjhk.github.io/iknow-dog-web-poc/";
const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const SAMPLE_NUTRITION_LABEL_URL = "./sample-nutrition-label.svg";
const AI_ENDPOINT_HINT = "설정 > 실제 AI 서버 연결에서 Worker URL을 저장하면 LLM 분석을 실행할 수 있습니다.";
const SAMPLE_DATASET_PROFILE = {
  name: "AIHub 71878 샘플",
  frames: 1023,
  labels: 1023,
  avgKeypoints: 10.4,
  minKeypoints: 4,
  maxKeypoints: 13,
  hospitals: ["잠실동물병원", "SNC동물병원", "치료멍멍동물병원"],
  views: ["Front", "Back", "Left", "Right"],
  topKeypoints: [
    "Ear",
    "Ulnar styloid process",
    "Lateral humeral epicondyle",
    "Distal lateral aspect of fifth metacarpal bone",
    "Femoral greater trochanter",
    "Femorotibial joint",
    "Lateral malleolus of the distal tibia",
  ],
};

const plans = {
  free: {
    name: "Free",
    price: 0,
    credits: 10,
    description: "체험용 영상 분석 1회와 기본 건강기록을 제공합니다.",
  },
  basic: {
    name: "Basic",
    price: 3000,
    credits: 40,
    description: "월 40 credits. 건강기록, 음식 안전, 영상 분석 흐름을 제공합니다.",
  },
  plus: {
    name: "Plus",
    price: 5000,
    credits: 70,
    description: "월 70 credits. 병원 상담 리포트와 고도화 추천을 포함합니다.",
  },
  unlimited: {
    name: "Unlimited",
    price: 6000,
    credits: 200,
    description: "Fair Use 기반. 다견 관리와 반복 영상 분석을 제공합니다.",
  },
};

const riskLabels = {
  NORMAL: "정상 범위",
  WATCH: "관찰 필요",
  CAUTION: "주의",
  VET_RECOMMENDED: "수의사 상담 권장",
  EMERGENCY: "응급 가능성",
};

const riskOrder = {
  NORMAL: 0,
  WATCH: 1,
  CAUTION: 2,
  VET_RECOMMENDED: 3,
  EMERGENCY: 4,
};

const symptomLabels = {
  vomiting: "구토",
  coughing: "기침",
  limping: "절뚝거림",
  scratching: "긁음",
  pain: "통증 반응",
  breathing: "호흡 이상",
  low_energy: "무기력",
  diarrhea: "설사",
};

const selectLabels = {
  appetite: {
    normal: "평소와 같음",
    low: "줄어듦",
    none: "거의 없음",
  },
  stool: {
    normal: "정상",
    soft: "묽음",
    diarrhea: "설사",
    bloody: "혈변 의심",
  },
  activity: {
    normal: "평소와 같음",
    low: "줄어듦",
    very_low: "매우 낮음",
  },
  sleep: {
    normal: "평소와 같음",
    more: "늘어남",
    restless: "불안정함",
  },
};

const foodRules = [
  {
    names: ["초콜릿", "초코", "chocolate"],
    status: "위험",
    level: "danger",
    detail:
      "테오브로민 성분 때문에 구토, 설사, 이상 흥분, 발작 위험이 있습니다. 먹었다면 즉시 병원 상담을 권장합니다.",
  },
  {
    names: ["포도", "건포도", "grape", "raisin"],
    status: "위험",
    level: "danger",
    detail:
      "일부 반려견에게 급성 신장 손상 위험이 있습니다. 소량이라도 병원 상담이 필요합니다.",
  },
  {
    names: ["양파", "onion"],
    status: "위험",
    level: "danger",
    detail: "적혈구 손상 위험이 있어 익힌 양파도 피해야 합니다.",
  },
  {
    names: ["마늘", "garlic"],
    status: "위험",
    level: "danger",
    detail: "소화기 자극과 혈액 관련 이상 가능성이 있어 급여하지 않습니다.",
  },
  {
    names: ["자일리톨", "xylitol"],
    status: "위험",
    level: "danger",
    detail: "저혈당과 간 손상 위험이 있어 즉시 병원 상담이 필요합니다.",
  },
  {
    names: ["고구마", "sweetpotato", "sweet potato"],
    status: "대체로 안전",
    level: "safe",
    detail: "익혀서 소량 급여할 수 있습니다. 체중 관리 중이면 양을 제한하세요.",
  },
  {
    names: ["닭가슴살", "닭", "chicken"],
    status: "대체로 안전",
    level: "safe",
    detail: "간 없이 익혀서 소량 급여할 수 있습니다. 알러지가 있으면 피하세요.",
  },
  {
    names: ["단호박", "호박", "pumpkin"],
    status: "대체로 안전",
    level: "safe",
    detail: "익혀서 소량 급여할 수 있습니다. 소스나 설탕은 넣지 않습니다.",
  },
  {
    names: ["오이", "cucumber"],
    status: "대체로 안전",
    level: "safe",
    detail: "작게 잘라 소량 급여할 수 있습니다.",
  },
  {
    names: ["사과", "apple"],
    status: "소량 가능",
    level: "limited",
    detail: "씨와 심지를 제거하고 작게 잘라 소량만 급여합니다.",
  },
  {
    names: ["계란", "달걀", "egg"],
    status: "소량 가능",
    level: "limited",
    detail: "완전히 익힌 뒤 소량 급여합니다. 알러지 반응이 있으면 중단하세요.",
  },
  {
    names: ["치즈", "cheese"],
    status: "소량 가능",
    level: "limited",
    detail: "유당 민감성이 있으면 설사할 수 있어 아주 소량만 권장합니다.",
  },
  {
    names: ["우유", "milk"],
    status: "주의",
    level: "limited",
    detail: "유당 때문에 설사할 수 있습니다. 반려견 전용 제품이 아니면 피하는 편이 안전합니다.",
  },
];

const defaultState = {
  plan: "free",
  creditsRemaining: 10,
  dog: null,
  healthLogs: [],
  analyses: [],
  triageAssessments: [],
  communityPosts: [],
  emailVerification: null,
  timeCoupon: null,
  aiEndpoint: "",
  redeemedCoupons: [],
  authUsers: [],
  currentUser: null,
};

function createDefaultState() {
  return {
    ...defaultState,
    dog: null,
    healthLogs: [],
    analyses: [],
    triageAssessments: [],
    communityPosts: [],
    emailVerification: null,
    timeCoupon: null,
    redeemedCoupons: [],
    authUsers: [],
    currentUser: null,
  };
}

let state = loadState();
let selectedVideo = null;
let selectedVideoMeta = null;
let selectedVideoUrl = null;
let selectedVideoMode = null;
let selectedNutritionImage = null;
let selectedNutritionImageDataUrl = null;
let selectedTriageImageName = "";
let selectedTriageImageDataUrl = null;
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function makeId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getUserDisplayName(user = state.currentUser) {
  if (!user) return "로그인 전";
  return user.displayName || user.email?.split("@")[0] || "보호자";
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function stringToBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function hashPassword(password, salt) {
  const value = `${salt}:${password}`;
  if (window.crypto?.subtle) {
    const data = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return bytesToHex(new Uint8Array(digest));
  }
  return `fallback-${stringToBase64(value)}`;
}

function toSessionUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    provider: user.provider,
    signedInAt: new Date().toISOString(),
  };
}

function isAuthenticated() {
  return Boolean(state.currentUser?.id);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s/g, "");
}

function getYouTubePreview(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/shorts/")) {
        videoId = url.pathname.split("/").filter(Boolean)[1] || "";
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/").filter(Boolean)[1] || "";
      } else {
        videoId = url.searchParams.get("v") || "";
      }
    }

    if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) return null;
    return {
      videoId,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  } catch {
    return null;
  }
}

function loadState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = LEGACY_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    const parsed = current ? JSON.parse(current) : legacy ? JSON.parse(legacy) : {};
    const next = { ...createDefaultState(), ...parsed };

    next.plan = plans[next.plan] ? next.plan : "free";
    next.creditsRemaining = Number.isFinite(Number(next.creditsRemaining))
      ? Number(next.creditsRemaining)
      : plans[next.plan].credits;
    next.healthLogs = Array.isArray(next.healthLogs) ? next.healthLogs : [];
    next.analyses = Array.isArray(next.analyses) ? next.analyses : [];
    next.triageAssessments = Array.isArray(next.triageAssessments) ? next.triageAssessments : [];
    next.communityPosts = Array.isArray(next.communityPosts) ? next.communityPosts : [];
    next.emailVerification = next.emailVerification || null;
    next.timeCoupon = next.timeCoupon || null;
    next.aiEndpoint = typeof next.aiEndpoint === "string" ? next.aiEndpoint : "";
    next.redeemedCoupons = Array.isArray(next.redeemedCoupons) ? next.redeemedCoupons : [];
    next.authUsers = Array.isArray(next.authUsers)
      ? next.authUsers
          .map((user) => ({
            ...user,
            email: normalizeEmail(user.email),
          }))
          .filter((user) => user.id && user.email)
      : [];
    next.currentUser = next.currentUser?.id && next.currentUser?.email
      ? {
          ...next.currentUser,
          email: normalizeEmail(next.currentUser.email),
        }
      : null;

    return next;
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderState();
}

function switchView(viewId, updateHash = true) {
  $$(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });

  $$(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  $$(".bottom-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  const activeButton = $(`.nav-item[data-view="${viewId}"]`) || $(`.bottom-item[data-view="${viewId}"]`);
  $("#pageTitle").textContent = activeButton ? activeButton.textContent.trim() : "홈";
  if (updateHash && window.location.hash !== `#${viewId}`) {
    history.replaceState(null, "", `#${viewId}`);
  }

  if (viewId === "report") renderVetReport();
  const main = $(".main");
  const behavior = updateHash ? "smooth" : "auto";
  if (main) {
    main.scrollTo({ top: 0, behavior });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

function getViewFromHash() {
  const viewId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!viewId) return "";
  const view = document.getElementById(viewId);
  return view?.classList.contains("view") ? viewId : "";
}

function setAuthMessage(message, type = "info") {
  const element = $("#authMessage");
  if (!element) return;

  const className = type === "error" ? ' class="error-text"' : "";
  element.innerHTML = `<p${className}>${escapeHtml(message)}</p>`;
}

function requireAuth(message = "이 기능을 사용하려면 먼저 로그인하거나 계정을 만드세요.") {
  if (isAuthenticated()) return true;
  setAuthMessage(message, "error");
  switchView("auth");
  return false;
}

function renderAuthState() {
  const user = state.currentUser;
  const loggedIn = Boolean(user);
  const name = getUserDisplayName(user);
  const email = user?.email || "-";

  const navAuthLabel = $("#navAuthLabel");
  if (navAuthLabel) navAuthLabel.textContent = loggedIn ? "계정" : "로그인";

  const authStateBadge = $("#authStateBadge");
  if (authStateBadge) authStateBadge.textContent = loggedIn ? "로그인됨" : "로그아웃";

  const accountName = $("#accountName");
  if (accountName) accountName.textContent = name;

  const accountEmail = $("#accountEmail");
  if (accountEmail) {
    accountEmail.textContent = loggedIn
      ? `${email} · ${user.provider === "password" ? "이메일 계정" : `${user.provider} 데모 로그인`}`
      : "계정이 없으면 로컬 POC 세션으로 시작할 수 있습니다.";
  }

  const logoutButton = $("#logoutButton");
  if (logoutButton) logoutButton.disabled = !loggedIn;

  const settingsName = $("#settingsAccountName");
  if (settingsName) settingsName.textContent = name;

  const settingsEmail = $("#settingsAccountEmail");
  if (settingsEmail) settingsEmail.textContent = email;

  const settingsAccess = $("#settingsAccountAccess");
  if (settingsAccess) {
    settingsAccess.textContent = loggedIn
      ? "프로필, 건강기록, 영상/성분표 AI 분석, 쿠폰 사용 가능"
      : "로그인 후 분석/기록 사용 가능";
  }

  const emailInput = $("#emailInput");
  if (loggedIn && emailInput && !emailInput.value) {
    emailInput.value = user.email;
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const displayName = $("#signupName").value.trim();
  const email = normalizeEmail($("#signupEmail").value);
  const password = $("#signupPassword").value;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAuthMessage("회원가입 이메일 주소를 확인하세요.", "error");
    return;
  }

  if (password.length < 6) {
    setAuthMessage("비밀번호는 6자 이상으로 입력하세요.", "error");
    return;
  }

  if (state.authUsers.some((user) => user.email === email)) {
    setAuthMessage("이미 가입된 이메일입니다. 로그인 탭에서 계속하세요.", "error");
    return;
  }

  const salt = makeId();
  const user = {
    id: makeId(),
    email,
    displayName: displayName || email.split("@")[0],
    provider: "password",
    passwordHash: await hashPassword(password, salt),
    salt,
    createdAt: new Date().toISOString(),
  };

  state.authUsers = [user, ...state.authUsers];
  state.currentUser = toSessionUser(user);
  $("#signupPassword").value = "";
  $("#loginEmail").value = email;
  saveState();
  setAuthMessage("회원가입이 완료되었습니다. 이제 반려견 프로필을 등록하세요.");
  switchView("profile");
}

async function handleLogin(event) {
  event.preventDefault();
  const email = normalizeEmail($("#loginEmail").value);
  const password = $("#loginPassword").value;
  const user = state.authUsers.find((item) => item.email === email);

  if (!user || user.provider !== "password") {
    setAuthMessage("가입된 이메일 계정을 찾을 수 없습니다.", "error");
    return;
  }

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    setAuthMessage("비밀번호가 일치하지 않습니다.", "error");
    return;
  }

  state.currentUser = toSessionUser(user);
  $("#loginPassword").value = "";
  saveState();
  setAuthMessage("로그인되었습니다. 영상 분석과 쿠폰 사용을 진행할 수 있습니다.");
  switchView("dashboard");
}

function loginWithProvider(provider) {
  const providerName = {
    google: "Google",
    kakao: "Kakao",
    naver: "Naver",
  }[provider] || provider;
  const email = `${provider}@demo.iknow.local`;
  let user = state.authUsers.find((item) => item.provider === provider && item.email === email);

  if (!user) {
    user = {
      id: makeId(),
      email,
      displayName: `${providerName} 보호자`,
      provider,
      createdAt: new Date().toISOString(),
    };
    state.authUsers = [user, ...state.authUsers];
  }

  state.currentUser = toSessionUser(user);
  saveState();
  setAuthMessage(`${providerName} 데모 계정으로 로그인되었습니다. 정식 출시에서는 OAuth 콜백으로 교체합니다.`);
  switchView("dashboard");
}

function logout() {
  state.currentUser = null;
  saveState();
  setAuthMessage("로그아웃되었습니다. 분석과 기록 저장은 다시 로그인한 뒤 사용할 수 있습니다.");
  switchView("auth");
}

function renderState() {
  const plan = plans[state.plan] || plans.free;
  const planCredits = Math.max(plan.credits, 1);
  const creditPercent = Math.max(0, Math.min(100, (state.creditsRemaining / planCredits) * 100));

  $("#currentPlanName").textContent = plan.name;
  $("#creditCount").textContent = `${state.creditsRemaining} credits`;
  $("#creditMeter").style.width = `${creditPercent}%`;
  renderAuthState();

  if (state.dog) {
    $("#dogName").value = state.dog.name || "";
    $("#breed").value = state.dog.breed || "";
    $("#age").value = state.dog.age || "";
    $("#weight").value = state.dog.weight || "";
    $("#sex").value = state.dog.sex || "unknown";
    $("#neutered").value = state.dog.neutered || "unknown";
    $("#medicalNotes").value = state.dog.medicalNotes || "";
    $("#profileState").textContent = "저장됨";
  } else {
    $("#profileState").textContent = "저장 전";
  }

  renderLatest();
  renderTriageHistory();
  renderHealthLogs();
  renderHistory();
  renderCommunity();
  renderTimeCoupon();
  renderAiEndpoint();
  renderPlans();
  renderVetReport();
}

function renderLatest() {
  const latestAnalysis = state.analyses[0];
  const latestTriage = state.triageAssessments[0];
  const latestLog = state.healthLogs[0];
  const dog = state.dog;

  $("#dogSnapshot").textContent = dog
    ? `${dog.name || "이름 없음"} · ${dog.breed || "품종 미입력"} · ${dog.weight || "-"}kg`
    : "프로필 없음";
  $("#logSnapshot").textContent = latestLog
    ? `${riskLabels[latestLog.riskLevel]} · ${formatDate(latestLog.createdAt)}`
    : "기록 없음";

  if (latestAnalysis) {
    $("#latestRisk").textContent = riskLabels[latestAnalysis.riskLevel];
    $("#latestSummary").textContent = latestAnalysis.summary;
    return;
  }

  if (latestTriage) {
    $("#latestRisk").textContent = riskLabels[latestTriage.riskLevel];
    $("#latestSummary").textContent = latestTriage.summary;
    return;
  }

  if (latestLog) {
    $("#latestRisk").textContent = riskLabels[latestLog.riskLevel];
    $("#latestSummary").textContent = latestLog.summary;
    return;
  }

  $("#latestRisk").textContent = "아직 분석 없음";
  $("#latestSummary").textContent = "반려견 프로필을 등록하고 첫 건강 기록 또는 영상을 분석해보세요.";
}

function renderHealthLogs() {
  const list = $("#healthLogList");

  if (!state.healthLogs.length) {
    list.innerHTML = '<p class="hint">아직 건강기록이 없습니다. 오늘 상태를 먼저 저장하세요.</p>';
    return;
  }

  list.innerHTML = state.healthLogs
    .slice(0, 8)
    .map((item) => {
      const symptomText = item.symptoms?.length
        ? item.symptoms.map((value) => symptomLabels[value] || value).join(", ")
        : "특이 증상 없음";

      return `
        <article class="history-item">
          <header>
            <strong>${escapeHtml(riskLabels[item.riskLevel])}</strong>
            <span>${escapeHtml(formatDate(item.createdAt))}</span>
          </header>
          <p>${escapeHtml(item.summary)}</p>
          <small>${escapeHtml(symptomText)}</small>
        </article>
      `;
    })
    .join("");
}

function renderTriageQuestions() {
  const model = window.NAAPA_TRIAGE_MODEL;
  const container = $("#triageQuestions");
  if (!container || !model) return;

  const count = $("#triageQuestionCount");
  if (count) count.textContent = `${model.questions.length} signals`;

  container.innerHTML = model.questionGroups
    .map(
      (group, index) => `
        <details class="triage-group" ${index < 2 ? "open" : ""}>
          <summary>${escapeHtml(group.label)} <span>${group.questions.length}개</span></summary>
          <div class="triage-check-grid">
            ${group.questions
              .map(
                ([id, label]) => `
                  <label>
                    <input type="checkbox" name="triageSignal" value="${escapeHtml(id)}" />
                    <span>${escapeHtml(label)}</span>
                  </label>
                `,
              )
              .join("")}
          </div>
        </details>
      `,
    )
    .join("");
}

function collectTriageSignals() {
  return $$('input[name="triageSignal"]:checked').map((input) => input.value);
}

function createTriageSummary(result) {
  const top = result.topConditions?.[0]?.label || "고위험 후보 없음";
  if (result.riskLevel === "EMERGENCY") {
    return `문진 결과 ${riskLabels[result.riskLevel]}입니다. 최우선 후보는 ${top}이며 즉시 병원 연락이 필요합니다.`;
  }
  if (result.riskLevel === "VET_RECOMMENDED") {
    return `문진 결과 ${riskLabels[result.riskLevel]}입니다. ${top} 가능성을 우선 배제해야 합니다.`;
  }
  if (result.riskLevel === "CAUTION") {
    return `문진 결과 ${riskLabels[result.riskLevel]}입니다. ${top} 관련 신호를 관찰하고 반복 시 상담을 권장합니다.`;
  }
  if (result.riskLevel === "WATCH") {
    return `문진 결과 ${riskLabels[result.riskLevel]}입니다. 현재는 관찰 기록을 이어가세요.`;
  }
  return "문진상 즉시 응급으로 보이는 신호는 낮습니다. 변화가 생기면 다시 문진하세요.";
}

function renderTriageResult(result) {
  const badge = $("#triageRiskBadge");
  if (badge) {
    badge.className = `risk-badge ${result.riskLevel}`;
    badge.textContent = riskLabels[result.riskLevel];
  }

  $("#triageOutput").innerHTML = `
    <h4>${escapeHtml(result.summary)}</h4>
    <div class="model-panel">
      <p><strong>문진 모델</strong> ${escapeHtml(result.modelVersion)} · ${result.selectedCount}/${result.questionCount}개 신호 선택 · 응급 점수 ${result.emergencyScore}</p>
      <p class="hint">${escapeHtml(result.confidence)} · 가능도는 학습 검증 전 참고 점수이며 확정 진단이 아닙니다.</p>
    </div>
    ${
      result.redFlags.length
        ? `<p><strong>즉시 확인할 위험 신호</strong></p><ul>${result.redFlags.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : ""
    }
    <p><strong>상위 감별질환 후보</strong></p>
    <div class="condition-list">
      ${result.topConditions
        .map(
          (item) => `
            <div>
              <strong>${escapeHtml(item.label)}</strong>
              <span>모델점수 ${escapeHtml(item.score)} · 상대 가능도 ${escapeHtml(item.likelihood)}%</span>
            </div>
          `,
        )
        .join("")}
    </div>
    <p><strong>모델 근거</strong></p>
    <ul>${result.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>권장 행동</strong></p>
    <ul>${result.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ${result.imageName ? `<p class="hint">첨부 이미지: ${escapeHtml(result.imageName)}. 현재 문진 모델은 이미지를 판독하지 않고 병원 전달용으로만 기록합니다.</p>` : ""}
    <p class="hint">${escapeHtml(result.disclaimer)}</p>
  `;
}

function renderTriageHistory() {
  const list = $("#triageHistoryList");
  if (!list) return;

  if (!state.triageAssessments.length) {
    list.innerHTML = '<p class="hint">아직 저장된 문진 결과가 없습니다.</p>';
    return;
  }

  list.innerHTML = state.triageAssessments
    .slice(0, 5)
    .map(
      (item) => `
        <article class="history-item">
          <header>
            <strong>${escapeHtml(riskLabels[item.riskLevel])}</strong>
            <span>${escapeHtml(formatDate(item.createdAt))}</span>
          </header>
          <p>${escapeHtml(item.summary)}</p>
          <small>${escapeHtml(item.topConditions?.[0]?.label || "후보 없음")} · ${escapeHtml(item.selectedCount)}개 신호</small>
        </article>
      `,
    )
    .join("");
}

function renderHistory() {
  const list = $("#historyList");

  if (!state.analyses.length) {
    list.innerHTML = '<p class="hint">아직 분석 이력이 없습니다.</p>';
    return;
  }

  list.innerHTML = state.analyses
    .map(
      (item) => `
        <article class="history-item">
          <header>
            <strong>${escapeHtml(riskLabels[item.riskLevel])}</strong>
            <span>${escapeHtml(formatDate(item.createdAt))}</span>
          </header>
          <p>${escapeHtml(item.summary)}</p>
          <small>${escapeHtml(item.videoName || "영상 파일")} · ${escapeHtml(item.videoTypeLabel || "영상")}</small>
        </article>
      `,
    )
    .join("");
}

function renderCommunity() {
  const list = $("#communityList");
  if (!list) return;

  if (!state.communityPosts.length) {
    list.innerHTML = '<p class="hint">아직 저장된 게시글이 없습니다.</p>';
    return;
  }

  list.innerHTML = state.communityPosts
    .map(
      (item) => `
        <article class="history-item">
          <header>
            <strong>${escapeHtml(item.topic)}</strong>
            <span>${escapeHtml(formatDate(item.createdAt))}</span>
          </header>
          <p>${escapeHtml(item.body)}</p>
          <small>${escapeHtml(state.dog?.breed || "전체 품종")} 보호자 경험 공유</small>
        </article>
      `,
    )
    .join("");
}

function isTimeCouponValid() {
  if (!isAuthenticated()) return false;
  if (!state.timeCoupon) return false;
  if (state.timeCoupon.userId && state.timeCoupon.userId !== state.currentUser.id) return false;
  return state.timeCoupon.usesRemaining > 0 && new Date(state.timeCoupon.expiresAt).getTime() > Date.now();
}

function renderTimeCoupon() {
  const status = $("#timeCouponStatus");
  if (!status) return;
  const sendButton = $("#sendEmailCode");
  const verifyButton = $("#verifyEmailCode");

  if (isTimeCouponValid()) {
    status.textContent = `메일 인증 쿠폰 활성화: ${state.timeCoupon.usesRemaining}회 남음 · ${formatDate(
      state.timeCoupon.expiresAt,
    )}까지. 인증은 완료됐고 다시 받을 필요가 없습니다.`;
    if (sendButton) sendButton.disabled = true;
    if (verifyButton) verifyButton.disabled = true;
    return;
  }

  if (sendButton) sendButton.disabled = false;
  if (verifyButton) verifyButton.disabled = false;

  if (!isAuthenticated()) {
    status.textContent = "로그인 후 메일 주소를 인증하면 48시간 동안 영상/성분표 AI 분석 5회를 사용할 수 있습니다.";
    return;
  }

  if (state.timeCoupon?.userId && state.timeCoupon.userId !== state.currentUser.id) {
    status.textContent = "현재 로그인 계정에는 활성화된 메일 인증 쿠폰이 없습니다.";
    return;
  }

  if (state.timeCoupon?.usesRemaining === 0) {
    status.textContent = "메일 인증 쿠폰 5회를 모두 사용했습니다. 기본 크레딧으로 계속 이용할 수 있습니다.";
    return;
  }

  status.textContent = "메일 인증 후 48시간 동안 영상/성분표 AI 분석 5회를 사용할 수 있습니다.";
}

function getAnalysisAccessText() {
  if (!isAuthenticated()) return "로그인 후 AI 분석 쿠폰과 크레딧을 사용할 수 있습니다.";
  if (isTimeCouponValid()) return `메일 인증 쿠폰 사용 가능: ${state.timeCoupon.usesRemaining}회 남음.`;
  if (state.creditsRemaining >= 10) return `크레딧 사용 가능: ${state.creditsRemaining} credits 보유.`;
  return "사용 가능한 AI 분석 쿠폰 또는 크레딧이 없습니다.";
}

function renderAiEndpoint() {
  const input = $("#aiEndpoint");
  const status = $("#aiEndpointStatus");
  if (!input || !status) return;

  input.value = state.aiEndpoint || "";
  status.textContent = state.aiEndpoint
    ? `연결 대상: ${state.aiEndpoint}`
    : `${getAnalysisAccessText()} 실제 LLM 분석을 실행하려면 AI Worker URL 연결만 추가로 필요합니다.`;
}

function getAiEndpoint() {
  return String(state.aiEndpoint || "").trim().replace(/\/+$/, "");
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hasAnalysisAccess(cost = 10) {
  return isTimeCouponValid() || state.creditsRemaining >= cost;
}

function consumeAnalysisAccess(cost = 10) {
  if (isTimeCouponValid()) {
    state.timeCoupon.usesRemaining = Math.max(0, state.timeCoupon.usesRemaining - 1);
    return "timeCoupon";
  }

  state.creditsRemaining = Math.max(0, state.creditsRemaining - cost);
  return "credits";
}

function goToAiEndpointSetup(reason) {
  switchView("settings");
  const status = $("#aiEndpointStatus");
  if (status) {
    status.textContent = `${getAnalysisAccessText()} ${reason}`;
  }
  window.setTimeout(() => {
    $("#aiEndpoint")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 50);
}

function renderPlans() {
  const plansEl = $("#plans");

  plansEl.innerHTML = Object.entries(plans)
    .map(([key, plan]) => {
      const active = key === state.plan;
      const priceText = plan.price ? `${plan.price.toLocaleString("ko-KR")}원` : "무료";

      return `
        <div class="plan-card ${active ? "active-plan" : ""}">
          <strong>${escapeHtml(plan.name)} · ${escapeHtml(priceText)}</strong>
          <span>${plan.credits} credits / month</span>
          <p class="hint">${escapeHtml(plan.description)}</p>
          <button class="${active ? "secondary-action" : "primary-action"} small" data-plan="${key}" type="button">
            ${active ? "사용 중" : "이 플랜으로 변경"}
          </button>
        </div>
      `;
    })
    .join("");
}

function renderVetReport() {
  const report = $("#vetReport");
  const dog = state.dog;
  const latestAnalysis = state.analyses[0];
  const latestTriage = state.triageAssessments[0];
  const recentLogs = state.healthLogs.slice(0, 5);

  if (!dog) {
    report.textContent = "반려견 프로필을 먼저 저장하면 병원 상담 리포트를 생성할 수 있습니다.";
    return;
  }

  const latestAnalysisLines = latestAnalysis
    ? [
        `위험도: ${riskLabels[latestAnalysis.riskLevel]}`,
        `요약: ${latestAnalysis.summary}`,
        `강아지 관점 메시지: ${latestAnalysis.dogMessage || "-"}`,
        `AI 모델 요약: ${latestAnalysis.modelSummary || "-"}`,
        `관찰 신호: ${latestAnalysis.observedSignals.join(", ")}`,
        `권장 행동: ${latestAnalysis.recommendations.join(" / ")}`,
        `수의사 상담 권장: ${latestAnalysis.vetConsultationRecommended ? "예" : "현재는 관찰 우선"}`,
      ]
    : ["영상 분석 없음"];

  const recentLogLines = recentLogs.length
    ? recentLogs.map((log) => `- ${formatDate(log.createdAt)} | ${riskLabels[log.riskLevel]} | ${log.summary}`)
    : ["- 기록 없음"];
  const latestTriageLines = latestTriage
    ? [
        `위험도: ${riskLabels[latestTriage.riskLevel]}`,
        `요약: ${latestTriage.summary}`,
        `응급 점수: ${latestTriage.emergencyScore}`,
        `상위 후보: ${latestTriage.topConditions.map((item) => `${item.label}(${item.likelihood}%)`).join(", ")}`,
        `위험 신호: ${latestTriage.redFlags.length ? latestTriage.redFlags.join(" / ") : "-"}`,
        `첨부 이미지: ${latestTriage.imageName || "-"}`,
      ]
    : ["문진 결과 없음"];

  const lines = [
    "나아파 - 병원 상담 전 리포트",
    "",
    "[반려견 정보]",
    `이름: ${dog.name || "-"}`,
    `품종: ${dog.breed || "-"}`,
    `나이: ${dog.age || "-"}세`,
    `체중: ${dog.weight || "-"}kg`,
    `성별: ${formatSex(dog.sex)} / 중성화: ${formatNeutered(dog.neutered)}`,
    `알러지/질환/복용약: ${dog.medicalNotes || "-"}`,
    "",
    "[최근 건강기록]",
    ...recentLogLines,
    "",
    "[최근 문진 응급분류]",
    ...latestTriageLines,
    "",
    "[최근 영상 분석]",
    ...latestAnalysisLines,
    "",
    "[주의 문구]",
    "이 리포트는 보호자의 기록 정리와 상담 준비를 위한 참고 자료입니다.",
    "질병명의 확정 판단이 아니며 수의사의 진료를 대체하지 않습니다.",
  ];

  report.textContent = lines.join("\n");
}

function collectSymptoms(name) {
  return $$(`input[name="${name}"]:checked`).map((input) => input.value);
}

function getSelectLabel(group, value) {
  return selectLabels[group]?.[value] || value || "-";
}

function createDogMessage(riskLevel, signals, dogName) {
  const hasGaitConcern = signals.some((item) => item.includes("보행") || item.includes("통증"));
  const hasBreathingConcern = signals.some((item) => item.includes("호흡"));
  const hasDigestiveConcern = signals.some((item) => item.includes("소화"));

  if (riskLevel === "VET_RECOMMENDED") {
    return hasBreathingConcern
      ? `${dogName} 입장에서는 "숨 쉬는 게 평소 같지 않아서 무섭고 힘들어요. 빨리 봐주세요."라고 말하고 싶을 수 있습니다.`
      : `${dogName} 입장에서는 "참아보려고 했는데 계속 불편해요. 오늘은 병원에 같이 가줬으면 해요."라고 말하고 싶을 수 있습니다.`;
  }

  if (riskLevel === "CAUTION") {
    return hasGaitConcern
      ? `${dogName} 입장에서는 "걷기는 할 수 있지만 한쪽 다리를 쓰는 게 조금 불편해요. 천천히 쉬면서 봐주세요."라고 말하고 싶을 수 있습니다.`
      : `${dogName} 입장에서는 "몸이 평소 같지 않아요. 오늘은 무리하지 않고 가까이 있어주세요."라고 말하고 싶을 수 있습니다.`;
  }

  if (riskLevel === "WATCH") {
    if (hasDigestiveConcern) {
      return `${dogName} 입장에서는 "속이 조금 불편해요. 오늘 먹은 것과 배변을 잘 봐주세요."라고 말하고 싶을 수 있습니다.`;
    }
    return `${dogName} 입장에서는 "조금 이상하긴 한데 아직은 견딜 만해요. 내일도 같은지 지켜봐주세요."라고 말하고 싶을 수 있습니다.`;
  }

  return `${dogName} 입장에서는 "오늘은 크게 불편한 신호는 없어요. 그래도 평소처럼 봐주고 기록해줘서 좋아요."라고 말하고 싶을 수 있습니다.`;
}

function createSampleModeling({ score, symptoms, videoType }) {
  const sample = SAMPLE_DATASET_PROFILE;
  const hasGaitSymptom = videoType === "gait" || symptoms.includes("limping") || symptoms.includes("pain");
  const gaitSignalScore = Math.min(100, Math.max(8, Math.round(28 + score * 7 + (hasGaitSymptom ? 16 : 0))));
  const sampleSimilarity = hasGaitSymptom ? "중간" : "낮음";
  const keypointCoverage = `${sample.avgKeypoints}/13`;

  return {
    version: "sample-gait-v0.1",
    sampleSummary: `${sample.frames.toLocaleString("ko-KR")}개 프레임과 ${sample.labels.toLocaleString(
      "ko-KR",
    )}개 라벨의 샘플 구조를 기준으로 보행 관찰 항목을 매핑했습니다.`,
    keypointCoverage,
    gaitSignalScore,
    sampleSimilarity,
    primaryFeatures: hasGaitSymptom
      ? ["좌우 보행 균형", "앞/뒷다리 지지점", "관절 키포인트 누락/흔들림", "보폭 리듬"]
      : ["영상/메모 기반 위험 신호", "최근 건강기록 연계", "보호자 체크리스트"],
    limitation:
      "샘플 리포트는 실제 LLM 호출이 아니라 AIHub 71878 샘플 데이터셋의 라벨 구조와 보행 관찰 항목을 설명합니다. 실제 분석은 AI Worker 연결 후 실행됩니다.",
  };
}

function createSampleDatasetReport() {
  const sample = SAMPLE_DATASET_PROFILE;
  const dogName = state.dog?.name || "반려견";
  return {
    id: makeId(),
    userId: state.currentUser?.id || null,
    createdAt: new Date().toISOString(),
    riskLevel: "WATCH",
    summary: `${dogName} 분석에 활용할 기준 데이터는 ${sample.frames.toLocaleString(
      "ko-KR",
    )}개 프레임, ${sample.labels.toLocaleString("ko-KR")}개 라벨, 4방향 시점으로 구성됩니다.`,
    dogMessage:
      `${dogName} 입장에서는 "내 걸음이 평소와 다른지 보려면 앞, 뒤, 좌, 우에서 짧고 선명하게 찍어줘"라고 말하고 싶을 수 있습니다.`,
    modelSummary:
      "샘플 데이터셋은 관절 키포인트, 촬영 방향, 병원 라벨 구조를 갖고 있어 보행 균형/지지점/보폭 리듬 관찰 기준을 설계하는 데 사용할 수 있습니다.",
    modelMetrics: createSampleModeling({
      score: 3,
      symptoms: collectSymptoms("symptom"),
      videoType: $("#videoType").value,
    }),
    observedSignals: [
      "샘플 구조 기준: Front/Back/Left/Right 4방향 촬영",
      `평균 키포인트 ${sample.avgKeypoints}/13개`,
      "실제 결과 생성을 위해서는 AI Worker와 LLM API 키 연결 필요",
    ],
    recommendations: [
      "실제 POC에서는 10~60초 보행 영상을 올리고 AI Worker URL을 설정하세요.",
      "촬영 시 몸 전체와 네 발이 프레임 안에 들어오게 유지하세요.",
      "절뚝거림이나 통증 반응이 있으면 분석 결과와 별개로 수의사 상담을 우선하세요.",
    ],
    vetConsultationRecommended: false,
    videoName: selectedVideo?.name || "샘플 데이터셋",
    videoSource: "sample-dataset",
    videoType: $("#videoType").value,
    videoTypeLabel: $("#videoType").selectedOptions[0]?.textContent || "영상",
    ownerNote: $("#ownerNote")?.value.trim() || "",
    disclaimer:
      "이 항목은 데이터셋 구조 설명입니다. 실제 이상 신호 분석은 LLM Worker 연결 후 업로드 프레임을 기반으로 실행됩니다.",
  };
}

function createHealthLog() {
  const symptoms = collectSymptoms("dailySymptom");
  const appetite = $("#appetite").value;
  const stool = $("#stool").value;
  const activity = $("#activity").value;
  const sleep = $("#sleep").value;
  const memo = $("#dailyMemo").value.trim();
  let score = 0;

  if (appetite === "low") score += 1;
  if (appetite === "none") score += 3;
  if (stool === "soft") score += 1;
  if (stool === "diarrhea") score += 2;
  if (stool === "bloody") score += 4;
  if (activity === "low") score += 1;
  if (activity === "very_low") score += 3;
  if (sleep === "restless") score += 1;
  if (symptoms.includes("vomiting")) score += 2;
  if (symptoms.includes("coughing")) score += 2;
  if (symptoms.includes("limping")) score += 3;
  if (symptoms.includes("pain")) score += 3;
  if (symptoms.includes("breathing")) score += 4;

  const riskLevel = score >= 8 ? "VET_RECOMMENDED" : score >= 5 ? "CAUTION" : score >= 2 ? "WATCH" : "NORMAL";
  const dogName = state.dog?.name || "반려견";
  const symptomSummary = symptoms.length
    ? symptoms.map((value) => symptomLabels[value] || value).join(", ")
    : "특이 증상 없음";
  const conditionSummary = [
    `식욕 ${getSelectLabel("appetite", appetite)}`,
    `배변 ${getSelectLabel("stool", stool)}`,
    `활동 ${getSelectLabel("activity", activity)}`,
    `수면 ${getSelectLabel("sleep", sleep)}`,
  ].join(", ");

  const summary =
    riskLevel === "NORMAL"
      ? `${dogName}의 오늘 기록은 안정적입니다. ${conditionSummary}.`
      : `${dogName}의 오늘 기록에서 ${symptomSummary} 등 주의 신호가 있습니다. 반복 여부를 확인하세요.`;

  return {
    id: makeId(),
    userId: state.currentUser?.id || null,
    createdAt: new Date().toISOString(),
    riskLevel,
    appetite,
    stool,
    activity,
    sleep,
    symptoms,
    memo,
    summary: memo ? `${summary} 메모: ${memo}` : summary,
  };
}

function createTriageAssessment() {
  const model = window.NAAPA_TRIAGE_MODEL;
  if (!model) throw new Error("문진 모델을 불러오지 못했습니다.");

  const raw = model.assess({
    selectedIds: collectTriageSignals(),
    dog: state.dog,
    chiefComplaint: $("#triageChiefComplaint").value,
    duration: $("#triageDuration").value,
    notes: $("#triageNotes").value.trim(),
    hasImage: Boolean(selectedTriageImageDataUrl),
  });

  return {
    ...raw,
    id: makeId(),
    userId: state.currentUser?.id || null,
    createdAt: new Date().toISOString(),
    chiefComplaint: $("#triageChiefComplaint").value,
    duration: $("#triageDuration").value,
    notes: $("#triageNotes").value.trim(),
    imageName: selectedTriageImageName,
    summary: createTriageSummary(raw),
  };
}

function createAnalysis({ symptoms, ownerNote, videoType }) {
  const note = ownerNote.toLowerCase();
  const signals = [];
  const dog = state.dog || {};
  const latestLog = state.healthLogs[0];
  const age = Number(dog.age || 0);
  let score = 0;

  if (symptoms.includes("limping") || note.includes("절뚝") || note.includes("다리")) {
    score += 3;
    signals.push("보행 균형 저하 가능성");
  }

  if (symptoms.includes("pain") || note.includes("통증") || note.includes("아파")) {
    score += 3;
    signals.push("통증 반응 가능성");
  }

  if (symptoms.includes("coughing") || note.includes("기침") || note.includes("켁")) {
    score += 2;
    signals.push("호흡기 이상 신호 가능성");
  }

  if (symptoms.includes("vomiting") || symptoms.includes("diarrhea") || note.includes("설사") || note.includes("구토")) {
    score += 2;
    signals.push("소화기 이상 신호 가능성");
  }

  if (symptoms.includes("low_energy") || note.includes("무기력") || note.includes("축")) {
    score += 2;
    signals.push("활동량 저하");
  }

  if (note.includes("숨") || note.includes("호흡")) {
    score += 4;
    signals.push("호흡 이상 관찰 필요");
  }

  if (videoType === "gait") {
    signals.push("보행 영상 기반 관찰");
  }

  if (age >= 8) {
    score += 1;
    signals.push("노령견 주의 요소");
  }

  if (latestLog && riskOrder[latestLog.riskLevel] >= riskOrder.CAUTION) {
    score += 2;
    signals.push("최근 건강기록의 주의 신호와 연계 필요");
  }

  if (selectedVideoMeta?.duration && selectedVideoMeta.duration > 60) {
    score += 1;
    signals.push("권장 길이 초과 영상");
  }

  const riskLevel =
    score >= 10 ? "VET_RECOMMENDED" : score >= 6 ? "CAUTION" : score >= 2 ? "WATCH" : "NORMAL";

  const dogName = dog.name || "반려견";
  const modeling = createSampleModeling({ score, symptoms, videoType });
  const summaryByRisk = {
    NORMAL: `${dogName}의 입력 기록에서 뚜렷한 고위험 신호는 확인되지 않았습니다. 현재 상태를 계속 기록하세요.`,
    WATCH: `${dogName}에게 일부 관찰이 필요한 신호가 있습니다. 같은 증상이 반복되는지 24시간 정도 확인하세요.`,
    CAUTION: `${dogName}의 기록에서 여러 이상 신호가 함께 확인됩니다. 무리한 활동을 줄이고 변화 양상을 자세히 기록하세요.`,
    VET_RECOMMENDED: `${dogName}의 기록에서 수의사 상담을 권장할 만한 신호가 확인됩니다. 가능한 빠르게 상담을 준비하세요.`,
  };

  const recommendations = [
    "무리한 산책, 계단, 점프를 줄이고 안정 상태를 관찰하세요.",
    "증상이 반복되는 시간, 상황, 움직임을 짧게 기록하세요.",
    riskLevel === "NORMAL"
      ? "내일도 식사, 배변, 활동량을 이어서 기록하세요."
      : "절뚝거림, 통증 반응, 호흡 이상, 반복 구토가 있으면 동물병원 상담을 권장합니다.",
  ];

  return {
    id: makeId(),
    userId: state.currentUser?.id || null,
    createdAt: new Date().toISOString(),
    riskLevel,
    summary: summaryByRisk[riskLevel],
    modelSummary: modeling.sampleSummary,
    modelMetrics: modeling,
    dogMessage: createDogMessage(riskLevel, signals, dogName),
    observedSignals: signals.length ? signals : ["특이 신호 없음"],
    recommendations,
    vetConsultationRecommended: ["CAUTION", "VET_RECOMMENDED", "EMERGENCY"].includes(riskLevel),
    videoName: selectedVideo?.name,
    videoSource: selectedVideoMode || "file",
    videoType,
    videoTypeLabel: $("#videoType").selectedOptions[0]?.textContent || "영상",
    ownerNote,
    disclaimer:
      "이 분석은 질병명의 확정 판단이 아니며 수의사의 진료를 대체하지 않습니다. 이상 증상이 지속되면 동물병원에 방문하세요.",
  };
}

function normalizeRiskLevel(value) {
  const level = String(value || "").toUpperCase();
  return riskLabels[level] ? level : "WATCH";
}

function normalizeList(value, fallback = []) {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return fallback;
}

function normalizeAiAnalysis(raw, context) {
  const riskLevel = normalizeRiskLevel(raw.riskLevel || raw.risk_level || raw.risk);
  const modelMetrics = raw.modelMetrics || raw.model_metrics || {};
  const dogName = state.dog?.name || "반려견";

  return {
    id: makeId(),
    userId: state.currentUser?.id || null,
    createdAt: new Date().toISOString(),
    riskLevel,
    summary: String(raw.summary || `${dogName}의 영상에서 ${riskLabels[riskLevel]} 수준의 신호가 관찰되었습니다.`),
    dogMessage: String(raw.dogMessage || raw.dog_message || createDogMessage(riskLevel, [], dogName)),
    modelSummary: String(raw.modelSummary || raw.model_summary || "LLM이 영상 프레임, 보호자 메모, 반려견 프로필을 함께 검토했습니다."),
    modelMetrics: {
      modelProvider: modelMetrics.modelProvider || modelMetrics.model_provider || "LLM Worker",
      frameCount: modelMetrics.frameCount ?? modelMetrics.frame_count ?? context.frames.length,
      inputModality: modelMetrics.inputModality || modelMetrics.input_modality || "video_frames+text",
      sampleSimilarity: modelMetrics.sampleSimilarity || modelMetrics.sample_similarity || "-",
      gaitSignalScore: modelMetrics.gaitSignalScore ?? modelMetrics.gait_signal_score ?? "-",
      keypointCoverage: modelMetrics.keypointCoverage || modelMetrics.keypoint_coverage || "-",
      confidence: modelMetrics.confidence || "POC 참고",
      limitation:
        modelMetrics.limitation ||
        modelMetrics.limitations ||
        "단일 영상과 보호자 메모 기반의 1차 위험 신호 안내입니다. 질병 확정 판단은 하지 않습니다.",
      primaryFeatures: normalizeList(modelMetrics.primaryFeatures || modelMetrics.primary_features, [
        "영상 프레임",
        "보호자 메모",
        "반려견 프로필",
      ]),
    },
    observedSignals: normalizeList(raw.observedSignals || raw.observed_signals, ["LLM 결과에 관찰 신호가 비어 있습니다."]),
    recommendations: normalizeList(raw.recommendations || raw.recommendedActions || raw.recommended_actions, [
      "24시간 내 반복 여부를 기록하세요.",
      "통증, 호흡 이상, 반복 구토/설사가 있으면 동물병원 상담을 권장합니다.",
    ]),
    vetConsultationRecommended: Boolean(
      raw.vetConsultationRecommended ?? raw.vet_consultation_recommended ?? riskOrder[riskLevel] >= riskOrder.CAUTION,
    ),
    videoName: selectedVideo?.name,
    videoSource: selectedVideoMode || "file",
    videoType: context.videoType,
    videoTypeLabel: $("#videoType").selectedOptions[0]?.textContent || "영상",
    ownerNote: context.ownerNote,
    disclaimer:
      raw.disclaimer ||
      "이 분석은 질병명의 확정 판단이 아니며 수의사의 진료를 대체하지 않습니다. 이상 증상이 지속되면 동물병원에 방문하세요.",
  };
}

function renderAnalysisResult(result) {
  const badge = $("#riskBadge");
  badge.className = `risk-badge ${result.riskLevel}`;
  badge.textContent = riskLabels[result.riskLevel];

  $("#analysisOutput").innerHTML = `
    <h4>${escapeHtml(result.summary)}</h4>
    <div class="dog-message">
      <strong>강아지 입장에서 예상되는 말</strong>
      <p>${escapeHtml(result.dogMessage)}</p>
    </div>
    <div class="model-panel">
      <p><strong>AI 1차 모델링</strong></p>
      <div class="metric-grid">
        <span>샘플 유사도 <strong>${escapeHtml(result.modelMetrics?.sampleSimilarity || "-")}</strong></span>
        <span>보행 신호 점수 <strong>${escapeHtml(result.modelMetrics?.gaitSignalScore ?? "-")}/100</strong></span>
        <span>키포인트 커버리지 <strong>${escapeHtml(result.modelMetrics?.keypointCoverage || "-")}</strong></span>
      </div>
      <p class="hint">${escapeHtml(result.modelSummary || "")}</p>
      <p class="hint">${escapeHtml(result.modelMetrics?.limitation || "")}</p>
    </div>
    <p><strong>수의사 상담 권장:</strong> ${result.vetConsultationRecommended ? "예" : "현재는 관찰 우선"}</p>
    <p><strong>관찰된 신호</strong></p>
    <ul>${result.observedSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>모델이 본 주요 특징</strong></p>
    <ul>${(result.modelMetrics?.primaryFeatures || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>권장 행동</strong></p>
    <ul>${result.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p class="hint">${escapeHtml(result.disclaimer)}</p>
  `;
}

async function callAiWorker(path, payload) {
  const endpoint = getAiEndpoint();
  if (!endpoint) {
    throw new Error(AI_ENDPOINT_HINT);
  }

  const response = await fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.message || `AI Worker 요청 실패 (${response.status})`);
  }

  return data;
}

function waitForVideoEvent(video, eventName) {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener(eventName, onEvent);
      video.removeEventListener("error", onError);
    };
    const onEvent = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("영상을 읽는 중 오류가 발생했습니다."));
    };
    video.addEventListener(eventName, onEvent, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
}

async function captureVideoFrames(frameCount = 6) {
  if (selectedVideoMode === "youtube") {
    throw new Error("YouTube/Shorts 링크는 브라우저에서 프레임 추출이 불가능합니다. 직접 촬영한 파일이나 MP4/WebM 원본 URL을 사용하세요.");
  }

  const video = $("#videoPreview video");
  if (!video) throw new Error("분석할 영상 미리보기를 찾을 수 없습니다.");

  if (!Number.isFinite(video.duration) || video.duration === 0) {
    await waitForVideoEvent(video, "loadedmetadata");
  }

  const duration = Math.max(video.duration || 1, 1);
  const canvas = document.createElement("canvas");
  const maxWidth = 640;
  const scale = Math.min(1, maxWidth / (video.videoWidth || maxWidth));
  canvas.width = Math.max(1, Math.round((video.videoWidth || maxWidth) * scale));
  canvas.height = Math.max(1, Math.round((video.videoHeight || 360) * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const frames = [];

  for (let index = 0; index < frameCount; index += 1) {
    const ratio = frameCount === 1 ? 0.5 : (index + 0.5) / frameCount;
    video.currentTime = Math.min(duration - 0.05, Math.max(0, duration * ratio));
    await waitForVideoEvent(video, "seeked");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
      frames.push(canvas.toDataURL("image/jpeg", 0.78));
    } catch {
      throw new Error("원본 URL 영상은 CORS 제한 때문에 프레임을 추출할 수 없습니다. 파일 업로드를 사용하세요.");
    }
  }

  return frames;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("이미지를 읽을 수 없습니다."));
    image.src = dataUrl;
  });
}

function imageToJpegDataUrl(image, maxSize = 1400) {
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.84);
}

async function resizeImageFile(file, maxSize = 1400) {
  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImage(dataUrl);
  return imageToJpegDataUrl(image, maxSize);
}

async function loadSameOriginImageUrl(url) {
  const image = await loadImage(url);
  selectedNutritionImage = { name: url.split("/").pop() || "nutrition-label" };
  selectedNutritionImageDataUrl = imageToJpegDataUrl(image);
  showNutritionPreview(selectedNutritionImageDataUrl);
}

async function loadNutritionImageFromUrl(url) {
  let parsed;
  try {
    parsed = new URL(url, window.location.href);
  } catch {
    throw new Error("올바른 이미지 URL을 입력하세요.");
  }

  if (!["http:", "https:", "file:"].includes(parsed.protocol)) {
    throw new Error("http 또는 https 이미지 URL만 사용할 수 있습니다.");
  }

  if (parsed.protocol === "file:" || parsed.origin === window.location.origin) {
    await loadSameOriginImageUrl(parsed.href);
    return;
  }

  const response = await fetch(parsed.href, { mode: "cors" });
  if (!response.ok) throw new Error(`이미지를 내려받을 수 없습니다. (${response.status})`);
  const blob = await response.blob();
  if (!blob.type.startsWith("image/")) throw new Error("이미지 파일 URL이 아닙니다.");

  const extension = blob.type.split("/")[1] || "jpg";
  const file = new File([blob], `nutrition-label.${extension}`, { type: blob.type });
  selectedNutritionImage = file;
  selectedNutritionImageDataUrl = await resizeImageFile(file);
  showNutritionPreview(selectedNutritionImageDataUrl);
}

async function testAiEndpoint() {
  const endpoint = getAiEndpoint();
  if (!endpoint) {
    $("#aiEndpointStatus").textContent = AI_ENDPOINT_HINT;
    return;
  }

  $("#aiEndpointStatus").textContent = "AI Worker 상태를 확인하는 중입니다...";
  try {
    const response = await fetch(`${endpoint}/health`, { method: "GET" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      throw new Error(data.error || `연결 실패 (${response.status})`);
    }
    $("#aiEndpointStatus").textContent = `AI Worker 연결 성공 · 모델 ${data.model || "configured"}`;
  } catch (error) {
    $("#aiEndpointStatus").textContent = `AI Worker 연결 실패: ${error.message}`;
  }
}

async function runRealVideoAnalysis() {
  if (!requireAuth("영상 AI 분석을 실행하려면 먼저 로그인하거나 계정을 만드세요.")) {
    return;
  }

  if (!state.dog) {
    alert("먼저 반려견 프로필을 저장하세요.");
    switchView("profile");
    return;
  }

  if (!selectedVideo) {
    alert("분석할 영상을 선택하세요.");
    return;
  }

  if (!getAiEndpoint()) {
    const message = "쿠폰 인증은 완료되어 있습니다. 실제 LLM 영상 분석을 실행하려면 AI Worker URL을 저장하고 연결 테스트를 통과해야 합니다.";
    $("#analysisOutput").innerHTML = `<p class="error-text">${escapeHtml(message)}</p>`;
    goToAiEndpointSetup(message);
    return;
  }

  if (!hasAnalysisAccess(10)) {
    $("#timeCouponStatus").textContent = "AI 분석에 사용할 쿠폰 또는 크레딧이 부족합니다. 메일 인증 쿠폰을 다시 발급하거나 플랜을 선택하세요.";
    switchView("settings");
    return;
  }

  const context = {
    symptoms: collectSymptoms("symptom"),
    ownerNote: $("#ownerNote").value.trim(),
    videoType: $("#videoType").value,
  };

  $("#riskBadge").className = "risk-badge idle";
  $("#riskBadge").textContent = "LLM 분석 중";
  $("#analysisOutput").innerHTML = "<p>영상 프레임을 추출해 LLM Worker로 보내는 중입니다...</p>";

  try {
    const frames = await captureVideoFrames(6);
    $("#analysisOutput").innerHTML = `<p>${frames.length}개 프레임, 프로필, 보호자 메모를 LLM이 함께 분석하는 중입니다...</p>`;
    const raw = await callAiWorker("/analyze/gait", {
      dog: state.dog,
      recentHealthLogs: state.healthLogs.slice(0, 5),
      symptoms: context.symptoms,
      ownerNote: context.ownerNote,
      videoType: context.videoType,
      videoMeta: {
        source: selectedVideoMode || "file",
        name: selectedVideo?.name || "uploaded-video",
        duration: selectedVideoMeta?.duration || null,
      },
      sampleDatasetProfile: SAMPLE_DATASET_PROFILE,
      frames,
    });
    const result = normalizeAiAnalysis(raw, { ...context, frames });
    consumeAnalysisAccess(10);
    state.analyses = [result, ...state.analyses].slice(0, 20);
    saveState();
    renderAnalysisResult(result);
  } catch (error) {
    $("#riskBadge").className = "risk-badge idle";
    $("#riskBadge").textContent = "연결 필요";
    $("#analysisOutput").innerHTML = `
      <p class="error-text">${escapeHtml(error.message)}</p>
      <p class="hint">실제 LLM 분석은 AI Worker가 정상 배포되고, Worker에 OpenAI API 키가 설정되어야 실행됩니다.</p>
    `;
  }
}

function showVideoPreview(file) {
  const previousMode = selectedVideoMode;
  selectedVideo = file;
  selectedVideoMeta = null;
  selectedVideoMode = "file";

  if (selectedVideoUrl && previousMode === "file") {
    URL.revokeObjectURL(selectedVideoUrl);
  }
  selectedVideoUrl = URL.createObjectURL(file);

  $("#videoPreview").innerHTML = `<video controls playsinline src="${selectedVideoUrl}"></video>`;
  const video = $("#videoPreview video");

  video.addEventListener("loadedmetadata", () => {
    selectedVideoMeta = { duration: video.duration };
  });
}

function loadVideoFromUrl() {
  const url = $("#videoUrl").value.trim();
  const youtubePreview = getYouTubePreview(url);

  if (!url) {
    alert("영상 URL을 붙여넣으세요.");
    return;
  }

  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Unsupported protocol");
    }
  } catch {
    alert("https:// 로 시작하는 올바른 영상 URL을 입력하세요.");
    return;
  }

  if (selectedVideoUrl && selectedVideoMode === "file") {
    URL.revokeObjectURL(selectedVideoUrl);
  }

  selectedVideo = {
    name: url.split("/").pop()?.split("?")[0] || "URL 영상",
    url,
  };
  selectedVideoUrl = url;
  selectedVideoMeta = null;
  selectedVideoMode = youtubePreview ? "youtube" : "url";
  $("#videoFile").value = "";

  if (youtubePreview) {
    $("#videoPreview").innerHTML = `
      <div class="youtube-preview">
        <img src="${escapeHtml(youtubePreview.thumbnailUrl)}" alt="YouTube video thumbnail" />
        <div>
          <strong>YouTube 영상 링크가 등록되었습니다.</strong>
          <p>YouTube 임베드는 영상 설정에 따라 오류 153이 발생할 수 있어 썸네일과 외부 열기로 표시합니다.</p>
          <a class="secondary-action" href="${escapeHtml(youtubePreview.watchUrl)}" target="_blank" rel="noopener noreferrer">YouTube에서 열기</a>
        </div>
      </div>
      <p class="hint">이 링크는 POC 입력값으로 저장됩니다. 정식 AI 분석에는 직접 촬영한 파일 또는 MP4/WebM 원본 URL이 필요합니다.</p>
    `;
    return;
  }

  $("#videoPreview").innerHTML = `
    <video controls playsinline crossorigin="anonymous" src="${escapeHtml(url)}"></video>
    <p class="hint">URL 영상이 로드되었습니다. 재생이 안 되면 해당 서버가 브라우저 재생 또는 외부 접근을 막는 경우입니다.</p>
  `;

  const video = $("#videoPreview video");
  video.addEventListener("loadedmetadata", () => {
    selectedVideoMeta = { duration: video.duration };
  });
  video.addEventListener("error", () => {
    $("#videoPreview").insertAdjacentHTML(
      "beforeend",
      '<p class="hint">이 URL은 직접 재생할 수 없습니다. mp4/webm 원본 링크 또는 파일 업로드를 사용하세요.</p>',
    );
  });
}

function searchFood() {
  const query = $("#foodQuery").value.trim();
  const normalized = normalizeText(query);
  const dog = state.dog;

  if (!query) {
    $("#foodResult").innerHTML = "<p>음식명을 입력하세요.</p>";
    return;
  }

  const rule = foodRules.find((item) =>
    item.names.some((name) => normalized.includes(normalizeText(name))),
  ) || {
    status: "확인 필요",
    level: "unknown",
    detail:
      "POC 기본 데이터에 없는 음식입니다. 새 음식은 수의사 또는 신뢰 가능한 반려동물 안전 DB 확인이 필요합니다.",
  };

  const allergyNote =
    dog?.medicalNotes && normalizeText(dog.medicalNotes).includes(normalized)
      ? "프로필 메모와 관련된 알러지/질환 단서가 있어 급여 전 상담이 필요합니다."
      : "개별 알러지, 질환, 복용 약에 따라 반응이 다를 수 있습니다.";

  $("#foodResult").innerHTML = `
    <h4>${escapeHtml(query)} · ${escapeHtml(rule.status)}</h4>
    <p>${escapeHtml(rule.detail)}</p>
    <p><strong>개인별 주의:</strong> ${escapeHtml(allergyNote)}</p>
    <p class="hint">음식 안전 정보는 일반 참고용입니다. 구토, 설사, 무기력 등 이상 반응이 있으면 병원 상담을 권장합니다.</p>
  `;
}

function showNutritionPreview(dataUrl) {
  $("#nutritionPreview").innerHTML = `<img src="${escapeHtml(dataUrl)}" alt="성분표 미리보기" />`;
}

function showTriageImagePreview(dataUrl, name) {
  $("#triageImagePreview").innerHTML = `
    <img src="${escapeHtml(dataUrl)}" alt="${escapeHtml(name || "문진 첨부 이미지")}" />
    <p class="hint">${escapeHtml(name || "첨부 이미지")}</p>
  `;
}

function normalizeNutritionResult(raw) {
  const riskLevel = normalizeRiskLevel(raw.riskLevel || raw.risk_level || raw.risk);
  return {
    riskLevel,
    summary: String(raw.summary || `성분표 기준 ${riskLabels[riskLevel]} 수준의 영양 위험 신호가 있습니다.`),
    nutritionSignals: normalizeList(raw.nutritionSignals || raw.nutrition_signals, ["성분표 판독 결과가 비어 있습니다."]),
    ingredientsOfConcern: normalizeList(raw.ingredientsOfConcern || raw.ingredients_of_concern, []),
    guaranteedAnalysis: normalizeList(raw.guaranteedAnalysis || raw.guaranteed_analysis, []),
    allergyNotes: normalizeList(raw.allergyNotes || raw.allergy_notes, []),
    recommendations: normalizeList(raw.recommendations || raw.recommendedActions || raw.recommended_actions, [
      "처음 급여할 때는 소량으로 시작하고 구토/설사/가려움 반응을 관찰하세요.",
    ]),
    dogMessage: String(raw.dogMessage || raw.dog_message || "내 몸에 맞는지 천천히 확인해줘."),
    disclaimer:
      raw.disclaimer ||
      "성분표 사진 기반의 영양 위험 신호 안내이며 질병 확정 판단이나 처방을 대체하지 않습니다.",
  };
}

function renderNutritionResult(result) {
  $("#nutritionOutput").innerHTML = `
    <h4>${escapeHtml(riskLabels[result.riskLevel])} · ${escapeHtml(result.summary)}</h4>
    <div class="dog-message">
      <strong>강아지 입장에서 예상되는 말</strong>
      <p>${escapeHtml(result.dogMessage)}</p>
    </div>
    <p><strong>영양 위험 신호</strong></p>
    <ul>${result.nutritionSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ${
      result.ingredientsOfConcern.length
        ? `<p><strong>주의 성분</strong></p><ul>${result.ingredientsOfConcern
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}</ul>`
        : ""
    }
    ${
      result.guaranteedAnalysis.length
        ? `<p><strong>보증성분 해석</strong></p><ul>${result.guaranteedAnalysis
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}</ul>`
        : ""
    }
    ${
      result.allergyNotes.length
        ? `<p><strong>개별 알레르기/질환 메모</strong></p><ul>${result.allergyNotes
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join("")}</ul>`
        : ""
    }
    <p><strong>권장 행동</strong></p>
    <ul>${result.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p class="hint">${escapeHtml(result.disclaimer)}</p>
  `;
}

async function runNutritionAnalysis() {
  if (!requireAuth("성분표 AI 분석을 실행하려면 먼저 로그인하거나 계정을 만드세요.")) {
    return;
  }

  if (!selectedNutritionImageDataUrl) {
    $("#nutritionOutput").innerHTML = '<p class="error-text">먼저 사료 또는 간식 성분표 사진을 선택하세요.</p>';
    return;
  }

  if (!getAiEndpoint()) {
    const message = "쿠폰 인증은 완료되어 있습니다. 실제 LLM 성분표 분석을 실행하려면 AI Worker URL을 저장하고 연결 테스트를 통과해야 합니다.";
    $("#nutritionOutput").innerHTML = `<p class="error-text">${escapeHtml(message)}</p>`;
    goToAiEndpointSetup(message);
    return;
  }

  if (!hasAnalysisAccess(10)) {
    $("#timeCouponStatus").textContent = "AI 분석에 사용할 쿠폰 또는 크레딧이 부족합니다. 메일 인증 쿠폰을 다시 발급하거나 플랜을 선택하세요.";
    switchView("settings");
    return;
  }

  $("#nutritionOutput").innerHTML = "<p>성분표 이미지를 LLM Worker로 보내 영양 위험 신호를 분석하는 중입니다...</p>";

  try {
    const raw = await callAiWorker("/analyze/nutrition-label", {
      dog: state.dog,
      productType: $("#nutritionProductType").value,
      notes: $("#nutritionNotes").value.trim(),
      image: selectedNutritionImageDataUrl,
    });
    const result = normalizeNutritionResult(raw);
    consumeAnalysisAccess(10);
    saveState();
    renderNutritionResult(result);
  } catch (error) {
    $("#nutritionOutput").innerHTML = `
      <p class="error-text">${escapeHtml(error.message)}</p>
      <p class="hint">사진 속 원재료/보증성분 표기가 선명한지 확인하고, AI Worker 설정을 점검하세요.</p>
    `;
  }
}

function getCareQuery() {
  const base = $("#careQuery")?.value.trim();
  if (base) return base;

  const latest = state.analyses[0];
  if (latest?.riskLevel === "VET_RECOMMENDED") return "24시 동물병원 정형외과";
  if (latest?.riskLevel === "CAUTION") return "동물병원 상담";
  return "내 주변 24시 동물병원";
}

function openMap(provider) {
  const query = encodeURIComponent(getCareQuery());
  const url =
    provider === "kakao"
      ? `https://map.kakao.com/link/search/${query}`
      : `https://map.naver.com/p/search/${query}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function useCurrentLocation() {
  const status = $("#locationStatus");
  if (!navigator.geolocation) {
    status.textContent = "이 브라우저에서는 위치 기능을 사용할 수 없습니다.";
    return;
  }

  status.textContent = "현재 위치를 확인하는 중입니다...";
  navigator.geolocation.getCurrentPosition(
    () => {
      $("#careQuery").value = "내 주변 24시 동물병원";
      status.textContent = "위치가 확인되었습니다. 지도 검색 버튼을 눌러 주변 병원을 확인하세요.";
    },
    () => {
      status.textContent = "위치 권한이 거부되었습니다. 지역명 또는 병원 유형을 직접 입력하세요.";
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
  );
}

function exportLocalData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "나아파",
    version: "0.1.0",
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `iknow-dog-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function resetLocalData() {
  const confirmed = window.confirm("이 브라우저에 저장된 프로필, 건강기록, 분석 이력, 게시글을 모두 삭제할까요?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  state = createDefaultState();
  selectedVideo = null;
  selectedVideoMeta = null;
  selectedVideoUrl = null;
  selectedVideoMode = null;
  selectedNutritionImage = null;
  selectedNutritionImageDataUrl = null;
  selectedTriageImageName = "";
  selectedTriageImageDataUrl = null;
  $("#videoPreview").innerHTML = "<p>선택한 영상 미리보기가 여기에 표시됩니다.</p>";
  $("#analysisOutput").innerHTML = "<p>영상과 메모를 입력한 뒤 분석을 시작하세요.</p>";
  $("#triageImagePreview").innerHTML = "<p>첨부한 이미지 미리보기가 표시됩니다.</p>";
  $("#triageOutput").innerHTML = "<p>문진표를 체크하면 응급도, 주요 근거, 감별질환 후보, 병원 전달 문구를 생성합니다.</p>";
  $("#nutritionPreview").innerHTML = "<p>선택한 성분표 사진 미리보기가 표시됩니다.</p>";
  $("#nutritionOutput").innerHTML = "<p>사진을 올리면 단백질/지방/나트륨/첨가물/알레르기 관점에서 위험 신호를 확인합니다.</p>";
  $("#riskBadge").className = "risk-badge idle";
  $("#riskBadge").textContent = "대기";
  renderState();
  switchView("dashboard");
}

function formatDate(value) {
  return new Date(value).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSex(value) {
  if (value === "female") return "여아";
  if (value === "male") return "남아";
  return "미입력";
}

function formatNeutered(value) {
  if (value === "yes") return "예";
  if (value === "no") return "아니오";
  return "미입력";
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function bindEvents() {
  $$(".nav-item, .bottom-item").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  $$("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.jump));
  });

  $("#signupForm").addEventListener("submit", handleSignup);
  $("#loginForm").addEventListener("submit", handleLogin);
  $$("[data-oauth-provider]").forEach((button) => {
    button.addEventListener("click", () => loginWithProvider(button.dataset.oauthProvider));
  });
  $("#logoutButton").addEventListener("click", logout);

  $("#dogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireAuth("반려견 프로필을 저장하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    state.dog = {
      userId: state.currentUser.id,
      name: $("#dogName").value.trim(),
      breed: $("#breed").value.trim(),
      age: $("#age").value,
      weight: $("#weight").value,
      sex: $("#sex").value,
      neutered: $("#neutered").value,
      medicalNotes: $("#medicalNotes").value.trim(),
    };
    saveState();
    switchView("health");
  });

  $("#healthForm").addEventListener("submit", (event) => {
    event.preventDefault();

    if (!requireAuth("건강기록을 저장하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    if (!state.dog) {
      alert("먼저 반려견 프로필을 저장하세요.");
      switchView("profile");
      return;
    }

    if (state.creditsRemaining < 1) {
      alert("건강기록 저장에 필요한 크레딧이 부족합니다.");
      switchView("settings");
      return;
    }

    const log = createHealthLog();
    state.healthLogs = [log, ...state.healthLogs].slice(0, 30);
    state.creditsRemaining = Math.max(0, state.creditsRemaining - 1);
    $("#dailyMemo").value = "";
    $$('input[name="dailySymptom"]').forEach((input) => {
      input.checked = false;
    });
    saveState();
    switchView("analysis");
  });

  $("#clearHealthLogs").addEventListener("click", () => {
    state.healthLogs = [];
    saveState();
  });

  $("#triageImage").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    selectedTriageImageName = file.name;
    $("#triageImagePreview").innerHTML = "<p>이미지를 불러오는 중입니다...</p>";
    try {
      selectedTriageImageDataUrl = await resizeImageFile(file, 1100);
      showTriageImagePreview(selectedTriageImageDataUrl, file.name);
    } catch (error) {
      selectedTriageImageName = "";
      selectedTriageImageDataUrl = null;
      $("#triageImagePreview").innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
    }
  });

  $("#triageForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireAuth("문진표 결과를 저장하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    if (!state.dog) {
      alert("먼저 반려견 프로필을 저장하세요.");
      switchView("profile");
      return;
    }

    const result = createTriageAssessment();
    state.triageAssessments = [result, ...state.triageAssessments].slice(0, 30);
    saveState();
    renderTriageResult(result);
    $("#triageRiskBadge").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#clearTriageForm").addEventListener("click", () => {
    $$('input[name="triageSignal"]').forEach((input) => {
      input.checked = false;
    });
    $("#triageNotes").value = "";
    $("#triageChiefComplaint").value = "unknown";
    $("#triageDuration").value = "minutes";
    $("#triageImage").value = "";
    selectedTriageImageName = "";
    selectedTriageImageDataUrl = null;
    $("#triageImagePreview").innerHTML = "<p>첨부한 이미지 미리보기가 표시됩니다.</p>";
    $("#triageRiskBadge").className = "risk-badge idle";
    $("#triageRiskBadge").textContent = "대기";
    $("#triageOutput").innerHTML = "<p>문진표를 체크하면 응급도, 주요 근거, 감별질환 후보, 병원 전달 문구를 생성합니다.</p>";
  });

  $("#videoFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) {
      $("#videoUrl").value = "";
      showVideoPreview(file);
    }
  });

  $("#loadVideoUrl").addEventListener("click", loadVideoFromUrl);
  $("#useSampleVideoUrl").addEventListener("click", () => {
    $("#videoUrl").value = SAMPLE_VIDEO_URL;
    loadVideoFromUrl();
  });
  $("#videoUrl").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loadVideoFromUrl();
    }
  });

  $("#analysisForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await runRealVideoAnalysis();
  });

  $("#runSampleAnalysis").addEventListener("click", () => {
    if (!requireAuth("샘플 리포트를 분석 이력에 저장하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    const result = createSampleDatasetReport();
    state.analyses = [result, ...state.analyses].slice(0, 20);
    saveState();
    renderAnalysisResult(result);
  });

  $("#searchFood").addEventListener("click", searchFood);
  $("#foodQuery").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchFood();
    }
  });

  $("#nutritionImage").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    selectedNutritionImage = file;
    $("#nutritionPreview").innerHTML = "<p>이미지를 불러오는 중입니다...</p>";
    try {
      selectedNutritionImageDataUrl = await resizeImageFile(file);
      showNutritionPreview(selectedNutritionImageDataUrl);
    } catch (error) {
      selectedNutritionImage = null;
      selectedNutritionImageDataUrl = null;
      $("#nutritionPreview").innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
    }
  });

  $("#loadNutritionImageUrl").addEventListener("click", async () => {
    const url = $("#nutritionImageUrl").value.trim();
    if (!url) {
      $("#nutritionOutput").innerHTML = '<p class="error-text">성분표 이미지 URL을 입력하세요.</p>';
      return;
    }

    $("#nutritionPreview").innerHTML = "<p>웹 이미지 파일을 내려받는 중입니다...</p>";
    try {
      await loadNutritionImageFromUrl(url);
      $("#nutritionOutput").innerHTML = "<p>이미지를 불러왔습니다. AI Worker 연결 후 성분표 위험 신호 분석을 실행하세요.</p>";
    } catch (error) {
      selectedNutritionImage = null;
      selectedNutritionImageDataUrl = null;
      $("#nutritionPreview").innerHTML = "<p>선택한 성분표 사진 미리보기가 표시됩니다.</p>";
      $("#nutritionOutput").innerHTML = `
        <p class="error-text">${escapeHtml(error.message)}</p>
        <p class="hint">외부 사이트가 CORS를 막으면 브라우저에서 직접 다운로드할 수 없습니다. 샘플 버튼 또는 파일 업로드를 사용하세요.</p>
      `;
    }
  });

  $("#useSampleNutritionImage").addEventListener("click", async () => {
    $("#nutritionImageUrl").value = new URL(SAMPLE_NUTRITION_LABEL_URL, window.location.href).href;
    $("#nutritionPreview").innerHTML = "<p>샘플 성분표 이미지를 불러오는 중입니다...</p>";
    try {
      await loadNutritionImageFromUrl(SAMPLE_NUTRITION_LABEL_URL);
      $("#nutritionOutput").innerHTML = "<p>샘플 성분표 이미지를 불러왔습니다. AI Worker 연결 후 분석을 실행하세요.</p>";
    } catch (error) {
      $("#nutritionOutput").innerHTML = `<p class="error-text">${escapeHtml(error.message)}</p>`;
    }
  });

  $("#analyzeNutritionImage").addEventListener("click", runNutritionAnalysis);

  $("#copyReport").addEventListener("click", async () => {
    try {
      await copyToClipboard($("#vetReport").textContent);
      $("#copyReport").textContent = "복사됨";
      setTimeout(() => {
        $("#copyReport").textContent = "복사";
      }, 1200);
    } catch {
      alert("브라우저에서 복사를 허용하지 않았습니다.");
    }
  });

  $("#openNaverMap").addEventListener("click", () => openMap("naver"));
  $("#openKakaoMap").addEventListener("click", () => openMap("kakao"));
  $("#useCurrentLocation").addEventListener("click", useCurrentLocation);
  $("#careQuery").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      openMap("naver");
    }
  });

  $("#communityForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!requireAuth("커뮤니티 글을 저장하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    const body = $("#postBody").value.trim();
    if (!body) return;

    state.communityPosts = [
      {
        id: makeId(),
        userId: state.currentUser.id,
        createdAt: new Date().toISOString(),
        topic: $("#postTopic").value,
        body,
      },
      ...state.communityPosts,
    ].slice(0, 20);
    $("#postBody").value = "";
    saveState();
  });

  $("#clearCommunity").addEventListener("click", () => {
    state.communityPosts = [];
    saveState();
  });

  $("#exportData").addEventListener("click", exportLocalData);
  $("#resetData").addEventListener("click", resetLocalData);

  $("#clearHistory").addEventListener("click", () => {
    state.analyses = [];
    saveState();
  });

  $("#redeemCoupon").addEventListener("click", () => {
    if (!requireAuth("쿠폰을 등록하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    const code = $("#couponCode").value.trim().toUpperCase();

    if (code !== "WELCOME3000") {
      $("#couponMessage").textContent = "등록되지 않은 쿠폰입니다.";
      return;
    }

    if (state.redeemedCoupons.includes(code)) {
      $("#couponMessage").textContent = "이미 사용한 쿠폰입니다.";
      return;
    }

    state.plan = "basic";
    state.creditsRemaining = plans.basic.credits;
    state.redeemedCoupons.push(code);
    $("#couponMessage").textContent = "Basic 1개월 무료 크레딧이 적용되었습니다.";
    saveState();
  });

  $("#sendEmailCode").addEventListener("click", () => {
    if (!requireAuth("메일 인증 쿠폰을 받으려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    const email = $("#emailInput").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#timeCouponStatus").textContent = "올바른 이메일 주소를 입력하세요.";
      return;
    }

    const code = generateCode();
    state.emailVerification = {
      userId: state.currentUser.id,
      email,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    };
    $("#mailPreview").hidden = false;
    $("#mailPreview").innerHTML = `
      <strong>베타 메일 미리보기</strong>
      <p>${escapeHtml(email)} 주소로 인증코드를 보냈다고 가정합니다.</p>
      <p class="mail-code">${escapeHtml(code)}</p>
      <p class="hint">정식 배포에서는 Resend/SendGrid 같은 메일 API를 Worker에 연결합니다.</p>
    `;
    saveState();
    $("#timeCouponStatus").textContent = "인증코드를 확인하고 10분 안에 입력하세요.";
  });

  $("#verifyEmailCode").addEventListener("click", () => {
    if (!requireAuth("메일 인증 쿠폰을 활성화하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    const verification = state.emailVerification;
    const code = $("#emailCodeInput").value.trim();
    if (!verification || new Date(verification.expiresAt).getTime() < Date.now()) {
      $("#timeCouponStatus").textContent = "인증코드가 없거나 만료되었습니다. 다시 발급하세요.";
      return;
    }

    if (verification.userId && verification.userId !== state.currentUser.id) {
      $("#timeCouponStatus").textContent = "현재 로그인 계정과 인증코드를 받은 계정이 다릅니다.";
      return;
    }

    if (verification.code !== code) {
      $("#timeCouponStatus").textContent = "인증코드가 일치하지 않습니다.";
      return;
    }

    state.timeCoupon = {
      userId: state.currentUser.id,
      email: verification.email,
      usesRemaining: 5,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    };
    state.emailVerification = null;
    $("#emailCodeInput").value = "";
    $("#mailPreview").hidden = true;
    saveState();
  });

  $("#saveAiEndpoint").addEventListener("click", () => {
    const value = $("#aiEndpoint").value.trim().replace(/\/+$/, "");
    if (value) {
      try {
        const parsed = new URL(value);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("bad protocol");
      } catch {
        $("#aiEndpointStatus").textContent = "https:// 로 시작하는 올바른 Worker URL을 입력하세요.";
        return;
      }
    }

    state.aiEndpoint = value;
    saveState();
  });

  $("#testAiEndpoint").addEventListener("click", testAiEndpoint);

  $("#copyPocUrl").addEventListener("click", async () => {
    try {
      await copyToClipboard(POC_APP_URL);
      $("#aiEndpointStatus").textContent = "POC URL을 복사했습니다.";
    } catch {
      $("#aiEndpointStatus").textContent = POC_APP_URL;
    }
  });

  $("#plans").addEventListener("click", (event) => {
    const target = event.target.closest("[data-plan]");
    if (!target) return;

    const planKey = target.dataset.plan;
    if (!requireAuth("요금제를 변경하려면 먼저 로그인하거나 계정을 만드세요.")) {
      return;
    }

    state.plan = planKey;
    state.creditsRemaining = plans[planKey].credits;
    saveState();
  });

  $("#installButton").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $("#installButton").hidden = true;
  });
}

function registerPwa() {
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    $("#installButton").hidden = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTriageQuestions();
  bindEvents();
  renderState();
  const initialView = getViewFromHash();
  if (initialView) switchView(initialView, false);
  requestAnimationFrame(() => {
    const main = $(".main");
    if (main) main.scrollTo({ top: 0, behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });
  });
  window.addEventListener("hashchange", () => {
    const viewId = getViewFromHash();
    if (viewId) switchView(viewId, false);
  });
  registerPwa();
});
