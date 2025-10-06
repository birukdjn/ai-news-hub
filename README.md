## 🧠 AI News Hub

Modern, responsive AI News website built with Next.js App Router, Tailwind CSS, and Framer Motion. Fetches top headlines from NewsAPI and generates AI summaries using OpenAI or DeepSeek.

### ⚙️ Setup
1. Create `.env.local` in project root:
```
NEWSAPI_KEY=your_key_here
OPENAI_API_KEY=your_key_here
# or
# DEEPSEEK_API_KEY=your_key_here
```
2. Install deps:
```
npm install
```
3. Start dev server:
```
npm run dev
```

### 🔑 Environment
- `NEWSAPI_KEY`: from `https://newsapi.org/`
- `OPENAI_API_KEY`: optional; if absent and `DEEPSEEK_API_KEY` exists, DeepSeek will be used.

### 📦 Features
- Server-rendered headlines via `/app/page.js` and `/api/news`
- Client search and category filter in `Navbar`
- Favorites saved in `localStorage` at `/favorites`
- Article details with on-demand AI summary via `/api/ai-summary`
- Dark mode with persistence
- Skeleton loaders and Load More button
- About page with social links

### 📝 Commands
- `npm run dev` – start dev
- `npm run build` – build
- `npm start` – production start
- `npm run lint` – run eslint

### 🚀 Deploy
1. Push to GitHub.
2. Import repo into Vercel.
3. Add env vars in Vercel Project Settings.
4. Deploy.

### 📁 Structure
- `app/` – routes and pages (App Router)
- `app/api/` – serverless routes (news, ai-summary)
- `app/components/` – UI components
- `app/hooks/` – client hooks

### 🔒 Notes
- Images load from remote origins allowed by `next.config.mjs`.
- AI summary returns plain text (no markdown) with 3 short lines.
