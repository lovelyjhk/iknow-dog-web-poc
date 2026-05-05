# 말하지 않아도 알아요 Web POC

반려견 건강기록, 보행/증상 영상, 음식 안전, 병원 상담 리포트를 연결하는 모바일 우선 정적 PWA 웹앱 POC입니다.

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
- 매일 건강 체크 기록
- 보행/증상 영상 선택, MP4/WebM URL 및 YouTube/Shorts URL 미리보기
- 증상 체크 + 보호자 메모
- 이상 신호 분석 결과 생성
- 위험도, 관찰 신호, 권장 행동 표시
- 음식 안전 검색
- 병원/장소 지도 검색 연결
- 커뮤니티 베타 게시글 저장
- 병원 상담 전 리포트 생성/복사
- 개인정보 처리방침/이용약관 정적 페이지
- 로컬 데이터 내보내기/삭제
- 분석 이력 저장
- 모바일 하단 탭과 PWA 설치 지원
- 표준 플랫폼 범위도
- Basic/Plus/Unlimited 크레딧 구조
- `WELCOME3000` 쿠폰 적용

## 주의

현재 버전은 브라우저 내 로컬 POC입니다. 실제 AI 분석, 서버 저장, 사용자 인증, 결제, 병원 연계는 다음 단계에서 API 서버와 연결해야 합니다.

영상 URL 입력은 브라우저가 직접 재생할 수 있는 공개 MP4/WebM 원본 링크를 우선 지원합니다. YouTube/Shorts 링크는 임베드 미리보기로 표시하되, 정식 AI 분석은 직접 촬영 파일 또는 원본 영상 URL 기준으로 처리합니다.

앱 문구는 질병명 확정 판단이 아니라 "이상 신호 감지", "위험도 안내", "수의사 상담 권장"을 기준으로 작성했습니다.
