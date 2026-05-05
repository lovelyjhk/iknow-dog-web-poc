# 말하지 않아도 알아요 Web POC

반려견 보행/증상 영상을 업로드하고, 보호자 메모와 증상 체크를 기반으로 이상 신호와 병원 상담 필요도를 안내하는 정적 웹앱 POC입니다.

## 실행

빌드 도구 없이 브라우저에서 바로 실행할 수 있습니다.

```powershell
Start-Process "C:\Users\lovel\pet\web\index.html"
```

또는 `web/index.html` 파일을 브라우저로 열면 됩니다.

## 배포

정적 파일 배포 서비스에 `web` 폴더를 그대로 올립니다.

### GitHub Pages

```powershell
git init
git add .
git commit -m "feat: add web poc"
gh repo create iknow-dog-web-poc --private --source . --remote origin --push
```

GitHub repository settings에서 Pages source를 `/web` 또는 GitHub Actions 배포로 지정합니다.

### Cloudflare Pages

```powershell
wrangler pages deploy web --project-name iknow-dog-web-poc
```

### Netlify

```powershell
netlify deploy --dir=web --prod
```

## POC 범위

- 반려견 프로필 저장
- 보행/증상 영상 선택 및 미리보기
- 증상 체크 + 보호자 메모
- 이상 신호 분석 결과 생성
- 위험도, 관찰 신호, 권장 행동 표시
- 분석 이력 저장
- Basic/Plus/Unlimited 크레딧 구조
- `WELCOME3000` 쿠폰 적용

## 주의

현재 버전은 브라우저 내 로컬 POC입니다. 실제 AI 분석, 서버 저장, 사용자 인증, 결제, 병원 연계는 다음 단계에서 API 서버와 연결해야 합니다.

앱 문구는 질병 확정 진단이 아니라 "이상 신호 감지", "위험도 안내", "수의사 상담 권장"을 기준으로 작성했습니다.
