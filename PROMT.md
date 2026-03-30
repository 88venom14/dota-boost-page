Master Prompt: "Dota 2 Boost by Semka" Full Ecosystem

Role: You are a Senior Full-Stack Developer and Creative Director specializing in Premium UX (Apple Style). Your goal is to generate a production-ready codebase for a Dota 2 Boosting Service, including a Next.js landing page and a cross-browser extension.

    Core Visual & Brand Identity

    Design Philosophy: Apple Minimalist. High contrast, negative space (large margins), subtle gradients.

    Palette: * Background: #0A0A0A (Deep Black)

    text

     Surface: #121212 (Anthracite Card) with 40% opacity glassmorphism.

     Accent: #FF8C00 (Sunset Orange) for primary actions.

     Secondary: #636366 (System Gray).

    Typography: System-ui (SF Pro/Inter), weight 500 for body, 700 for headings.

    Technical Stack (The "No-Holes" Architecture)

    Framework: Next.js 14+ (App Router), TypeScript.

    Styling: Tailwind CSS + clsx + tailwind-merge for clean class management.

    Animations: framer-motion (use AnimatePresence for smooth mounting).

    Icons: lucide-react.

    Extension: Manifest V3, Content Scripts (Vanilla TS), Chrome Storage API.

    Part A: Next.js Landing Page (File-by-File)
    File: app/page.tsx (Structure)

Generate a single-page scrollable architecture with these components:

text

Header: Sticky, backdrop-blur, Logo "Semka" on the left, "Install Extension" button on the right.

Hero: * Centered Text: "Твой ранг — твой покой."

    Subtitle: "Исцеление профиля, сбережение души. Пока мы бустим — ты живешь."

    Main CTA: Large Orange Button with whileHover={{ scale: 1.05 }}.

Pain Points (The Trinity): Grid (1x3).

    Card 1 (Moral): Icon: ShieldAlert. Text: "Минус токсичность".

    Card 2 (Physical): Icon: BatteryLow. Text: "Плюс сон".

    Card 3 (Spiritual): Icon: Crown. Text: "Вкус победы".

Proof Block: A scrolling marquee of reviews (use a simple CSS animation).

Extension CTA: A visual preview of a browser where ads are replaced by the Semka logo.

    Part B: The Ad-Replacer Extension (Technical Logic)
    File: extension/manifest.json

    permissions: ["storage", "scripting", "tabs"].

    host_permissions: ["<all_urls>"].

    content_scripts: Match all URLs, run at document_start.

File: extension/content.js (The Engine)

Write a robust script that:

text

Selects Target Elements: Create a regex/selector array including ins.adsbygoogle, [id*="google_ads"], .ad-unit, ytd-ad-slot-renderer, and common social media sponsored post classes.

The Replacement Logic: * When an ad is detected, replace its innerHTML with a custom <div>.

    This div must contain a local image: chrome.runtime.getURL('assets/banner.webp').

    Style the div to width: 100%; height: 100%; object-fit: cover; border-radius: 8px; cursor: pointer;.

Dynamic Loading: Use MutationObserver to watch for new elements being added to the DOM (essential for YouTube and Infinite Scrolls).

Anti-Flicker: Set display: none to the original ad immediately and inject the replacement within 10ms.

File: extension/popup.tsx

text

A clean interface showing:

    A large number (Counter of "Healed Ads").

    A "Status: Protected" badge.

    Link to the main site.

    Copywriting & Tone of Voice

    Avoid "Buy Now". Use "Start Healing" or "Upgrade Rank".

    The tone should be "Zen-like" — calm, professional, and elite.

    Footer Slogan: "Dota 2 Boost by Semka © 2026. Ранг — это просто цифра, твои нервы — это всё."

    Deployment & SEO

    Include metadata object in layout.tsx for SEO (keywords: Dota 2 boost, MMR service, Semka boost).

    Add a simple sitemap.xml structure.

[Final Instruction for AI]:

"Now, generate the code for app/page.tsx using Tailwind and Framer Motion, and provide the core logic for the extension/content.ts script. Ensure the code is production-ready, typed with TypeScript, and follows the Apple design guidelines strictly."