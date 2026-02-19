# Chamu Pages

### High-Performance Static Web Studio

This repository hosts the source code for Chamu Pages, my personal portfolio and agency website. It serves as a live demonstration of my core philosophy: websites should be instant, secure, and conversion-focused.

I specialize in replacing bloated WordPress sites with hand-coded, high-performance static architecture.

## The Philosophy

The modern web has become slow. Businesses rely on heavy page builders, unoptimized plugins, and complex databases just to display static content. This results in slow load times, security vulnerabilities, and poor user experience.

My approach, "The Antidote," focuses on three pillars:

1.  **Speed as a Feature:** Every millisecond of latency costs revenue. I build sites that target a 100/100 Google Lighthouse score.
2.  **Security by Default:** By removing the database and server-side processing, the attack surface is virtually eliminated.
3.  **Conversion Psychology:** Design is not just decoration. The layout is engineered to guide users from "Interest" to "Action" using clear visual hierarchies and psychological triggers.

## Technical Architecture

This project is built without frameworks or runtime dependencies. It is designed to be timeless, maintainable, and deployable to the edge.

### Core Stack
* **Structure:** Semantic HTML5
* **Styling:** Tailwind CSS (Utility-first architecture)
* **Interactivity:** Vanilla JavaScript (ES6+)
* **Analytics:** Cloudflare Web Analytics (Privacy-first, cookie-free)
* **Forms:** Web3Forms (Serverless form handling)
* **Intake:** Tally.so (GDPR-compliant project onboarding)

### Deployment & Infrastructure
* **Hosting:** Cloudflare Pages (Edge Network)
* **Security:** Cloudflare WAF & Bot Fight Mode
* **Asset Optimization:** Manual compression and code minification

## Design System

The visual language of Chamu Pages is strict and minimal.

* **Typography:** Sans-serif stack for maximum readability across devices.
* **Contrast:** High-contrast dark mode aesthetic to reduce eye strain and focus attention on calls-to-action (CTAs).
* **Layout:** A single-column mobile-first approach that expands to grid layouts on desktop.

## Services Offered

I operate as a specialist, not a generalist. I offer a single, productized service package designed for service-based businesses.

### The Static Standard Package ($699)
A complete "Done-For-You" solution that includes:

* **Design & Development:** 5-page static website hand-coded for performance.
* **Content Strategy:** Professional layout and copywriting setup.
* **Performance:** Guaranteed 90+ Google Lighthouse Speed Score.
* **SEO Foundation:** Schema markup, meta tags, and sitemap generation.
* **Hosting Setup:** Zero monthly maintenance fees via Cloudflare.

## Local Development

To run this project locally, clone the repository and open it in your preferred environment. Since there are no heavy node_modules or build steps required for the core structure, it can be served immediately.

```bash
# Clone the repository
git clone [https://github.com/yourusername/chamu-pages.git](https://github.com/yourusername/chamu-pages.git)

# Navigate to the directory
cd chamu-pages

# Serve locally (using Python simple server or similar)
python3 -m http.server