# ArabianShegzy — Landing Page

Full-stack agency landing page for ArabianShegzy AI Automation Agency.

**Stack:** React 18 · Vite · Tailwind CSS v3 · Framer Motion · React Router

---

## Quick Start

```bash
cd arabianshegzy-landing
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Build for Production

```bash
npm run build     # Outputs to dist/
npm run preview   # Preview production build locally
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky navbar, transparent → blur on scroll
│   ├── LoadingScreen.jsx   # 1.5 s branded intro animation
│   ├── CustomCursor.jsx    # Electric blue glow cursor (desktop only)
│   ├── Hero.jsx            # Hero section with particle canvas
│   ├── ProblemStatement.jsx
│   ├── Services.jsx        # 6 service cards grid
│   ├── HowItWorks.jsx      # 3-step process with animated connector
│   ├── WhyUs.jsx           # 4 differentiator cards
│   ├── Testimonials.jsx    # 3 testimonial cards (replace with real ones)
│   ├── CTABanner.jsx       # Full-width CTA with glow button
│   └── Footer.jsx          # Links, social icons, copyright
├── pages/
│   └── AdminPanel.jsx      # Hidden admin at /admin
├── App.jsx                 # Router + loading screen
├── main.jsx
└── index.css               # CSS variables, global styles
```

---

## Customising Brand Colors

All colors are CSS variables in `src/index.css`:

```css
:root {
  --blue-electric: #0066ff;   /* Primary brand blue */
  --blue-neon:     #0099ff;   /* Lighter blue */
  --cyan-neon:     #00f0ff;   /* Accent cyan */
  --purple-neon:   #7b2fff;   /* Accent purple */
  --black-deep:    #0a0a0a;   /* Page background */
  --black-mid:     #111111;   /* Alternating section bg */
  --black-card:    #141414;   /* Card background */
}
```

Tailwind aliases for these are in `tailwind.config.js` under `theme.extend.colors.brand`.

---

## Customising Content

| What to change | Where |
|---|---|
| Hero headline & subheadline | `src/components/Hero.jsx` |
| Service cards (title, description, icon) | `src/components/Services.jsx` — `SERVICES` array |
| Testimonials | `src/components/Testimonials.jsx` — `TESTIMONIALS` array |
| Nav links | `src/components/Navbar.jsx` — `NAV_LINKS` array |
| Footer social links | `src/components/Footer.jsx` — `SOCIAL_LINKS` array |
| Contact email (CTA button) | `src/components/CTABanner.jsx` — `href` on the `<a>` tag |

---

## Admin Panel

Accessible at `/admin` — not linked from the public site.

**Default password:** `arabianshegzy2025` (change in `src/pages/AdminPanel.jsx`)

**Features:**
- Password gate + Anthropic API key entry
- Regenerate 6 copy sections using Claude Sonnet 4 (streaming)
- Copy-to-clipboard for each generated result
- API key stored in React state only — never persisted to storage

**To change the password:**
```js
// src/pages/AdminPanel.jsx — line ~72
const ADMIN_PASSWORD = 'your-new-password'
```

**Security note:**
The admin panel calls the Anthropic API directly from the browser. In production, proxy this through a backend endpoint (e.g., a Next.js API route or Express server) to keep your API key server-side.

---

## Replacing Placeholder Testimonials

Find `TESTIMONIALS` in `src/components/Testimonials.jsx` and replace each entry:

```js
{
  initials: 'AB',             // Avatar initials
  name: 'Alice B.',           // Display name
  role: 'CEO, Company Name',  // Role / company
  avatar_color: '#0066ff',    // Avatar background colour
  rating: 5,                  // Stars (1–5)
  quote: '"Real testimonial text here."',
}
```

---

## Adding Open Graph Image

Place your OG image at `public/og-image.png` (recommended: 1200×630 px).
The meta tag is already in `index.html` — update the URL to your live domain.

---

## Smooth Scroll

Smooth scroll between sections is handled by `html { scroll-behavior: smooth }` in `index.css`.
Section IDs: `#home`, `#services`, `#how-it-works`, `#about`, `#testimonials`, `#contact`.
