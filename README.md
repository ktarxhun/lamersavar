# lamersavar 👻⚡

> The ultimate decoy admin portal and honeypot jumpscare trap for web applications.

[🇬🇧 English](README.md) &bull; [🇹🇷 Türkçe](README.tr.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ktarxhun/lamersavar)
[![Platform](https://img.shields.io/badge/platform-Vanilla%20%7C%20React%20%7C%20Next.js-orange.svg)](#templates)

Ever got annoyed by automated bot scanners, script kiddies, or curious unauthorized visitors constantly probing `/admin`, `/wp-admin`, or `/administrator` on your websites?

**lamersavar** turns those routes into an irresistible, authentic-looking decoy gateway. Once the visitor clicks anywhere, submits credentials, or attempts an exploit, it triggers an unescapable, high-volume, fullscreen video jumpscare.

---

## 🎯 Features

* **Realistic Decoy Gateway**: Sleek dark-mode enterprise UI featuring SSL indicators, security audit disclaimers, and authentic styling that looks 100% genuine.
* **Auto-Trigger on Any Interaction**: Triggers upon form submission, empty button clicks, or specific credential patterns.
* **Aggressive Fullscreen Engagement**: Uses standard and vendor-prefixed `requestFullscreen` APIs to commandeer the entire viewport instantly.
* **Autoplay Audio Policy Bypass**: Automatically unmutes and maximizes volume; falls back to immediate user event listeners (`click`, `keydown`, `mousemove`) if strict browser autoplay blocks immediate audio playback.
* **Exit Delay Trap (`beforeunload`)**: Arms a navigation confirmation prompt so startled visitors cannot simply press Back or close the tab without confirmation.
* **Zero Dependencies for Vanilla**: The HTML/JS template is completely standalone, plug-and-play.
* **React & Next.js Components**: Fully typed TypeScript component and custom hook for modern web frameworks.
* **Server Middleware Snippets**: Ready-to-copy configurations for Next.js, Nginx, and Express.

---

## 📁 Repository Structure

```
lamersavar/
├── media/
│   └── jumpscare.mp4           # Optimized, lightweight screamer video
├── templates/
│   ├── vanilla/
│   │   ├── index.html          # Standalone plug-and-play HTML decoy
│   │   └── jumpscare.mp4       # Video asset for local testing
│   └── react/
│       ├── Jumpscare.tsx       # Reusable React/Next.js component
│       ├── useJumpscare.ts     # Custom trigger hook
│       └── DecoyAdminPage.tsx  # Ready-to-use decoy admin page
├── snippets/
│   ├── next-middleware.ts      # Next.js URL rewriting middleware
│   ├── nginx.conf              # Nginx location block config
│   └── express-middleware.js   # Express.js route trap
├── LICENSE                     # MIT License
├── AGENTS.md                   # Multi-agent coordination guide
└── README.md
```

---

## 🚀 Quick Start

### 1. Test Locally (Vanilla HTML)

Clone the repository and serve the vanilla template using Python:

```bash
cd templates/vanilla
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser, enter any text, and press "Authenticate Operator". Turn your volume up (at your own risk).

---

### 2. React / Next.js Setup

1. Copy `media/jumpscare.mp4` into your `public/media/` folder.
2. Copy `templates/react/Jumpscare.tsx` into your components directory.
3. Import and render it in your admin trap or decoy route:

```tsx
"use client";

import { useState } from "react";
import Jumpscare from "@/components/Jumpscare";

export default function FakeAdminRoute() {
  const [triggered, setTriggered] = useState(false);

  return (
    <div>
      <Jumpscare active={triggered} videoSrc="/media/jumpscare.mp4" />
      
      {/* Your fake login form here */}
      <form onSubmit={(e) => { e.preventDefault(); setTriggered(true); }}>
        <input placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
```

---

### 3. Server-Side Routing / Interception

#### Next.js (Silent URL Rewrite)
Drop `snippets/next-middleware.ts` into your Next.js project root as `middleware.ts`. When scanners hit `/admin`, the browser still shows `/admin` in the address bar while serving your decoy trap.

#### Nginx
Add this snippet to your server block:

```nginx
location ~* ^/(admin|administrator|wp-admin|wp-login\.php|phpmyadmin) {
    root /var/www/lamersavar/templates/vanilla;
    try_files /index.html =404;
}
```

---

## ⚠️ Disclaimer & Health Warning

> [!WARNING]
> This software includes flashing video sequences and sudden high-intensity sound effects.
> Do NOT use this against individuals with photosensitive epilepsy, cardiac conditions, or sensitivity to sudden loud sounds.
> Intended solely as a cybersecurity honeypot, educational demonstration, or humorous decoy for uninvited network probes and automated scrapers.

---

## 🤝 Contributing

Contributions, enhancements, and creative decoy themes are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Kuzey Yıldız (ktarxhun).
