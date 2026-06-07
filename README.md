# Pratham Patel — Portfolio

Personal portfolio website for Pratham Patel, ML & Data Analytics student.

## Quick Start

```bash
cd artifacts/portfolio
npm install
npm run dev
```

Open **http://localhost:3000**

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at localhost:3000 |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview the production build |

## Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tool
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations & parallax
- **tsParticles** — hero particle background
- **react-icons** — icons

## Deploy

**Vercel (easiest):**
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set Root Directory to `artifacts/portfolio`
4. Deploy — done

**Netlify:**
1. Push to GitHub
2. Import on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
