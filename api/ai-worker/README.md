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
npx wrangler kv namespace create AI_CONFIG
# wrangler.toml의 id를 생성된 KV namespace id로 교체
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put CONFIG_ENCRYPTION_KEY
# 선택: 관리자 페이지 대신 CLI secret으로 직접 넣을 수도 있음
# npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

배포 후 GitHub Pages 앱의 `설정 > 실제 AI 서버 연결`에 Worker URL을 저장합니다.
관리자 페이지 `web/admin.html`에서 관리자 아이디/패스워드를 입력하면 OpenAI API key와 모델을 Worker KV에 암호화 저장할 수 있습니다.

## Admin API

- `GET /admin/config`: 저장 상태 확인. API key 값은 반환하지 않습니다.
- `POST /admin/config`: `openAiApiKey`, `model`, `allowedOrigins` 저장.
- 인증: Basic Auth. `ADMIN_USERNAME` vars와 `ADMIN_PASSWORD` secret을 사용합니다.
- 저장소: `AI_CONFIG` KV binding. API key는 `CONFIG_ENCRYPTION_KEY` secret으로 AES-GCM 암호화합니다.

## Notes

- 영상 분석은 브라우저에서 추출한 JPEG 프레임을 OpenAI Responses API의 이미지 입력으로 전달합니다.
- 성분표 분석은 사진 1장을 OCR/영양 관점으로 함께 해석합니다.
- 응답은 질병명을 확정하지 않고 위험 신호, 상담 필요도, 관찰 행동만 반환해야 합니다.
