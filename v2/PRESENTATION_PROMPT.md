# Prompt — Build an i3 VISION presentation (4–5 slides)

> Copy everything below the line into Claude. It is fully self-contained: the
> project brief, the exact i3 brand styling, and the official i3 logo (inline SVG)
> are all included, so **you do not need to open, fetch, or navigate to any file.**

---

## Your task

Create a **4–5 slide presentation deck about i3 VISION** as a **single, self-contained
HTML file** (all CSS and assets inline — no external fonts, images, scripts, or CDNs).

Requirements:
- **16:9 slides**, one slide per screen, with simple keyboard navigation (← / → arrows)
  and on-screen Prev/Next. Each slide fills the viewport; no page scroll.
- Use **only the i3 brand styling listed below** — the exact hex colors, the typography,
  and the logo. Do not invent other colors or fonts.
- Put the **official i3 logo** (SVG provided below) in the top-left or footer of each slide.
  Recolor it by setting the `<path fill>` — **white (#FFFFFF)** on dark backgrounds,
  **Brand Blue (#00588F)** on light backgrounds.
- Clean, modern, confident, lots of whitespace. This is an executive-facing deck.
- Light slides by default; use **Dark Blue (#002447)** as a premium anchor for the
  title slide and/or section dividers and footers.
- Do not reference any external file or say "see the repo" — everything needed is here.

Deliver the finished `.html` and a one-line note on how to open it.

---

## About i3 & VISION (the content to present)

**i3 International** is a leader in **AI-powered surveillance and business-insight
solutions** — affordable, cloud-based AI that enhances **safety & security, operational
efficiency, and customer engagement**. Tagline: **"Affordable Integrated AI Solutions."**

**VISION** is i3's internal **agentic sales engine**: a closed-loop, AI-guided system that
walks every salesperson through the full deal lifecycle — from onboarding to close and
beyond — while capturing what top performers do, standardizing it, and improving it with
real data. Goal: **output per rep rises before headcount does**, on the path to **$50M+ by 2028.**
It lives **inside i3Host** (SSO) for i3 sales reps and integrators; it is **not public**.
Everything a rep enters is **saved to Salesforce and is proprietary to i3.**

**How it works:** one orchestrator (**Vision**) detects the sales stage, routes to the right
specialist agent, and enforces stage rules — **rules control progression; the LLM controls
quality; only *verified* activity advances a stage.**

**The agent stack (one engine, specialist agents):**
- **V-Start** — Onboarding: HR/onboarding doc → rep profile, ramp, mentors, training path.
- **V-Coach** — Training: i3Live modules, readiness, 45-day ramp.
- **V-Target** — Prospecting: 6sense / ZoomInfo intent → accounts + buying-group map.
- **V-Reach** — Marketing/outreach: email / LinkedIn / call openings, nurture, VAR network.
- **V-Research** — Market & account research → pain points mapped to i3's three modules.
- **V-Guide** — Verification: proves real email/call/meeting/mobile activity (anti-gaming).
- **V-Present** — Presentation: prep the deck → present the solution (not hardware) → capture transcript.
- **V-Prove** — POC: transcript → scoped Proof of Concept (Gardewine template), equipment, stakeholders.
- **V-Guard** — Legal & Privacy: Quebec **Law 25** / GDPR / PIPEDA / BIPA / CCPA screening,
  signage + PIA, cybersecurity gate.
- **V-Close** — Closing: price vs incumbent, contract, commitment.
- **V-Score / Manager** — Leadership: rep scoring, KPI funnel, intervention triggers.

**i3's three solution modules** (map every customer pain to one): **Safety & Security ·
Operations · Asset Protection.**

**The sales process, two phases (split at the customer's signature):**
- **Phase 1 · Sell & Close** — onboard → prospect → present → POC → privacy/cyber gate → close.
- **Phase 2 · Prove the Promise** — after sign-off, follow up to prove the delivered solution
  is helping the customer **as the contract promised** (promise-vs-actual scorecard,
  proof-of-value, references, expansion, renewal).

**i3's brand tone** (write the copy this way): **Driven · Inventive · Trustworthy · Fearless** —
"built on results, not promises."

### Suggested slide outline (4–5 slides)
1. **Title** — "VISION — i3's Agentic Sales Engine" + tagline + one-line value: *Sell like your
   best rep, at every stage.* (Dark Blue anchor slide, white logo.)
2. **Why VISION** — success today depends on individual instinct; VISION captures the top
   performers' playbook, standardizes it, and lifts output per rep toward $50M+ by 2028.
3. **The agent stack** — the Vision orchestrator + the specialist agents (onboarding → close),
   with the principle: *rules control progression, the LLM controls quality, only verified
   activity advances.*
4. **Two-phase sales process** — Phase 1 Sell & Close → signature → Phase 2 Prove the Promise;
   every pain mapped to Safety & Security / Operations / Asset Protection.
5. **Close** — inside i3Host, proprietary to i3, decision-support with human checkpoints; call to
   action. (Dark Blue anchor.)

---

## i3 Brand Styling — use these exact values

### Brand Identity colors (logo, corporate material, brand anchors)
| Color | HEX | RGB | Pantone | CMYK | Use for |
|---|---|---|---|---|---|
| **i3 Brand Blue** (brand-600) | `#00588F` | 0 / 88 / 143 | 7693 C | 97 / 69 / 19 / 4 | Primary brand color, headings, key accents, logo on light |
| **i3 Dark Blue** (brand-900) | `#002447` | 0 / 36 / 71 | 296 C | 100 / 66 / 0 / 83 | Hero backgrounds, footers, section dividers — **premium anchor** |

### Brand Expression colors (marketing, storytelling, icons/infographics — accents, **not** UI-functional)
| Color | HEX | RGB | Pantone | CMYK | Use for |
|---|---|---|---|---|---|
| **i3 Pink** | `#DF1E71` | 223 / 30 / 113 | 214 C | 3 / 97 / 21 / 0 | Section / accent labels, eyebrows, the standout **V** in "Vision", emphasis |
| **i3 Green** | `#00A661` | 0 / 166 / 97 | 3405 C | 87 / 0 / 73 / 0 | Positive / success / "verified" / Phase 2 accents |
| **i3 Yellow** | `#FFC107` | 255 / 193 / 7 | 7549 C | 0 / 24 / 94 / 0 | Highlights, "caution / in-progress", gradient accents |

Optional neutrals used in the product (fine for slide surfaces/text):
- Ink / body text on light: `#0d1b2a` (primary), `#33424f` (secondary), `#69788a` (muted)
- Light surfaces: page `#eef2f6`, panel/card `#ffffff`, hairline/border `#dfe6ee`
- On Dark Blue, text is white `#ffffff` with soft blue `#dceaf5` / `#7fc4ef` for sub-text.

**Color rules:** Brand Blue + Dark Blue carry structure and anchors. Pink/Green/Yellow are
**accents only** — never large flat fills of body content. Gradients should combine brand
colors (e.g. `linear-gradient(120deg, #002447, #00588F)` for hero panels).

### Typography
- **Primary font: Helvetica Neue** — use for all headings and body. CSS stack:
  `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;`
- **Secondary (optional, for a warmer feel on Retail / QSR / School verticals):**
  **Gitlab Sans** or **Barlow**. Since the deck must be self-contained (no external fonts),
  **default to the Helvetica Neue stack above** and do not load web fonts.
- Weights: headings **800**, sub-heads **700**, body **400**. Big confident headlines,
  generous line-height (~1.5 body), letter-spacing slightly tight on large headings
  (`-0.3px`) and wide on uppercase eyebrows (`.2em`).
- Keep the brand token **"i3" lowercase** even inside uppercase labels.

### Logo — official i3 wordmark (inline SVG, self-contained)
Rules: match the logo to the background — **white on dark, Brand Blue on light**; keep clear
space around it (≈ the height of the mark on all sides); don't reproduce it below ~140px wide;
don't stretch or recolor beyond white/Brand Blue/Dark Blue. Recolor by changing every
`fill="#00588F"` to `#FFFFFF` (on dark) or leaving it Brand Blue (on light).

```html
<svg width="800" height="339" viewBox="0 0 800 339" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M176.526 84.0395C291.927 22.8794 447.867 12.2292 574.621 16.8037C700.519 21.3467 797.636 40.8933 797.636 40.8933C797.636 40.8933 634.842 -1.28912 445.374 0.0303203C445.316 0.0303203 445.256 0.0283439 445.195 0.0263677C445.135 0.0243914 445.075 0.022415 445.017 0.022415C199.238 0.022415 0 75.7832 0 169.25C0 169.531 0.0283259 170.152 0.0519035 170.669C0.0687116 171.037 0.0831061 171.352 0.0831061 171.454C1.53747 214.545 45.3012 253.741 116.348 283.322L99.7603 236.944C107.382 244.79 116.299 252.295 126.379 259.477C166.678 288.133 225.55 310.975 295.451 324.572C341.317 333.492 391.87 338.462 445.017 338.462C454.305 338.462 463.469 338.134 472.559 337.81C476.945 337.653 481.314 337.497 485.672 337.379C505.086 336.834 534.597 333.792 534.597 333.792C534.597 333.792 474.769 334.242 399.915 320.613C88.0758 259.303 140.134 119.696 228.6 69.1779C85.8899 130.638 104.149 192.068 129.679 224.619C82.9152 182.081 85.5913 132.227 176.526 84.0395ZM291.57 139.471H262.931V247.27H291.57V139.471ZM262.939 110.468H291.57V84.3557H262.939V110.468ZM326.017 145.01V147.412L326.067 149.846C326.225 154.68 328.709 157.075 333.571 157.027C338.666 157.075 341.309 154.301 341.517 148.802L341.549 144.71V141.02C341.549 139.385 341.491 137.852 341.283 136.414C341.051 134.581 340.419 133.08 339.43 131.903C337.868 130.196 334.635 129.343 329.799 129.343H324.089V118.179H329.3C334.852 118.298 338.533 117.223 340.294 114.924C341.101 113.826 341.525 112.522 341.558 110.95V107.26V102.243C341.558 97.2182 339.156 94.7532 334.303 94.8244C329.3 94.9112 326.815 97.2972 326.881 102.014V104.645H307.958V102.591C307.925 100.283 308.191 98.0555 308.814 95.8749C310.318 89.9255 314.515 86.2596 321.305 84.9007C325.303 84.0868 329.499 83.6604 333.879 83.6604C338.458 83.6604 342.455 83.9683 345.946 84.5611C353.11 85.7937 357.597 89.5146 359.359 95.6934C360.082 98.3243 360.464 100.765 360.498 103.057V106.225C360.456 115.026 357.722 120.407 352.287 122.382L348.597 123.623C355.852 125.092 359.775 129.224 360.34 135.995L360.498 141.075V144.702C360.456 149.134 360.248 152.271 359.933 154.096C359.293 157.596 357.755 160.393 355.287 162.51C350.891 166.287 343.827 168.175 334.028 168.175C330.106 168.199 326.399 167.899 322.892 167.235C319.028 166.619 315.861 165.458 313.435 163.798C310.958 162.115 309.346 159.974 308.531 157.367C307.792 155.384 307.327 153.164 307.244 150.715L307.102 147.546V145.002H326.017V145.01ZM317.44 199.439H324.305V246.836H317.44V199.439ZM342.613 199.439L355.561 240.279V199.439H361.993V246.828H351.231L338.308 206.431V246.828H331.876V199.439H342.613ZM397.322 204.788V199.439H367.404V204.788H378.93V246.828H385.795V204.788H397.322ZM403.048 199.439H425.503V204.788H409.912V219.807H424.556V225.157H409.912V241.487H425.952V246.828H403.048V199.439ZM440.778 219.965V204.787H446.097C449.147 204.795 451.225 205.198 452.355 205.957C453.876 206.976 454.648 208.825 454.648 211.471C454.648 213.913 454.374 215.651 453.859 216.71C453.07 218.297 451.599 219.293 449.48 219.656C448.391 219.87 447.144 219.965 445.698 219.965H440.778ZM449.454 199.438H445.349V199.43H433.922V246.828H440.778V225.314H445.523C446.853 225.314 448.058 225.44 449.122 225.709C451.591 226.396 452.978 228.427 453.302 231.84L453.535 236.28L453.784 240.546C453.851 241.866 453.984 242.956 454.166 243.801L454.848 246.828H461.995C461.463 245.168 461.139 243.896 460.998 243.035C460.757 241.834 460.549 240.167 460.441 238.018L460.159 232.448C460.084 230.749 459.934 229.311 459.693 228.047C459.344 226.167 458.422 224.8 456.943 223.955C455.928 223.362 454.241 222.951 451.923 222.706C455.663 222.098 458.198 220.936 459.502 219.19C460.823 217.366 461.497 214.703 461.497 211.234C461.439 204.59 458.854 200.813 453.793 199.881C452.479 199.604 451.025 199.454 449.454 199.438ZM480.536 199.439L493.476 240.279V199.439H499.908V246.828H489.154L476.223 206.431V246.828H469.774V199.439H480.536ZM526.743 230.663H515.856L521.474 205.42L526.743 230.663ZM526.112 199.439H517.095L505.601 246.836H512.249L514.677 236.02H528.015L530.383 246.836H537.597L526.112 199.439ZM571.33 199.439V204.788H559.803V246.828H552.946V204.788H541.42V199.439H571.33ZM578.419 199.439H585.267V246.836H578.419V199.439ZM599.836 230.568C599.86 234.55 600.117 237.141 600.574 238.326C601.054 239.528 601.956 240.476 603.244 241.163C604.538 241.842 605.868 242.198 607.232 242.159C608.479 242.198 609.686 241.914 610.827 241.321C613.006 240.286 614.189 238.484 614.405 235.885C614.511 234.416 614.587 232.63 614.61 230.576V214.703C614.634 211.274 614.306 208.864 613.621 207.474C612.526 205.206 610.406 204.1 607.214 204.108C605.991 204.108 604.837 204.353 603.748 204.819C601.505 205.736 600.269 207.584 599.994 210.326C599.854 211.582 599.784 213.036 599.819 214.695V230.568H599.836ZM592.985 214.727C593.003 210.847 593.319 208.011 593.898 206.186C594.818 203.35 596.844 201.319 599.971 200.102C602.219 199.194 604.65 198.759 607.25 198.759C609.814 198.759 612.25 199.194 614.528 200.102C617.585 201.319 619.605 203.35 620.536 206.186C621.128 207.98 621.444 210.832 621.491 214.727V230.607C621.491 233.483 621.362 235.964 621.104 238.018C620.331 244.292 615.775 247.468 607.449 247.515C601.388 247.515 597.342 246.045 595.292 243.107C593.735 240.894 592.962 236.73 592.997 230.615V214.727H592.985ZM652.631 240.279L639.702 199.439H628.945V246.828H635.386V206.431L648.327 246.828H659.084V199.439H652.631V240.279ZM675.029 230.663H685.927L680.663 205.42L675.029 230.663ZM676.253 199.439H685.277L696.778 246.836H689.557L687.186 236.02H673.858L671.422 246.836H664.764L676.253 199.439ZM709.719 199.439H702.862V246.828H724.247V241.487H709.719V199.439Z" fill="#00588F"/><path d="M776.124 23.8475V0H779.781L788.14 21.0471H788.197L796.384 0H800V23.8475H797.633V2.58921H797.543L789.208 23.8475H786.948L778.581 2.58921H778.515V23.8475H776.124Z" fill="#00588F"/><path d="M754.286 0.0108071H772.795V1.93329H764.748V23.8471H762.373V1.93329H754.286V0.0108071Z" fill="#00588F"/></svg>
```

### Quick copy-paste CSS tokens
```css
:root{
  --brand:#00588F;      /* i3 Brand Blue  */
  --brand-900:#002447;  /* i3 Dark Blue — hero/anchor */
  --pink:#DF1E71;       /* accent / labels / standout V */
  --green:#00A661;      /* success / verified / Phase 2 */
  --yellow:#FFC107;     /* highlight / caution */
  --ink:#0d1b2a; --ink2:#33424f; --muted:#69788a;
  --bg:#eef2f6; --panel:#ffffff; --line:#dfe6ee;
  --font:"Helvetica Neue",Helvetica,Arial,sans-serif;
}
```

### Do / Don't
- **Do:** white or Brand-Blue logo matched to background; Dark-Blue hero/anchor slides; Pink
  eyebrows and the standout **V**; plenty of clear space; confident, results-first copy.
- **Don't:** load external fonts/images/CDNs; use non-brand colors; stretch/recolor the logo
  off-palette; fill large areas with Pink/Green/Yellow; crowd the logo's clear space.
