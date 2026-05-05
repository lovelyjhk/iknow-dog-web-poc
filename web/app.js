const STORAGE_KEY = "iknow-web-poc-state-v3";
const LEGACY_KEYS = ["iknow-web-poc-state-v2", "iknow-web-poc-state"];
const SAMPLE_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

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
  redeemedCoupons: [],
};

let state = loadState();
let selectedVideo = null;
let selectedVideoMeta = null;
let selectedVideoUrl = null;
let selectedVideoMode = null;
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function makeId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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

function loadState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = LEGACY_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    const parsed = current ? JSON.parse(current) : legacy ? JSON.parse(legacy) : {};
    const next = { ...defaultState, ...parsed };

    next.plan = plans[next.plan] ? next.plan : "free";
    next.creditsRemaining = Number.isFinite(Number(next.creditsRemaining))
      ? Number(next.creditsRemaining)
      : plans[next.plan].credits;
    next.healthLogs = Array.isArray(next.healthLogs) ? next.healthLogs : [];
    next.analyses = Array.isArray(next.analyses) ? next.analyses : [];
    next.redeemedCoupons = Array.isArray(next.redeemedCoupons) ? next.redeemedCoupons : [];

    return next;
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderState();
}

function switchView(viewId) {
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

  if (viewId === "report") renderVetReport();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderState() {
  const plan = plans[state.plan] || plans.free;
  const planCredits = Math.max(plan.credits, 1);
  const creditPercent = Math.max(0, Math.min(100, (state.creditsRemaining / planCredits) * 100));

  $("#currentPlanName").textContent = plan.name;
  $("#creditCount").textContent = `${state.creditsRemaining} credits`;
  $("#creditMeter").style.width = `${creditPercent}%`;

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
  renderHealthLogs();
  renderHistory();
  renderPlans();
  renderVetReport();
}

function renderLatest() {
  const latestAnalysis = state.analyses[0];
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
  const recentLogs = state.healthLogs.slice(0, 5);

  if (!dog) {
    report.textContent = "반려견 프로필을 먼저 저장하면 병원 상담 리포트를 생성할 수 있습니다.";
    return;
  }

  const latestAnalysisLines = latestAnalysis
    ? [
        `위험도: ${riskLabels[latestAnalysis.riskLevel]}`,
        `요약: ${latestAnalysis.summary}`,
        `관찰 신호: ${latestAnalysis.observedSignals.join(", ")}`,
        `권장 행동: ${latestAnalysis.recommendations.join(" / ")}`,
        `수의사 상담 권장: ${latestAnalysis.vetConsultationRecommended ? "예" : "현재는 관찰 우선"}`,
      ]
    : ["영상 분석 없음"];

  const recentLogLines = recentLogs.length
    ? recentLogs.map((log) => `- ${formatDate(log.createdAt)} | ${riskLabels[log.riskLevel]} | ${log.summary}`)
    : ["- 기록 없음"];

  const lines = [
    "말하지 않아도 알아요 - 병원 상담 전 리포트",
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
    createdAt: new Date().toISOString(),
    riskLevel,
    summary: summaryByRisk[riskLevel],
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

function renderAnalysisResult(result) {
  const badge = $("#riskBadge");
  badge.className = `risk-badge ${result.riskLevel}`;
  badge.textContent = riskLabels[result.riskLevel];

  $("#analysisOutput").innerHTML = `
    <h4>${escapeHtml(result.summary)}</h4>
    <p><strong>수의사 상담 권장:</strong> ${result.vetConsultationRecommended ? "예" : "현재는 관찰 우선"}</p>
    <p><strong>관찰된 신호</strong></p>
    <ul>${result.observedSignals.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>권장 행동</strong></p>
    <ul>${result.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p class="hint">${escapeHtml(result.disclaimer)}</p>
  `;
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
  selectedVideoMode = "url";
  $("#videoFile").value = "";
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

  $("#dogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.dog = {
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

    if (!state.dog) {
      alert("먼저 반려견 프로필을 저장하세요.");
      switchView("profile");
      return;
    }

    if (!selectedVideo) {
      alert("분석할 영상을 선택하세요.");
      return;
    }

    if (state.creditsRemaining < 10) {
      alert("영상 분석에 필요한 크레딧이 부족합니다.");
      switchView("settings");
      return;
    }

    $("#riskBadge").className = "risk-badge idle";
    $("#riskBadge").textContent = "분석 중";
    $("#analysisOutput").innerHTML =
      "<p>영상 프레임, 최근 건강기록, 보호자 메모를 함께 분석하는 중입니다...</p>";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = createAnalysis({
      symptoms: collectSymptoms("symptom"),
      ownerNote: $("#ownerNote").value.trim(),
      videoType: $("#videoType").value,
    });

    state.creditsRemaining = Math.max(0, state.creditsRemaining - 10);
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

  $("#clearHistory").addEventListener("click", () => {
    state.analyses = [];
    saveState();
  });

  $("#redeemCoupon").addEventListener("click", () => {
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

  $("#plans").addEventListener("click", (event) => {
    const target = event.target.closest("[data-plan]");
    if (!target) return;

    const planKey = target.dataset.plan;
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
  bindEvents();
  renderState();
  registerPwa();
});
