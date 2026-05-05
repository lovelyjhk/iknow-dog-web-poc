const STORAGE_KEY = "iknow-web-poc-state";

const plans = {
  free: { name: "Free", price: 0, credits: 10, description: "체험용 분석 1회 수준" },
  basic: { name: "Basic", price: 3000, credits: 40, description: "월 사용량 40% 수준" },
  plus: { name: "Plus", price: 5000, credits: 70, description: "월 사용량 70% 수준" },
  unlimited: { name: "Unlimited", price: 6000, credits: 200, description: "Fair Use 기반 확장 사용" },
};

const riskLabels = {
  NORMAL: "정상",
  WATCH: "주의 관찰",
  CAUTION: "주의",
  VET_RECOMMENDED: "병원 상담 권장",
  EMERGENCY: "응급 가능성",
};

const defaultState = {
  plan: "free",
  creditsRemaining: 10,
  dog: null,
  analyses: [],
  redeemedCoupons: [],
};

let state = loadState();
let selectedVideo = null;
let selectedVideoMeta = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderState();
}

function switchView(viewId) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  const activeButton = $(`.nav-item[data-view="${viewId}"]`);
  $("#pageTitle").textContent = activeButton ? activeButton.textContent : "대시보드";
}

function renderState() {
  const plan = plans[state.plan] || plans.free;
  $("#currentPlanName").textContent = plan.name;
  $("#creditCount").textContent = `${state.creditsRemaining} credits`;
  const percent = Math.max(0, Math.min(100, (state.creditsRemaining / plan.credits) * 100));
  $("#creditMeter").style.width = `${percent}%`;

  if (state.dog) {
    $("#dogName").value = state.dog.name || "";
    $("#breed").value = state.dog.breed || "";
    $("#age").value = state.dog.age || "";
    $("#weight").value = state.dog.weight || "";
    $("#sex").value = state.dog.sex || "unknown";
    $("#neutered").value = state.dog.neutered || "unknown";
    $("#medicalNotes").value = state.dog.medicalNotes || "";
    $("#profileState").textContent = "저장됨";
  }

  renderLatest();
  renderHistory();
  renderPlans();
}

function renderLatest() {
  const latest = state.analyses[0];
  if (!latest) {
    $("#latestRisk").textContent = "아직 분석 없음";
    $("#latestSummary").textContent = "반려견 프로필을 등록하고 첫 영상을 분석해보세요.";
    return;
  }

  $("#latestRisk").textContent = riskLabels[latest.riskLevel];
  $("#latestSummary").textContent = latest.summary;
}

function renderHistory() {
  const list = $("#historyList");
  if (!state.analyses.length) {
    list.innerHTML = `<p class="hint">아직 분석 이력이 없습니다.</p>`;
    return;
  }

  list.innerHTML = state.analyses
    .map(
      (item) => `
        <article class="history-item">
          <header>
            <strong>${riskLabels[item.riskLevel]}</strong>
            <span>${new Date(item.createdAt).toLocaleString("ko-KR")}</span>
          </header>
          <p>${item.summary}</p>
          <small>${item.videoName || "영상 파일"} · ${item.videoTypeLabel}</small>
        </article>
      `,
    )
    .join("");
}

function renderPlans() {
  $("#plans").innerHTML = Object.entries(plans)
    .map(([key, plan]) => {
      const active = key === state.plan;
      return `
        <div class="plan-card ${active ? "active-plan" : ""}">
          <strong>${plan.name} · ${plan.price.toLocaleString("ko-KR")}원</strong>
          <span>${plan.credits} credits / month</span>
          <p class="hint">${plan.description}</p>
          <button class="${active ? "secondary-action" : "primary-action"} small" data-plan="${key}">
            ${active ? "사용 중" : "이 플랜으로 변경"}
          </button>
        </div>
      `;
    })
    .join("");
}

function collectSymptoms() {
  return $$('input[name="symptom"]:checked').map((input) => input.value);
}

function createAnalysis({ symptoms, ownerNote, videoType }) {
  const note = ownerNote.toLowerCase();
  let score = 0;
  const signals = [];

  const dog = state.dog || {};
  const age = Number(dog.age || 0);

  if (symptoms.includes("limping") || note.includes("절뚝") || note.includes("다리")) {
    score += 3;
    signals.push("보행 균형 저하 가능성");
  }

  if (symptoms.includes("pain") || note.includes("통증") || note.includes("낑")) {
    score += 3;
    signals.push("통증 반응 가능성");
  }

  if (symptoms.includes("coughing") || note.includes("기침") || note.includes("켁")) {
    score += 2;
    signals.push("호흡기 이상 신호 가능성");
  }

  if (symptoms.includes("vomiting") || symptoms.includes("diarrhea")) {
    score += 2;
    signals.push("소화기 이상 신호 가능성");
  }

  if (symptoms.includes("low_energy") || note.includes("무기력")) {
    score += 2;
    signals.push("활동량 저하");
  }

  if (age >= 8) {
    score += 1;
    signals.push("노령견 주의 요소");
  }

  if (selectedVideoMeta?.duration && selectedVideoMeta.duration > 60) {
    score += 1;
    signals.push("권장 길이 초과 영상");
  }

  const riskLevel =
    score >= 8 ? "VET_RECOMMENDED" : score >= 5 ? "CAUTION" : score >= 2 ? "WATCH" : "NORMAL";

  const dogName = dog.name || "반려견";
  const summaryByRisk = {
    NORMAL: `${dogName}의 입력 기록에서 뚜렷한 고위험 신호는 확인되지 않았습니다. 현재 상태를 계속 기록해 주세요.`,
    WATCH: `${dogName}에게 일부 관찰이 필요한 신호가 있습니다. 같은 증상이 반복되는지 24시간 정도 확인해 주세요.`,
    CAUTION: `${dogName}의 기록에서 여러 이상 신호가 함께 확인됩니다. 무리한 활동을 줄이고 상태 변화를 자세히 기록하세요.`,
    VET_RECOMMENDED: `${dogName}의 기록에서 병원 상담을 권장할 만한 신호가 확인됩니다. 가능한 빠르게 수의사 상담을 준비하세요.`,
  };

  const recommendations = [
    "무리한 산책, 계단, 점프를 줄이고 안정 상태를 관찰하세요.",
    "증상이 반복되는 시간, 상황, 움직임을 짧게 기록하세요.",
    riskLevel === "NORMAL"
      ? "내일도 식사, 배변, 활동량을 이어서 기록하세요."
      : "절뚝거림, 통증 반응, 호흡 곤란, 반복 구토가 있으면 동물병원 상담을 권장합니다.",
  ];

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    riskLevel,
    summary: summaryByRisk[riskLevel],
    observedSignals: signals.length ? signals : ["특이 신호 없음"],
    recommendations,
    vetConsultationRecommended: ["CAUTION", "VET_RECOMMENDED", "EMERGENCY"].includes(riskLevel),
    videoName: selectedVideo?.name,
    videoType,
    videoTypeLabel: $("#videoType").selectedOptions[0].textContent,
    ownerNote,
    disclaimer:
      "이 분석은 질병의 확정 진단이 아니며 수의사의 진료를 대체하지 않습니다. 이상 증상이 지속되면 동물병원에 방문하세요.",
  };
}

function renderAnalysisResult(result) {
  const badge = $("#riskBadge");
  badge.className = `risk-badge ${result.riskLevel}`;
  badge.textContent = riskLabels[result.riskLevel];

  $("#analysisOutput").innerHTML = `
    <h4>${result.summary}</h4>
    <p><strong>병원 상담 권장:</strong> ${result.vetConsultationRecommended ? "예" : "현재는 관찰 우선"}</p>
    <p><strong>관찰된 신호</strong></p>
    <ul>${result.observedSignals.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p><strong>권장 행동</strong></p>
    <ul>${result.recommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p class="hint">${result.disclaimer}</p>
  `;
}

function showVideoPreview(file) {
  selectedVideo = file;
  selectedVideoMeta = null;
  const url = URL.createObjectURL(file);
  $("#videoPreview").innerHTML = `<video controls src="${url}"></video>`;
  const video = $("#videoPreview video");
  video.addEventListener("loadedmetadata", () => {
    selectedVideoMeta = { duration: video.duration };
  });
}

function bindEvents() {
  $$(".nav-item").forEach((button) => {
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
    $("#profileState").textContent = "저장됨";
    saveState();
    switchView("analysis");
  });

  $("#videoFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) showVideoPreview(file);
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
    $("#analysisOutput").innerHTML = `<p>영상 프레임과 보호자 메모를 분석하는 중입니다...</p>`;

    await new Promise((resolve) => setTimeout(resolve, 1300));

    const result = createAnalysis({
      symptoms: collectSymptoms(),
      ownerNote: $("#ownerNote").value.trim(),
      videoType: $("#videoType").value,
    });

    state.creditsRemaining -= 10;
    state.analyses = [result, ...state.analyses].slice(0, 20);
    saveState();
    renderAnalysisResult(result);
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
}

bindEvents();
renderState();
