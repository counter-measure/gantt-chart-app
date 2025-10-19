# Gantt Chart App

A interactive Gantt chart application for tracking project timelines, built with Next.js and deployable on Vercel.

## Features

- Interactive drag-and-drop task scheduling
- Resizable task bars
- Color-coded phases
- Local storage persistence
- Add/delete tasks and phases
- Editable task names and labels

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your repository

5. Vercel will automatically detect it's a Next.js project

6. Click "Deploy"

### Option 3: Deploy via Git Integration

1. Push this code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Connect your GitHub account to Vercel

3. Vercel will automatically deploy on every push to main

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
gantt-chart-app/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main Gantt chart component
│   └── gantt.module.css # Styles
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

## Technologies

- Next.js 14
- React 18
- TypeScript
- CSS Modules
