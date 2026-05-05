# AI 반려견 영상 건강진단앱 POC 아키텍처

문서 기준일: 2026-05-05

## 1. POC 목표

`말하지 않아도 알아요`의 첫 POC는 종합 펫 플랫폼이 아니라, 반려견 영상을 기반으로 건강 이상 신호를 빠르게 확인하는 앱이다.

핵심 흐름은 다음 하나에 집중한다.

```text
반려견 프로필 등록
-> 보행/증상 영상 업로드
-> AI 이상 신호 분석
-> 위험도 및 병원 상담 필요도 안내
-> 보호자용 결과 리포트 저장
```

앱 콘셉트는 "AI 반려견 영상 건강진단앱"으로 잡되, 실제 서비스 문구와 API 출력은 법적 리스크를 줄이기 위해 "질병 확정 진단"이 아니라 "이상 신호 감지", "위험도 안내", "수의사 상담 권장"으로 설계한다.

## 2. POC에서 만들 기능

1. 로그인
   - Google, Kakao, Naver OAuth 설계
   - POC 구현은 Supabase Auth 또는 Rust OAuth 어댑터 중 빠른 쪽 선택

2. 반려견 프로필
   - 이름, 품종, 나이, 성별, 체중
   - 알러지, 기존 질환, 복용 약

3. 영상 업로드
   - 보행 영상 또는 증상 영상 업로드
   - 10초에서 60초 길이를 권장
   - 원본 영상은 private storage에 저장

4. AI 영상 분석
   - 프레임 샘플링
   - 보행/자세/움직임 이상 신호 관찰
   - 보호자 메모와 반려견 프로필을 함께 분석
   - 결과는 구조화 JSON으로 저장

5. 결과 화면
   - 위험도: NORMAL, WATCH, CAUTION, VET_RECOMMENDED, EMERGENCY
   - 관찰된 신호
   - 보호자 행동 가이드
   - 병원 상담 권장 여부
   - 의료 고지문

6. 분석 이력
   - 영상별 분석 결과 조회
   - 최근 결과 비교

7. 구독/쿠폰의 최소 골격
   - 3,000원 Basic: 월 사용량 40% 수준
   - 5,000원 Plus: 월 사용량 70% 수준
   - 6,000원 Unlimited: Fair Use 기반
   - WELCOME3000 쿠폰: Basic 1개월 무료

## 3. POC에서 제외할 기능

아래 기능은 DB와 API 확장 지점만 고려하고, 첫 POC 구현에서는 제외한다.

- 커뮤니티
- 애견동반 맛집/카페/숙소
- 영양제 가성비 추천
- 펫보험 가입/청구 연계
- 병원 관리자 대시보드
- 병원 예약 연동
- 결제 자동 갱신
- PDF 리포트 생성

## 4. 추천 기술 구조

```text
Mobile App
  Expo React Native + TypeScript + Expo Router

Backend API
  Rust + Axum
  SQLx
  JWT 인증 검증

Database
  PostgreSQL

Storage
  Supabase Storage 또는 S3-compatible storage
  private bucket + signed upload URL

AI Worker
  Python worker
  FFmpeg frame extraction
  Vision-capable AI model call
  Structured JSON output

Queue
  POC: PostgreSQL job polling
  Later: Redis, NATS, or SQS

Deploy
  API: Fly.io, Render, Railway, or AWS ECS
  Worker: same platform background worker
  Mobile: EAS Build
```

POC에서는 인프라를 줄이기 위해 `PostgreSQL job polling`으로 충분하다. 분석량이 늘어나면 Redis나 NATS를 붙인다.

## 5. 시스템 흐름

```text
1. 사용자가 앱에서 반려견 선택
2. 영상 촬영 또는 갤러리 업로드
3. 앱이 Rust API에 업로드 URL 요청
4. API가 signed upload URL 발급
5. 앱이 storage에 영상 직접 업로드
6. 앱이 /video-analyses 요청 생성
7. API가 video_analysis_jobs 레코드 생성
8. Python AI Worker가 queued job을 가져감
9. Worker가 영상 다운로드
10. FFmpeg로 프레임 추출
11. AI가 이상 신호와 위험도 분석
12. Worker가 결과를 DB에 저장
13. 앱은 job 상태를 polling하거나 push로 결과 수신
14. 사용자는 결과 리포트 확인
```

## 6. 앱 화면 구조

```text
app/
  (auth)/
    login
  (tabs)/
    home
    record
    history
    dog-profile
    settings
  analysis/
    [id]
    pending/[jobId]
  dog/
    new
    [id]/edit
```

### 핵심 화면

1. Home
   - 오늘의 반려견 상태
   - 최근 분석 결과
   - "영상 분석하기" 버튼

2. Record
   - 영상 촬영/선택
   - 증상 메모 입력
   - 분석 요청

3. Pending
   - 업로드 완료
   - 분석 중 상태
   - 예상 대기 시간

4. Analysis Result
   - 위험도 배지
   - 관찰된 이상 신호
   - 권장 행동
   - 병원 상담 권장 여부
   - 고지문

5. History
   - 날짜별 영상 분석 이력

6. Dog Profile
   - 반려견 기본 정보
   - 알러지/질환/복용 약

## 7. Rust API 설계

```text
GET    /health

GET    /me
POST   /dogs
GET    /dogs
GET    /dogs/:dog_id
PATCH  /dogs/:dog_id

POST   /videos/upload-url
POST   /video-analyses
GET    /video-analyses/:analysis_id
GET    /dogs/:dog_id/video-analyses

POST   /health-logs
GET    /dogs/:dog_id/health-logs

GET    /plans
POST   /coupons/redeem
GET    /usage
```

### `POST /video-analyses` 요청 예시

```json
{
  "dog_id": "dog_123",
  "video_object_key": "private/user_1/dog_123/video_456.mp4",
  "video_type": "gait",
  "owner_note": "산책 중 오른쪽 뒷다리를 살짝 드는 것 같아요."
}
```

### 분석 결과 JSON 예시

```json
{
  "risk_level": "CAUTION",
  "summary": "영상에서 오른쪽 뒷다리 사용 빈도가 낮고 보폭이 일정하지 않은 패턴이 관찰되었습니다.",
  "observed_signals": [
    "right_hind_leg_underuse",
    "uneven_stride",
    "possible_limping"
  ],
  "recommended_actions": [
    "무리한 산책과 계단 이용을 줄이세요.",
    "24시간 내 같은 증상이 반복되는지 관찰하세요.",
    "절뚝거림이 지속되거나 통증 반응이 있으면 동물병원 상담을 권장합니다."
  ],
  "vet_consultation_recommended": true,
  "disclaimer": "이 분석은 질병의 확정 진단이 아니며 수의사의 진료를 대체하지 않습니다."
}
```

## 8. 최소 DB 스키마

```sql
users
- id uuid primary key
- email text
- display_name text
- created_at timestamptz

oauth_accounts
- id uuid primary key
- user_id uuid
- provider text
- provider_user_id text
- created_at timestamptz

dogs
- id uuid primary key
- user_id uuid
- name text
- breed text
- birth_date date
- sex text
- weight_kg numeric
- allergies text[]
- conditions text[]
- medications text[]
- created_at timestamptz

videos
- id uuid primary key
- user_id uuid
- dog_id uuid
- object_key text
- video_type text
- duration_seconds int
- status text
- created_at timestamptz

video_analysis_jobs
- id uuid primary key
- video_id uuid
- dog_id uuid
- user_id uuid
- owner_note text
- status text
- error_message text
- created_at timestamptz
- started_at timestamptz
- completed_at timestamptz

video_analysis_results
- id uuid primary key
- job_id uuid
- video_id uuid
- dog_id uuid
- risk_level text
- summary text
- observed_signals jsonb
- recommended_actions jsonb
- vet_consultation_recommended boolean
- model_name text
- raw_result jsonb
- created_at timestamptz

health_logs
- id uuid primary key
- dog_id uuid
- user_id uuid
- log_date date
- appetite text
- stool text
- vomiting boolean
- coughing boolean
- limping boolean
- scratching boolean
- activity_level text
- memo text
- created_at timestamptz

plans
- id text primary key
- name text
- monthly_price_krw int
- monthly_credit_limit int
- fair_use_limit int

subscriptions
- id uuid primary key
- user_id uuid
- plan_id text
- status text
- started_at timestamptz
- expires_at timestamptz

coupons
- id uuid primary key
- code text unique
- benefit_type text
- benefit_value jsonb
- expires_at timestamptz

credit_ledger
- id uuid primary key
- user_id uuid
- reason text
- credit_delta int
- metadata jsonb
- created_at timestamptz
```

## 9. 사용량 제한 설계

POC에서는 실제 결제보다 크레딧 차감 구조를 먼저 만든다.

```text
AI 텍스트 건강 요약: 1 credit
음식 안전 검색: 1 credit
영상 분석: 10 credits
상세 리포트 생성: 3 credits
```

요금제 예시:

```text
Free: 10 credits / month
Basic 3,000원: 40 credits / month
Plus 5,000원: 70 credits / month
Unlimited 6,000원: 200 credits / month + Fair Use
```

사용자가 말한 "40%, 70%, 무제한"은 POC에서는 크레딧으로 구현하고, 정식 결제 이후 실제 비용 데이터를 보고 조정한다.

## 10. AI 분석 정책

### 입력

- 반려견 프로필
- 건강 로그 일부
- 보호자 메모
- 영상에서 추출한 프레임
- 영상 메타데이터

### 출력

- 위험도
- 관찰된 이상 신호
- 보호자용 쉬운 요약
- 병원 상담 권장 여부
- 권장 행동
- 고지문

### 금지 표현

```text
질병 확정
치료법 추천
병원에 가지 않아도 됨
수의사 없이 확인 가능
보험금 받을 수 있음
```

### 안전 표현

```text
이상 신호가 관찰되었습니다
상담 필요도가 높습니다
수의사 상담을 권장합니다
이 분석은 참고용 정보입니다
응급 증상이 있으면 즉시 동물병원에 방문하세요
```

## 11. 확장 가능한 모듈 경계

POC 이후 확장은 아래 순서가 좋다.

1. 병원 추천
   - 증상별 진료과 매칭
   - 24시 병원 우선 안내
   - 지도 앱 연결

2. 병원 리포트
   - 분석 결과와 건강 로그를 병원 전달용으로 정리
   - PDF 또는 공유 링크

3. 음식/영양제
   - 음식 안전 검색
   - 영양제 가성비 점수

4. 보험
   - 보험 상품 안내
   - 청구 서류 체크리스트
   - 보험 가입 시 Plus 무료 쿠폰

5. 커뮤니티/장소
   - 건강 상태 기반 장소 적합도
   - 보호자 후기 신뢰도

## 12. POC 성공 기준

기술 POC 성공 기준:

- 앱에서 60초 이하 영상을 업로드할 수 있다.
- 분석 job이 생성되고 실패 없이 완료된다.
- 결과가 구조화 JSON으로 저장된다.
- 앱에서 위험도와 요약을 확인할 수 있다.
- 사용자별 월 사용량 제한이 동작한다.

사업 POC 성공 기준:

- 보호자가 결과 문장을 이해한다.
- "병원에 가야 할지 판단하는 데 도움이 된다"는 피드백을 받는다.
- 영상 분석 결과와 보호자 체감 증상이 1차적으로 맞아떨어진다.
- 병원 리포트 기능의 필요성이 검증된다.

## 13. 첫 구현 순서

```text
1. Expo 앱 기본 구조 생성
2. Rust Axum API 생성
3. PostgreSQL 스키마 마이그레이션 작성
4. 로그인 및 JWT 검증 연결
5. 반려견 프로필 CRUD
6. signed URL 기반 영상 업로드
7. video_analysis_jobs 생성
8. Python worker에서 영상 프레임 추출
9. AI 분석 결과 저장
10. 앱 결과 화면 구현
11. 크레딧 차감 및 쿠폰 적용
```

## 14. 최신 CLI 기준 배포 흐름

POC 배포는 웹 콘솔보다 CLI 우선으로 진행한다. 로컬 OS는 Windows PowerShell 기준이다.

### 14.0 웹앱 POC 우선 배포 결정

2026-05-05 기준 실행 방향은 모바일 앱 우선이 아니라 정적 웹앱 우선으로 변경한다.

```text
1차 배포:
  web/index.html
  web/styles.css
  web/app.js

배포 대상:
  GitHub Pages
  Cloudflare Pages
  Netlify

모바일 앱:
  사용자 검증 이후 Expo/EAS로 확장
```

정적 웹앱은 빌드 도구 없이 배포할 수 있으므로 POC 검증 속도가 가장 빠르다.

### 14.1 CLI 설치

```powershell
# GitHub CLI
winget install --id GitHub.cli

# Railway CLI
npm install -g @railway/cli

# Expo EAS CLI
npm install --global eas-cli

# Supabase CLI
# Supabase는 npm global install을 쓰지 않는다.
# Node.js 20+에서 npx 또는 dev dependency로 실행한다.
npm install supabase --save-dev
```

Supabase 명령은 프로젝트에서는 아래처럼 실행한다.

```powershell
npx supabase --help
```

### 14.2 GitHub 저장소 생성

```powershell
cd C:\Users\lovel\pet
git init
git add .
git commit -m "chore: initialize pet health poc architecture"

gh auth login
gh repo create iknow-without-words-poc --private --source . --remote origin --push
```

### 14.3 Supabase 로컬/원격 DB 배포

```powershell
# Supabase 로컬 프로젝트 초기화
npx supabase init

# 로컬 Supabase 실행. Docker Desktop 필요.
npx supabase start

# 원격 프로젝트 연결
npx supabase link --project-ref <SUPABASE_PROJECT_REF>

# 마이그레이션 반영 전 확인
npx supabase db push --dry-run

# 원격 DB에 마이그레이션 배포
npx supabase db push
```

### 14.4 Rust API Railway 배포

Rust API는 `apps/api` 또는 `backend/api` 같은 하위 폴더에 둔다. POC에서는 Railway의 `railway up`으로 빠르게 배포한다.

```powershell
cd C:\Users\lovel\pet\apps\api

railway login
railway init --name iknow-dog-api

# 환경변수 설정은 Railway 대시보드 또는 CLI variable 명령으로 처리
railway up

# 배포 후 로그 확인
railway logs

# 프로젝트 열기
railway open
```

이미 Railway 프로젝트가 있으면 `railway init` 대신 다음을 쓴다.

```powershell
railway link
railway up
```

### 14.5 Python AI Worker Railway 배포

Worker는 API와 별도 서비스로 배포한다. POC에서는 같은 Railway 프로젝트에 별도 service로 둔다.

```powershell
cd C:\Users\lovel\pet\apps\ai-worker

railway link
railway up
railway logs
```

Worker에는 최소한 다음 환경변수가 필요하다.

```text
DATABASE_URL
STORAGE_ENDPOINT
STORAGE_ACCESS_KEY_ID
STORAGE_SECRET_ACCESS_KEY
OPENAI_API_KEY
```

### 14.6 Expo 앱 빌드 및 테스트 배포

```powershell
cd C:\Users\lovel\pet\apps\mobile

eas login
eas init
eas build:configure

# 내부 테스트용 Android APK/AAB
eas build --platform android --profile preview

# 내부 테스트용 iOS. Apple Developer 계정 필요.
eas build --platform ios --profile preview

# 양쪽 모두 빌드
eas build --platform all --profile preview
```

스토어 제출이 가능한 상태가 되면:

```powershell
# 최신 빌드 제출
eas submit --platform android --latest
eas submit --platform ios --latest

# 또는 빌드 후 자동 제출
eas build --platform all --profile production --auto-submit
```

앱 코드만 바뀌고 네이티브 설정이 바뀌지 않은 경우에는 OTA 업데이트를 쓴다.

```powershell
eas update --channel production --message "update poc analysis flow"
```

### 14.7 CLI 배포 순서 요약

```text
1. gh repo create
2. npx supabase link
3. npx supabase db push
4. railway up for Rust API
5. railway up for AI Worker
6. eas build --profile preview
7. TestFlight / Google Play Internal Testing
8. eas build --profile production --auto-submit
```

## 15. 최종 POC 포지셔닝

```text
말하지 않아도 알아요는 반려견의 보행/증상 영상을 AI로 분석해
이상 신호와 병원 상담 필요도를 보호자에게 이해하기 쉽게 안내하는
반려견 영상 기반 건강 신호 분석 앱입니다.
```

장기적으로는 다음 구조로 확장한다.

```text
영상 건강 분석
-> 병원 사전 문진 리포트
-> 증상 기반 병원 연결
-> 음식/영양제/장소 추천
-> 펫보험 가입/청구 보조
```
