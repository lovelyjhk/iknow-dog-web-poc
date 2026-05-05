Rust 로 백엔드로 개밣해서 엄청 빠르게  개발하고
tocken saving해서 절약해서 개발해줘
그리고 네이버나 구글 카카오 로그인도 가능하도록 해주고
기본적으로 쿠폰을 지급해서 , 3000원 정기구독 무료로 해줘 .
요금제는 3000원 5000원  6000원 요금제로 해서, 
3000원은 사용량 만큼 40%만 사용할수있게
5000원은 사용량만큼 70% 사용할 수 있게
6000원은 무제한으로 사용할수있게 해서 
정보를 얻어갈수있게 해줘 .
특히 아이를 카메라를 영상으로 찍어서 올리면 보행으로 알아보는 질병 진단 AI
로 알수있게해주는거야.


---

애견용 펫 관련 신규앱 개발할거 특허 까지 고려할만한거 특히 건강관리 앱으로 말하지않아도알아요 라는 앱으로 만들어주고 , 모바일로 ios 랑 android 에 배포할수있게 github으로 URL 만들어서 해줘 프롬프트 기획용 만들어줘 종합 플랫폼 애견동반 맛집, 반려견 숙소, 게시판 , 등 만들어주고 애견에게 좋은 음식들을 소개해주고, 영양제나 병원을 추천해주고 (가성비) 이걸 토큰 세이빙 할 수 있는 영어로 문구 변경


----
Act as a senior pet-tech product strategist, mobile app PM, UX designer, AI architect, and patent strategy consultant.

I want to build a new iOS/Android mobile app for dog owners called “말하지 않아도 알아요” (“I Know Without Words”).

Create a complete product planning prompt for this app.

Core concept:
An AI-powered dog health and lifestyle platform that helps owners understand their dogs’ health signals, daily needs, and lifestyle options, even when dogs cannot speak.

Main features:
1. Dog health management
- Dog profile
- Daily health check
- Food, water, stool, urine, vomiting, coughing, scratching, limping, sleep, activity, weight records
- Symptom timeline
- AI health summary
- Risk level: normal, watch, caution, vet consultation recommended, emergency warning
- Vet visit report generation

2. Pet-friendly places
- Dog-friendly restaurants
- Dog-friendly cafes
- Dog-friendly accommodations
- Travel routes
- Filters: indoor/outdoor, small dog, large dog, parking, price, reviews, cleanliness, dog amenities

3. Food guide
- Safe foods for dogs
- Dangerous foods
- Limited-quantity foods
- Age, breed, allergy, weight, and symptom-based food suggestions
- Easy explanations for owners

4. Supplements recommendation
- Cost-effective supplements
- Categories: joints, skin, probiotics, tear stains, dental, heart, liver, kidney, senior dogs, immunity, omega-3, weight control
- Recommendation based on age, breed, weight, symptoms, allergies, medication, reviews, ingredient quality, and daily cost
- Include legal disclaimer that supplements are not medical treatment

5. Vet hospital recommendation
- Nearby vets
- Emergency/24-hour vets
- Specialty-based vet search
- Price transparency
- Review-based recommendation
- Cost-effectiveness score
- Vet visit history
- AI pre-visit report

6. Community
- Boards for health concerns, vet reviews, supplement reviews, dog-friendly places, accommodations, walking friends, breed-specific groups, senior dog care
- Posts, comments, likes, reports, moderation, anti-spam, fake review detection

7. Monetization
- Premium subscription
- Vet partnerships
- Accommodation booking commission
- Restaurant/cafe ads
- Supplement affiliate commerce
- Pet insurance partnerships
- B2B dashboard for vets and business owners

8. Patent ideas
Generate patent-worthy ideas, not just generic app features.
Focus on:
- Dog health data + place recommendation
- Breed/age/weight/symptom-based suitability score
- Multi-modal health analysis using text, checklist, photos, videos, and activity data
- Food safety matching with allergies and diseases
- Supplement cost-effectiveness scoring
- Vet recommendation based on symptoms, reviews, price, and distance
- Community review trust score and fake review filtering
- Travel safety score based on nearby emergency vets

For each patent idea, include:
- Invention title
- Problem solved
- Core system
- Input data
- Processing logic
- Output
- Differentiation
- Patentable points
- Draft claims
- Legal cautions

9. Technical plan
Design the app for iOS and Android using:
- Expo React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- React Query
- Supabase Auth
- Supabase Database
- Supabase Storage
- Supabase Edge Functions
- OpenAI API
- Expo Notifications
- EAS Build
- GitHub Actions

Include:
- System architecture
- Folder structure
- Main screens
- Navigation
- Database schema
- API design
- AI API flow
- Recommendation logic
- Security
- Privacy policy considerations
- App Store / Google Play deployment guide
- GitHub project structure
- README
- .env.example
- CI workflow

10. Final output format
Write the result as a startup-ready product plan with:
- Service overview
- Problem definition
- Target users
- Core value proposition
- MVP features
- Advanced features
- AI features
- Patent ideas
- Screen structure
- User scenarios
- Database schema
- Technical architecture
- GitHub project structure
- Monetization model
- Brand strategy
- Legal/medical disclaimers
- Launch roadmap
- Investor/government grant summary

Make it practical enough for developers, patent attorneys, and startup accelerators.


---

검증해보면, 방향은 **상당히 좋습니다.**
첨부된 기획안은 단순 “강아지 건강 기록 앱”이 아니라 **AI 건강관리 + 애견동반 장소 + 병원/영양제/음식 추천 + 커뮤니티 + 특허 포인트**까지 묶은 **펫테크 종합 플랫폼 기획서**로 잘 확장되어 있습니다. 특히 MVP, AI 구조, 특허 아이디어, DB 설계, GitHub 구조, 보안/개인정보까지 포함되어 있어서 개발자·변리사·정부지원사업용 초안으로 쓰기 좋습니다. 

다만 바로 사업화하려면 몇 가지는 보완해야 합니다.

---

## 1. 전체 평가

### 좋은 점

**1. 앱 콘셉트가 명확함**

앱명 **“말하지 않아도 알아요”**와 서비스 메시지가 잘 맞습니다.
강아지는 증상을 말하지 못하고, 보호자는 작은 변화를 불안해한다는 문제 정의가 좋습니다.

핵심 메시지는 이렇게 잡으면 좋습니다.

> 반려견의 말 못 하는 건강 신호를 보호자 기록과 AI 분석으로 이해하고, 병원·음식·영양제·애견동반 장소까지 연결해주는 반려견 생활관리 플랫폼

---

**2. 특허 아이디어가 단순하지 않음**

기획안에는 단순한 “추천 앱”이 아니라 다음과 같은 기술적 조합이 있습니다.

* 품종·나이·체중·증상 기반 장소 적합도 점수
* 텍스트·사진·영상·체크리스트·활동량을 결합한 멀티모달 건강 분석
* 영양제 가성비 점수 계산
* 여행 경로 내 응급 동물병원 접근성 기반 안전 점수
* 병원 방문 전 AI 문진 리포트 생성
* 커뮤니티 후기 신뢰도 및 허위 후기 탐지
* 음식 안전성 개인화 판정
* 증상 기반 병원 추천

이 정도면 변리사에게 **“선행기술조사 + 청구항 정리”**를 맡길 만한 소재가 됩니다. 특히 영양제 추천은 성분·가격·체중별 1일 비용·후기 신뢰도·알러지·기저질환을 결합하는 방식이라 기획적으로 좋습니다. 

---

**3. 개발 구조가 현실적임**

Expo React Native, TypeScript, Supabase, OpenAI API, Kakao Maps, RevenueCat, EAS Build, GitHub Actions 구조는 iOS/Android 동시 출시용으로 적절합니다.
보안 항목도 Supabase Auth, RLS, JWT, private storage, signed URL, OpenAI API key 비노출 등 기본 구조가 잘 잡혀 있습니다. 

---

## 2. 보완해야 할 점

### 1) 시장 규모 수치는 반드시 출처 확인 필요

기획안에 한국 펫케어 시장, 글로벌 시장, CAGR, 반려견 가구 수 등이 들어가 있는데, 이 수치는 **IR이나 정부지원사업에 넣기 전에 반드시 공신력 있는 출처로 검증**해야 합니다.

지금 상태로는 “기획서용 가정치”로는 괜찮지만, 심사위원이나 투자자가 보면 출처를 물을 수 있습니다.

보완 문구:

> 시장 규모 수치는 농림축산식품부, 한국농촌경제연구원, KB경영연구소, Statista, Grand View Research 등 공신력 있는 자료 기반으로 재검증 예정

---

### 2) 의료 진단 앱처럼 보이면 위험함

AI가 기침, 구토, 절뚝거림, 발작, 호흡곤란 등을 분석하는 구조는 좋지만, 표현을 잘못 쓰면 **동물 의료 진단 서비스**처럼 보일 수 있습니다.

앱에서는 반드시 이렇게 표현해야 합니다.

좋은 표현:

* “진단” → “건강 신호 분석”
* “질병 판단” → “위험도 안내”
* “치료 추천” → “수의사 상담 권장”
* “AI 진단 결과” → “AI 건강 요약”
* “응급 진단” → “응급 가능성 알림”

위험한 표현:

* “기침 원인 진단”
* “질병 판별”
* “치료법 추천”
* “수의사 없이 확인 가능”
* “병원 안 가도 됨”

---

### 3) 기능이 너무 많아서 MVP가 무거움

현재 기획은 너무 좋지만, 처음부터 전부 개발하면 비용과 기간이 커집니다.

초기 MVP는 아래 5개만 가져가는 게 좋습니다.

1. 반려견 프로필
2. 건강 체크 기록
3. AI 건강 요약
4. 음식 안전 검색
5. 병원/애견동반 장소 기본 리스트

커뮤니티, 영양제 추천, 숙소 예약, 여행 코스, 병원 가격 비교는 2차로 가는 게 좋습니다.

---

### 4) 병원/영양제 “추천”은 광고 표시가 중요함

가성비 병원, 가성비 영양제를 추천할 때는 법적 리스크가 있습니다.

특히 병원 추천은 다음을 명확히 해야 합니다.

* 광고/제휴 병원 표시
* 후기 기반 참고 정보임을 표시
* 진료 품질을 보장하지 않는다는 고지
* 가격 정보는 사용자 제보 또는 병원 제공 기준임을 표시
* 응급 시 앱보다 병원 전화/방문이 우선이라는 안내

영양제도 마찬가지로:

* 치료 효과 보장 금지
* 질병 치료 목적 아님
* 복용 중인 약이 있으면 수의사 상담
* 알러지/기저질환 주의

---

## 3. 한글 번역 요약본

아래는 첨부된 영어 기획안을 한국어로 정리한 버전입니다.

---

# 말하지 않아도 알아요

## 반려견 AI 건강·생활 플랫폼 기획안

### 1. 서비스 개요

**“말하지 않아도 알아요”**는 반려견의 건강 신호와 생활 데이터를 기반으로 보호자가 강아지의 상태를 더 잘 이해하도록 돕는 AI 기반 반려견 건강·생활 플랫폼입니다.

앱은 단순한 건강 기록장을 넘어 다음 기능을 통합합니다.

* 반려견 건강 체크
* AI 건강 요약
* 병원 방문 전 리포트 생성
* 강아지에게 좋은 음식 정보
* 위험 음식 안내
* 가성비 영양제 추천
* 동물병원 추천
* 애견동반 맛집·카페·숙소 추천
* 반려견 보호자 커뮤니티

---

### 2. 핵심 문제

반려견은 통증, 불편함, 이상 증상을 말로 표현하지 못합니다.
보호자는 기침, 구토, 설사, 식욕 저하, 절뚝거림, 피부 긁음, 눈물, 무기력 같은 신호를 보고도 병원에 가야 할지, 하루 더 지켜봐도 되는지 판단하기 어렵습니다.

기존 서비스의 한계는 다음과 같습니다.

* 건강 기록 앱은 단순 메모 수준
* 애견동반 장소 앱은 건강 상태를 반영하지 않음
* 병원 추천은 단순 거리나 별점 중심
* 영양제 추천은 광고성 정보가 많음
* 음식 정보는 보호자 맞춤형이 부족함
* 병원 방문 전 증상 기록이 체계적으로 정리되지 않음

---

### 3. 핵심 가치

이 앱의 가장 큰 차별점은 다음입니다.

> 우리 강아지의 품종, 나이, 체중, 건강 상태, 증상 기록을 기반으로 건강관리·음식·영양제·병원·장소를 개인화 추천한다.

예를 들어:

| 강아지 상태     | 앱 추천                      |
| ---------- | ------------------------- |
| 슬개골 약한 소형견 | 계단 적은 카페, 관절 영양제, 정형외과 병원 |
| 기침 기록 있음   | 장거리 외출 주의, 근처 병원 추천       |
| 설사 기록 있음   | 회복식 안내, 자극 음식 제한          |
| 노령견        | 24시 병원 가까운 숙소 추천          |
| 피부 긁음 많음   | 알러지 음식 주의, 피부 전문 병원 추천    |
| 비숑         | 눈물 관리 음식, 소형견 친화 장소 추천    |

---

### 4. MVP 기능

초기 출시 버전은 다음 기능으로 구성합니다.

1. 반려견 프로필 등록
   품종, 나이, 성별, 체중, 알러지, 기존 질환, 복용 약 등을 등록합니다.

2. 매일 건강 체크
   식사, 물 섭취, 배변, 소변, 구토, 기침, 긁음, 절뚝거림, 수면, 활동량을 기록합니다.

3. AI 건강 요약
   최근 기록을 분석해 보호자에게 쉬운 문장으로 상태를 알려줍니다.

4. 위험도 표시
   정상, 관찰, 주의, 병원 상담 권장, 응급 가능성 단계로 표시합니다.

5. 음식 안전 검색
   강아지가 먹어도 되는 음식, 피해야 하는 음식, 소량만 가능한 음식을 안내합니다.

6. 근처 동물병원 검색
   위치, 진료 시간, 24시 여부, 진료 과목, 후기 기반으로 병원을 보여줍니다.

7. 애견동반 장소 리스트
   맛집, 카페, 숙소, 공원 등을 필터링해서 보여줍니다.

8. 커뮤니티 게시판
   건강 고민, 병원 후기, 영양제 후기, 장소 후기 등을 공유합니다.

---

### 5. AI 기능

AI는 다음 역할을 합니다.

* 최근 7일 건강 기록 요약
* 증상 패턴 감지
* 위험도 분류
* 병원 방문 전 리포트 생성
* 음식 급여 가능성 안내
* 영양제 가성비 점수 계산
* 병원 추천 점수 계산
* 애견동반 장소 적합도 계산
* 커뮤니티 허위 후기 탐지

단, AI는 진단하지 않습니다.
앱은 반드시 다음 원칙을 지켜야 합니다.

> 이 서비스는 수의사의 진료를 대체하지 않으며, 보호자의 기록 정리와 상담 준비를 돕는 보조 도구입니다.

---

### 6. 특허로 검토할 만한 아이디어

가장 강한 특허 후보는 아래입니다.

#### 특허 후보 1

**반려견 건강 상태 기반 애견동반 장소 적합도 산출 시스템**

반려견의 품종, 나이, 체중, 질환, 현재 위험도와 장소의 실내 가능 여부, 바닥 재질, 혼잡도, 주차, 응급병원 거리 등을 결합하여 장소 적합도 점수를 계산합니다.

---

#### 특허 후보 2

**멀티모달 반려견 증상 분석 시스템**

보호자 텍스트, 체크리스트, 사진, 영상, 활동량 데이터를 결합해 증상 위험도를 분류합니다.

---

#### 특허 후보 3

**반려견 영양제 가성비 점수 산출 시스템**

성분, 가격, 1일 급여 비용, 체중, 나이, 알러지, 복용 중인 약, 후기 신뢰도 등을 종합해 영양제 추천 점수를 계산합니다.

---

#### 특허 후보 4

**반려견 여행 안전도 평가 시스템**

여행 경로를 구간별로 나누고, 각 구간에서 가장 가까운 24시 동물병원·응급병원 접근성을 반영해 여행 안전도를 계산합니다.

---

#### 특허 후보 5

**병원 방문 전 AI 문진 리포트 자동 생성 시스템**

최근 건강 기록, 증상 발생 시점, 사진/영상, 보호자 메모를 기반으로 수의사에게 보여줄 리포트를 자동 생성합니다.

---

#### 특허 후보 6

**커뮤니티 후기 신뢰도 및 허위 후기 탐지 시스템**

후기 작성자의 행동 패턴, 계정 나이, 글 내용, 사진 인증, 리뷰 집중도 등을 분석해 후기 신뢰도를 계산합니다.

---

#### 특허 후보 7

**반려견 음식 안전성 개인화 판정 시스템**

음식명, 반려견 체중, 알러지, 질환, 품종을 기반으로 급여 가능 여부와 권장량을 안내합니다.

---

#### 특허 후보 8

**증상 기반 동물병원 추천 시스템**

기침, 발작, 절뚝거림, 피부 문제 등 증상별로 필요한 진료 분야를 매칭하고, 거리, 후기, 가격 투명성, 응급 가능성을 반영해 병원을 추천합니다. 기획안의 병원 추천 점수는 증상 적합도, 거리, 후기 신뢰도, 비용 투명성, 예약 가능성, 응급 대응 여부를 함께 반영하는 구조입니다. 

---

## 4. 한국어로 다듬은 최종 소개문

앱 소개는 이렇게 쓰면 좋습니다.

```text
말하지 않아도 알아요는 반려견의 건강 신호와 생활 데이터를 보호자가 쉽게 기록하고, AI가 이를 분석해 건강 위험도, 음식 안전성, 병원 상담 필요 여부, 애견동반 장소 적합도까지 안내하는 반려견 종합 생활 플랫폼입니다.

반려견은 아파도 말하지 못합니다. 보호자는 작은 변화에도 불안합니다. 이 앱은 식사, 배변, 구토, 기침, 활동량, 수면, 피부, 눈물, 절뚝거림 같은 일상 기록을 바탕으로 반려견의 상태를 이해하기 쉽게 요약하고, 병원 방문 전 수의사에게 보여줄 리포트까지 자동 생성합니다.

또한 애견동반 맛집, 카페, 숙소, 여행 코스, 강아지에게 좋은 음식, 피해야 할 음식, 가성비 영양제, 동물병원 추천, 보호자 커뮤니티를 하나로 연결해 반려견 보호자의 일상 의사결정을 돕습니다.
```

---

## 5. 정부지원사업용 한 줄 요약

```text
반려견의 건강 기록, 증상 데이터, 품종·나이·체중 정보를 기반으로 AI 건강 요약, 병원 방문 리포트, 음식·영양제·동물병원·애견동반 장소 추천을 제공하는 반려견 맞춤형 헬스케어·라이프스타일 플랫폼
```

---

## 6. 투자자용 한 줄 요약

```text
말하지 않아도 알아요는 반려견의 건강 상태와 생활 데이터를 기반으로 음식, 영양제, 병원, 애견동반 장소, 커뮤니티를 개인화 추천하는 AI 펫 라이프 플랫폼입니다.
```

---

## 7. 제 판단

이 기획은 **그냥 아이디어 수준은 넘었습니다.**
개발자에게 주면 MVP 설계가 가능하고, 변리사에게 주면 특허 검토가 가능하고, 정부지원사업 제안서의 뼈대로도 쓸 수 있습니다.

다만 사업화 순서는 이렇게 가는 게 좋습니다.

1. **건강 기록 + AI 요약 + 음식 안전 검색**으로 MVP 출시
2. **병원 추천 + 애견동반 장소** 추가
3. **영양제 가성비 추천 + 커뮤니티** 추가
4. **병원 리포트 PDF + 숙소/여행 코스** 확장
5. **특허 출원 + B2B 병원 대시보드** 추진

가장 특허성이 좋아 보이는 건 **“건강 상태 기반 애견동반 장소/여행/병원/영양제 통합 추천 시스템”**입니다. 단순 커뮤니티나 장소 앱보다 훨씬 방어력이 있습니다.


--

좋습니다.
이제 앱 방향을 **“Rust 초고속 백엔드 + AI 영상 분석 + 구독형 펫 헬스케어 플랫폼”**으로 잡으면 됩니다.

단, 표현은 꼭 이렇게 가야 합니다.

> “보행 영상 기반 질병 진단 AI”
> 보다는
> **“보행 영상 기반 이상 보행 감지 및 병원 상담 필요도 안내 AI”**

라고 해야 법적·의료적 리스크가 줄어듭니다.
앱이 질병명을 확정 진단하면 위험하고, **슬개골/십자인대/관절/통증 가능성 신호를 감지해서 수의사 상담을 권장하는 구조**로 가는 게 안전합니다.

---

# 토큰 세이빙용 영어 개발 프롬프트

아래 프롬프트를 그대로 쓰면 됩니다.

```text
Act as a senior Rust backend architect, mobile app PM, AI engineer, and pet-tech startup CTO.

Build a startup-ready technical plan for an iOS/Android dog health platform called “말하지 않아도 알아요” (“I Know Without Words”).

Core idea:
A fast AI-powered dog health and lifestyle app. Owners can record health logs, search dog-safe foods, find vets, pet-friendly places, supplements, and upload dog walking videos. The AI detects abnormal gait patterns and suggests whether vet consultation may be needed. The app must never claim medical diagnosis. It only provides health-risk guidance and vet consultation recommendations.

Tech stack:
- Backend: Rust
- Framework: Axum or Actix Web
- Database: PostgreSQL
- ORM: SQLx
- Cache: Redis
- Storage: S3-compatible object storage
- Auth: OAuth login with Kakao, Naver, Google, Apple
- Mobile: Expo React Native + TypeScript
- AI: Python microservice or external AI API for video gait analysis
- Queue: Redis Queue or NATS
- Deployment: Docker, GitHub Actions, Fly.io / Railway / AWS / Naver Cloud
- Payment: RevenueCat or Portone
- Push: Expo Notifications / FCM / APNs

Main features:
1. User auth
- Kakao login
- Naver login
- Google login
- Apple login
- JWT access token
- Refresh token
- Role-based access

2. Dog profile
- Name, breed, age, sex, weight
- Allergies
- diseases/conditions
- medications
- activity level
- senior dog flag

3. Health logs
- Food, water, stool, urine
- vomiting, coughing, scratching, limping
- sleep, activity, weight
- owner notes
- risk level

4. AI gait video analysis
- User uploads walking video
- Backend stores video
- AI job is queued
- AI service analyzes gait abnormality
- Output:
  - gait abnormality score
  - left/right imbalance
  - limping probability
  - joint-risk signal
  - recommended action
  - vet consultation recommendation
- Do not diagnose disease. Use wording like “possible abnormal gait signal” and “consult a veterinarian.”

5. Food guide
- Safe foods
- dangerous foods
- limited foods
- quantity by dog weight
- allergy warning
- condition warning

6. Vet recommendation
- Nearby vets
- emergency vets
- specialty matching
- price transparency
- review trust score
- cost-effectiveness score

7. Supplements
- cost-effective recommendations
- daily cost calculation
- ingredient match
- allergy and medication warning
- affiliate links

8. Pet-friendly places
- restaurants
- cafes
- accommodations
- filters by dog size, indoor/outdoor, parking, price, reviews

9. Community
- posts, comments, likes
- reviews
- moderation
- fake review detection

10. Subscription plans
Create three paid plans:
- Basic: 3,000 KRW/month
  - 40% monthly usage quota
  - limited AI summaries
  - limited video analysis
  - basic food/vet/place search
- Plus: 5,000 KRW/month
  - 70% monthly usage quota
  - more AI summaries
  - more video analysis
  - supplement recommendation
  - report generation
- Unlimited: 6,000 KRW/month
  - unlimited usage with fair-use policy
  - unlimited AI summaries
  - unlimited health logs
  - more video uploads
  - advanced reports
  - priority processing

Also create coupons:
- New user welcome coupon
- Free first month for 3,000 KRW Basic plan
- Coupon code system
- Coupon redemption history
- Trial period
- Expiration date
- Abuse prevention

Usage quota design:
- Define credit system
- AI health summary = 1 credit
- Food safety search = 0.2 credit
- Vet recommendation = 0.5 credit
- Supplement recommendation = 0.5 credit
- Gait video analysis = 5 credits
- Report PDF = 3 credits
- Basic plan gets 40% quota
- Plus gets 70% quota
- Unlimited gets fair-use quota

Required backend output:
1. Rust backend architecture
2. API design
3. PostgreSQL schema
4. Auth flow for Kakao/Naver/Google/Apple
5. JWT structure
6. Subscription and coupon logic
7. Usage quota and credit system
8. AI video analysis pipeline
9. File upload pipeline
10. Queue worker design
11. Security and privacy policy
12. Legal/medical disclaimer
13. Folder structure
14. GitHub project structure
15. Docker setup
16. GitHub Actions CI/CD
17. Deployment guide
18. MVP roadmap

Use token-saving concise output.
Make it practical for developers.
```

---

# 한국어 기획 번역본

## 1. 백엔드 방향

이 앱은 **Rust 백엔드**로 가면 좋습니다.

추천 구조는 다음입니다.

| 영역      | 기술                              |
| ------- | ------------------------------- |
| 백엔드 언어  | Rust                            |
| 웹 프레임워크 | Axum 추천                         |
| DB      | PostgreSQL                      |
| ORM/쿼리  | SQLx                            |
| 캐시      | Redis                           |
| 파일 저장   | S3 호환 스토리지                      |
| 인증      | Kakao/Naver/Google/Apple OAuth  |
| 모바일     | Expo React Native               |
| AI 분석   | Python AI 서버 또는 외부 AI API       |
| 배포      | Docker + GitHub Actions         |
| 결제      | RevenueCat 또는 Portone           |
| 푸시      | Expo Notifications / FCM / APNs |

Rust는 성능이 좋고 서버 비용을 아끼기 좋습니다.
특히 영상 업로드, AI 분석 요청, 구독 사용량 제한, API 처리량이 많아질 때 유리합니다.

---

## 2. 앱 핵심 구조

서비스명:

> **말하지 않아도 알아요**

핵심 기능:

1. 반려견 프로필 관리
2. 건강 기록
3. AI 건강 요약
4. 강아지 보행 영상 업로드
5. AI 이상 보행 감지
6. 강아지 음식 정보
7. 가성비 영양제 추천
8. 가성비 동물병원 추천
9. 애견동반 맛집/숙소 추천
10. 커뮤니티
11. 쿠폰
12. 정기구독 요금제

---

## 3. 영상 기반 AI 기능

이 기능이 가장 강한 차별점입니다.

단, 앱에서는 이렇게 표현하는 게 좋습니다.

### 위험한 표현

```text
질병 진단 AI
슬개골 진단
십자인대 진단
디스크 진단
관절염 진단
```

### 안전한 표현

```text
보행 이상 신호 감지
절뚝거림 가능성 분석
좌우 보행 균형 분석
관절 이상 의심 신호 안내
수의사 상담 필요도 안내
```

---

## 4. AI 분석 결과 예시

```text
보리의 보행 영상에서 오른쪽 뒷다리 사용 빈도가 낮고,
보폭이 일정하지 않은 패턴이 감지되었습니다.

이는 피로, 일시적 통증, 관절 불편감, 슬개골 관련 문제 등에서
나타날 수 있는 보행 이상 신호일 수 있습니다.

현재 위험도: 주의

권장 행동:
1. 24~48시간 동안 산책 강도를 줄여주세요.
2. 계단, 점프, 미끄러운 바닥을 피해주세요.
3. 절뚝거림이 지속되거나 통증 반응이 있으면 동물병원 상담을 권장합니다.

이 분석은 질병 진단이 아니며, 수의사의 진료를 대체하지 않습니다.
```

---

## 5. 구독 요금제 설계

요금제는 이렇게 정리하면 좋습니다.

| 요금제       |       가격 | 사용량 | 주요 기능                     |
| --------- | -------: | --: | ------------------------- |
| Basic     | 월 3,000원 | 40% | 기본 건강기록, 음식 검색, 제한적 AI 요약 |
| Plus      | 월 5,000원 | 70% | AI 요약 확대, 병원/영양제 추천, 리포트  |
| Unlimited | 월 6,000원 | 무제한 | 영상 분석, 리포트, 추천 기능 전체 사용   |

다만 “무제한”도 실제 서비스에서는 서버비 폭탄 방지를 위해 **Fair Use Policy**를 넣는 게 좋습니다.

예:

```text
무제한 요금제는 일반적인 개인 사용 범위 내에서 제공되며,
비정상적 대량 사용, 자동화 요청, 상업적 재판매 목적 사용은 제한될 수 있습니다.
```

---

## 6. 크레딧 기반 사용량 설계

요금제를 안정적으로 운영하려면 “사용량 %”보다는 **크레딧 제도**가 좋습니다.

예시:

| 기능         | 차감 크레딧 |
| ---------- | -----: |
| AI 건강 요약   |      1 |
| 음식 안전 검색   |    0.2 |
| 병원 추천      |    0.5 |
| 영양제 추천     |    0.5 |
| 보행 영상 분석   |      5 |
| 병원 리포트 PDF |      3 |
| 여행 안전도 분석  |      2 |

요금제별 크레딧:

| 요금제              |          월 크레딧 |
| ---------------- | -------------: |
| 무료               |             10 |
| Basic 3,000원     |             40 |
| Plus 5,000원      |             70 |
| Unlimited 6,000원 | 300 + Fair Use |

즉, 사용자가 이해하기 쉽게는:

> 3,000원 요금제는 전체 기능의 약 40% 수준
> 5,000원 요금제는 약 70% 수준
> 6,000원 요금제는 사실상 무제한

으로 표현하면 됩니다.

---

## 7. 쿠폰 설계

신규 가입자에게는 쿠폰을 지급합니다.

### 쿠폰 종류

| 쿠폰          | 내용              |
| ----------- | --------------- |
| WELCOME3000 | Basic 1개월 무료    |
| FIRSTPLUS   | Plus 첫 달 50% 할인 |
| VIDEOAI     | 보행 영상 분석 1회 무료  |
| FRIENDDOG   | 친구 초대 시 크레딧 지급  |

### 쿠폰 테이블 구조

```sql
coupons
- id
- code
- name
- discount_type
- discount_value
- target_plan
- free_months
- max_redemptions
- expires_at
- created_at

coupon_redemptions
- id
- user_id
- coupon_id
- redeemed_at
- applied_subscription_id
```

---

## 8. Rust 백엔드 API 구조

```text
/api/auth/kakao
/api/auth/naver
/api/auth/google
/api/auth/apple
/api/auth/refresh

/api/dogs
/api/dogs/:id

/api/health-logs
/api/health-logs/:id
/api/health-logs/:id/ai-summary

/api/videos/upload-url
/api/videos/:id/analyze
/api/videos/:id/result

/api/foods/search
/api/foods/:id

/api/vets/search
/api/vets/:id
/api/vets/recommend

/api/supplements/search
/api/supplements/recommend

/api/places/search
/api/places/:id

/api/community/posts
/api/community/posts/:id
/api/community/comments

/api/subscriptions/plans
/api/subscriptions/checkout
/api/subscriptions/status

/api/coupons/redeem
/api/usage/me
```

---

## 9. AI 영상 분석 파이프라인

```text
1. 사용자가 강아지 보행 영상을 업로드
2. Rust 백엔드가 S3에 영상 저장
3. video_analysis_jobs 테이블에 작업 생성
4. Redis/NATS Queue에 분석 요청 등록
5. Python AI Worker가 영상 다운로드
6. 프레임 추출
7. 강아지 관절/보행 포인트 감지
8. 좌우 보행 균형, 보폭, 절뚝거림 패턴 분석
9. 결과를 PostgreSQL에 저장
10. Rust 백엔드가 앱에 결과 전달
11. 위험도 높으면 푸시 알림 발송
```

---

## 10. AI 영상 분석 결과 DB

```sql
gait_analysis_results
- id
- dog_id
- video_id
- status
- abnormality_score
- limping_probability
- left_right_imbalance_score
- stride_irregularity_score
- joint_risk_signal
- risk_level
- summary
- recommendations
- disclaimer
- created_at
```

---

## 11. PostgreSQL 주요 테이블

```sql
users
oauth_accounts
dogs
health_logs
video_files
gait_analysis_jobs
gait_analysis_results
foods
vets
supplements
places
community_posts
community_comments
subscriptions
subscription_plans
coupons
coupon_redemptions
usage_credits
usage_events
payments
```

---

## 12. Rust 프로젝트 구조

```text
pet-platform-backend/
  src/
    main.rs
    config.rs
    state.rs

    routes/
      mod.rs
      auth.rs
      dogs.rs
      health.rs
      videos.rs
      foods.rs
      vets.rs
      supplements.rs
      places.rs
      community.rs
      subscriptions.rs
      coupons.rs
      usage.rs

    handlers/
      auth_handler.rs
      dog_handler.rs
      health_handler.rs
      video_handler.rs
      subscription_handler.rs

    services/
      auth_service.rs
      oauth_service.rs
      jwt_service.rs
      dog_service.rs
      health_service.rs
      video_service.rs
      ai_service.rs
      usage_service.rs
      coupon_service.rs
      subscription_service.rs
      payment_service.rs

    models/
      user.rs
      dog.rs
      health_log.rs
      video.rs
      subscription.rs
      coupon.rs
      usage.rs

    repositories/
      user_repo.rs
      dog_repo.rs
      health_repo.rs
      video_repo.rs
      subscription_repo.rs

    middlewares/
      auth_middleware.rs
      rate_limit.rs
      usage_limit.rs

    utils/
      error.rs
      response.rs
      time.rs

  migrations/
  Dockerfile
  docker-compose.yml
  .env.example
  README.md
  .github/workflows/ci.yml
```

---

## 13. 특허 포인트 재정리

이번 구조에서 가장 강한 특허 후보는 이겁니다.

```text
반려견 보행 영상, 건강 기록, 품종, 나이, 체중 정보를 결합하여
이상 보행 신호를 감지하고 병원 상담 필요도를 산출하는 AI 기반 반려견 건강 위험도 분석 시스템
```

구성요소:

1. 보행 영상 입력
2. 프레임 추출
3. 관절/보행 포인트 분석
4. 좌우 균형 계산
5. 보폭 불규칙성 계산
6. 반려견 품종·나이·체중 반영
7. 기존 건강 기록 반영
8. 위험도 산출
9. 수의사 상담 권장 단계 출력
10. 병원 추천 또는 리포트 생성 연결

이건 기존 단순 펫 커뮤니티/장소 앱보다 훨씬 특허 포인트가 강합니다.

---

## 14. 앱 내 고지문

```text
본 서비스는 반려견의 건강 기록과 보행 영상에서 확인되는 이상 신호를 보호자에게 이해하기 쉽게 안내하는 보조 도구입니다.

AI 분석 결과는 질병의 확정 진단이 아니며, 수의사의 진료를 대체하지 않습니다.

절뚝거림, 통증 반응, 보행 이상, 호흡 곤란, 발작, 의식 저하, 반복 구토, 혈변 등 이상 증상이 있으면 즉시 동물병원에 방문하시기 바랍니다.
```

---

## 15. 최종 요약

지금 방향은 좋습니다.

**가장 강한 차별점은 이것입니다.**

> 강아지 보행 영상을 올리면 AI가 이상 보행 신호를 감지하고, 건강 기록과 결합해 병원 상담 필요도·가성비 병원·관리 방법까지 연결해주는 앱

사업적으로는 이렇게 가면 됩니다.

1. Rust 백엔드로 빠르고 저렴한 API 서버 구축
2. Expo React Native로 iOS/Android 동시 개발
3. Kakao/Naver/Google/Apple 로그인 제공
4. 3,000원/5,000원/6,000원 구독제 운영
5. 신규 가입자 Basic 1개월 무료 쿠폰 지급
6. 보행 영상 분석은 고급 기능으로 배치
7. AI는 “진단”이 아니라 “이상 신호 감지/상담 권장”으로 표현
8. 특허는 “보행 영상 + 건강 기록 + 품종/체중/나이 기반 위험도 산출”로 추진

이렇게 가면 **기술성, 사업성, 특허성**이 모두 살아납니다.

---
기존 기획과 비교했을 때, 가장 강한 차별화 포인트는 “동물병원 연계형 즉시 진료 플랫폼”으로 가는 것입니다.
지금까지의 기획이 건강기록 + AI 분석 + 장소/음식/영양제 추천이었다면, 여기에 병원 예약·응급 연결·사전 문진 리포트 전송을 붙이면 훨씬 강해집니다. 

1. 기존 펫앱과의 차별화
기존 앱들은 보통 이렇게 나뉩니다.
기존 앱 유형한계펫 다이어리 앱기록만 하고 실제 진료 연결이 약함애견동반 장소 앱맛집/카페 정보는 있지만 건강 상태와 무관함병원 검색 앱거리/후기 중심이고 증상별 매칭이 약함커뮤니티 앱정보는 많지만 신뢰도와 의료 안전성이 낮음영양제 추천 앱광고성 정보가 많고 개별 강아지 상태 반영이 약함
반면 말하지 않아도 알아요는 이렇게 차별화할 수 있습니다.

강아지의 건강기록, 보행 영상, 증상, 품종, 나이, 체중 데이터를 AI가 분석하고, 위험도에 따라 적합한 동물병원과 빠르게 연결해주는 반려견 건강 진료 연결 플랫폼

즉, 단순 정보 앱이 아니라 **“진료 전 단계의 디지털 문진 + 병원 연결 앱”**이 됩니다.

2. 핵심 차별화 문구
기존 펫앱은 정보를 보여준다.말하지 않아도 알아요는 보호자의 불안을 진료 행동으로 연결한다.
또는
기록에서 끝나는 앱이 아니라,AI 건강 요약 → 위험도 판단 → 병원 추천 → 빠른 예약 → 진료 리포트 전달까지 이어지는 반려견 헬스케어 플랫폼

3. 동물병원 연계 기능을 넣었을 때의 차별점
1) AI 사전 문진 리포트
보호자가 병원에 가면 보통 이렇게 말합니다.

“어제부터 좀 이상했어요.”
“켁켁거렸는데 영상은 있어요.”
“밥은 잘 안 먹은 것 같고, 배변도 좀 묽었어요.”

이걸 앱이 자동으로 정리합니다.
병원 전달용 리포트 예시
반려견명: 보리품종: 비숑프리제나이: 5세체중: 5.2kg최근 7일 주요 변화:- 식욕 저하 2회- 기침/켁켁거림 3회- 산책 중 오른쪽 뒷다리 절뚝거림 1회- 구토 없음- 배변: 2일간 묽은 변AI 관찰 요약:보행 영상에서 오른쪽 뒷다리 사용 빈도가 낮고,보폭이 일정하지 않은 패턴이 관찰되었습니다.위험도:주의보호자 메모:“계단 내려갈 때 잠깐 다리를 들었어요.”추천 진료과:정형외과 / 슬개골·관절 진료 가능 병원
이렇게 되면 병원 입장에서도 진료 효율이 좋아집니다.

2) 증상별 병원 자동 매칭
단순히 가까운 병원을 보여주는 게 아니라, 증상에 맞는 병원을 연결합니다.
증상추천 병원 유형절뚝거림, 보행 이상정형외과, 슬개골/관절 진료 병원기침, 호흡 이상내과, 심장/호흡기 진료 가능 병원피부 긁음, 눈물피부과, 알러지 진료 병원구토, 설사내과, 영상장비 보유 병원발작, 쓰러짐24시 응급병원노령견 무기력종합검진 가능 병원
이게 기존 병원 검색 앱과 가장 큰 차이입니다.

3) 빠른 진료 연결
동물병원과 제휴하면 다음 기능이 가능합니다.
보호자 앱 기능


지금 진료 가능한 병원 보기


오늘 예약 가능한 병원 보기


24시 응급병원 바로 연결


전화 연결


카카오맵/네이버지도 길찾기


AI 리포트 병원에 사전 전송


예상 진료비 범위 확인


대기시간 확인


진료 후 기록 자동 저장


병원 관리자 기능


보호자 사전 문진 리포트 확인


증상 영상 확인


예약 접수


대기 환자 관리


진료 후 메모 등록


재방문 알림 발송


병원 프로필 관리


가격 정보 일부 공개


후기 관리



4. 병원 연계형 서비스 흐름
1. 보호자가 강아지 건강 기록 입력2. 보행 영상 또는 증상 영상 업로드3. AI가 이상 신호 분석4. 위험도 산출5. 위험도에 따라 병원 상담 권장6. 증상에 맞는 병원 추천7. 보호자가 병원 선택8. 앱이 사전 문진 리포트 생성9. 병원에 리포트 전달10. 빠른 예약 또는 전화 연결11. 진료 후 결과 기록12. 이후 AI가 회복 경과 추적
이 구조가 있으면 앱의 역할이 단순 추천이 아니라 진료 전후를 연결하는 건강관리 허브가 됩니다.

5. 특허 차별화 포인트
병원 연계를 넣으면 특허 아이디어도 더 강해집니다.
특허 후보명
반려견 건강 기록 및 보행 영상 기반 사전 문진 리포트 생성과 동물병원 신속 매칭 시스템
핵심 구성


반려견 프로필 수집


건강기록 수집


보행 영상 분석


이상 보행 신호 감지


위험도 산출


증상별 진료과 매칭


근처 병원 필터링


진료 가능 시간 확인


사전 문진 리포트 자동 생성


병원 측 대시보드로 전달


특허 포인트


건강기록 + 영상 분석 + 병원 매칭의 결합


증상별 진료과 자동 매칭


병원 방문 전 AI 리포트 자동 생성


응급도에 따른 병원 추천 우선순위 변경


병원 대기시간/예약 가능 여부 반영


진료 후 회복 경과 추적



6. 기존 기획 대비 업그레이드된 포지셔닝
기존 포지션:
AI 반려견 건강관리 및 생활 추천 플랫폼
업그레이드 포지션:
AI가 반려견의 건강 이상 신호를 감지하고,가장 적합한 동물병원과 신속히 연결하는반려견 디지털 문진·진료연계 플랫폼
더 사업적으로 표현하면:
반려견 보호자와 동물병원을 연결하는 AI 기반 사전 문진 및 빠른 진료 매칭 플랫폼

7. 수익모델도 더 강해짐
병원 연계가 들어가면 B2C 구독뿐 아니라 B2B 수익이 생깁니다.
수익모델설명보호자 구독AI 분석, 리포트, 영상 분석, 병원 추천병원 제휴비병원 프로필 노출, 예약 연동, 리포트 수신빠른 예약 수수료예약 또는 상담 연결당 수수료병원 관리자 SaaS월 49,000~299,000원건강검진 패키지제휴 병원 검진 상품 판매영양제/처방식 연계병원 추천 기반 커머스펫보험 연계진료 기록 기반 보험 상담

8. 요금제에 넣는 방식
3,000원 Basic


건강기록


음식 검색


병원 검색


AI 요약 월 제한


병원 리포트 제한


5,000원 Plus


AI 건강 요약 확대


보행 영상 분석 일부 제공


사전 문진 리포트 생성


병원 추천 고도화


영양제 추천


6,000원 Unlimited


AI 요약 무제한에 가까운 사용


보행 영상 분석 확대


병원 사전 리포트 무제한


빠른 진료 연결 우선권


응급병원 우선 안내


다견 관리



9. 병원에 제안할 때의 문구
말하지 않아도 알아요는 보호자가 병원 방문 전 반려견의 건강 기록, 증상 변화, 보행 영상, 식사·배변·구토·기침 기록을 자동으로 정리해 병원에 전달하는 AI 사전 문진 플랫폼입니다.병원은 진료 전 환자의 상태를 미리 파악할 수 있고,보호자는 증상을 빠뜨리지 않고 설명할 수 있으며,진료 시간은 줄이고 상담 품질은 높일 수 있습니다.

10. 최종 차별화 한 줄
가장 강한 차별화는 이겁니다.
말하지 않아도 알아요는 반려견의 건강 기록과 보행 영상을 AI로 분석하고,증상에 맞는 동물병원에 사전 문진 리포트를 전달해보호자가 더 빠르고 정확하게 진료받을 수 있도록 돕는반려견 진료연계형 헬스케어 플랫폼입니다.
이 방향이면 단순 펫앱보다 훨씬 강합니다.
특허성, 병원 제휴성, 구독 수익성, 정부지원사업 설득력이 모두 올라갑니다.


---

좋습니다. 그러면 차별화가 한 단계 더 올라갑니다.

기존 구조가:

> AI 건강기록 → 보행 영상 분석 → 병원 신속 연결

이었다면, 여기에 보험사를 붙이면:

> **AI 건강관리 + 동물병원 신속 진료 + 펫보험 가입/청구 연계 플랫폼**

이 됩니다.

즉, 보호자 입장에서는 **“아프기 전 관리, 아플 때 병원 연결, 진료 후 보험 처리”**까지 한 번에 해결하는 구조입니다.

---

# 핵심 차별화

```text
말하지 않아도 알아요는 반려견의 건강 기록과 보행 영상을 AI로 분석하고,
증상에 맞는 동물병원과 빠르게 연결하며,
펫보험 가입과 보험금 청구까지 이어주는
AI 기반 반려견 헬스케어·보험 연계 플랫폼입니다.
```

이렇게 가면 단순 펫앱, 병원 검색 앱, 보험 비교 앱과 차별화됩니다.

---

# 보험 연계 모델

## 1. 회원가입 패키지 + 보험 가입 시 앱 무료

사용자가 회원가입할 때 다음 선택지를 제공합니다.

| 패키지          | 내용                       |
| ------------ | ------------------------ |
| 일반 가입        | 무료 회원으로 시작               |
| Basic 구독     | 월 3,000원                 |
| Plus 구독      | 월 5,000원                 |
| Unlimited 구독 | 월 6,000원                 |
| 보험 연계 패키지    | 제휴 펫보험 가입 시 앱 프리미엄 무료 제공 |

보험 연계 패키지는 이렇게 설계할 수 있습니다.

```text
제휴 펫보험 가입 시
말하지 않아도 알아요 Plus 또는 Unlimited 요금제 무료 제공
```

단, 실제로는 보험사가 앱 이용료를 대신 부담하거나, 앱이 보험사로부터 제휴 수수료를 받는 구조가 됩니다.

---

# 사용자 혜택 구조

## 보험 가입자 혜택

```text
펫보험 가입 고객 전용 혜택

1. 앱 프리미엄 무료
2. AI 건강 요약 제공
3. 보행 영상 이상 신호 분석 제공
4. 병원 방문 전 리포트 생성
5. 보험 청구용 진료 기록 정리
6. 예방접종/진료/약 복용 알림
7. 제휴 병원 빠른 예약
8. 보험 청구 필요 서류 체크리스트
```

이렇게 하면 보험사는 고객 유지율이 올라가고, 보호자는 앱 구독료를 아낄 수 있습니다.

---

# 보험사 입장에서의 장점

보험사에 제안할 때는 이렇게 말하면 좋습니다.

```text
말하지 않아도 알아요는 반려견 보호자가 평소 건강 기록을 남기고,
이상 신호 발생 시 병원 방문 전 리포트를 생성하며,
진료 이후 보험 청구에 필요한 자료를 정리해주는 펫보험 연계 헬스케어 플랫폼입니다.

보험사는 이 플랫폼을 통해 가입자의 건강관리 참여도를 높이고,
보험금 청구 데이터를 구조화하며,
고객 이탈률을 낮추고,
펫보험 가입 전환율을 높일 수 있습니다.
```

---

# 보험사 제휴 수익모델

| 모델         | 설명                 |
| ---------- | ------------------ |
| CPA        | 보험 가입 1건당 제휴 수수료   |
| 앱 이용권 번들   | 보험사가 앱 구독료를 대신 부담  |
| 리텐션 패키지    | 보험 갱신 고객에게 앱 무료 제공 |
| 건강관리 리포트   | 가입자 건강관리 리포트 제공    |
| 보험 청구 보조   | 청구 서류 정리 기능 제공     |
| 제휴 병원 네트워크 | 병원·보험·앱 연결         |

가장 현실적인 건 초기에는 **CPA + 앱 무료 이용권 번들**입니다.

예:

```text
보험 가입 1건당 제휴 수수료 10,000~50,000원
또는 보험사가 사용자당 월 3,000~6,000원의 앱 이용료를 부담
```

---

# 보험 가입 플로우

```text
1. 사용자가 앱 회원가입
2. 반려견 프로필 등록
3. 보험 패키지 안내
4. 제휴 보험 상품 비교
5. 나이, 품종, 중성화 여부, 기존 질환 입력
6. 보험료 예상 조회
7. 보험사 페이지 또는 인앱 가입으로 이동
8. 보험 가입 완료
9. 앱이 보험 가입 상태 확인
10. 프리미엄 요금제 자동 활성화
11. 병원 진료 후 청구 서류 체크리스트 제공
```

---

# 보험 가입 시 무료 제공 구조

## 옵션 A: 보험 가입 시 Basic 무료

```text
제휴 펫보험 가입 시
Basic 3,000원 요금제 무료 제공
```

장점: 보험사 부담이 낮음
단점: 사용자 체감 혜택이 약함

---

## 옵션 B: 보험 가입 시 Plus 무료

```text
제휴 펫보험 가입 시
Plus 5,000원 요금제 무료 제공
```

장점: 가장 현실적인 번들
단점: 영상 분석 사용량 제한 필요

---

## 옵션 C: 보험 가입 시 Unlimited 무료

```text
제휴 펫보험 가입 시
Unlimited 6,000원 요금제 무료 제공
```

장점: 마케팅 문구가 강함
단점: AI 영상 분석 비용 관리 필요

추천은 **보험 가입 시 Plus 무료**입니다.
Unlimited는 “보험 가입 + 연간 계약 + 제휴 병원 이용” 같은 조건을 붙이는 게 좋습니다.

---

# 요금제 재설계

| 요금제       |     가격 |          사용량 | 보험 연계         |
| --------- | -----: | -----------: | ------------- |
| Free      |     0원 |          체험용 | 보험 안내 노출      |
| Basic     | 3,000원 |          40% | 보험 가입 시 무료 가능 |
| Plus      | 5,000원 |          70% | 보험 가입 시 무료 추천 |
| Unlimited | 6,000원 | 무제한/Fair Use | 일부 보험 상품 전용   |

---

# 보험 패키지 화면 문구

```text
펫보험 가입하고 앱 프리미엄 무료로 이용하세요

반려견은 아프다고 말하지 못합니다.
말하지 않아도 알아요는 건강 기록, 보행 영상 분석,
병원 방문 리포트, 보험 청구 준비까지 도와드립니다.

제휴 펫보험에 가입하면
월 5,000원 Plus 요금제를 무료로 이용할 수 있어요.
```

---

# 보험 청구 보조 기능

보험사 연계가 들어가면 앱에 이 기능을 넣으면 좋습니다.

```text
보험 청구 준비 도우미

1. 진료일 선택
2. 병원명 선택
3. 진료비 입력
4. 진료 영수증 사진 업로드
5. 진료비 세부내역서 업로드
6. 처방전 업로드
7. 진단명/증상 기록 연결
8. 보험사별 필요 서류 체크
9. 청구 가능 여부 안내
10. 보험사 앱 또는 웹으로 이동
```

초기에는 실제 청구 대행까지 하지 말고, **청구 서류 정리 + 보험사 이동 링크** 정도가 안전합니다.

---

# 보험 관련 DB 테이블

```sql
insurance_partners
- id
- name
- logo_url
- product_name
- monthly_premium_range
- coverage_summary
- claim_url
- partner_url
- commission_type
- commission_value
- is_active

user_insurance_policies
- id
- user_id
- dog_id
- insurance_partner_id
- policy_number
- plan_name
- status
- started_at
- expires_at
- premium_amount
- app_plan_granted
- verified_at

insurance_claim_guides
- id
- insurance_partner_id
- claim_type
- required_documents
- claim_steps
- claim_url

insurance_claim_records
- id
- user_id
- dog_id
- policy_id
- vet_visit_id
- visit_date
- total_cost
- claim_status
- receipt_url
- statement_url
- prescription_url
- created_at
```

---

# Rust 백엔드 API 추가

```text
/api/insurance/partners
/api/insurance/partners/:id
/api/insurance/quote
/api/insurance/apply
/api/insurance/verify-policy
/api/insurance/my-policy
/api/insurance/claim-guide
/api/insurance/claims
/api/insurance/claims/:id
/api/insurance/benefit/activate
```

---

# 특허 포인트 확장

보험 연계까지 붙이면 특허 아이디어를 이렇게 잡을 수 있습니다.

```text
반려견 건강 기록, 보행 영상 분석, 동물병원 진료 리포트 및 보험 가입·청구 정보를 연계한 AI 기반 반려동물 헬스케어 보험 관리 시스템
```

## 핵심 구성

1. 반려견 건강 기록 수집
2. 보행 영상 기반 이상 신호 분석
3. 병원 상담 필요도 산출
4. 제휴 병원 추천
5. 병원 방문 전 리포트 생성
6. 진료 후 보험 청구 서류 정리
7. 보험 상품 가입 상태에 따른 앱 구독 혜택 제공
8. 보험사별 청구 조건 안내
9. 건강관리 이력 기반 갱신/리텐션 지원

## 차별화

단순 보험 비교가 아니라:

> 건강관리 데이터 → 병원 진료 → 보험 가입/청구 → 앱 구독 혜택

까지 이어지는 구조입니다.

---

# 법적 주의사항

보험 연계는 특히 조심해야 합니다.

## 주의할 표현

피해야 할 문구:

```text
가장 좋은 보험
무조건 보장
보험금 받을 수 있음
진단 가능
치료비 전액 보장
```

안전한 문구:

```text
제휴 보험 상품 안내
보장 내용은 보험사 약관에 따릅니다
보험 가입 및 심사는 보험사의 기준에 따라 진행됩니다
보험금 지급 여부는 보험사 심사 결과에 따라 달라질 수 있습니다
본 서비스는 보험 상품 정보를 제공하며, 실제 계약은 보험사를 통해 체결됩니다
```

---

# 보험 고지문

```text
본 서비스는 제휴 보험사의 펫보험 상품 정보를 제공하며,
보험 계약의 체결, 심사, 보장 범위, 보험금 지급 여부는 각 보험사의 약관 및 심사 기준에 따릅니다.

앱에서 제공하는 건강 기록, AI 분석, 보행 영상 분석, 병원 리포트는
보험 가입 또는 보험금 지급을 보장하지 않습니다.

보험 가입 전 반드시 상품설명서와 약관을 확인하시기 바랍니다.
```

---

# 최종 차별화 문구

```text
말하지 않아도 알아요는 반려견의 건강기록과 보행 영상을 AI로 분석하고,
증상에 맞는 동물병원과 빠르게 연결하며,
진료 후 보험 청구 준비와 펫보험 혜택까지 이어주는
AI 기반 반려견 헬스케어·진료·보험 통합 플랫폼입니다.
```

이 방향이면 기존 앱과의 차별화가 훨씬 선명해집니다.

**건강관리 앱 → 병원연계 앱 → 보험연계 플랫폼**으로 확장되는 구조라서, 정부지원사업이나 투자자 피칭에서도 훨씬 설득력이 있습니다.
