(function () {
  const questionGroups = [
    {
      key: "vitals",
      label: "생명 징후",
      questions: [
        ["collapse", "쓰러졌거나 반응이 거의 없음", 6],
        ["pale_gums", "잇몸이 창백하거나 회색빛임", 5],
        ["blue_gums", "잇몸/혀가 파랗거나 보라빛임", 7],
        ["labored_breathing", "숨쉬기 힘들어 보이거나 배로 호흡함", 7],
        ["respiratory_rate_high", "가만히 있어도 호흡수가 매우 빠름", 4],
        ["heart_rate_weak_fast", "맥이 약하고 빠르거나 심하게 떨림", 5],
        ["fever_high", "고열이 의심됨", 4],
        ["hypothermia", "몸이 차갑고 축 처짐", 5],
        ["severe_pain", "만지면 심하게 아파하거나 비명", 5],
        ["sudden_onset", "증상이 갑자기 시작됨", 3],
      ],
    },
    {
      key: "gi",
      label: "구토/복부/소화기",
      questions: [
        ["nonproductive_retching", "토하려고 하지만 거의 나오지 않음", 7],
        ["repeated_vomiting", "짧은 시간에 반복 구토", 5],
        ["vomit_blood", "토사물에 피가 섞임", 6],
        ["diarrhea_blood", "설사에 피가 섞임", 5],
        ["distended_abdomen", "배가 갑자기 부풀거나 팽팽함", 7],
        ["tight_painful_abdomen", "복부가 딱딱하고 만지면 아파함", 6],
        ["drooling", "침을 과하게 흘림", 3],
        ["restlessness_pacing", "안절부절 못하고 계속 서성임", 3],
        ["prayer_position", "앞다리를 낮추고 엉덩이를 드는 자세", 4],
        ["abdominal_noise", "복부에서 평소와 다른 소리/가스가 많음", 1],
        ["not_eating", "식욕이 거의 없음", 2],
        ["water_cannot_keep", "물을 마셔도 토함", 5],
        ["foreign_body_access", "장난감/뼈/이물질을 삼켰을 가능성", 5],
        ["string_fabric_access", "실/천/양말 등을 삼켰을 가능성", 5],
        ["black_stool", "검은 변 또는 타르 같은 변", 5],
        ["weight_loss", "최근 체중 감소가 뚜렷함", 2],
      ],
    },
    {
      key: "neuro",
      label: "신경/의식",
      questions: [
        ["seizure", "발작을 했음", 6],
        ["seizure_over_5", "발작이 5분 이상 지속", 8],
        ["multiple_seizures", "하루에 발작이 반복됨", 7],
        ["disorientation", "방향감각이 없거나 멍함", 4],
        ["head_tilt", "머리가 한쪽으로 기울어짐", 3],
        ["ataxia", "비틀거리거나 균형을 못 잡음", 4],
        ["unable_stand", "서거나 걷지 못함", 6],
        ["tremors", "떨림이 심함", 3],
        ["sudden_blindness", "갑자기 앞을 못 보는 듯함", 5],
        ["unequal_pupils", "양쪽 동공 크기가 다름", 5],
        ["severe_lethargy", "평소와 다르게 극심하게 무기력함", 5],
        ["behavior_change", "공격성/숨기/불안 등 행동이 급변함", 2],
      ],
    },
    {
      key: "trauma",
      label: "외상/출혈/쇼크",
      questions: [
        ["car_accident", "차 사고 또는 큰 충격 가능성", 8],
        ["fall", "높은 곳에서 떨어짐", 6],
        ["bite_wound", "물림/찢김 상처가 있음", 4],
        ["bleeding_uncontrolled", "피가 멈추지 않음", 7],
        ["swelling_fast", "부기가 빠르게 커짐", 5],
        ["limb_not_weight", "다리를 전혀 딛지 못함", 4],
        ["open_fracture", "뼈가 보이거나 골절이 의심됨", 8],
        ["abdominal_trauma", "배를 부딪혔거나 복부 외상 가능성", 6],
        ["chest_trauma", "가슴을 부딪혔거나 흉부 외상 가능성", 7],
        ["shock_cool_limbs", "귀/발끝이 차갑고 기운이 없음", 6],
        ["pain_when_touched", "특정 부위를 만지면 강하게 피함", 3],
        ["wound_discharge", "상처에서 고름/악취가 남", 2],
      ],
    },
    {
      key: "urinary_repro",
      label: "비뇨기/생식기",
      questions: [
        ["cannot_urinate", "소변을 보려고 하지만 나오지 않음", 7],
        ["straining_urine", "소변 자세를 자주 취하고 힘줌", 5],
        ["blood_urine", "소변에 피가 보임", 4],
        ["frequent_urination", "소변을 매우 자주 봄", 2],
        ["drinking_more", "물을 갑자기 많이 마심", 2],
        ["male_small_breed", "수컷 또는 요로문제 위험이 높은 체형", 2],
        ["pregnant_labor_problem", "임신/분만 중 이상이 있음", 7],
        ["vaginal_discharge", "생식기 분비물/고름이 보임", 4],
        ["swollen_mammary_pain", "유선이 붓고 아파함", 3],
        ["intact_female_lethargy", "중성화하지 않은 암컷이 무기력함", 3],
      ],
    },
    {
      key: "toxin_heat",
      label: "중독/열사병/알레르기",
      questions: [
        ["toxin_access", "독성 물질을 먹었을 가능성", 7],
        ["chocolate_xylitol_grape", "초콜릿/자일리톨/포도 섭취 가능성", 7],
        ["medication_access", "사람 약/동물 약을 잘못 먹었을 가능성", 7],
        ["plant_chemical_access", "식물/세제/살충제 접촉 또는 섭취", 5],
        ["heat_exposure", "더운 곳에 오래 있었거나 차 안에 있었음", 6],
        ["body_temp_high", "체온이 매우 높아 보임", 6],
        ["excessive_panting_heat", "과도한 헐떡임과 침흘림", 5],
        ["hypoglycemia_puppy", "어린 강아지가 떨고 축 처짐", 5],
        ["diabetes_history", "당뇨/내분비 질환 병력이 있음", 2],
        ["collapse_after_exercise", "운동 직후 쓰러지거나 휘청임", 6],
        ["swollen_face", "얼굴/입 주변이 갑자기 부음", 5],
        ["hives", "두드러기처럼 피부가 갑자기 올라옴", 4],
      ],
    },
    {
      key: "resp_heart",
      label: "호흡기/심장",
      questions: [
        ["cough_persistent", "기침이 계속됨", 2],
        ["cough_with_collapse", "기침 후 쓰러지거나 힘이 빠짐", 6],
        ["exercise_intolerance", "조금만 움직여도 힘들어함", 3],
        ["open_mouth_breathing", "입을 벌리고 힘들게 호흡함", 7],
        ["noisy_breathing", "쌕쌕/거친 호흡음", 4],
        ["nasal_discharge", "콧물/코피/코막힘이 있음", 2],
        ["choking_episode", "목에 걸린 듯 캑캑거림", 5],
        ["known_heart_disease", "심장병 병력이 있음", 3],
        ["resting_resp_high_sleep", "자는 중 호흡수가 평소보다 높음", 4],
        ["cannot_lie_down", "누우면 힘들어하고 앉아 있으려 함", 5],
      ],
    },
    {
      key: "msk_eye_skin",
      label: "보행/피부/눈",
      questions: [
        ["lameness_acute", "갑자기 절뚝거림", 3],
        ["lameness_chronic", "절뚝거림이 반복됨", 2],
        ["joint_swelling", "관절이 붓거나 열감이 있음", 3],
        ["back_pain", "허리 통증/등을 굽힘", 4],
        ["neck_pain", "목을 잘 못 움직임", 4],
        ["dragging_legs", "다리를 끌거나 마비처럼 보임", 6],
        ["paw_injury", "발바닥/발톱 상처가 보임", 2],
        ["ear_pain", "귀를 털거나 만지면 아파함", 1],
        ["skin_hot_spot", "피부가 빨갛고 진물/열감이 있음", 1],
        ["itching_severe", "긁음/핥음이 매우 심함", 1],
        ["eye_red", "눈이 심하게 빨감", 3],
        ["eye_closed", "눈을 못 뜨거나 찡그림", 4],
        ["eye_cloudy", "눈이 갑자기 뿌옇게 보임", 5],
        ["sudden_skin_lump", "혹/부기가 갑자기 생김", 2],
      ],
    },
    {
      key: "context",
      label: "상황/병력",
      questions: [
        ["recent_surgery", "최근 수술/마취를 받음", 4],
        ["vaccine_recent", "최근 백신/주사를 맞음", 2],
        ["chronic_kidney", "신장/간/면역 질환 병력이 있음", 2],
        ["owner_feels_emergency", "보호자가 평소와 다르게 매우 위험하다고 느낌", 4],
      ],
    },
  ];

  const questions = questionGroups.flatMap((group) =>
    group.questions.map(([id, label, emergencyWeight]) => ({ id, label, emergencyWeight, group: group.key })),
  );

  const conditionLabels = {
    gdv_bloat: "위확장-염전(GDV) 응급 가능성",
    gi_obstruction: "위장관 폐색/이물 가능성",
    pancreatitis_gastro: "췌장염/급성 위장염 가능성",
    respiratory_distress: "호흡곤란/흉부 응급 가능성",
    toxin: "중독/독성 섭취 가능성",
    trauma_internal: "외상/내부출혈/쇼크 가능성",
    urinary_obstruction: "요로폐색/비뇨기 응급 가능성",
    heatstroke: "열사병/고체온 가능성",
    anaphylaxis: "급성 알레르기/아나필락시스 가능성",
    neuro_seizure: "발작/신경계 응급 가능성",
    orthopedic_spine: "정형외과/척추 통증 가능성",
    eye_emergency: "안과 응급 가능성",
    pyometra_repro: "자궁축농증/생식기 응급 가능성",
    cardiac_collapse: "심장성 실신/순환 문제 가능성",
  };

  const conditions = {
    gdv_bloat: {
      prior: 1.0,
      weights: {
        nonproductive_retching: 8,
        distended_abdomen: 9,
        tight_painful_abdomen: 7,
        restlessness_pacing: 4,
        drooling: 4,
        collapse: 5,
        pale_gums: 4,
        shock_cool_limbs: 5,
        sudden_onset: 3,
      },
    },
    gi_obstruction: {
      prior: 1.2,
      weights: {
        repeated_vomiting: 5,
        water_cannot_keep: 5,
        foreign_body_access: 7,
        string_fabric_access: 7,
        tight_painful_abdomen: 5,
        not_eating: 3,
        black_stool: 3,
        severe_lethargy: 3,
      },
    },
    pancreatitis_gastro: {
      prior: 1.5,
      weights: {
        repeated_vomiting: 5,
        diarrhea_blood: 3,
        prayer_position: 5,
        tight_painful_abdomen: 4,
        not_eating: 3,
        fever_high: 2,
        water_cannot_keep: 3,
      },
    },
    respiratory_distress: {
      prior: 1.0,
      weights: {
        labored_breathing: 8,
        blue_gums: 9,
        open_mouth_breathing: 8,
        cannot_lie_down: 6,
        noisy_breathing: 4,
        resting_resp_high_sleep: 5,
        choking_episode: 5,
        chest_trauma: 5,
      },
    },
    toxin: {
      prior: 1.0,
      weights: {
        toxin_access: 8,
        chocolate_xylitol_grape: 8,
        medication_access: 8,
        plant_chemical_access: 6,
        seizure: 4,
        tremors: 4,
        repeated_vomiting: 3,
        diarrhea_blood: 3,
      },
    },
    trauma_internal: {
      prior: 1.0,
      weights: {
        car_accident: 9,
        fall: 7,
        bleeding_uncontrolled: 7,
        pale_gums: 6,
        collapse: 6,
        abdominal_trauma: 6,
        chest_trauma: 6,
        shock_cool_limbs: 6,
        open_fracture: 5,
        severe_pain: 4,
      },
    },
    urinary_obstruction: {
      prior: 0.9,
      weights: {
        cannot_urinate: 9,
        straining_urine: 6,
        blood_urine: 4,
        male_small_breed: 3,
        severe_pain: 3,
        severe_lethargy: 3,
        not_eating: 2,
      },
    },
    heatstroke: {
      prior: 0.8,
      weights: {
        heat_exposure: 8,
        body_temp_high: 8,
        excessive_panting_heat: 6,
        collapse: 5,
        seizure: 4,
        diarrhea_blood: 3,
        blue_gums: 3,
      },
    },
    anaphylaxis: {
      prior: 0.8,
      weights: {
        swollen_face: 7,
        hives: 6,
        labored_breathing: 5,
        collapse: 5,
        vaccine_recent: 3,
        repeated_vomiting: 2,
      },
    },
    neuro_seizure: {
      prior: 1.0,
      weights: {
        seizure: 6,
        seizure_over_5: 9,
        multiple_seizures: 8,
        disorientation: 4,
        ataxia: 4,
        unable_stand: 5,
        tremors: 4,
        unequal_pupils: 5,
        sudden_blindness: 4,
      },
    },
    orthopedic_spine: {
      prior: 1.2,
      weights: {
        lameness_acute: 5,
        lameness_chronic: 3,
        limb_not_weight: 5,
        joint_swelling: 4,
        back_pain: 5,
        neck_pain: 5,
        dragging_legs: 7,
        open_fracture: 6,
        severe_pain: 4,
      },
    },
    eye_emergency: {
      prior: 0.7,
      weights: {
        eye_red: 4,
        eye_closed: 6,
        eye_cloudy: 7,
        sudden_blindness: 7,
        unequal_pupils: 4,
      },
    },
    pyometra_repro: {
      prior: 0.7,
      weights: {
        intact_female_lethargy: 5,
        vaginal_discharge: 6,
        drinking_more: 4,
        fever_high: 3,
        not_eating: 3,
        severe_lethargy: 4,
      },
    },
    cardiac_collapse: {
      prior: 0.9,
      weights: {
        collapse: 6,
        cough_with_collapse: 6,
        known_heart_disease: 5,
        exercise_intolerance: 4,
        resting_resp_high_sleep: 4,
        cannot_lie_down: 4,
        pale_gums: 4,
        blue_gums: 5,
      },
    },
  };

  function selectedWeight(selected, id) {
    const question = questions.find((item) => item.id === id);
    return selected.has(id) && question ? question.emergencyWeight : 0;
  }

  function hasAny(selected, ids) {
    return ids.some((id) => selected.has(id));
  }

  function addContextModifiers(scores, dog = {}) {
    const weight = Number(dog.weight || 0);
    const age = Number(dog.age || 0);
    const breed = String(dog.breed || "").toLowerCase();
    const deepChestBreed = /(great dane|danish|doberman|shepherd|retriever|setter|standard poodle|akita|세퍼드|리트리버|도베르만|그레이트데인|스탠다드푸들)/i.test(breed);
    if (weight >= 25 || deepChestBreed) scores.gdv_bloat += 2.2;
    if (age >= 8) {
      scores.cardiac_collapse += 1.2;
      scores.pyometra_repro += 0.6;
      scores.trauma_internal += 0.5;
    }
    if (String(dog.sex || "") === "male") scores.urinary_obstruction += 0.8;
    if (String(dog.neutered || "") === "no" && String(dog.sex || "") === "female") scores.pyometra_repro += 1.5;
  }

  function softmaxScores(scores) {
    const entries = Object.entries(scores);
    const max = Math.max(...entries.map(([, value]) => value));
    const exp = entries.map(([key, value]) => [key, Math.exp((value - max) / 4)]);
    const total = exp.reduce((sum, [, value]) => sum + value, 0) || 1;
    return exp
      .map(([key, value]) => ({
        key,
        label: conditionLabels[key],
        score: Number(scores[key].toFixed(1)),
        likelihood: Math.round((value / total) * 100),
      }))
      .sort((a, b) => b.score - a.score);
  }

  function classify(selected, emergencyScore, topCondition) {
    const redFlags = [];
    const gdvPattern =
      selected.has("nonproductive_retching") &&
      selected.has("distended_abdomen") &&
      hasAny(selected, ["restlessness_pacing", "drooling", "collapse", "pale_gums"]);
    const respiratoryPattern = hasAny(selected, ["blue_gums", "labored_breathing", "open_mouth_breathing"]);
    const shockPattern = selected.has("collapse") && hasAny(selected, ["pale_gums", "shock_cool_limbs", "heart_rate_weak_fast"]);

    if (gdvPattern) redFlags.push("위확장-염전(GDV) 의심 조합: 헛구역질 + 복부팽만 + 불안/침흘림/쇼크 신호");
    if (respiratoryPattern) redFlags.push("호흡곤란 또는 산소 부족 신호");
    if (shockPattern) redFlags.push("쇼크/순환 저하 신호");
    if (selected.has("seizure_over_5") || selected.has("multiple_seizures")) redFlags.push("긴 발작 또는 반복 발작");
    if (selected.has("cannot_urinate")) redFlags.push("소변을 못 보는 비뇨기 응급 신호");
    if (selected.has("open_fracture") || selected.has("bleeding_uncontrolled")) redFlags.push("개방성 골절 또는 조절되지 않는 출혈");
    if (selected.has("toxin_access") || selected.has("chocolate_xylitol_grape") || selected.has("medication_access")) redFlags.push("독성 물질 섭취 가능성");
    if (selected.has("heat_exposure") && hasAny(selected, ["body_temp_high", "collapse", "seizure"])) redFlags.push("열사병 고위험 조합");

    if (redFlags.length || emergencyScore >= 28 || topCondition.score >= 18) return { riskLevel: "EMERGENCY", redFlags };
    if (emergencyScore >= 18 || topCondition.score >= 13) return { riskLevel: "VET_RECOMMENDED", redFlags };
    if (emergencyScore >= 10 || topCondition.score >= 8) return { riskLevel: "CAUTION", redFlags };
    if (emergencyScore >= 4 || selected.size > 0) return { riskLevel: "WATCH", redFlags };
    return { riskLevel: "NORMAL", redFlags };
  }

  function assess(input) {
    const selected = new Set(input.selectedIds || []);
    const scores = {};
    Object.entries(conditions).forEach(([key, condition]) => {
      scores[key] = condition.prior;
      Object.entries(condition.weights).forEach(([questionId, weight]) => {
        if (selected.has(questionId)) scores[key] += weight;
      });
    });

    addContextModifiers(scores, input.dog || {});

    const ranked = softmaxScores(scores);
    const emergencyScore = Array.from(selected).reduce((sum, id) => sum + selectedWeight(selected, id), 0);
    const classification = classify(selected, emergencyScore, ranked[0]);
    const selectedQuestions = questions.filter((item) => selected.has(item.id));
    const evidence = selectedQuestions
      .sort((a, b) => b.emergencyWeight - a.emergencyWeight)
      .slice(0, 12)
      .map((item) => item.label);

    return {
      modelVersion: "naapa-triage-v0.1",
      questionCount: questions.length,
      selectedCount: selected.size,
      emergencyScore,
      riskLevel: classification.riskLevel,
      redFlags: classification.redFlags,
      topConditions: ranked.slice(0, 5),
      evidence,
      confidence: selected.size >= 12 ? "문진 정보 충분" : selected.size >= 5 ? "문진 정보 보통" : "문진 정보 부족",
      recommendations: buildRecommendations(classification.riskLevel, classification.redFlags),
      disclaimer:
        "이 결과는 보호자 문진 기반 응급 분류와 감별질환 후보입니다. 질병 확정, 처방, 영상 판독을 대체하지 않습니다.",
    };
  }

  function buildRecommendations(riskLevel, redFlags) {
    if (riskLevel === "EMERGENCY") {
      return [
        "지금 즉시 24시 동물병원 또는 응급진료 가능 병원에 연락하세요.",
        "이동 전 병원에 문진 결과와 주요 증상을 전달하세요.",
        "구토 유도, 음식/물 급여, 임의 약 투여는 수의사 지시 전 피하세요.",
      ];
    }
    if (riskLevel === "VET_RECOMMENDED") {
      return [
        "오늘 안에 병원 상담 또는 내원을 권장합니다.",
        "증상 시작 시간, 횟수, 먹은 것, 배변/배뇨, 촬영한 사진/영상을 준비하세요.",
        redFlags.length ? "응급 신호가 악화되면 즉시 응급 병원으로 전환하세요." : "반복 여부를 2~4시간 단위로 기록하세요.",
      ];
    }
    if (riskLevel === "CAUTION") {
      return [
        "24시간 내 반복되거나 강도가 올라가면 병원 상담을 준비하세요.",
        "식사, 배변, 호흡수, 통증 반응을 추가 기록하세요.",
        "호흡곤란, collapse, 복부팽만, 발작, 소변불가가 나타나면 즉시 응급으로 분류하세요.",
      ];
    }
    if (riskLevel === "WATCH") {
      return [
        "현재는 관찰 기록을 이어가되, 같은 증상이 반복되는지 확인하세요.",
        "사진/영상과 시간 정보를 남기면 병원 상담 정확도가 높아집니다.",
      ];
    }
    return ["현재 문진만으로는 고위험 신호가 낮습니다. 평소 상태와 다른 변화가 생기면 다시 문진하세요."];
  }

  window.NAAPA_TRIAGE_MODEL = {
    questionGroups,
    questions,
    conditionLabels,
    assess,
  };
})();
