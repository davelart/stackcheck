# 🛠️ StackCheck – Local Dev Environment Validator

[![CI](https://github.com/davelart/stackcheck/actions/workflows/ci.yml/badge.svg)](https://github.com/davelart/stackcheck/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/stackcheck-cli)](https://www.npmjs.com/package/stackcheck-cli)
[![license](https://img.shields.io/github/license/davelart/stackcheck)](LICENSE)
[![Vercel](https://vercelbadge.vercel.app/api/davelart/stackcheck-landing)](https://stackcheck.vercel.app)

> ✅ Ensure your machine is ready to run any project.  
> 🚫 No more “it works on my machine” bugs.

---

## 🌐 Official Website

👉 Visit: [https://stackcheck.vercel.app](https://stackcheck.vercel.app)

Built with [Vite](https://vitejs.dev/) and deployed via [Vercel](https://vercel.com).

---

## 📦 Install CLI

Run instantly:

```bash
npx stackcheck
```

Or install globally:

```bash
npm install -g stackcheck-cli
```

📁 Example .stackcheck.json

```json
{
  "node": ">=18.0.0 <20.0.0",
  "docker": true,
  "env": ["DATABASE_URL", "JWT_SECRET"],
  "ports": [3000, 5432],
  "custom": ["./scripts/check-prereqs.sh"]
}
```

Also supports .stackcheck.yml and environment-based configs like .stackcheck.dev.json.

🔍 StackCheck Features
✅ Validate Node, Docker, ENV, Ports, Secrets

🔧 Suggest fixes with --fix

📊 Generate JSON reports with --report

✨ Auto-generate .env.example

🧠 Scan codebase for missing process.env.*

🧩 Interactive config setup: npx stackcheck init

💻 VS Code extension available

✅ GitHub Actions / CI-ready

📝 Config validation with <link href="https://github.com/colinhacks/zod">Zod</link>


🧪 Tests & CI

```bash
npm test
```

CI will fail on critical check errors. Use --report to generate output in pipelines.

📦 Docker Support

```bash
docker build -t stackcheck .
docker run --rm -v $PWD:/app stackcheck
```

👩‍💻 VS Code Extension
Install from Marketplace and run StackCheck from within your editor.

📢 Launch Info

| Platform | Link                                                                         |
| -------- | ---------------------------------------------------------------------------- |
| GitHub   | [github.com/davelart/stackcheck](https://github.com/davelart/stackcheck) |
| Vercel   | [stackcheck.vercel.app](https://stackcheck.vercel.app)                           |
| npm      | [stackcheck](https://www.npmjs.com/package/stackcheck)                   |

📝 License
MIT © 2025 David Lartey


---

## ✅ Now: Vercel Setup for Your Landing Page

Assuming you're deploying a **landing site** (not the CLI code), here’s how to do it:

---

### 🔧 Step 1: Create a `www/` directory (if needed)

You can use any of these frameworks:
- **Vite (recommended for speed)**
- **Astro (great for blogs/docs)**
- **Next.js (if you want serverless features)**

Example structure:

```bash
/stackcheck
/src → CLI code
/www → Landing page (Vite, Astro, Next.js, etc.)
```

Update the homepage, and customize App.tsx for your StackCheck intro.

📦 Step 3: Push to GitHub
Make sure your repo includes the landing/ folder. Example structure:

```bash
/stackcheck
/src → CLI code
/www → Landing page (Vite, Astro, Next.js, etc.)
README.md
package.json
```

🚀 Step 4: Deploy on Vercel

Go to https://vercel.com

Connect your GitHub account

Import the stackcheck repo

Set:

Root Directory: www
Framework Preset: Vite
Output Dir: (Vite default is dist)
Click Deploy

Vercel will:

Build the project
Deploy automatically on every push to main
Give you a live URL (e.g. https://stackcheck.vercel.app)

✅ Optional: Add vercel.json Config
If you want explicit control:

```json
{
  "rootDirectory": "www",
  "framework": "vite"
}
```

Or if using monorepo:

```json
{
  "projects": [
    {
      "src": "www",
      "buildCommand": "npm run build",
      "outputDirectory": "dist"
    }
  ]
}
```