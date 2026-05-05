# AI Worker

Cloudflare Workers용 LLM 분석 API입니다. 브라우저 앱은 API 키를 갖지 않고 이 Worker로 영상 프레임 또는 성분표 이미지를 보냅니다.

## Endpoints

- `GET /health`
- `POST /analyze/gait`
- `POST /analyze/nutrition-label`

## Deploy

```powershell
cd api/ai-worker
Copy-Item wrangler.toml.example wrangler.toml
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

배포 후 GitHub Pages 앱의 `설정 > 실제 AI 서버 연결`에 Worker URL을 저장합니다.

## Notes

- 영상 분석은 브라우저에서 추출한 JPEG 프레임을 OpenAI Responses API의 이미지 입력으로 전달합니다.
- 성분표 분석은 사진 1장을 OCR/영양 관점으로 함께 해석합니다.
- 응답은 질병명을 확정하지 않고 위험 신호, 상담 필요도, 관찰 행동만 반환해야 합니다.
