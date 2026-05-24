# AI Assessment Creator
# VedaAI
A production-grade SaaS platform for teachers to generate AI-powered exam papers.

## Stack
**Frontend:** Next.js (App Router) · TypeScript · Tailwind · Zustand · React Hook Form · Zod · Socket.IO
**Backend:** Node.js · Express · MongoDB · Redis · BullMQ · Socket.IO · Puppeteer
**AI:** OpenAI (strict JSON output, schema-validated)

## Architecture

```
Client → POST /assignments → Mongo insert → BullMQ job
                                          ↓
                                     Worker → OpenAI → JSON parse → Zod validate
                                          ↓
                                     Mongo update → Socket.IO emit → Client UI update
```

## Setup

### 1. Clone
```bash
git clone <repo> && cd ai-assessment-creator
```

### 2. Backend
```bash
cd server
cp .env.example .env  # add your OPENAI_API_KEY
npm install
npm run dev
```

### 3. Frontend
```bash
cd client
cp .env.local.example .env.local
npm install
npm run dev
```

### 4. Or use Docker
```bash
docker-compose up --build
```

Open http://localhost:3000

## Key features
- Real-time generation progress via WebSockets
- BullMQ background jobs (retries + backoff)
- Strict JSON schema validation (no raw LLM output rendered)
- PDF export via Puppeteer
- Regenerate any assignment
- Difficulty badges + exam-paper formatted output