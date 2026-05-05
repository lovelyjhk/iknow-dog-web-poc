# 나아파 (Naapa)
## 통합 기술 기획서 v2.0 — Rust 백엔드 + AI 보행 분석 + 구독형 펫 헬스케어

---

# 목차

1. 서비스 개요 & 브랜드
2. 문제 정의 & 시장 분석
3. 타겟 유저 & 페르소나
4. 핵심 가치 제안
5. MVP vs 고급 기능
6. AI 기능 아키텍처 (보행 분석 포함)
7. 요금제 & 크레딧 시스템
8. 쿠폰 설계
9. 특허 아이디어 8개
10. 화면 구조 & 유저 시나리오
11. DB 스키마 (PostgreSQL)
12. 기술 아키텍처 (Rust + Axum)
13. Rust 프로젝트 구조
14. Expo 모바일 구조
15. OAuth 인증 흐름 (카카오/네이버/구글/애플)
16. AI 보행 분석 파이프라인
17. .env.example & GitHub Actions CI
18. 수익화 모델
19. 법적 고지 & 의료 면책
20. 런치 로드맵
21. 투자자 & 정부지원 요약

---

# 1. 서비스 개요 & 브랜드

## 앱 아이덴티티

| 항목 | 내용 |
|---|---|
| 앱명 (KR) | 나아파 |
| 앱명 (EN) | Naapa |
| 핸들 | @iknow.dog |
| 태그라인 | "반려견의 말 못 하는 신호를 우리가 읽습니다" |
| 카테고리 | 반려동물 건강 & 라이프스타일 |
| 플랫폼 | iOS 16+ / Android 13+ |
| 주 언어 | 한국어 (추후 EN, JA) |
| 목표 출시 | 2026년 Q4 |

## 브랜드 컬러

- **Primary:** Warm Amber `#F5A623`
- **Secondary:** Deep Teal `#1A7A6E`
- **Accent:** Soft Cream `#FFF8F0`
- **폰트:** Pretendard (KR) + Inter (EN)
- **마스코트:** 심박수 파형이 있는 라인아트 강아지 — "보리"

---

# 2. 문제 정의 & 시장 분석

```
핵심 문제:
  반려견은 통증·증상을 말로 표현하지 못한다.
  보호자는 기침·구토·절뚝거림·식욕 저하를 봐도
  병원에 가야 할지 판단하기 어렵다.

기존 앱의 한계:
  ❌ 건강 기록앱 = 단순 메모 수준
  ❌ 장소 앱 = 강아지 건강 상태 미반영
  ❌ 병원 추천 = 거리·별점만 반영
  ❌ 영양제 추천 = 광고성 정보 과다
  ❌ 영상 분석 앱 = 반려견 전용 없음
```

## 시장 규모

| 세그먼트 | 한국 | 글로벌 |
|---|---|---|
| 펫케어 시장 (2025) | ₩6.2T | $261B |
| 디지털 펫 헬스 앱 | ₩480B | $4.1B |
| 애견동반 여행 | ₩1.1T | $18B |
| CAGR (2025–2030) | 12.4% | 9.8% |
| 반려견 가구 (한국) | ~520만 | ~4.7억 (글로벌) |

> ※ 수치는 농림축산식품부, KB경영연구소, Statista 기반 — IR 제출 전 재검증 예정

---

# 3. 타겟 유저 & 페르소나

## Persona A — 불안한 초보 보호자

```
김지수 (28세, 서울, 마케터)
강아지: 비숑, 2살, "떡"

Pain Points:
  새벽 2시에 증상 구글링 → 패닉
  떡이 먹어도 되는 음식인지 모름
  주변 애견 맛집 정보 부족
  영양제 ₩80K 지출 후 효과 불확실

Goals:
  신뢰할 수 있는 건강 가이드
  음식·영양제 맞춤 추천
  애견동반 장소 탐색
  비숑 보호자 커뮤니티

결제 의향: 월 3,000–5,000원
```

## Persona B — 노령견 베테랑 보호자

```
박민준 (42세, 부산, 자영업)
강아지: 골든리트리버 7살 + 푸들믹스 12살

Pain Points:
  노령견 증상 장기 추적 어려움
  각 강아지마다 전문 병원 필요
  영양제 비용 최적화 필요
  두 강아지와 여행 시 응급 병원 정보 필요

Goals:
  증상 타임라인 90일+ 보기
  전문과목별 병원 탐색
  영양제 가성비 순위
  보행 이상 조기 감지

결제 의향: 월 6,000원 (무제한)
```

## Persona C — B2B 수의사

```
이수진 원장 (35세, 강남 동물병원)

Pain Points:
  보호자가 증상 기억 못 하고 내원
  허위 후기로 평판 피해
  신규 환자 유입 채널 부족

Goals:
  AI 사전 문진 리포트 수신
  인증 후기 시스템
  병원 프로필 대시보드

결제 의향: 월 ₩99,000–299,000 (B2B)
```

---

# 4. 핵심 가치 제안

```
반려견의 품종·나이·체중·건강 기록·보행 영상을 종합해서
건강 위험도, 음식 안전성, 병원 상담 필요도,
애견동반 장소 적합도, 가성비 영양제를
개인화 추천하는 AI 반려견 종합 플랫폼.

차별점:
  기존 앱은 모든 강아지를 동일하게 취급한다.
  우리는 모든 강아지를 개별 개체로 취급한다.
```

---

# 5. MVP vs 고급 기능

## Phase 1 — MVP (1–4개월)

```
✅ 반려견 프로필 (품종/나이/체중/알러지/기저질환)
✅ 일일 건강 기록 (식사/음수/배변/소변/구토/기침/긁음/수면/활동)
✅ 증상 타임라인 (7일)
✅ AI 건강 요약 (GPT-4o)
✅ 위험도 5단계 뱃지
✅ 음식 안전 검색
✅ 근처 동물병원 검색 (카카오 맵)
✅ 애견동반 장소 기본 리스트
✅ 커뮤니티 게시판
✅ 푸시 알림 (일일 체크 리마인더)
✅ 소셜 로그인 (카카오/네이버/구글/애플)
✅ 요금제 3종 + 신규 쿠폰
```

## Phase 2 — 성장 (5–8개월)

```
➕ 보행 영상 AI 분석 (이상 보행 감지)
➕ 병원 방문 전 AI 리포트 PDF
➕ 영양제 가성비 추천 (CES 스코어)
➕ 애견동반 숙소 예약
➕ 여행 코스 안전도 점수
➕ B2B 병원 대시보드 (베타)
➕ 90일 증상 타임라인
➕ 체중 추이 차트
```

## Phase 3 — 스케일 (9–18개월)

```
➕ 웨어러블 연동 (FitBark, Whistle)
➕ AI 허위 후기 탐지
➕ 반려동물 보험 파트너십
➕ 멀티 강아지 관리
➕ 수의사 원격 상담 예약
➕ 영양제 어필리에이트 커머스
➕ 일본/동남아 현지화
```

---

# 6. AI 기능 아키텍처

## 전체 AI 엔진 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI LAYER                                     │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ 건강 요약 AI      │  │ 보행 영상 분석 AI  │                    │
│  │ (GPT-4o)         │  │ (Python Worker)   │                    │
│  │                  │  │                  │                    │
│  │ Input:           │  │ Input:           │                    │
│  │ • 7일 건강 기록   │  │ • MP4 영상       │                    │
│  │ • 반려견 프로필   │  │ • 반려견 프로필   │                    │
│  │ • 증상 체크리스트 │  │ • 기존 건강 기록  │                    │
│  │                  │  │                  │                    │
│  │ Output:          │  │ Output:          │                    │
│  │ • 한국어 요약     │  │ • 이상보행 점수  │                    │
│  │ • 위험도 5단계    │  │ • 좌우 불균형    │                    │
│  │ • 수의사 권장 여부│  │ • 절뚝거림 확률  │                    │
│  │ • 추천 행동 3가지 │  │ • 관절 위험 신호 │                    │
│  └──────────────────┘  │ • 상담 권장 단계 │                    │
│                        └──────────────────┘                    │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ 음식 안전 AI      │  │ 장소 적합도 AI   │                    │
│  │ (GPT-4o + DB)    │  │ (스코어 엔진)     │                    │
│  └──────────────────┘  └──────────────────┘                    │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ 병원 추천 AI      │  │ 후기 신뢰도 AI   │                    │
│  │ (증상→전문과 매칭)│  │ (허위 후기 탐지)  │                    │
│  └──────────────────┘  └──────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

## 위험도 5단계

| 단계 | 한국어 | 트리거 | 행동 | 색상 |
|---|---|---|---|---|
| NORMAL | 정상 | 전 항목 정상 범위 | 계속 관찰 | 초록 |
| WATCH | 주의관찰 | 1–2개 경미 이상 | 24시간 후 재확인 | 노랑 |
| CAUTION | 주의 | 복합 이상 신호 | 48–72시간 내 병원 예약 | 주황 |
| VET_RECOMMENDED | 진료 권장 | 유의미한 증상 | 오늘 병원 연락 + AI 리포트 생성 | 빨강 |
| EMERGENCY | 긴급 | 발작/의식저하/호흡곤란 | 지금 즉시 응급병원 이동 | 빨강 점멸 |

## 보행 영상 AI — 상세 표현 가이드

```
❌ 쓰면 안 되는 표현 (의료기기법 위반 위험):
  "슬개골 진단"
  "십자인대 질병 판별"
  "디스크 진단"
  "관절염 확인"

✅ 써야 하는 표현:
  "이상 보행 신호 감지"
  "절뚝거림 가능성 분석"
  "좌우 보행 균형 분석"
  "관절 불편 의심 신호 안내"
  "수의사 상담 필요도 안내"
```

## AI 보행 분석 결과 예시

```
보리의 보행 영상에서 오른쪽 뒷다리 사용 빈도가 낮고,
보폭이 일정하지 않은 패턴이 감지되었습니다.

이는 피로, 일시적 통증, 관절 불편감 등에서
나타날 수 있는 이상 보행 신호일 수 있습니다.

분석 결과:
  이상 보행 점수: 67/100
  좌우 불균형: 우측 편중 (34%)
  절뚝거림 가능성: 중간
  관절 위험 신호: 감지됨

현재 위험도: 🟠 주의

권장 행동:
  1. 24–48시간 동안 산책 강도를 줄여주세요.
  2. 계단, 점프, 미끄러운 바닥을 피해주세요.
  3. 증상이 지속되면 정형외과 전문 동물병원 상담을 권장합니다.

[가까운 정형외과 병원 보기] [AI 리포트 생성]

─────────────────────────────────────────
이 분석은 질병 진단이 아니며 수의사 진료를 대체하지 않습니다.
```

---

# 7. 요금제 & 크레딧 시스템

## 요금제 3종

| 요금제 | 가격 | 월 크레딧 | 주요 기능 |
|---|---|---|---|
| 무료 | ₩0 | 10 크레딧 | 기본 건강 기록, 음식 검색 3회 |
| Basic | ₩3,000/월 | 40 크레딧 | AI 요약 제한, 병원 검색, 커뮤니티 |
| Plus | ₩5,000/월 | 70 크레딧 | AI 요약 확대, 영양제 추천, 리포트 |
| Unlimited | ₩6,000/월 | 300 크레딧 + Fair Use | 보행 영상 분석, 전 기능 무제한 |

> **Fair Use Policy:** 무제한 요금제는 개인 정상 사용 범위 내에서 제공되며, 자동화 요청·상업적 재판매 목적 사용은 제한됩니다.

## 크레딧 차감 기준

| 기능 | 차감 크레딧 |
|---|---|
| AI 건강 요약 | 1 |
| 음식 안전 검색 | 0.2 |
| 병원 추천 | 0.5 |
| 영양제 추천 | 0.5 |
| 보행 영상 분석 | 5 |
| 병원 방문 리포트 PDF | 3 |
| 여행 안전도 분석 | 2 |
| 장소 적합도 점수 | 0.3 |

## 크레딧 → 사용량 % 환산

```
무료 (10 크레딧):
  AI 요약 10회 OR 음식 검색 50회 OR 영상 분석 2회

Basic 3,000원 (40 크레딧):
  AI 요약 40회 OR 영상 분석 8회 OR 리포트 13회

Plus 5,000원 (70 크레딧):
  AI 요약 70회 OR 영상 분석 14회 OR 리포트 23회

Unlimited 6,000원 (300 크레딧 + Fair Use):
  일상적 개인 사용 사실상 무제한
```

---

# 8. 쿠폰 설계

## 쿠폰 종류

| 코드 | 내용 | 조건 |
|---|---|---|
| WELCOME3000 | Basic 1개월 무료 | 신규 가입자 전원 자동 지급 |
| FIRSTPLUS | Plus 첫 달 50% 할인 | 최초 Plus 결제 시 |
| VIDEOAI | 보행 영상 분석 1회 무료 (5 크레딧) | 신규 가입 후 7일 이내 |
| FRIENDDOG | 친구 초대 시 양측 10 크레딧 | 추천 코드 사용 시 |

## 쿠폰 DB 스키마

```sql
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  discount_type TEXT CHECK (discount_type IN
    ('free_months', 'percent', 'fixed_krw', 'credits')),
  discount_value DECIMAL(10,2),
  free_months INT,
  bonus_credits INT,
  target_plan TEXT,             -- 'basic', 'plus', 'unlimited', NULL=any
  max_redemptions INT,          -- NULL = unlimited
  used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_auto_issued BOOLEAN DEFAULT false,  -- 신규 가입 자동 지급
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  applied_subscription_id UUID REFERENCES subscriptions(id),
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, coupon_id)    -- 1인 1회 제한
);
```

---

# 9. 특허 아이디어 8개

## 특허 #1 — 품종·나이·체중·건강상태 기반 애견동반 장소 적합도 산출 시스템

**발명 명칭:** 반려견 건강 상태 기반 다변수 장소 적합도 점수 산출 시스템

**해결 문제:** 기존 애견동반 장소 앱은 모든 강아지에게 동일한 장소를 추천한다. 심장 질환이 있는 2kg 치와와와 관절 문제가 있는 35kg 래브라도는 필요한 장소 조건이 완전히 다르다.

**핵심 수식:**
```
SuitabilityScore =
  Σ(weight_i × compatibility_score_i)
  × breed_risk_penalty
  × health_status_multiplier    ← 위험도 EMERGENCY면 0%로 억제
  × emergency_vet_proximity_bonus
```

**특허 포인트:**
1. 실시간 건강 위험도를 억제 변수(suppressor variable)로 활용
2. 응급 동물병원 거리를 필수 점수 차원으로 포함
3. 날씨·시간대를 컨텍스트 보정 계수로 반영

**청구항 초안:**
> 반려견의 품종 위험 프로파일, 나이, 체중, 기저질환, 실시간 건강 위험도를 입력으로 받아, 장소 속성(바닥재질, 혼잡도, 실내/외, 반려견 편의시설, 응급병원 거리)과 결합한 가중치 기반 적합도 점수를 산출하고, 건강 위험도가 기준값 초과 시 적합도를 임계값 이하로 제한하는 컴퓨터 구현 시스템.

**법적 주의:** 수의학적 진단 기능 청구 금지. 개별 변수가 아닌 조합 및 수식 구조로 청구.

---

## 특허 #2 — 반려견 보행 영상 기반 관절 이상 신호 감지 및 위험도 산출 시스템

**발명 명칭:** 반려견 보행 영상의 해부학적 키포인트 시계열 분석과 건강 기록 데이터 융합을 통한 관절 이상 위험도 산출 시스템

**해결 문제:** 소비자용 반려견 건강 앱에서 관절 이상을 단순 체크리스트(절뚝거림 유무)로만 판단한다. 영상 기반으로 14개 해부학적 키포인트를 추출하고 시계열 패턴을 분석하여 관절 이상 위험도를 산출하는 소비자용 서비스가 없다.

**핵심 데이터 기반:**
```
훈련 데이터: AI Hub 반려견 보행영상 기반 건강관리 데이터 (과기부, 2024)
  - 반려견 1,000마리+ 보행 영상 2,094건
  - 해부학적 14개 키포인트 라벨 126,092건
  - 슬개골 질환 중증도 0–4기 분류 레이블
```

**발명의 구성:**
```
입력: 보호자가 촬영한 30초 이내 반려견 보행 영상

Step 1. 프레임 추출 (1초당 5프레임)
Step 2. YOLOv8 기반 14개 해부학 키포인트 좌표 추출
         (어깨/팔꿈치/손목/앞발/고관절/무릎/발목/뒷발 × 좌우)
Step 3. 키포인트 시계열 정규화 (체격 크기 불변 변환)
Step 4. ConvLSTM 기반 보행 패턴 분류 (Grade 0–4)
Step 5. 보행 메트릭 계산:
         좌우 하중 불균형 = |左발목Y평균 - 右발목Y평균| / 전체Y평균
         보폭 불규칙성   = 앞발X변위 표준편차 / 평균변위
         관절 비대칭도   = 무릎 키포인트 좌우 Y편차 평균
Step 6. 품종별 기준치 보정 (소형견/대형견/단두종 별도 임계값)
Step 7. 나이·체중 가중 위험도 산출
Step 8. 위험도 → 전문과 병원 추천 연결

출력: 이상보행점수(0–100), 관절위험신호(없음/경미/중등/강함), 위험도 5단계
```

**특허 포인트:**
1. 소비자 스마트폰 영상에서 추출한 14개 해부학 키포인트 시계열로 관절 이상 신호를 산출하는 파이프라인
2. 키포인트 좌우 비대칭 지수를 보폭 불규칙성 지수와 결합한 복합 이상보행점수 산출 방법
3. 품종별 정상 보행 기준치 DB를 이용한 개체 맞춤 위험도 보정
4. 나이·체중을 위험도 가중 계수로 적용하여 동일 보행 이상도에서 노령·대형견의 위험도를 상향 조정하는 방법
5. 위험도 출력과 전문과(정형외과/신경과) 병원 추천을 연동하는 시스템

**청구항 초안:**
> **청구항 1 (시스템):** 반려견 보행 영상을 입력받아 딥러닝 키포인트 검출 모델로 복수의 해부학적 신체 부위 좌표를 프레임별로 추출하고, 상기 좌표의 시계열 데이터로부터 좌우 하중 불균형 지수, 보폭 불규칙성 지수, 관절 비대칭 지수를 산출하며, 반려견의 품종별 정상 보행 기준치 데이터베이스를 참조하여 보정된 이상 보행 점수와 관절 위험 등급을 출력하는 컴퓨터 구현 시스템.
>
> **청구항 2 (방법):** 반려견 보행 영상을 프레임 단위로 분할하는 단계; 각 프레임에서 14개 이상의 해부학적 키포인트 좌표를 추출하는 단계; 추출된 시계열 키포인트 데이터를 순환 신경망 모델에 입력하여 보행 이상 중증도를 분류하는 단계; 반려견의 나이와 체중을 가중 계수로 적용하여 위험도를 산출하는 단계; 및 위험도에 따라 전문 수의 진료과목을 매칭하는 단계를 포함하는 반려견 관절 이상 신호 감지 방법.

**법적 주의:** 슬개골 질환 Grade 진단 결과 직접 표시 금지. "보행 이상 신호 감지" + "수의사 상담 권장" 표현 유지. AI Hub 데이터 이용약관 확인 후 상업 서비스 적용.

---

## 특허 #3 — 영양제 가성비 점수 산출 시스템

**핵심 수식:**
```
CES (Cost-Effectiveness Score) =
  (근거등급점수 × 0.25) +
  (성분품질점수 × 0.20) +
  (후기신뢰점수 × 0.20) +
  (체중별1일비용역산점수 × 0.20) +
  (프로파일매칭점수 × 0.15)

체중별1일비용 = 1일가격 ÷ 강아지체중(kg)  ← 역산: 낮을수록 고점
```

**특허 포인트:**
1. 체중 정규화 1일 비용을 점수 차원으로 포함
2. 후기 신뢰도 점수(특허 #6) 통합
3. 약물-영양제 상호작용 체크를 추천 순위에 반영
4. 사용자 조정 가능 가중치 시스템

---

## 특허 #4 — 여행 경로 안전도 점수 시스템

**핵심 로직:**
```
경로 → 10km 구간 분할 → 구간별 분석
  ├── 가장 가까운 응급병원 거리
  ├── 가장 가까운 24시 병원 거리
  └── 원격 진료 가능 여부

구간 안전도 =
  기본점수
  × (1 / (응급병원거리 + 1))
  × 품종응급위험계수        ← 단두종: 기도, 심장취약종: 심혈관
  × 현재위험도수정자
  × 기온스트레스계수
```

**특허 포인트:**
1. 경로 구간화 + 구간별 응급 네트워크 밀도 분석
2. 품종별 응급 소인을 여행 안전도 가중 요소로 적용
3. 응급 네트워크 밀도 기반 대안 경로 제안

---

## 특허 #5 — AI 병원 방문 전 문진 리포트 자동 생성 시스템

**입력 → 처리 → 출력:**
```
입력:
  30일 건강 기록 시계열
  반려견 프로필
  보호자 주요 호소 증상 (자유 텍스트)
  사진/영상 (첨부 시)
  현재 복용 약물

처리 (Rust → AI Worker → GPT-4o):
  1. 증상 발생 시점 및 지속 기간 추출
  2. 증상 동시 발생 패턴 식별
  3. 증상 빈도 및 심각도 추이 계산
  4. 감별 고려사항 목록 생성
     (표현: "보호자 관찰 소견" — 진단 아님)
  5. SOAP 인접 구조 리포트 생성

출력 PDF:
  - 환자 정보 (반려견 프로필)
  - 주요 호소 증상 (보호자 표현 그대로)
  - 증상 타임라인 (시각화)
  - 관찰 기록 요약
  - 추이 분석
  - AI 제안 질문 목록 (수의사에게 물어볼 것)
  - 약물·영양제 목록
  - 면책 고지
```

---

## 특허 #6 — 커뮤니티 후기 신뢰도 & 허위 후기 탐지 시스템

```
신뢰도 점수 파이프라인:

언어 분석:
  ├── 텍스트-평점 감정 일관성
  ├── 범용적 표현 탐지 (구체성 부족)
  ├── 복사-붙여넣기 유사도
  └── LLM 생성 텍스트 탐지 (퍼플렉시티)

계정 분석:
  ├── 계정 나이 vs 후기 수
  ├── 반려견 프로필 완성도 (도메인 특화 신뢰 신호)
  ├── 후기 다양성 (단일 업체 집중 여부)
  └── 로그인 패턴 이상

행동 그래프 분석:
  ├── 동일 업체 리뷰어 네트워크 클러스터링
  ├── 시간적 집중 (리뷰 폭발)
  ├── IP/기기 클러스터링
  └── 교차 업체 리뷰 상관관계

신뢰도 점수 = Σ(가중 서브점수) → 0–100
  < 40: 자동 숨김 + 관리자 검토 큐
  40–60: "미인증" 표시
  60–80: 일반 표시
  80–100: "인증 신뢰 후기" 뱃지
```

---

## 특허 #7 — 반려견 음식 안전성 개인화 판정 시스템

```
음식 × 반려견 프로파일 조합별 안전 등급:

안전 클래스:
  SAFE      — 일반적 사용 안전
  LIMITED   — 체중(kg)당 허용량 기준
  CONDITION — 건강한 강아지는 안전, 특정 질환 보유 시 위험
  BREED     — 특정 품종 제한
  ALLERGY   — 해당 강아지 알러지 목록과 교차 확인
  TOXIC     — 절대 불가

개인화 출력 =
  base_class
  → 체중별 허용량(g/kg) 계산
  → 기저질환 필터 적용 (예: 췌장염 → 고지방 제한)
  → 품종 필터 적용
  → 알러지 오버라이드

예시:
  쿼리: "블루베리 먹어도 돼요?"
  강아지: 5kg 푸들, 췌장염 이력, 알러지 없음
  출력: LIMITED — 하루 3–4알 (체중 5kg 기준)
        췌장염 제한 없음 (저지방 식품)
  표시: "✅ 소량 가능 — 모찌 체중 기준 하루 3–4알"
```

---

## 특허 #8 — 증상·전문과 매칭 기반 다기준 동물병원 추천 시스템

```
VetScore =
  (전문과매칭점수 × 0.30) +
  (거리점수 × 0.20) +
  (후기신뢰점수 × 0.20) +
  (비용투명성점수 × 0.15) +
  (예약가능성점수 × 0.10) +
  (응급대응점수 × 0.05)

EMERGENCY 오버라이드:
  위험도 == EMERGENCY → 순수 (영업중 AND 거리) 기준만 적용
  응급병원만 표시

증상 → 전문과 매핑:
  발작, 머리기울기  → 신경과
  심잡음, 운동 불내 → 심장과
  절뚝거림, 골 기형 → 정형외과
  눈 분비물, 흐림   → 안과
  피부 병변, 탈모   → 피부과
  반복 구토/설사    → 내과
  종양, 혹         → 종양과
  치석, 구취       → 치과
```

---

# 10. 화면 구조 & 유저 시나리오

## 네비게이션 구조

```
탭 바 (하단):
  🏠 홈  🐾 건강  📍 탐색  🍖 가이드  👥 커뮤니티

홈 탭
  └── HomeScreen
      ├── 반려견 프로필 카드 (빠른 전환)
      ├── 오늘 건강 상태 (위험도 뱃지)
      ├── 빠른 기록 버튼 → DailyLogModal
      ├── 최근 알림
      └── 근처 응급병원 (위험도 >= CAUTION 시 표시)

건강 탭
  └── HealthDashboard
      ├── 증상 타임라인 (7/30/90일)
      ├── AI 건강 요약 카드
      ├── 기록 이력
      ├── 체중 차트
      ├── 보행 영상 업로드 → 분석 결과
      ├── 동물병원 방문 이력
      └── 병원 방문 리포트 생성 → PDF 미리보기 → 공유

탐색 탭
  └── DiscoverMap
      ├── 장소 리스트 (맛집/카페/숙소) + 적합도 점수
      ├── 장소 상세 → 후기 → 신뢰도 점수
      ├── 여행 코스 플래너 + 안전도 점수
      ├── 병원 찾기 → 전문과 필터 → 상세 → 예약
      └── 응급병원 (항상 접근 가능)

가이드 탭
  └── GuideHome
      ├── 음식 안전 검색 → 상세 (개인화 안전 등급)
      ├── 영양제 추천 → CES 점수 순위
      └── 품종 가이드

커뮤니티 탭
  └── CommunityHome
      ├── 게시판 목록 (건강/병원/영양제/장소/산책메이트)
      ├── 게시글 상세 → 댓글
      ├── 품종별 그룹
      └── 내 게시글

모달/시트
  ├── DailyLogModal (바텀시트, 5단계)
  ├── AISummaryModal (스트리밍)
  ├── GaitVideoModal (업로드 + 결과)
  ├── SupplementCompareModal
  └── EmergencyModal (전체화면 빨강)
```

## 유저 시나리오 1 — 아침 건강 체크

```
오전 7:30 — 푸시: "보리의 아침 건강 체크 시간이에요 🐾"

앱 열기 → 홈 → 빠른 기록

DailyLogModal (5단계):
  1/5 식사: 먹었나요? [예 / 아니오 / 조금]
            얼마나? [평소 / 적게 / 많이]

  2/5 음수: 물 섭취 [평소 / 적게 / 많이 / 안 마심]

  3/5 배변: 대변 [정상 / 묽음 / 액체 / 딱딱 / 혈변 / 점액 / 없음]
            소변 [정상 / 자주 / 적게 / 진함 / 혈뇨 / 없음]

  4/5 증상: [토글 칩]
            구토 / 기침 / 긁음 / 절뚝거림 /
            눈 분비물 / 귀 긁음 / 콧물 /
            무기력 / 식욕저하 / 떨림 / 발작

  5/5 메모: "어제보다 물을 덜 마시는 것 같아요"

→ 기록 저장 → AI 요약 생성 (스트리밍)

결과: 🟡 주의관찰
"보리가 최근 3일간 음수량이 감소하고 있어요.
탈수 초기 신호일 수 있으니 물그릇을 항상 신선하게
유지하고 24시간 후 다시 확인해주세요."
```

## 유저 시나리오 2 — 보행 영상 분석

```
사용자 → 건강 탭 → 보행 영상 업로드

[크레딧 안내: 영상 분석 = 5 크레딧 차감]
현재 크레딧: 40 → 35

[동영상 업로드 가이드]
  • 30초 이내
  • 밝은 환경
  • 옆면 또는 뒷면에서 촬영
  • 평지에서 자연스럽게 걷는 모습

업로드 → Rust 백엔드 → S3 저장
       → video_analysis_jobs 생성
       → Redis Queue → Python AI Worker

분석 중... (평균 45–90초)

결과:
  이상 보행 점수: 67/100
  좌우 불균형: 우측 편중 (34%)
  절뚝거림 가능성: 중간
  관절 위험 신호: 감지됨

  현재 위험도: 🟠 주의

  권장 행동:
    1. 24–48시간 동안 산책 강도를 줄여주세요
    2. 계단, 점프, 미끄러운 바닥 피하기
    3. 증상 지속 시 정형외과 동물병원 상담 권장

  [가까운 정형외과 병원 보기] [AI 리포트 생성]

  ─────────────────────────────────────────
  이 분석은 질병 진단이 아닙니다.
  수의사 진료를 대체하지 않습니다.
```

## 유저 시나리오 3 — 응급 감지

```
사용자가 기록: 발작 ✅ + 쓰러짐 ✅ + 의식저하 ✅

→ EMERGENCY 모달 즉시 표시 (전체화면 빨강)

┌─────────────────────────────────────────┐
│  🚨 긴급 상황입니다                       │
│                                         │
│  보리에게 즉시 수의사 진료가 필요합니다.   │
│                                         │
│  [📍 가장 가까운 응급 동물병원]           │
│  강남 24시 동물메디컬센터 — 1.2km        │
│  ☎️ 전화하기   🗺️ 길찾기                 │
│                                         │
│  [다음 응급병원]                          │
│  서초 응급동물병원 — 2.8km               │
│                                         │
│  ─────────────────────────────────────  │
│  이 정보는 의료 진단이 아닙니다.          │
│  즉시 수의사에게 연락하세요.             │
└─────────────────────────────────────────┘
```

---

# 11. DB 스키마 (PostgreSQL)

```sql
-- =============================================
-- 사용자 & 인증
-- =============================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE oauth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('kakao', 'naver', 'google', 'apple')),
  provider_user_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_user_id)
);

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT UNIQUE NOT NULL,
  device_info TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 반려견 프로필
-- =============================================

CREATE TABLE dogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  breed_code TEXT,
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  sex TEXT CHECK (sex IN ('male', 'female', 'neutered_male', 'spayed_female')),
  profile_image_url TEXT,
  known_allergies TEXT[],
  known_conditions TEXT[],
  current_medications TEXT[],
  microchip_number TEXT,
  insurance_provider TEXT,
  is_primary BOOLEAN DEFAULT false,
  is_senior BOOLEAN GENERATED ALWAYS AS (
    EXTRACT(YEAR FROM AGE(birth_date)) >= 7
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 건강 기록
-- =============================================

CREATE TABLE health_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  log_date DATE DEFAULT CURRENT_DATE,

  -- 섭취
  food_eaten BOOLEAN,
  food_amount TEXT CHECK (food_amount IN ('normal', 'less', 'more', 'none')),
  water_intake TEXT CHECK (water_intake IN ('normal', 'less', 'more', 'not_drinking')),

  -- 배출
  stool_occurred BOOLEAN,
  stool_consistency TEXT CHECK (stool_consistency IN
    ('normal', 'soft', 'liquid', 'hard', 'blood', 'mucus')),
  stool_count INT,
  urine_occurred BOOLEAN,
  urine_color TEXT CHECK (urine_color IN ('normal', 'dark', 'blood', 'cloudy')),
  urine_frequency TEXT CHECK (urine_frequency IN ('normal', 'frequent', 'less')),
  vomiting_count INT DEFAULT 0,
  vomiting_content TEXT,

  -- 증상 플래그
  symptom_coughing BOOLEAN DEFAULT false,
  symptom_scratching BOOLEAN DEFAULT false,
  symptom_limping BOOLEAN DEFAULT false,
  symptom_eye_discharge BOOLEAN DEFAULT false,
  symptom_ear_scratching BOOLEAN DEFAULT false,
  symptom_nasal_discharge BOOLEAN DEFAULT false,
  symptom_lethargy BOOLEAN DEFAULT false,
  symptom_loss_of_appetite BOOLEAN DEFAULT false,
  symptom_shaking BOOLEAN DEFAULT false,
  symptom_seizure BOOLEAN DEFAULT false,
  symptom_collapse BOOLEAN DEFAULT false,
  symptom_breathing_difficulty BOOLEAN DEFAULT false,

  -- 바이탈
  weight_kg DECIMAL(5,2),
  activity_level TEXT CHECK (activity_level IN ('high', 'normal', 'low', 'none')),
  sleep_quality TEXT CHECK (sleep_quality IN ('good', 'normal', 'poor', 'restless')),
  step_count INT,

  -- 미디어
  photo_urls TEXT[],

  -- 메모
  owner_notes TEXT,

  -- AI 출력
  ai_summary TEXT,
  ai_risk_level TEXT CHECK (ai_risk_level IN
    ('normal', 'watch', 'caution', 'vet_recommended', 'emergency')),
  ai_recommendations JSONB,
  ai_generated_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_health_logs_dog_date ON health_logs(dog_id, log_date DESC);
CREATE INDEX idx_health_logs_risk ON health_logs(dog_id, ai_risk_level);

-- =============================================
-- 보행 영상 분석
-- =============================================

CREATE TABLE video_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dog_id UUID NOT NULL REFERENCES dogs(id),
  uploader_id UUID NOT NULL REFERENCES users(id),
  s3_key TEXT NOT NULL,
  file_size_bytes BIGINT,
  duration_seconds INT,
  upload_status TEXT DEFAULT 'pending'
    CHECK (upload_status IN ('pending', 'uploaded', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gait_analysis_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES video_files(id),
  dog_id UUID NOT NULL REFERENCES dogs(id),
  status TEXT DEFAULT 'queued'
    CHECK (status IN ('queued', 'processing', 'done', 'failed')),
  priority INT DEFAULT 5,
  queued_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT
);

CREATE TABLE gait_analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES gait_analysis_jobs(id),
  dog_id UUID NOT NULL REFERENCES dogs(id),
  video_id UUID NOT NULL REFERENCES video_files(id),

  -- 분석 점수
  abnormality_score DECIMAL(5,2),       -- 0–100
  limping_probability DECIMAL(5,2),     -- 0–100
  left_right_imbalance_score DECIMAL(5,2),
  stride_irregularity_score DECIMAL(5,2),
  joint_risk_signal TEXT CHECK (joint_risk_signal IN
    ('none', 'mild', 'moderate', 'strong')),

  -- 위험도
  risk_level TEXT CHECK (risk_level IN
    ('normal', 'watch', 'caution', 'vet_recommended', 'emergency')),

  -- 한국어 출력
  summary TEXT,
  recommendations JSONB,               -- [{text, priority}]
  recommended_specialty TEXT,          -- 'orthopedics', 'neurology'
  disclaimer TEXT,

  -- 메타
  model_version TEXT,
  processing_time_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 구독 & 결제
-- =============================================

CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                  -- 'free', 'basic', 'plus', 'unlimited'
  display_name_kr TEXT NOT NULL,
  price_krw INT NOT NULL DEFAULT 0,
  monthly_credits INT NOT NULL,
  has_fair_use BOOLEAN DEFAULT false,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 요금제 데이터
INSERT INTO subscription_plans (name, display_name_kr, price_krw, monthly_credits, has_fair_use, features) VALUES
  ('free',      '무료',        0,    10,  false, '{"gait_video": false, "pdf_report": false}'),
  ('basic',     'Basic',    3000,   40,  false, '{"gait_video": true, "pdf_report": false}'),
  ('plus',      'Plus',     5000,   70,  false, '{"gait_video": true, "pdf_report": true}'),
  ('unlimited', '무제한',   6000,  300,  true,  '{"gait_video": true, "pdf_report": true, "priority": true}');

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  plan_id UUID NOT NULL REFERENCES subscription_plans(id),
  status TEXT DEFAULT 'active'
    CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'expired')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  trial_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  payment_provider TEXT,               -- 'revenuecat', 'portone'
  external_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 크레딧 & 사용량
-- =============================================

CREATE TABLE usage_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id),
  balance DECIMAL(10,2) DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  dog_id UUID REFERENCES dogs(id),
  feature TEXT NOT NULL,               -- 'ai_summary', 'gait_video', 'pdf_report'
  credits_deducted DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  reference_id UUID,                   -- health_log_id or job_id
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE credit_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  reason TEXT NOT NULL,                -- 'monthly_renewal', 'coupon', 'welcome', 'referral'
  reference_id UUID,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 쿠폰
-- =============================================

CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  discount_type TEXT CHECK (discount_type IN
    ('free_months', 'percent', 'fixed_krw', 'credits')),
  discount_value DECIMAL(10,2),
  free_months INT,
  bonus_credits DECIMAL(10,2),
  target_plan TEXT,
  max_redemptions INT,
  used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_auto_issued BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE coupon_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  applied_subscription_id UUID REFERENCES subscriptions(id),
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, coupon_id)
);

-- =============================================
-- 장소 & 병원
-- =============================================

CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN
    ('restaurant', 'cafe', 'accommodation', 'park')),
  address TEXT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  phone TEXT,
  dogs_allowed BOOLEAN DEFAULT true,
  indoor_allowed BOOLEAN,
  small_dogs_allowed BOOLEAN,
  large_dogs_allowed BOOLEAN,
  dog_weight_limit_kg DECIMAL(5,2),
  has_dog_menu BOOLEAN,
  has_dog_water BOOLEAN,
  has_parking BOOLEAN,
  operating_hours JSONB,
  price_range INT CHECK (price_range IN (1,2,3,4)),
  photos TEXT[],
  verified BOOLEAN DEFAULT false,
  review_count INT DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  kakao_place_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vet_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  phone TEXT,
  is_emergency BOOLEAN DEFAULT false,
  is_24h BOOLEAN DEFAULT false,
  specialties TEXT[],
  has_echocardiogram BOOLEAN,
  has_mri BOOLEAN,
  has_ct BOOLEAN,
  consultation_fee_range JSONB,
  price_transparency_score INT DEFAULT 50,
  review_count INT DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0,
  trust_score INT DEFAULT 50,
  b2b_partner BOOLEAN DEFAULT false,
  operating_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 음식 & 영양제
-- =============================================

CREATE TABLE foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_kr TEXT NOT NULL,
  name_en TEXT,
  category TEXT,
  base_safety_class TEXT NOT NULL CHECK (base_safety_class IN
    ('safe', 'limited', 'condition_restricted', 'breed_restricted', 'toxic')),
  quantity_limit_g_per_kg DECIMAL(8,3),
  quantity_notes TEXT,
  toxic_compounds TEXT[],
  condition_restrictions JSONB,
  breed_restrictions JSONB,
  common_allergen BOOLEAN DEFAULT false,
  explanation_kr TEXT,
  emergency_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT[],
  active_ingredients JSONB,
  inactive_ingredients TEXT[],
  common_allergens TEXT[],
  dosage_per_kg DECIMAL(6,3),
  package_size_g DECIMAL(8,2),
  price_krw INT,
  daily_cost_per_kg_calculated DECIMAL(8,4),
  evidence_tier TEXT CHECK (evidence_tier IN
    ('clinical_trial', 'expert_consensus', 'anecdotal', 'insufficient')),
  ingredient_quality_score INT,
  review_trust_score INT DEFAULT 50,
  contraindicated_conditions TEXT[],
  drug_interactions TEXT[],
  affiliate_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 커뮤니티
-- =============================================

CREATE TABLE community_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_breed_specific BOOLEAN DEFAULT false,
  breed_code TEXT,
  post_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES community_boards(id),
  author_id UUID NOT NULL REFERENCES users(id),
  dog_id UUID REFERENCES dogs(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[],
  post_type TEXT CHECK (post_type IN
    ('question', 'review', 'story', 'info', 'emergency_help')),
  linked_place_id UUID REFERENCES places(id),
  linked_supplement_id UUID REFERENCES supplements(id),
  linked_vet_id UUID REFERENCES vet_facilities(id),
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  trust_score INT DEFAULT 50,
  is_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES users(id),
  entity_type TEXT CHECK (entity_type IN ('place', 'vet', 'supplement')),
  entity_id UUID NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  content TEXT,
  media_urls TEXT[],
  trust_score INT DEFAULT 50,
  trust_flags JSONB,
  is_verified_visit BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 알림
-- =============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 12. 기술 아키텍처 (Rust + Axum)

## 전체 시스템 다이어그램

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                                    │
│  Expo React Native (iOS + Android)                                  │
│  Expo Router │ NativeWind │ Zustand │ React Query                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ HTTPS / WebSocket
┌──────────────────────────▼──────────────────────────────────────────┐
│                     RUST BACKEND (Axum)                             │
│                                                                     │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────────────┐  │
│  │ Auth Service │  │ API Router    │  │ Middleware Layer         │  │
│  │              │  │               │  │                         │  │
│  │ • Kakao OAuth│  │ /api/auth     │  │ • JWT 검증              │  │
│  │ • Naver OAuth│  │ /api/dogs     │  │ • Rate Limiting         │  │
│  │ • Google     │  │ /api/health   │  │ • Credit 사용량 체크    │  │
│  │ • Apple      │  │ /api/videos   │  │ • CORS                  │  │
│  │ • JWT 발급   │  │ /api/foods    │  │ • Request Logging       │  │
│  └──────────────┘  │ /api/vets     │  └─────────────────────────┘  │
│                    │ /api/supps    │                                │
│                    │ /api/places   │                                │
│                    │ /api/community│                                │
│                    │ /api/subs     │                                │
│                    │ /api/coupons  │                                │
│                    │ /api/usage    │                                │
│                    └───────────────┘                                │
│                                                                     │
└──────┬──────────────────────┬───────────────────────┬──────────────┘
       │                      │                       │
┌──────▼──────┐  ┌────────────▼───────┐  ┌───────────▼──────────────┐
│ PostgreSQL  │  │ Redis              │  │ S3 Object Storage        │
│             │  │                   │  │                          │
│ • 메인 DB   │  │ • JWT 블랙리스트   │  │ • 보행 영상              │
│ • SQLx ORM  │  │ • 캐시            │  │ • 프로필 이미지          │
│ • pgvector  │  │ • 작업 큐         │  │ • AI 리포트 PDF          │
│   (향후)    │  │ • Rate limit      │  │ • 증상 사진              │
└─────────────┘  └───────────────────┘  └──────────────────────────┘
                          │
               ┌──────────▼──────────┐
               │ Python AI Worker    │
               │                     │
               │ • 보행 영상 수신     │
               │ • 프레임 추출        │
               │ • 관절 포인트 감지   │
               │ • 보행 불규칙성 분석 │
               │ • 결과 PostgreSQL 저장│
               │ • Rust에 완료 알림  │
               └─────────────────────┘
                          │
               ┌──────────▼──────────┐
               │ External APIs       │
               │                     │
               │ • OpenAI GPT-4o     │
               │ • 카카오 OAuth      │
               │ • 네이버 OAuth      │
               │ • Google OAuth      │
               │ • Apple OAuth       │
               │ • 카카오 맵 API     │
               │ • RevenueCat/Portone│
               │ • FCM/APNs (푸시)   │
               └─────────────────────┘
```

## API 엔드포인트 전체 목록

```
AUTH
  POST /api/auth/kakao          카카오 OAuth 콜백 → JWT 발급
  POST /api/auth/naver          네이버 OAuth 콜백 → JWT 발급
  POST /api/auth/google         구글 OAuth 콜백 → JWT 발급
  POST /api/auth/apple          애플 Sign In → JWT 발급
  POST /api/auth/refresh        리프레시 토큰 → 새 JWT
  POST /api/auth/logout         리프레시 토큰 무효화

DOGS
  GET  /api/dogs                내 반려견 목록
  POST /api/dogs                반려견 등록
  GET  /api/dogs/:id            반려견 상세
  PUT  /api/dogs/:id            반려견 수정
  DEL  /api/dogs/:id            반려견 삭제

HEALTH LOGS
  GET  /api/health-logs         건강 기록 목록 (필터: dog_id, date 범위)
  POST /api/health-logs         건강 기록 생성
  GET  /api/health-logs/:id     건강 기록 상세
  POST /api/health-logs/:id/ai-summary    AI 건강 요약 생성 (스트리밍)

GAIT VIDEO
  POST /api/videos/upload-url   S3 Presigned URL 발급
  POST /api/videos              영상 업로드 완료 등록
  GET  /api/videos/:id/status   분석 작업 상태 조회
  GET  /api/videos/:id/result   분석 결과 조회

FOOD GUIDE
  GET  /api/foods/search        음식 검색 (q=, dog_id= 개인화)
  GET  /api/foods/:id           음식 상세 + 개인화 안전 등급

VET RECOMMENDATION
  GET  /api/vets/search         병원 검색 (lat, lng, specialty)
  GET  /api/vets/:id            병원 상세
  GET  /api/vets/recommend      증상 기반 병원 추천
  GET  /api/vets/emergency      현재 위치 응급병원

SUPPLEMENTS
  GET  /api/supplements/search  영양제 검색
  GET  /api/supplements/recommend   CES 점수 기반 개인화 추천

PLACES
  GET  /api/places/search       장소 검색 + 적합도 점수
  GET  /api/places/:id          장소 상세
  GET  /api/places/travel-safety    여행 경로 안전도 점수

COMMUNITY
  GET  /api/community/boards    게시판 목록
  GET  /api/community/posts     게시글 목록
  POST /api/community/posts     게시글 작성
  GET  /api/community/posts/:id 게시글 상세
  POST /api/community/posts/:id/like   좋아요
  POST /api/community/reviews   후기 작성

SUBSCRIPTIONS
  GET  /api/subscriptions/plans 요금제 목록
  POST /api/subscriptions/checkout   결제 시작
  GET  /api/subscriptions/status     현재 구독 상태
  POST /api/subscriptions/cancel     구독 취소

COUPONS
  POST /api/coupons/redeem      쿠폰 사용
  GET  /api/coupons/history     사용 내역

USAGE
  GET  /api/usage/me            내 크레딧 잔액 + 사용 내역

REPORTS
  POST /api/reports/vet-visit   병원 방문 전 AI 리포트 PDF 생성
  GET  /api/reports/:id/download   PDF 다운로드 (Signed URL)
```

---

# 13. Rust 프로젝트 구조

```
pet-platform-backend/
├── src/
│   ├── main.rs
│   ├── config.rs              # 환경변수 로드 (envy crate)
│   ├── state.rs               # AppState (DB pool, Redis, S3 client)
│   │
│   ├── routes/
│   │   ├── mod.rs
│   │   ├── auth.rs
│   │   ├── dogs.rs
│   │   ├── health.rs
│   │   ├── videos.rs
│   │   ├── foods.rs
│   │   ├── vets.rs
│   │   ├── supplements.rs
│   │   ├── places.rs
│   │   ├── community.rs
│   │   ├── subscriptions.rs
│   │   ├── coupons.rs
│   │   ├── usage.rs
│   │   └── reports.rs
│   │
│   ├── handlers/
│   │   ├── auth_handler.rs
│   │   ├── dog_handler.rs
│   │   ├── health_handler.rs
│   │   ├── video_handler.rs
│   │   ├── food_handler.rs
│   │   ├── vet_handler.rs
│   │   ├── supplement_handler.rs
│   │   ├── place_handler.rs
│   │   ├── community_handler.rs
│   │   ├── subscription_handler.rs
│   │   ├── coupon_handler.rs
│   │   ├── usage_handler.rs
│   │   └── report_handler.rs
│   │
│   ├── services/
│   │   ├── auth_service.rs
│   │   ├── oauth/
│   │   │   ├── mod.rs
│   │   │   ├── kakao.rs
│   │   │   ├── naver.rs
│   │   │   ├── google.rs
│   │   │   └── apple.rs
│   │   ├── jwt_service.rs
│   │   ├── dog_service.rs
│   │   ├── health_service.rs
│   │   ├── video_service.rs
│   │   ├── ai_service.rs       # OpenAI GPT-4o 호출
│   │   ├── gait_service.rs     # Python AI Worker 큐 연동
│   │   ├── usage_service.rs    # 크레딧 차감/검증
│   │   ├── coupon_service.rs
│   │   ├── subscription_service.rs
│   │   ├── payment_service.rs
│   │   ├── place_service.rs
│   │   ├── vet_service.rs
│   │   ├── supplement_service.rs
│   │   ├── report_service.rs   # PDF 생성
│   │   └── push_service.rs     # FCM/APNs
│   │
│   ├── models/
│   │   ├── user.rs
│   │   ├── dog.rs
│   │   ├── health_log.rs
│   │   ├── video.rs
│   │   ├── gait_analysis.rs
│   │   ├── subscription.rs
│   │   ├── coupon.rs
│   │   ├── usage.rs
│   │   ├── place.rs
│   │   ├── vet.rs
│   │   ├── supplement.rs
│   │   ├── food.rs
│   │   └── community.rs
│   │
│   ├── repositories/
│   │   ├── user_repo.rs
│   │   ├── dog_repo.rs
│   │   ├── health_repo.rs
│   │   ├── video_repo.rs
│   │   ├── subscription_repo.rs
│   │   ├── coupon_repo.rs
│   │   ├── usage_repo.rs
│   │   └── community_repo.rs
│   │
│   ├── middlewares/
│   │   ├── auth_middleware.rs  # JWT 추출 및 검증
│   │   ├── rate_limit.rs       # Redis 기반 Rate Limiting
│   │   └── usage_gate.rs       # 크레딧 잔액 사전 확인
│   │
│   └── utils/
│       ├── error.rs            # AppError enum + IntoResponse
│       ├── response.rs         # ApiResponse<T> 표준 래퍼
│       ├── pagination.rs
│       └── geo.rs              # Haversine 거리 계산
│
├── ai_worker/                  # Python AI Worker (별도 서비스)
│   ├── main.py
│   ├── gait_analyzer.py
│   ├── frame_extractor.py
│   ├── pose_estimator.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_rls_and_indexes.sql
│   ├── 003_seed_subscription_plans.sql
│   ├── 004_seed_foods.sql
│   ├── 005_seed_breeds.sql
│   ├── 006_seed_supplements.sql
│   └── 007_seed_coupons.sql
│
├── Dockerfile
├── Dockerfile.ai_worker
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── Cargo.toml
├── README.md
└── .github/
    └── workflows/
        ├── ci.yml
        ├── deploy-staging.yml
        └── deploy-production.yml
```

## Cargo.toml 주요 의존성

```toml
[dependencies]
axum = { version = "0.7", features = ["macros", "multipart"] }
tokio = { version = "1", features = ["full"] }
sqlx = { version = "0.7", features = ["postgres", "runtime-tokio-native-tls", "uuid", "chrono", "json"] }
redis = { version = "0.25", features = ["tokio-comp"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
jsonwebtoken = "9"
uuid = { version = "1", features = ["v4", "serde"] }
chrono = { version = "0.4", features = ["serde"] }
reqwest = { version = "0.12", features = ["json", "stream"] }
aws-sdk-s3 = "1"
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace", "limit"] }
tracing = "0.1"
tracing-subscriber = "0.3"
anyhow = "1"
thiserror = "1"
dotenvy = "0.15"
envy = "0.4"
argon2 = "0.5"
```

---

# 14. Expo 모바일 구조

```
apps/mobile/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx           # 소셜 로그인 화면
│   │   ├── register.tsx
│   │   └── onboarding/
│   │       ├── _layout.tsx
│   │       ├── breed.tsx
│   │       ├── age-weight.tsx
│   │       └── profile.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx           # 홈
│   │   ├── health/
│   │   │   ├── index.tsx       # 건강 대시보드
│   │   │   ├── log.tsx         # 일일 기록
│   │   │   ├── timeline.tsx    # 증상 타임라인
│   │   │   ├── gait-video.tsx  # 보행 영상 업로드
│   │   │   ├── gait-result.tsx # 보행 분석 결과
│   │   │   └── report.tsx      # AI 리포트 생성
│   │   ├── discover/
│   │   │   ├── index.tsx       # 지도 뷰
│   │   │   ├── places/
│   │   │   │   ├── [id].tsx
│   │   │   │   └── filter.tsx
│   │   │   ├── vets/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── [id].tsx
│   │   │   │   └── emergency.tsx
│   │   │   └── travel/
│   │   │       └── safety-score.tsx
│   │   ├── guide/
│   │   │   ├── index.tsx
│   │   │   ├── food/
│   │   │   │   ├── index.tsx
│   │   │   │   └── [id].tsx
│   │   │   └── supplements/
│   │   │       ├── index.tsx
│   │   │       └── [id].tsx
│   │   └── community/
│   │       ├── index.tsx
│   │       ├── [boardSlug]/
│   │       │   ├── index.tsx
│   │       │   └── [postId].tsx
│   │       └── new-post.tsx
│   ├── profile/
│   │   ├── index.tsx
│   │   ├── subscription.tsx    # 요금제 선택
│   │   ├── coupon.tsx          # 쿠폰 입력
│   │   └── settings.tsx
│   └── _layout.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── StreamingText.tsx   # AI 스트리밍 출력
│   │   ├── CreditBar.tsx       # 크레딧 잔액 표시
│   │   └── PremiumGate.tsx     # 크레딧 부족 시 업그레이드 유도
│   ├── health/
│   │   ├── DailyLogModal.tsx
│   │   ├── SymptomTimeline.tsx
│   │   ├── AISummaryCard.tsx
│   │   ├── RiskBadge.tsx
│   │   ├── WeightChart.tsx
│   │   ├── GaitVideoUploader.tsx
│   │   ├── GaitResultCard.tsx
│   │   └── EmergencyModal.tsx
│   ├── discover/
│   │   ├── PlaceCard.tsx
│   │   ├── SuitabilityScore.tsx
│   │   ├── VetCard.tsx
│   │   └── MapView.tsx
│   ├── guide/
│   │   ├── FoodSafetyBadge.tsx
│   │   ├── SupplementCard.tsx
│   │   └── CESScoreBar.tsx
│   └── community/
│       ├── PostCard.tsx
│       ├── ReviewCard.tsx
│       └── TrustBadge.tsx
│
├── stores/
│   ├── authStore.ts
│   ├── dogStore.ts
│   ├── healthStore.ts
│   ├── creditStore.ts          # 크레딧 잔액 전역 상태
│   └── uiStore.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useHealthLogs.ts
│   ├── useAISummary.ts
│   ├── useGaitAnalysis.ts
│   ├── usePlaces.ts
│   ├── useVets.ts
│   ├── useSupplements.ts
│   ├── useCommunity.ts
│   └── useCredits.ts
│
├── lib/
│   ├── api.ts                  # axios 인스턴스 + JWT interceptor
│   ├── queryClient.ts
│   ├── notifications.ts
│   └── analytics.ts
│
├── types/
│   ├── api.ts
│   ├── dog.ts
│   ├── health.ts
│   ├── subscription.ts
│   └── gait.ts
│
├── constants/
│   ├── breeds.ts
│   ├── symptoms.ts
│   ├── riskLevels.ts
│   └── creditCosts.ts
│
├── app.json
├── eas.json
├── tailwind.config.js
└── tsconfig.json
```

---

# 15. OAuth 인증 흐름

## 카카오 로그인 (대표 예시)

```
모바일 앱                    Rust 백엔드               카카오
    │                            │                       │
    │  1. 카카오 로그인 버튼 클릭 │                       │
    │──────────────────────────────────────────────────► │
    │                            │    2. Authorization   │
    │  ◄──────────────────────────────────────────────── │
    │  3. auth_code 수신         │                       │
    │                            │                       │
    │  4. POST /api/auth/kakao   │                       │
    │     { code: "..." }        │                       │
    │─────────────────────────► │                       │
    │                            │  5. 토큰 교환         │
    │                            │──────────────────────►│
    │                            │  6. access_token      │
    │                            │◄──────────────────────│
    │                            │  7. 사용자 정보 요청  │
    │                            │──────────────────────►│
    │                            │  8. {id, email, ...} │
    │                            │◄──────────────────────│
    │                            │                       │
    │                            │  9. users + oauth_accounts upsert
    │                            │  10. JWT access_token 발급 (1h)
    │                            │  11. refresh_token 발급 (30d)
    │                            │  12. 신규 가입 시 WELCOME3000 쿠폰 자동 지급
    │                            │  13. 크레딧 10 초기 지급
    │  14. { access_token,       │
    │        refresh_token,      │
    │        user, is_new_user } │
    │◄─────────────────────────  │
```

## JWT 구조

```json
// Access Token Payload (1시간 만료)
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "subscription_tier": "basic",
  "credit_balance": 35.5,
  "iat": 1700000000,
  "exp": 1700003600
}

// Refresh Token (30일, DB 저장 + 해시)
// DB에 token_hash 저장, 만료/취소 관리
```

---

# 16. AI 보행 분석 파이프라인

## 전체 흐름

```
1. 사용자가 앱에서 영상 업로드 요청
   → GET /api/videos/upload-url
   → Rust: S3 Presigned PUT URL 발급 (5분 만료)

2. 앱 → S3 직접 PUT 업로드 (서버 우회, 대역폭 절약)

3. 업로드 완료 후 앱 → POST /api/videos
   → Rust: video_files 레코드 생성
   → 크레딧 5 차감 (usage_service)
   → gait_analysis_jobs 레코드 생성 (status: queued)
   → Redis Queue에 job_id Push

4. Python AI Worker (별도 프로세스/컨테이너)
   → Redis BLPOP으로 job_id 대기
   → PostgreSQL에서 job 상세 조회
   → S3에서 영상 다운로드
   → 프레임 추출 (1초당 5프레임)
   → MediaPipe/YOLO로 관절 포인트 감지
   → 보행 메트릭 계산:
       left_right_imbalance_score
       stride_irregularity_score
       limping_probability
       abnormality_score
   → 반려견 프로파일 (품종/나이/체중) 반영 보정
   → GPT-4o로 한국어 요약 및 권장 행동 생성
   → gait_analysis_results 저장
   → gait_analysis_jobs status → 'done'
   → Rust API 완료 알림 (webhook or polling)

5. Rust → FCM/APNs 푸시 알림 발송
   "보리의 보행 영상 분석이 완료되었습니다 🐾"

6. 앱 → GET /api/videos/:id/result
   → 결과 화면 표시
```

## AI 훈련 데이터셋 (AI Hub 공공 데이터)

```
핵심 데이터셋: 반려견 보행영상 기반 건강관리 데이터
출처: AI Hub (과학기술정보통신부)
URL: aihub.or.kr → 데이터셋 번호 71878
신청: 내국인 계정 생성 후 다운로드 승인 요청 (무료)

구성:
  보행영상:         2,094건 (MP4, 전/후/좌/우 4방향)
  키포인트 라벨:  126,092건 (JSON, 해부학적 14개 위치)
  대상 견종:        중소형 반려견 1,000마리+

슬개골 질환 중증도 분포:
  정상 (Grade 0): 56% — 70,293건
  1기  (Grade 1): 10% — 12,090건
  2기  (Grade 2): 14% — 18,045건
  3기  (Grade 3): 17% — 22,105건
  4기  (Grade 4):  3% —  3,559건

14개 해부학 키포인트 (라벨링 위치):
  앞다리: 어깨, 팔꿈치, 손목, 앞발
  뒷다리: 고관절, 무릎(슬개골), 발목, 뒷발
  몸통:   척추 기준점, 꼬리 기저부
  머리:   코끝, 귀(좌우)

검증된 AI 모델 (AI Hub 제공):
  YOLOv8     → 키포인트 검출   (PCK@0.5 ≥ 0.80 목표)
  ConvLSTM   → 중증도 분류     (정확도 ≥ 80% 목표)

구축 기관: 브랜드콘텐츠 + 대한수의사회 + 벳앤라이프 + 아몬드
라이선스: AI Hub 데이터 이용약관 (비상업적 연구/서비스 개발 허용)
          → 상업 서비스 전환 시 AI Hub 이용약관 재확인 필요

참고 데이터셋: 말(馬) 보행 분석 데이터 (AI Hub #71707)
  → 50개 관절 키포인트 방법론 참고
  → MMPOSE 아키텍처 참고 (개 키포인트 모델에 적용 가능)
```

## AI Worker 아키텍처 (AI Hub 데이터 기반)

```
훈련 데이터 흐름:
  AI Hub #71878 다운로드
    └── 영상 (MP4) + 라벨 (JSON)
    └── 훈련/검증/테스트 분할 (8:1:1)
    └── YOLOv8 fine-tune (키포인트 검출)
    └── ConvLSTM 훈련 (시계열 → 중증도 분류)
    └── 모델 저장: best_keypoint.pt, best_severity.pt
    └── Fly.io AI Worker에 탑재

추론 파이프라인 (사용자 영상 업로드 시):
  사용자 영상 (MP4, ≤30초)
    → 1초당 5프레임 추출 (OpenCV)
    → YOLOv8로 14개 키포인트 감지 (프레임별)
    → 키포인트 시계열 정규화
    → ConvLSTM으로 보행 패턴 분류
    → 보행 메트릭 계산:
        좌우 불균형 = |좌측하중 - 우측하중| / 전체하중
        보폭 불규칙성 = stride_length std / mean
        절뚝거림 확률 = ConvLSTM softmax 출력
        이상보행점수 = weighted_avg(불균형, 불규칙성, 확률)
    → 품종/나이/체중 보정 계수 적용
    → GPT-4o-mini로 한국어 요약 생성
    → 결과 DB 저장 + 푸시 알림
```

## AI Worker 핵심 코드 구조 (Python)

```python
# ai_worker/gait_analyzer.py
# 기반: AI Hub 반려견 보행영상 데이터 #71878
# 모델: YOLOv8 (키포인트) + ConvLSTM (중증도)

import cv2
import json
import numpy as np
from ultralytics import YOLO       # YOLOv8 (AI Hub 검증 모델)
from openai import OpenAI

# 14개 해부학 키포인트 인덱스 (AI Hub 라벨 기준)
KEYPOINTS = {
    "left_shoulder": 0,  "right_shoulder": 1,
    "left_elbow": 2,     "right_elbow": 3,
    "left_wrist": 4,     "right_wrist": 5,
    "left_front_paw": 6, "right_front_paw": 7,
    "left_hip": 8,       "right_hip": 9,
    "left_knee": 10,     "right_knee": 11,  # 슬개골
    "left_ankle": 12,    "right_ankle": 13,
}

class GaitAnalyzer:
    def __init__(self, keypoint_model_path: str, severity_model_path: str):
        # AI Hub 데이터로 fine-tune된 YOLOv8
        self.keypoint_model = YOLO(keypoint_model_path)
        # ConvLSTM 중증도 분류기 (Grade 0–4)
        self.severity_model = self._load_severity_model(severity_model_path)
        self.openai = OpenAI()

    def analyze(self, video_path: str, dog_profile: dict) -> dict:
        frames = self._extract_frames(video_path, fps=5)
        keypoints_seq = self._detect_keypoints(frames)      # (T, 14, 2)
        metrics = self._compute_gait_metrics(keypoints_seq)
        severity = self._classify_severity(keypoints_seq)   # Grade 0–4
        risk_level = self._map_severity_to_risk(severity, metrics, dog_profile)
        summary = self._generate_summary(metrics, severity, risk_level, dog_profile)

        return {
            "abnormality_score": metrics["abnormality_score"],
            "limping_probability": float(metrics["limping_prob"]),
            "left_right_imbalance_score": metrics["lr_imbalance"],
            "stride_irregularity_score": metrics["stride_irr"],
            "patella_grade_signal": severity["grade"],       # 0–4 (참고용)
            "joint_risk_signal": severity["joint_signal"],
            "risk_level": risk_level,
            "summary": summary["text"],
            "recommendations": summary["recommendations"],
            "recommended_specialty": "orthopedics" if severity["grade"] >= 2 else None,
            "disclaimer": "이 분석은 질병 진단이 아닙니다. 수의사 진료를 대체하지 않습니다.",
            "model_version": "yolov8-dog-kp-v1 + convlstm-severity-v1",
        }

    def _detect_keypoints(self, frames: list) -> np.ndarray:
        seq = []
        for frame in frames:
            results = self.keypoint_model(frame, verbose=False)
            if results[0].keypoints is not None:
                kp = results[0].keypoints.xy.cpu().numpy()[0]  # (14, 2)
                seq.append(kp)
        return np.array(seq)  # (T, 14, 2)

    def _compute_gait_metrics(self, kp_seq: np.ndarray) -> dict:
        # 좌우 발목 y좌표로 하중 불균형 계산
        left_y  = kp_seq[:, KEYPOINTS["left_ankle"],  1]
        right_y = kp_seq[:, KEYPOINTS["right_ankle"], 1]
        lr_imbalance = float(np.abs(left_y - right_y).mean() / (kp_seq[:, :, 1].mean() + 1e-6) * 100)

        # 보폭 불규칙성 (앞발 x좌표 변동)
        left_paw_x  = kp_seq[:, KEYPOINTS["left_front_paw"],  0]
        stride_irr  = float(np.std(np.diff(left_paw_x)) / (np.mean(np.abs(np.diff(left_paw_x))) + 1e-6) * 100)

        # 절뚝거림 확률 (무릎 대칭성)
        left_knee_y  = kp_seq[:, KEYPOINTS["left_knee"],  1]
        right_knee_y = kp_seq[:, KEYPOINTS["right_knee"], 1]
        knee_asym    = float(np.abs(left_knee_y - right_knee_y).mean())
        limping_prob = min(knee_asym / 50.0, 1.0)

        abnormality = (lr_imbalance * 0.4 + stride_irr * 0.3 + limping_prob * 100 * 0.3)

        return {
            "lr_imbalance": round(lr_imbalance, 1),
            "stride_irr": round(stride_irr, 1),
            "limping_prob": round(limping_prob, 3),
            "abnormality_score": round(min(abnormality, 100), 1),
        }

    def _map_severity_to_risk(self, severity: dict, metrics: dict, dog: dict) -> str:
        grade = severity["grade"]
        # 노령견 가중
        age_factor = 1.2 if dog.get("age_months", 0) > 84 else 1.0
        # 대형견 가중 (슬개골 부하)
        weight_factor = 1.1 if dog.get("weight_kg", 0) > 20 else 1.0
        adjusted = grade * age_factor * weight_factor

        if adjusted == 0:   return "normal"
        if adjusted < 1.5:  return "watch"
        if adjusted < 2.5:  return "caution"
        if adjusted < 3.5:  return "vet_recommended"
        return "emergency"

    def _generate_summary(self, metrics, severity, risk_level, dog_profile) -> dict:
        grade = severity["grade"]
        grade_desc = ["이상 없음", "경미한 이상", "중등도 이상", "심한 이상", "매우 심한 이상"][grade]

        prompt = f"""
Dog gait analysis result. Write Korean summary for pet owner.

Dog: breed={dog_profile['breed']}, age={dog_profile['age_months']}mo, weight={dog_profile['weight_kg']}kg
Metrics: abnormality={metrics['abnormality_score']}/100, lr_imbalance={metrics['lr_imbalance']}%, limping={metrics['limping_prob']*100:.0f}%
Gait grade: {grade}/4 ({grade_desc})
Risk: {risk_level}

Rules:
- Never say "diagnosed". Use "이상 신호 감지됨" or "가능성 확인됨".
- Warm tone. Max 180 chars for text.
- 3 concrete recommendations.
- If grade>=2, recommend orthopedic vet.

JSON: {{"text": "...", "recommendations": ["...", "...", "..."]}}
"""
        resp = self.openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_tokens=350,
        )
        return json.loads(resp.choices[0].message.content)
```

## 토큰 세이빙 전략

```
┌─────────────────────────────────────────────────────┐
│  AI API 토큰 절약 전략                               │
│                                                     │
│  1. 모델 분리                                        │
│     • 건강 요약 (중요) → GPT-4o (정확도 우선)        │
│     • 보행 분석 요약 → GPT-4o-mini (비용 절약)       │
│     • 음식 안전 검색 → DB 조회 우선, AI는 보완용     │
│     • 장소 적합도 → 수식 기반 (AI 미사용)           │
│                                                     │
│  2. 프롬프트 압축                                    │
│     • 한국어 아닌 영어로 시스템 프롬프트 작성        │
│     • 강아지 프로파일 JSON 직렬화 (간결)            │
│     • max_tokens 엄격 제한 (요약: 400, 리포트: 800) │
│                                                     │
│  3. 캐싱                                            │
│     • 음식 안전 결과 Redis 캐시 (24h)               │
│     • 동일 증상 패턴 응답 캐시 (1h)                 │
│     • 영양제 CES 점수 일일 재계산                   │
│                                                     │
│  4. 크레딧 제한                                      │
│     • 무료: AI 요약 10회/월 (자연적 비용 제한)      │
│     • 보행 영상: 크레딧 5 차감 (가장 비싼 기능)     │
└─────────────────────────────────────────────────────┘
```

---

# 17. .env.example & CI/CD

## .env.example (Rust 백엔드)

```bash
# 서버
HOST=0.0.0.0
PORT=8080
RUST_LOG=info

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/petplatform
DATABASE_MAX_CONNECTIONS=20

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-jwt-secret-256-bit
JWT_EXPIRES_IN_SECONDS=3600
REFRESH_TOKEN_EXPIRES_DAYS=30

# OAuth — 카카오
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret
KAKAO_REDIRECT_URI=https://api.your-domain.com/api/auth/kakao

# OAuth — 네이버
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
NAVER_REDIRECT_URI=https://api.your-domain.com/api/auth/naver

# OAuth — 구글
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://api.your-domain.com/api/auth/google

# OAuth — 애플
APPLE_CLIENT_ID=com.yourapp.petplatform
APPLE_TEAM_ID=YOUR_TEAM_ID
APPLE_KEY_ID=YOUR_KEY_ID
APPLE_PRIVATE_KEY_PATH=/secrets/apple_private_key.p8

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-northeast-2
S3_BUCKET_NAME=petplatform-media
S3_PRESIGNED_URL_EXPIRES_SECS=300

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL_SUMMARY=gpt-4o
OPENAI_MODEL_GAIT=gpt-4o-mini

# AI Worker 연동
AI_WORKER_WEBHOOK_SECRET=your-webhook-secret

# 결제
REVENUECAT_API_KEY=your-revenuecat-key
PORTONE_IMP_KEY=your-portone-imp-key
PORTONE_IMP_SECRET=your-portone-imp-secret

# 푸시 알림
FCM_SERVER_KEY=your-fcm-server-key
APNS_KEY_ID=your-apns-key-id
APNS_TEAM_ID=your-team-id

# 카카오 맵
KAKAO_MAP_API_KEY=your-kakao-map-key

# Sentry (에러 추적)
SENTRY_DSN=https://...@sentry.io/...

# 앱 설정
FRONTEND_URL=https://your-app-domain.com
MAX_VIDEO_SIZE_MB=200
MAX_PHOTO_SIZE_MB=10
```

## GitHub Actions CI

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  rust-check:
    name: Rust Lint & Test
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: petplatform_test
        ports: ["5432:5432"]
      redis:
        image: redis:7
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4
      - uses: dtolnay/rust-toolchain@stable
        with:
          components: rustfmt, clippy
      - uses: Swatinem/rust-cache@v2

      - name: Check formatting
        run: cargo fmt --all -- --check

      - name: Clippy
        run: cargo clippy --all-targets -- -D warnings

      - name: Run tests
        run: cargo test --all
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/petplatform_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret-for-ci-only

  mobile-check:
    name: Mobile Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
        working-directory: apps/mobile
      - run: npm run lint
        working-directory: apps/mobile
      - run: npm run typecheck
        working-directory: apps/mobile

  ai-worker-check:
    name: AI Worker Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
        working-directory: ai_worker
      - run: python -m pytest tests/
        working-directory: ai_worker
```

```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    tags: ['v*']

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t petplatform-api .
      - name: Push to Registry
        run: |
          docker tag petplatform-api ${{ secrets.REGISTRY_URL }}/petplatform-api:${{ github.ref_name }}
          docker push ${{ secrets.REGISTRY_URL }}/petplatform-api:${{ github.ref_name }}
      - name: Deploy to Server
        run: |
          # Railway / Fly.io / Naver Cloud 배포 명령
          flyctl deploy --image ${{ secrets.REGISTRY_URL }}/petplatform-api:${{ github.ref_name }}
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

  deploy-mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g eas-cli && npm ci
        working-directory: apps/mobile
      - run: eas build --platform all --profile production --non-interactive
        working-directory: apps/mobile
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
      - run: eas submit --platform all --non-interactive
        working-directory: apps/mobile
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## docker-compose.yml

```yaml
version: '3.9'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://petuser:petpass@postgres:5432/petplatform
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    env_file: .env

  ai_worker:
    build:
      context: ./ai_worker
      dockerfile: Dockerfile
    environment:
      REDIS_URL: redis://redis:6379
      DATABASE_URL: postgresql://petuser:petpass@postgres:5432/petplatform
    depends_on:
      - redis
      - postgres
    env_file: .env

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: petuser
      POSTGRES_PASSWORD: petpass
      POSTGRES_DB: petplatform
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

---

# 18. 수익화 모델

## 수익 구조

```
연 1 목표 매출: ₩1.4B (~$1.05M)

1. 프리미엄 구독 (Primary)
   무료 → Basic(₩3K) → Plus(₩5K) → Unlimited(₩6K)
   전환율 목표: MAU의 5%
   100K MAU × 5% × ₩4,600 avg = ₩23M/월

2. B2B 동물병원 대시보드 (Secondary)
   Basic ₩99K / Pro ₩199K / Premium ₩299K
   목표: 200개 병원 × ₩149K avg = ₩29.8M/월

3. 숙소 예약 커미션 (Tertiary)
   8–12% 커미션 (야놀자/굿초이스 API 파트너십)
   목표: ₩15M/월

4. 영양제 어필리에이트
   3–8% 커미션 (쿠팡파트너스, 개별 브랜드)
   목표: ₩8M/월

5. B2B 장소 광고
   피처드 리스팅 ₩50K–200K/월
   목표: ₩10M/월

6. 반려동물 보험 중개
   메리츠/현대해상/삼성화재 제휴
   목표: ₩5M/월
```

## 프리미엄 기능 게이트

| 기능 | 무료 | Basic | Plus | Unlimited |
|---|---|---|---|---|
| AI 건강 요약 | 월 10회 | 월 40 크레딧 | 월 70 크레딧 | 무제한 |
| 증상 타임라인 | 7일 | 30일 | 90일 | 전체 |
| 보행 영상 분석 | ❌ | 2회/월 | 14회/월 | 무제한 |
| 병원 방문 PDF | ❌ | ❌ | ✅ | ✅ |
| 영양제 CES 순위 | 상위 3개 | 상위 3개 | 전체 | 전체 |
| 반려견 등록 | 1마리 | 2마리 | 3마리 | 5마리 |
| 데이터 내보내기 | ❌ | ❌ | ✅ | ✅ |
| 우선 AI 처리 | ❌ | ❌ | ❌ | ✅ |

---

# 19. 법적 고지 & 의료 면책

## 필수 인앱 고지

```
1. 건강 요약 AI (모든 AI 출력에 포함)
   "이 분석은 참고용 정보이며 수의사의 진료를 대체하지 않습니다.
   반드시 수의사와 상담하세요."

2. 보행 영상 분석 (분석 전후 모두 표시)
   "본 서비스는 반려견의 보행 영상에서 이상 신호를 감지하여
   보호자에게 안내하는 보조 도구입니다.
   AI 분석 결과는 질병의 확정 진단이 아니며,
   수의사의 진료를 대체하지 않습니다.
   절뚝거림, 통증, 발작 등 이상 증상 시 즉시 동물병원에 방문하세요."

3. 영양제 추천
   "영양제 추천은 의약품 처방이 아닙니다.
   복용 중인 약이 있거나 기저질환이 있는 경우 수의사와 상담하세요."

4. 응급 모달
   "이 정보는 응급 동물병원 위치 안내입니다.
   의료 진단이 아니며 즉시 수의사에게 연락하세요."

5. 커뮤니티
   "커뮤니티 게시물은 사용자 경험담이며 전문 의료 조언이 아닙니다."
```

## 한국 법률 준수 체크리스트

```
✅ 개인정보보호법 (PIPA)
   • 한국어 개인정보처리방침 (필수)
   • 건강 데이터 수집 명시적 동의
   • 데이터 보유 정책 (최대 3년 후 익명화)
   • 5만명 이상 시 개인정보보호위원회 신고

✅ 의료기기법
   • AI 출력 = "정보 제공" (진단 아님)
   • 1등급 의료기기 분류 방지를 위한 표현 관리

✅ 전자상거래법
   • 구독 약관, 해지 정책 (14일 청약철회)
   • 쿠폰 이용 약관

✅ 표시광고법
   • 병원/영양제 추천: 광고/제휴 명시
   • 입증되지 않은 건강 효능 주장 금지

특허 출원 전략:
  • PCT 출원: 최초 공개 후 12개월 이내
  • 우선 관할: KR, US, JP
  • 잠정 특허 출원 (US): MVP 출시 후 3개월 이내
```

---

# 20. 런치 로드맵

```
Phase 0 — 기반 구축 (1–2개월)
  • Rust 백엔드 프로젝트 셋업
  • PostgreSQL 스키마 마이그레이션
  • 4개 OAuth 로그인 구현
  • JWT + Refresh Token 시스템
  • 음식/품종 DB 시딩 (1,000+ 음식, 200 품종)
  • 디자인 시스템 (NativeWind 테마)
  • 내부 알파: 20명 테스터
  KPI: TestFlight + Play 내부 테스트 동작

Phase 1 — 클로즈드 베타 (3–4개월)
  • 일일 건강 기록 + AI 요약
  • 증상 타임라인 (7일)
  • 음식 안전 검색
  • 근처 동물병원 (카카오 맵)
  • 커뮤니티 게시판 3개
  • 요금제 3종 + 쿠폰 시스템
  • 클로즈드 베타: 500명 (강아지 카페 파트너십)
  KPI: D7 리텐션 > 45%, NPS > 50

Phase 2 — 공개 출시 (5–6개월)
  • App Store + Google Play 공개
  • 보행 영상 AI 분석 (MVP)
  • 병원 방문 전 AI 리포트 PDF
  • 영양제 CES 추천
  • 게시판 8개 전체
  • 잠정 특허 출원 (KR + US)
  KPI: 10,000 MAU, 구독자 300명, 앱스토어 4.5+★

Phase 3 — 성장 (7–12개월)
  • B2B 동물병원 대시보드 (50개 파트너)
  • 애견동반 숙소 예약
  • 여행 코스 안전도 점수
  • 허위 후기 탐지 AI
  • PCT 특허 출원
  • Series A 투자 유치 시작
  KPI: 50,000 MAU, ₩50M MRR

Phase 4 — 스케일 (13–18개월)
  • 100,000 MAU 목표
  • 일본/대만 현지화
  • 웨어러블 연동
  • 반려동물 보험 파트너십
  • Series A 클로즈
  KPI: 100,000 MAU, ₩150M MRR
```

---

# 21. 투자자 & 정부지원 요약

## 시드 라운드 One-Pager

```
나아파 | Seed Round ₩2B 목표

문제:
  520만 반려견 가구가 연 ₩6.2T를 지출하지만
  AI 기반 통합 플랫폼이 없다.

솔루션:
  • 실시간 건강 모니터링 (5단계 위험도)
  • 보행 영상 AI 이상 감지 (세계 최초 소비자용)
  • 품종/나이/체중 개인화 추천 (건강+장소+음식+영양제+병원)

기술 차별점:
  • Rust 백엔드 (경쟁 앱 대비 3–5배 성능, 서버비 절감)
  • Python AI Worker + MediaPipe 보행 분석
  • 특허 출원 예정 8개 발명

트랙션 (출시 시점):
  • 클로즈드 베타 500명 (D7: 52%, NPS: 61)
  • 동물병원 LOI 3개
  • 앱스토어 4.7★

비즈니스 모델:
  • B2C SaaS: ₩3K–6K/월
  • B2B SaaS: ₩99K–299K/월
  • 어필리에이트 + 예약 커미션

자금 사용:
  • 엔지니어링 3명: ₩900M
  • AI/데이터 1명: ₩300M
  • 마케팅: ₩400M
  • 콘텐츠 DB: ₩150M
  • 특허 출원: ₩100M
  • 운영/법무: ₩150M

매출 전망:
  Year 1: 50K MAU, ₩600M ARR
  Year 2: 200K MAU, ₩3B ARR
  Year 3: 500K MAU, ₩10B ARR

엑시트:
  전략적: 카카오, 네이버, CJ ENM, Mars Pet Care
  재무적: KOSDAQ IPO (2030)
```

## 정부지원사업 후보

| 사업명 | 기관 | 금액 | 적합성 |
|---|---|---|---|
| TIPS | 중기부 | ₩5B/3년 | AI + 스타트업 |
| 예비창업패키지 | 창진원 | ₩100M | 초기 |
| 창업도약패키지 | 창진원 | ₩300M | 성장 |
| 동물복지 R&D | 농림부 | ₩200M–1B | 펫 헬스 AI |
| AI 바우처 | NIA | ₩96M | AI API 비용 |
| ICT R&D | IITP | ₩500M | AI 기술 |

**핵심 피칭 포인트:** "동물복지 + AI 헬스케어" — 농림부(MAFRA)와 과기부(MSIT) 두 부처 사업에 동시 지원 가능.

---

# 부록 — 빠른 참조

## 위험도 5단계

| 단계 | 한국어 | 영어 | 색상 | 즉각 행동 |
|---|---|---|---|---|
| NORMAL | 정상 | Normal | 🟢 | 계속 관찰 |
| WATCH | 주의관찰 | Watch | 🟡 | 24h 후 재확인 |
| CAUTION | 주의 | Caution | 🟠 | 48–72h 내 병원 |
| VET_RECOMMENDED | 진료 권장 | Vet Recommended | 🔴 | 오늘 병원 연락 |
| EMERGENCY | 긴급 | Emergency | 🚨 | 지금 즉시 응급병원 |

## 크레딧 차감 빠른 참조

| 기능 | 크레딧 | Basic(40) | Plus(70) | Unlimited(300) |
|---|---|---|---|---|
| AI 건강 요약 | 1 | 40회 | 70회 | 300회 |
| 음식 안전 검색 | 0.2 | 200회 | 350회 | 1500회 |
| 병원 추천 | 0.5 | 80회 | 140회 | 600회 |
| 영양제 추천 | 0.5 | 80회 | 140회 | 600회 |
| 보행 영상 분석 | 5 | 8회 | 14회 | 60회 |
| 리포트 PDF | 3 | 13회 | 23회 | 100회 |
| 여행 안전도 | 2 | 20회 | 35회 | 150회 |

## 영양제 카테고리

| 카테고리 | 한국어 | 주요 성분 | 주요 품종 |
|---|---|---|---|
| joints | 관절 | 글루코사민, 콘드로이틴 | 대형견, 노령견 |
| skin | 피부 | 오메가3, 비타민E | 불독, 리트리버 |
| probiotics | 유산균 | Lactobacillus | 전 품종 |
| tear_stains | 눈물자국 | 로즈힙, 빌베리 | 비숑, 푸들, 시츄 |
| dental | 구강 | 클로르헥시딘 | 전 품종 |
| heart | 심장 | 타우린, 코큐텐 | 카발리에, 도베르만 |
| senior | 노령견 | 멀티비타민, 항산화 | 7세+ |

---

---

# 22. 개발 기간 계획서 (토큰 세이빙 전략 포함)

## 전제 조건 & 팀 구성

```
최소 팀 (1인 또는 소규모):
  • 개발자 1명 (풀스택 — Rust 백엔드 + React Native)
  • AI 서포트: Claude / GPT-4o 코드 생성 적극 활용
  • 디자인: Figma Community 템플릿 + NativeWind

권장 팀 (2–3명):
  • Rust 백엔드 1명
  • React Native 1명
  • AI/ML (Python Worker) 1명 (파트타임 가능)

개발 환경:
  MacBook Pro M3 or Windows + WSL2
  VS Code + rust-analyzer + ESLint
  Docker Desktop (로컬 Postgres + Redis)
  Expo Go (모바일 빠른 테스트)
```

## 주차별 상세 개발 계획

### Week 1–2: 기반 셋업 (예상: 80시간)

```
Day 1–3: 환경 구성 & 프로젝트 뼈대
  ✅ Rust + Axum 프로젝트 init
  ✅ docker-compose.yml (Postgres 16 + Redis 7)
  ✅ SQLx 마이그레이션 시스템 구성
  ✅ 001_initial_schema.sql 실행 (users, dogs, health_logs)
  ✅ AppState (DB pool, Redis pool, S3 client) 구성
  ✅ config.rs (envy 기반 환경변수)
  ✅ error.rs + response.rs (표준 응답 래퍼)
  예상 시간: 24h

Day 4–7: OAuth 4종 구현
  ✅ POST /api/auth/kakao
  ✅ POST /api/auth/naver
  ✅ POST /api/auth/google
  ✅ POST /api/auth/apple
  ✅ JWT 발급 + Refresh Token DB 저장
  ✅ auth_middleware.rs (모든 보호 라우트 적용)
  ✅ 신규 가입 시 WELCOME3000 쿠폰 자동 지급 로직
  ✅ 크레딧 10 초기 지급
  예상 시간: 32h

Day 8–14: Expo 앱 셋업 + 로그인 화면
  ✅ Expo 프로젝트 init (TypeScript + NativeWind)
  ✅ Expo Router 탭 구조 설정
  ✅ authStore (Zustand) + JWT 저장 (SecureStore)
  ✅ api.ts (axios + JWT interceptor + 401 자동 refresh)
  ✅ 로그인 화면 (카카오/네이버/구글/애플 버튼)
  ✅ 온보딩 화면 (반려견 프로필 등록 3단계)
  예상 시간: 24h

Week 1-2 토큰 세이빙 포인트:
  → AI에게 "Axum boilerplate with SQLx, JWT, CORS" 통째로 생성 요청
  → OAuth 구현은 각 provider 공식 문서 + AI 코드 생성 조합
  → 커스텀 로직보다 crate 활용 극대화
```

### Week 3–4: 핵심 건강 기록 + AI 요약 (예상: 80시간)

```
Day 15–18: 건강 기록 CRUD
  ✅ POST /api/health-logs (기록 생성)
  ✅ GET  /api/health-logs?dog_id=&date_from=&date_to=
  ✅ GET  /api/health-logs/:id
  ✅ DailyLogModal.tsx (5단계 바텀시트)
  ✅ SymptomTimeline.tsx (7일 시각화)
  예상 시간: 28h

Day 19–21: AI 건강 요약 (스트리밍)
  ✅ POST /api/health-logs/:id/ai-summary
  ✅ OpenAI GPT-4o 스트리밍 연동 (Rust reqwest stream)
  ✅ 크레딧 1 차감 → usage_events 기록
  ✅ 위험도 5단계 판별 + EMERGENCY 시 즉시 응급병원 표시
  ✅ StreamingText.tsx (실시간 타이핑 효과)
  ✅ AISummaryCard.tsx + RiskBadge.tsx
  예상 시간: 20h

Day 22–28: 요금제 + 크레딧 + 쿠폰
  ✅ subscription_plans 시드 데이터 삽입
  ✅ GET  /api/subscriptions/plans
  ✅ GET  /api/subscriptions/status
  ✅ POST /api/coupons/redeem (WELCOME3000 사용)
  ✅ GET  /api/usage/me (크레딧 잔액 조회)
  ✅ usage_gate.rs 미들웨어 (크레딧 부족 시 402 반환)
  ✅ subscription.tsx (요금제 선택 화면)
  ✅ CreditBar.tsx (크레딧 잔액 상단 표시)
  ✅ PremiumGate.tsx (크레딧 부족 시 업그레이드 유도)
  예상 시간: 32h

Week 3-4 토큰 세이빙 포인트:
  → AI 요약 시스템 프롬프트는 영어로 작성 (토큰 30% 절약)
  → max_tokens: 600 엄격 제한
  → 크레딧 차감은 DB 트랜잭션 1회로 묶어서 처리
```

### Week 5–6: 음식 가이드 + 병원 검색 + 장소 (예상: 80시간)

```
Day 29–33: 음식 DB + 개인화 검색
  ✅ 004_seed_foods.sql (1,000+ 음식 데이터)
  ✅ GET /api/foods/search?q=&dog_id=
      → 반려견 알러지·기저질환 교차 필터 자동 적용
  ✅ GET /api/foods/:id (개인화 안전 등급 + 허용량 계산)
  ✅ FoodSafetyBadge.tsx (SAFE/LIMITED/TOXIC 뱃지)
  ✅ 검색 결과 Redis 캐시 24h
  예상 시간: 24h

Day 34–38: 동물병원 검색 (카카오 맵 연동)
  ✅ vet_facilities 시드 데이터 (서울 500+ 병원)
  ✅ GET /api/vets/search?lat=&lng=&radius=&specialty=
      → Haversine 거리 계산 (geo.rs)
  ✅ GET /api/vets/emergency (응급병원 우선 정렬)
  ✅ GET /api/vets/recommend?dog_id=&symptoms=
      → 증상→전문과 매핑 + VetScore 계산
  ✅ MapView.tsx (카카오 맵 SDK 연동)
  ✅ VetCard.tsx + EmergencyModal.tsx
  예상 시간: 32h

Day 39–42: 애견동반 장소 리스트
  ✅ places 시드 데이터 (서울 300+ 장소)
  ✅ GET /api/places/search?lat=&lng=&category=&dog_id=
      → 적합도 점수 계산 (수식 기반, AI 미사용)
  ✅ PlaceCard.tsx + SuitabilityScore.tsx
  예상 시간: 24h

Week 5-6 토큰 세이빙 포인트:
  → 음식 안전 검색은 DB 쿼리 우선, AI 호출 없음
  → 장소 적합도는 수식 기반 (AI 비용 0원)
  → 병원 추천도 점수 계산만, 설명 텍스트는 템플릿 기반
```

### Week 7–8: 커뮤니티 + 푸시 알림 + POC 배포 (예상: 80시간)

```
Day 43–47: 커뮤니티 기본
  ✅ GET/POST /api/community/boards
  ✅ GET/POST /api/community/posts
  ✅ POST /api/community/posts/:id/like
  ✅ POST /api/community/reviews
  ✅ PostCard.tsx + ReviewCard.tsx
  ✅ 신규 게시글 trust_score 50 기본값
  예상 시간: 28h

Day 48–50: 푸시 알림
  ✅ Expo Notifications 등록 + 토큰 DB 저장
  ✅ 일일 건강 체크 리마인더 (오전 7:30)
  ✅ EMERGENCY 위험도 시 즉각 푸시
  ✅ 보행 영상 분석 완료 시 푸시
  예상 시간: 16h

Day 51–56: POC 배포 (아래 섹션 23 상세 참조)
  ✅ Fly.io 백엔드 배포
  ✅ Supabase Storage → 임시 S3 대체
  ✅ TestFlight (iOS) + Play 내부 테스트 (Android)
  ✅ GitHub Actions CI 연동
  ✅ 내부 테스터 20명 초대
  예상 시간: 36h
```

### Week 0 (선행): AI Hub 데이터 신청 (예상: 4–7일 승인 대기)

```
개발 시작 전 즉시 진행:

  1. AI Hub 회원가입
     → aihub.or.kr → 회원가입 (내국인 필수)

  2. 데이터셋 신청 (2건 동시 신청)
     → 반려견 보행영상 기반 건강관리 데이터 (#71878)
        신청 사유: "반려견 보행 이상 감지 AI 서비스 개발을 위한 모델 훈련"
     → 말 보행 데이터 (#71707) [방법론 참고용]
        신청 사유: "보행 키포인트 분석 방법론 연구"

  3. 승인 대기 (보통 3–7 영업일)
     → 승인 시 이메일 수신 → API 다운로드 링크 활성화

  4. 다운로드 환경 준비
     → Linux 또는 WSL2 필수 (Windows 직접 다운로드 불가)
     → 분할 압축 해제: 영상 ~50GB, 라벨 ~2GB 예상
     → GPU 있는 환경 권장 (훈련용) — 없으면 Google Colab Pro 활용

  5. 데이터 탐색 & 전처리 스크립트 작성
     → JSON 라벨 파싱 → keypoint_sequences.npy 변환
     → train/val/test 분할 (8:1:1)
     → 데이터 증강: 좌우 반전, 밝기 조정, 속도 변환

  비용: 데이터 무료 (AI Hub 공공 데이터)
        훈련 비용: Google Colab Pro $10/월 또는 로컬 GPU
```

### Week 9–10: 보행 영상 AI (Phase 2 선행) (예상: 80시간)

```
Day 57–60: YOLOv8 키포인트 모델 훈련
  ✅ AI Hub 데이터 다운로드 완료 확인
  ✅ 데이터 전처리: JSON 라벨 → YOLO 포맷 변환
  ✅ YOLOv8-pose fine-tune (14개 키포인트)
     베이스 모델: yolov8m-pose.pt (pretrained COCO)
     훈련: 100 epochs, batch=16, img=640
     목표: PCK@0.5 ≥ 0.80
  ✅ 모델 저장: best_keypoint.pt
  예상 시간: 24h (훈련 포함, Colab 기준 약 6–8h GPU)

Day 61–63: ConvLSTM 중증도 분류 모델
  ✅ 키포인트 시계열 → ConvLSTM 입력 형태 변환 (T, 14, 2)
  ✅ Grade 0–4 분류 모델 훈련
     목표: 정확도 ≥ 80%
  ✅ 모델 저장: best_severity.pt
  ✅ 두 모델 통합 파이프라인 테스트
  예상 시간: 20h

Day 64–66: Python AI Worker 서버
  ✅ ai_worker/ 프로젝트 셋업 (requirements.txt)
  ✅ gait_analyzer.py (위 코드 기반)
  ✅ Redis Queue 연동 (BLPOP)
  ✅ PostgreSQL 결과 저장
  ✅ 모델 파일 Dockerfile에 포함 (COPY best_*.pt)
  예상 시간: 16h

Day 67–70: 영상 업로드 파이프라인 (Rust)
  ✅ POST /api/videos/upload-url (R2 Presigned URL)
  ✅ POST /api/videos (업로드 완료 등록 + 크레딧 5 차감)
  ✅ GET  /api/videos/:id/status (폴링)
  ✅ GET  /api/videos/:id/result
  ✅ GaitVideoUploader.tsx (영상 촬영 가이드 + 업로드)
  ✅ GaitResultCard.tsx (분석 결과 시각화)
  예상 시간: 20h

Week 9-10 토큰 세이빙 포인트:
  → 보행 분석 요약은 gpt-4o-mini (4o 대비 90% 비용 절약)
  → 요약 max_tokens: 350 제한 (영어 프롬프트)
  → 동일 영상 재분석 요청 차단 (job 중복 방지)
  → 키포인트 추출은 로컬 YOLOv8 (OpenAI API 불필요)
  → ConvLSTM 추론은 로컬 모델 (OpenAI API 불필요)
  → AI API는 요약 텍스트 생성에만 사용
```

## 전체 개발 일정 요약

```
┌──────────────────────────────────────────────────────────────────┐
│  개발 기간 요약 (1인 기준, 풀타임 8h/day)                         │
│                                                                  │
│  Week 1–2   (14일)  기반 셋업 + OAuth 4종 + Expo 앱             │
│  Week 3–4   (14일)  건강 기록 + AI 요약 + 요금제/크레딧          │
│  Week 5–6   (14일)  음식 가이드 + 병원 + 장소                    │
│  Week 7–8   (14일)  커뮤니티 + 푸시 알림 + POC 배포             │
│  Week 9–10  (14일)  보행 영상 AI Worker + 업로드 파이프라인      │
│                                                                  │
│  총 개발 기간: 10주 (약 2.5개월)                                  │
│  총 예상 시간: 400h (1인 풀타임 기준)                             │
│                                                                  │
│  2인팀 기준: 5–6주 (병렬 개발)                                    │
│  3인팀 기준: 3–4주 (백엔드/모바일/AI 병렬)                        │
└──────────────────────────────────────────────────────────────────┘
```

## AI 코드 생성 토큰 세이빙 가이드

```
┌──────────────────────────────────────────────────────────────────┐
│  개발 시 AI 사용 토큰 절약 전략                                    │
│                                                                  │
│  1. 맥락 압축 요청 방식                                           │
│     ❌ 나쁜 예: "Rust Axum으로 카카오 로그인 만들어줘"            │
│     ✅ 좋은 예: "Axum 0.7, SQLx, JWT, Kakao OAuth.               │
│               POST /auth/kakao handler.                           │
│               Input: {code}. Output: {access_token,              │
│               refresh_token, user, is_new_user}.                  │
│               Use existing AppState{db, redis}.                   │
│               No explanation, just code."                         │
│                                                                  │
│  2. 파일 단위 생성 → 수정 최소화                                  │
│     → 한 번 요청으로 완전한 service + handler + model 생성         │
│     → 이후 수정은 diff만 요청                                      │
│                                                                  │
│  3. 반복 구조는 1개만 생성 후 패턴 복사                           │
│     → dogs CRUD 완성 후, health_logs/supplements는 패턴 복사      │
│     → AI에게 "Same pattern as dogs CRUD"로 요청                  │
│                                                                  │
│  4. SQL 마이그레이션은 스키마 정의 후 일괄 생성                   │
│     → 전체 테이블 목록 + 관계를 한 번에 주고 SQL 생성 요청        │
│                                                                  │
│  5. 프롬프트 템플릿 저장 후 재사용                                 │
│     → /prompts/rust-handler.md 저장                              │
│     → /prompts/rn-component.md 저장                              │
│     → 매번 컨텍스트 재설명 불필요                                  │
└──────────────────────────────────────────────────────────────────┘
```

## OpenAI API 비용 예측 (월간)

```
POC 단계 (DAU 100명, 300 requests/day):

  AI 건강 요약 (gpt-4o):
    Input:  ~800 tokens × 200회/일 = 160K tokens/일
    Output: ~400 tokens × 200회/일 = 80K tokens/일
    월간: 4.8M input + 2.4M output
    비용: $19.2 + $32.4 = ~$52/월

  보행 분석 요약 (gpt-4o-mini):
    Input:  ~300 tokens × 50회/일 = 15K tokens/일
    Output: ~200 tokens × 50회/일 = 10K tokens/일
    월간: 450K input + 300K output
    비용: ~$0.23/월

  음식 안전 (DB 캐시):  $0/월 (AI 미사용)
  장소 적합도 (수식):   $0/월 (AI 미사용)

  POC 단계 총 AI 비용: ~$55/월

베타 단계 (DAU 1,000명):
  예상 AI 비용: ~$400–600/월
  → 구독 매출 ₩1.5M (150명 × ₩10K) >> AI 비용 ₩800K
  → 흑자 구조 달성
```

---

# 23. POC 배포 계획 (구체적)

## 배포 환경 선택 기준

```
POC 목표:
  • 실제 기기에서 동작하는 앱
  • 테스터 20명이 실제로 사용 가능
  • 서버 비용 월 $0–30 이내
  • 배포까지 최대 1일 소요
  • 추후 프로덕션으로 마이그레이션 용이
```

## 백엔드 배포: Fly.io (1순위 추천)

```
선택 이유:
  ✅ Rust 바이너리 Docker 배포에 최적화
  ✅ 한국 인접 리전: nrt (Tokyo) — 레이턴시 ~30ms
  ✅ Free tier: shared-cpu-1x, 256MB RAM — POC에 충분
  ✅ PostgreSQL 매니지드 서비스 포함 (Fly Postgres)
  ✅ Redis 매니지드 서비스 포함 (Fly Redis - Upstash)
  ✅ 배포 1줄: flyctl deploy
  ✅ 자동 HTTPS + 커스텀 도메인

배포 절차:
  1. flyctl auth login
  2. fly launch  (fly.toml 자동 생성)
  3. fly secrets set DATABASE_URL=... OPENAI_API_KEY=... (환경변수)
  4. fly postgres create --name petplatform-db
  5. fly redis create --name petplatform-redis
  6. flyctl deploy
  → 완료. https://petplatform-api.fly.dev

fly.toml:
  app = "petplatform-api"
  primary_region = "nrt"

  [build]
    dockerfile = "Dockerfile"

  [http_service]
    internal_port = 8080
    force_https = true
    auto_stop_machines = true   # 무료 티어: 비활성 시 중지
    auto_start_machines = true

  [[vm]]
    cpu_kind = "shared"
    cpus = 1
    memory_mb = 256

월 비용: $0 (무료 티어)
  → 트래픽 증가 시: $5–10/월 (shared-cpu-1x 256MB)
  → 프로덕션 전환 시: $20–40/월 (dedicated-cpu-1x 1GB)
```

## 백엔드 배포: Railway (2순위 대안)

```
선택 이유:
  ✅ GitHub 연동 자동 배포 (PR merge → 자동 배포)
  ✅ PostgreSQL + Redis 원클릭 추가
  ✅ 한국어 친화적 대시보드
  ✅ 무료 크레딧 $5/월

단점:
  ❌ 무료 티어 월 500시간 제한 (POC 단계 주의)
  ❌ 도쿄 리전 없음 (가장 가까운 곳: 싱가포르)

배포 절차:
  1. railway.app → New Project → Deploy from GitHub
  2. Variables 탭에서 환경변수 설정
  3. PostgreSQL + Redis 서비스 추가
  4. Custom Domain 설정

월 비용: $0–5 (무료 크레딧 내)
```

## 백엔드 배포: Render (3순위 대안)

```
선택 이유:
  ✅ Docker 배포 지원
  ✅ PostgreSQL 무료 (90일, 1GB)
  ✅ 자동 배포 (GitHub 연동)

단점:
  ❌ 무료 티어: 15분 비활성 시 슬립 (첫 요청 30초 지연)
  ❌ Redis 유료 ($10/월~)
  → POC 초기 단계에서 Redis 없이 운영하면 사용 가능

월 비용: $0 (무료 PostgreSQL 기간 내)
```

## POC 배포 최종 구성

```
┌─────────────────────────────────────────────────────────────────┐
│  POC 배포 스택 (월 $0–15)                                        │
│                                                                 │
│  Rust API 서버     → Fly.io (nrt, shared-cpu-1x 256MB)         │
│  PostgreSQL        → Fly Postgres (1GB, 무료 티어)              │
│  Redis             → Fly Redis / Upstash (무료 10K cmd/day)    │
│  파일 스토리지      → Cloudflare R2 (무료 10GB/월)              │
│  모바일 앱 (iOS)   → TestFlight (내부 테스터 100명 무료)         │
│  모바일 앱 (Android)→ Play 내부 테스트 (무료)                   │
│  AI               → OpenAI API (POC: ~$55/월)                  │
│  도메인           → Namecheap (연 $10)                          │
│  CI/CD            → GitHub Actions (무료)                       │
│  모니터링          → Fly.io 기본 메트릭 (무료)                   │
│                                                                 │
│  총 월 인프라 비용: ~$70/월 (AI API 포함)                        │
│  총 월 인프라 비용: ~$15/월 (AI API 제외)                        │
└─────────────────────────────────────────────────────────────────┘
```

## Cloudflare R2 파일 스토리지 설정

```
S3 대체로 Cloudflare R2 선택 이유:
  ✅ 무료: 10GB 스토리지, 1M 요청/월
  ✅ AWS S3 호환 API (코드 변경 최소)
  ✅ Egress 무료 (S3는 출력 트래픽 과금)
  ✅ 전세계 CDN 자동 적용

설정:
  1. Cloudflare 대시보드 → R2 → 버킷 생성: petplatform-media
  2. API 토큰 생성 (R2 읽기/쓰기 권한)
  3. .env 수정:
     AWS_ACCESS_KEY_ID=<r2-access-key>
     AWS_SECRET_ACCESS_KEY=<r2-secret-key>
     AWS_REGION=auto
     S3_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
     S3_BUCKET_NAME=petplatform-media
  4. aws-sdk-s3 crate의 endpoint_url() 설정으로 R2 사용

Dockerfile (멀티스테이지 빌드):
  FROM rust:1.78-slim AS builder
  WORKDIR /app
  COPY . .
  RUN apt-get update && apt-get install -y pkg-config libssl-dev
  RUN cargo build --release

  FROM debian:bookworm-slim
  RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
  COPY --from=builder /app/target/release/pet-platform-api /usr/local/bin/
  EXPOSE 8080
  CMD ["pet-platform-api"]

빌드 결과 바이너리: ~15MB (Rust 릴리즈 빌드)
컨테이너 이미지: ~80MB
```

## Python AI Worker 배포

```
POC 단계 배포 옵션:

옵션 A: Fly.io (백엔드와 같은 플랫폼) ← 추천
  fly launch --dockerfile Dockerfile.ai_worker
  fly scale count 1 --app petplatform-ai-worker
  월 비용: $0 (무료 티어 내)

옵션 B: Modal.com (서버리스 GPU/CPU)
  - 영상 분석은 CPU로도 가능 (MediaPipe)
  - 사용량 기반 과금: 초당 $0.00016 (CPU)
  - POC 월 비용: ~$5–10
  - 장점: 콜드 스타트 없음, 자동 스케일링

옵션 C: Render (무료 웹 서비스)
  - 슬립 문제 있지만 POC 단계에서 허용 가능
  - 월 비용: $0

POC 추천: Fly.io (백엔드와 같은 플랫폼, 내부 통신 지연 최소)
```

## iOS 배포: TestFlight

```
절차:
  1. Apple Developer 계정 ($99/년) 필요
  2. eas.json 설정:
     {
       "build": {
         "preview": {
           "distribution": "internal",
           "ios": { "simulator": false }
         }
       }
     }
  3. 빌드: eas build --platform ios --profile preview
  4. 제출: eas submit --platform ios --profile preview
  5. App Store Connect → TestFlight → 내부 테스터 초대
  6. 테스터에게 TestFlight 앱 설치 후 초대 이메일로 설치

제한: 내부 테스터 100명, 외부 테스터 10,000명 (심사 필요)
소요 시간: 빌드 15분 + TestFlight 처리 30분 = 약 1시간
```

## Android 배포: Play 내부 테스트

```
절차:
  1. Google Play Console 계정 ($25 일회성)
  2. eas build --platform android --profile preview
  3. eas submit --platform android --profile preview
     OR 직접 .apk/.aab 업로드
  4. Play Console → 내부 테스트 → 테스터 추가 (이메일 목록)
  5. 테스터: 초대 링크로 즉시 설치

제한: 내부 테스터 100명
소요 시간: 빌드 10분 + Play 처리 수시간 (첫 번째만)
```

## POC 배포 Day-by-Day 실행 계획

```
Day 51 (오전): 인프라 셋업
  09:00 Fly.io 계정 생성 + flyctl 설치
  09:30 fly launch (fly.toml 생성)
  10:00 fly postgres create + fly redis create
  10:30 fly secrets set (환경변수 20개 입력)
  11:00 Cloudflare R2 버킷 생성 + API 토큰 발급
  11:30 .env.example → 실제 값으로 채운 .env.fly 작성

Day 51 (오후): 백엔드 배포
  13:00 Dockerfile 멀티스테이지 빌드 테스트 (로컬)
  14:00 flyctl deploy (첫 배포 — 약 5분 소요)
  14:30 마이그레이션 실행: fly ssh console → sqlx migrate run
  15:00 시드 데이터 실행 (음식 1000개, 품종 200개)
  15:30 API 동작 확인: curl https://petplatform-api.fly.dev/health
  16:00 OAuth redirect URI를 fly.dev 주소로 카카오/네이버/구글/애플 설정
  17:00 백엔드 배포 완료 ✅

Day 52: 모바일 앱 빌드 + 배포
  09:00 app.json API URL을 fly.dev로 수정
  09:30 eas build --platform all --profile preview (병렬 빌드, 약 15분)
  10:00 iOS: eas submit → TestFlight 처리 대기
  10:00 Android: eas submit → Play 내부 테스트 업로드
  11:00 Expo Go로 개발 빌드 먼저 테스트 (즉시)
  14:00 TestFlight 처리 완료 → 내부 테스터 20명 초대
  15:00 Android Play 내부 테스트 링크 공유
  17:00 모바일 배포 완료 ✅

Day 53: AI Worker 배포
  09:00 Python requirements.txt + Dockerfile.ai_worker 작성
  10:00 MediaPipe 로컬 테스트 (테스트 영상 1개)
  11:00 fly launch --dockerfile Dockerfile.ai_worker
        --app petplatform-ai-worker
  12:00 Redis Queue 연동 테스트 (로컬 → fly Redis)
  14:00 실제 강아지 영상 업로드 → 분석 결과 확인
  16:00 AI Worker 배포 완료 ✅

Day 54–56: 테스터 피드백 수집 & 버그 수정
  → 테스터 20명 실제 사용
  → Sentry 에러 모니터링
  → 주요 버그 핫픽스 (fly deploy로 즉시 반영)
  → 피드백 수집 (Google Form)
```

## 프로덕션 전환 계획 (POC 검증 후)

```
POC → 프로덕션 마이그레이션 체크리스트:

인프라 업그레이드:
  Fly.io: shared-cpu-1x → dedicated-cpu-1x (1GB RAM, $20/월)
  DB: Fly Postgres → Naver Cloud DB for PostgreSQL
      (한국 법률 준수, PIPA 요건 충족)
  파일: R2 → Naver Object Storage (국내 데이터 주권)
  CDN: Cloudflare (글로벌) → 유지

한국 법률 대응:
  ✅ 개인정보처리방침 게시 (한국어)
  ✅ Naver Cloud 사용 시 국내 데이터 저장 충족
  ✅ 개인정보보호위원회 신고 (5만명 이상 시)

도메인 & SSL:
  api.iknowdog.co.kr (예시)
  Cloudflare DNS + 자동 SSL

모니터링:
  Fly.io 기본 → Grafana + Prometheus 추가
  Sentry (에러 추적, 무료 5K 이벤트/월)
  Amplitude (유저 분석, 무료 10M 이벤트/월)

비용 예측 (프로덕션, DAU 1,000):
  Fly.io API 서버:    $20/월
  Naver Cloud DB:     ₩30,000/월
  Naver Object Storage: ₩5,000/월
  AI Worker (Fly):    $10/월
  OpenAI API:         $400–600/월
  도메인:             ₩15,000/년
  Sentry/Amplitude:   $0 (무료 티어)
  ─────────────────────────────
  총 인프라:          ~₩700,000/월
  구독 매출 (150명):  ₩1,500,000/월
  → POC 이후 흑자 구조 가능
```

## 배포 후 모니터링 대시보드

```
무료 모니터링 스택 (POC):

1. Fly.io 내장 메트릭
   → CPU, 메모리, 요청 수, 에러율 자동 제공
   → 대시보드: fly.io/apps/petplatform-api/metrics

2. Sentry (에러 추적)
   → Rust: sentry crate 연동
   → React Native: @sentry/react-native 연동
   → 무료: 5,000 에러/월
   → 실시간 에러 알림 (슬랙/이메일)

3. Upstash Redis 콘솔
   → 큐 길이, 처리 속도 모니터링
   → AI Worker 지연 감지

4. GitHub Actions 로그
   → 빌드/배포 성공/실패 즉시 확인

알림 설정:
  → API 에러율 > 5%: 즉시 슬랙 알림
  → EMERGENCY 위험도 감지: 개발팀 알림
  → AI Worker 큐 적체 > 10개: 알림
  → 크레딧 잔액 이상 차감: 즉시 알림
```

---

*문서 버전: 2.0 | 작성일: 2026-05-05*

*모든 AI 건강 출력에는 반드시 포함:*
*"이 분석은 의료 진단이 아닙니다. 반드시 수의사와 상담하세요."*

*보행 분석 출력에는 반드시 포함:*
*"본 결과는 이상 보행 신호 안내이며 질병 진단이 아닙니다. 수의사 진료를 대체하지 않습니다."*
