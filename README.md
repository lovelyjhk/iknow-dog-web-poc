# 말하지 않아도 알아요 Web POC

반려견 보행/증상 영상을 업로드하고, 이상 신호와 병원 상담 필요도를 안내하는 웹앱 POC입니다.

현재 구현은 `web/` 폴더의 정적 웹앱입니다. Node/npm 없이 브라우저에서 바로 열 수 있고, GitHub Pages, Cloudflare Pages, Netlify에 그대로 배포할 수 있습니다.

## 로컬 실행

```powershell
Start-Process "C:\Users\lovel\pet\web\index.html"
```

## 주요 기능

- 반려견 프로필 저장
- 보행/증상 영상 선택 및 미리보기
- 증상 체크와 보호자 메모 입력
- 이상 신호 분석 결과 생성
- 위험도, 관찰 신호, 권장 행동 표시
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

- 실제 사용자 인증
- 서버 저장소 영상 업로드
- OpenAI Vision API 또는 자체 worker 연결
- 병원 리포트 공유 링크
- 결제/구독 연동
