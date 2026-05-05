# 나아파 Web POC

반려견 보행/증상 영상을 업로드하고, 이상 신호와 병원 상담 필요도를 안내하는 웹앱 POC입니다.

현재 구현은 `web/` 폴더의 정적 PWA 웹앱입니다. Node/npm 없이 브라우저에서 바로 열 수 있고, GitHub Pages, Cloudflare Pages, Netlify에 그대로 배포할 수 있습니다.

## 로컬 실행

```powershell
Start-Process "C:\Users\lovel\pet\web\index.html"
```

## POC URL

- 앱: https://lovelyjhk.github.io/iknow-dog-web-poc/
- 관리자 설정: https://lovelyjhk.github.io/iknow-dog-web-poc/admin.html
- 샘플 성분표 이미지: https://lovelyjhk.github.io/iknow-dog-web-poc/sample-nutrition-label.svg

## 실제 LLM 분석 연결

정적 웹앱에는 AI API 키를 넣지 않습니다. `api/ai-worker`의 Cloudflare Worker를 배포한 뒤 앱의 `설정 > 실제 AI 서버 연결`에 Worker URL을 저장하면 다음 분석이 실제 LLM 호출로 실행됩니다.

- 보행/증상 영상: 브라우저에서 영상 프레임을 추출해 LLM이 프로필, 최근 건강기록, 보호자 메모와 함께 분석합니다.
- 사료/간식 성분표: 사진을 올리면 원재료, 보증성분, 알레르기/질환 메모를 함께 검토해 영양 위험 신호를 안내합니다.
- 성분표 검증: 앱의 `음식안전 > 샘플` 버튼으로 샘플 이미지를 불러오거나 위 샘플 URL을 내려받아 직접 업로드할 수 있습니다.
- 메일 쿠폰: 베타 POC에서는 메일 미리보기 방식으로 6자리 코드를 발급하고, 인증 후 AI 분석 5회를 제공합니다.

## 로그인/회원가입

웹 POC에는 이메일/비밀번호 기반 로컬 계정과 Google/Kakao/Naver 데모 로그인 버튼이 들어 있습니다. 분석, 건강기록, 프로필 저장, 쿠폰 사용은 로그인 후 실행됩니다.

현재 계정 데이터는 브라우저 저장소에만 보관되는 POC 흐름입니다. 정식 출시에서는 Supabase Auth, OAuth callback, JWT, Row Level Security로 교체해 사용자별 데이터를 서버에서 분리합니다.

```powershell
cd api/ai-worker
Copy-Item wrangler.toml.example wrangler.toml
npx wrangler kv namespace create AI_CONFIG
# wrangler.toml의 AI_CONFIG id 교체
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put CONFIG_ENCRYPTION_KEY
npx wrangler deploy
```

배포 후 `admin.html`에서 Worker URL, 관리자 아이디/패스워드, OpenAI API key를 입력하면 key가 Worker KV에 암호화 저장됩니다. API key는 GitHub Pages나 브라우저 localStorage에 저장하지 않습니다.

## 주요 기능

- 반려견 프로필 저장
- 로그인/회원가입, 소셜 로그인 데모, 보호된 분석/기록 흐름
- 매일 건강 체크 기록
- 보행/증상 영상 선택, MP4/WebM URL 재생, YouTube/Shorts 썸네일 미리보기
- 증상 체크와 보호자 메모 입력
- 이상 신호 분석 결과 생성
- 위험도, 관찰 신호, 권장 행동 표시
- 음식 안전 검색
- 사료/간식 성분표 사진 기반 영양 위험 신호 분석
- 메일 인증형 5회 시간 쿠폰
- 병원/장소 지도 검색 연결
- 커뮤니티 베타 게시글 저장
- 병원 상담 전 리포트 생성/복사
- 개인정보 처리방침/이용약관 정적 페이지
- 로컬 데이터 내보내기/삭제
- 모바일 하단 탭, PWA manifest, service worker
- 확장 POC 범위도
- 분석 이력 저장
- `WELCOME3000` 쿠폰과 크레딧 기반 요금제 POC

## GitHub Pages 배포

```powershell
git init
git add .
git commit -m "feat: add web poc"

gh auth login
gh repo create iknow-dog-web-poc --private --source . --remote origin --push
```

그 다음 GitHub 저장소의 `Settings -> Pages`에서 GitHub Actions 배포를 활성화하면 `.github/workflows/deploy-web.yml`이 `web/` 폴더를 배포합니다.

CLI로 바로 배포하려면:

```powershell
.\scripts\deploy-github-pages.ps1 -Owner lovelyjhk -Repo iknow-dog-web-poc
```

GitHub 로그인이 안 되어 있으면 스크립트가 `gh auth login` 명령을 안내합니다.

## 다음 단계

- Supabase Auth와 사용자별 서버 저장소 연결
- 서버 저장소 영상 업로드와 외부 영상 URL 정규화
- AIHub 샘플 데이터 기반 키포인트 파서/시각화
- AI Worker 운영 배포, 메일 발송 API, Supabase 사용자 인증 연결
- 가족 사진합성, 반려견 캐리커처, 게임앱 모듈을 별도 Worker 엔드포인트로 확장
- 병원 리포트 공유 링크
- 결제/구독 연동
