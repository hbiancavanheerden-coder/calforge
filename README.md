# CalForge — Free Online Calculator Site

**Live site:** https://calforge.site  
**Contact:** mymomentsinprint@gmail.com

## What is CalForge?
55+ free online calculators covering finance, health, unit conversion, productivity, fitness, and home utility. No sign-up required.

## Tech Stack
- Pure HTML, CSS, JavaScript — no frameworks, no build tools
- Google Fonts: Poppins (300–800 weight)
- ExchangeRate-API for live currency conversion
- Google AdSense ready (add your publisher ID when approved)

## File Structure
```
calforge/
├── index.html              ← Homepage with all tools listed
├── sitemap.xml             ← XML sitemap for Google Search Console
├── robots.txt
├── netlify.toml            ← Netlify deployment config
├── assets/
│   ├── css/style.css       ← All styles (white bg, Poppins font)
│   └── js/calc.js          ← All calculator logic
├── calculators/            ← 59 individual calculator pages
│   ├── mortgage.html
│   ├── bmi.html
│   └── ... (59 total)
├── blog/                   ← SEO blog articles
│   ├── index.html
│   ├── how-to-pay-off-debt.html
│   ├── understanding-compound-interest.html
│   ├── bmi-vs-body-fat.html
│   ├── how-to-build-emergency-fund.html
│   └── productivity-techniques.html
└── pages/                  ← Static pages
    ├── about.html
    ├── contact.html
    ├── privacy.html
    ├── terms.html
    ├── disclaimer.html
    └── sitemap.html
```

## Deployment to GitHub + Netlify

### Step 1 — GitHub
```bash
git init
git add .
git commit -m "Initial CalForge launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calforge.git
git push -u origin main
```

### Step 2 — Netlify
1. Go to https://app.netlify.com
2. Click **Add new site → Import an existing project**
3. Connect GitHub and select your `calforge` repo
4. Build settings: leave blank (no build command needed)
5. Publish directory: `.` (root)
6. Click **Deploy site**
7. Add custom domain: `calforge.site` under **Domain settings**

### Step 3 — Google Search Console (already done ✓)
Submit sitemap: `https://calforge.site/sitemap.xml`

### Step 4 — Google AdSense (when approved)
Add to `<head>` of every HTML file:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```
Then add your ad unit code wherever you want ads to appear.

## SEO What's Included
- Unique title + meta description on every page
- FAQPage schema on all 59 calculator pages (Google rich results)
- WebApplication + BreadcrumbList schema on all calculator pages
- Full guide content (300–500 words) on every calculator page
- Related calculators section on every page (internal linking)
- XML sitemap with priority scores
- robots.txt
- 5 blog articles targeting high-traffic keywords
- Blog index page

## Currency Converter
Uses free tier of ExchangeRate-API. Free plan: 1,500 requests/month.
For higher traffic upgrade at exchangerate-api.com.
