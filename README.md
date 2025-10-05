# Sync '25 Event Web App

A web application for the Sync '25 event featuring a DVD-style screensaver animation and run of show schedule.

![Sync '25](public/sync-logo.svg)

## Features

- **DVD Screensaver**: Classic bouncing logo animation with RGB color cycling
- **Event Schedule**: Complete run of show from 9:30 AM to 6:30 PM
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Pixel-Perfect Design**: Built from Figma specifications

## Getting Started

```bash
# Install dependencies
npm install

# Create local environment file
echo "STAGING_PASSWORD=sync2025" > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Password Protection

The site is protected with a password gate. Set the `STAGING_PASSWORD` environment variable:

**Local Development:**
```bash
# .env.local
STAGING_PASSWORD=your-password
```

**Vercel Production:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add: `STAGING_PASSWORD` = `your-secure-password`
3. Redeploy

Default password (if not set): `sync2025`

## Font Setup

⚠️ **Add Suisse Intl font files** to `/app/fonts/`:
- `SuisseIntl-Regular.woff2`  
- `SuisseIntl-Regular.woff`

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sync)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: RequestAnimationFrame
- **Deployment**: Vercel

---

Built for Sync '25 • Los Angeles, CA