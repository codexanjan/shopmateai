# ShopMate AI — AI-Powered Café Ordering & Barista Operations

> **Idea #10 · Local Commerce SaaS (₹499/month)**  
> An automated 24/7 digital storefront with a Google Gemini-powered conversational ordering assistant, real-time barista kitchen Kanban, artisanal drink customizer, table booking desk, and owner business intelligence dashboard.

---

## 🌟 Live Demo & Deployment Links

| Platform | Deployment Guide / Link | Status |
| :--- | :--- | :--- |
| **Vercel Deployment** | Deploy with 1-click via `vercel.json` (SPA routing pre-configured) | `Ready to Deploy` |
| **Render Deployment** | Deploy via `render.yaml` (Static web service on global CDN) | `Ready to Deploy` |
| **Local Dev Server** | `http://127.0.0.1:5173/` (`npm run dev`) | `Active` |

---

## 📚 Complete Project Specifications
All 4 core architectural documents are included directly in the repository:
1. [PRD.md](file:///c:/Users/anjan/Downloads/SHOP%20MATE/PRD.md) — **Product Requirements Document** (Problem statement, personas, revenue model, KPIs).
2. [SRS.md](file:///c:/Users/anjan/Downloads/SHOP%20MATE/SRS.md) — **Software Requirements Specification** (IEEE-830 functional requirements, data models, NFRs).
3. [TRD.md](file:///c:/Users/anjan/Downloads/SHOP%20MATE/TRD.md) — **Technical Requirements Document & Architecture** (Component trees, Gemini prompt specifications, state flow).
4. [DEVELOPMENT_STRUCTURE_AND_UI_UX_PLAN.md](file:///c:/Users/anjan/Downloads/SHOP%20MATE/DEVELOPMENT_STRUCTURE_AND_UI_UX_PLAN.md) — **UI/UX Design System** (Velvet espresso & amber crema tokens, glassmorphism, responsive breakpoints).

---

## ⚡ Core Features

### 1. 🤖 Shop Order Bot (Google Gemini Flash AI)
- Floating digital concierge trained on the live café menu, operating hours (7:00 AM – 11:00 PM), guest Wi-Fi (`freshbeans2026`), and dietary options (vegan, gluten-free).
- **Direct Action Execution:** Users can type *"Add 2 cold brews to my cart"* or *"Book a table for 2 tonight"*, and the bot directly updates the shopping cart and opens booking passes!
- **Resilient Fallback Engine:** Features an intelligent local barista heuristic engine so the bot works 100% reliably out-of-the-box even without an external API key.

### 2. 📋 Real-Time Barista Kitchen Kanban
- Live 4-stage column board (`Pending`, `Brewing`, `Ready for Pickup`, `Completed`) with acoustic bell chimes.
- Baristas advance tickets with a single click, automatically pushing live updates to the customer's brewing tracker screen.

### 3. ☕ Artisanal Beverage Customizer & Checkout
- Deep coffee customizer: Milk choices (Whole, Oat Milk +₹30, Almond Milk +₹30), Sweetness scales (0%, 25%, 50%, 100%), and Temperature (Iced, Piping Hot).
- Promo codes supported: `FIRSTSIP` (15% off) and `CAFE50` (₹50 off).
- Dine-in (with table number), Takeaway, and Delivery fulfillment modes.
- Simulated instant payment (UPI / QR / Card / Cash) with celebratory confetti.

### 4. 📅 Table Reservation Desk
- Date, time-slot selection, party size (1–12 guests), and seating preferences (Sunlit Patio, Indoor Cozy Booth, Quiet Work Zone).
- Instant digital table pass generation.

### 5. 👥 1-Click Multi-Role Persona Switcher
- Instantly switch between:
  - **Customer (Alex Morgan):** Browse, customize, place orders, chat with AI bot.
  - **Café Owner & Barista (Viraj Bagul):** Manage kitchen Kanban, toggle out-of-stock items, review sales analytics, and generate marketing promos with the AI Copilot.

---

## 🚀 Running Locally

```bash
# 1. Clone repository
git clone <your-repo-url>
cd "SHOP MATE"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://127.0.0.1:5173/` in your browser.

---

## 🌐 Deploying to Vercel & Render

### Deploying to Vercel
1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/shopmate-ai.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and select the imported repository.
3. The build configuration is automatically detected via [`vercel.json`](file:///c:/Users/anjan/Downloads/SHOP%20MATE/vercel.json):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy** to receive your live production URL (e.g., `https://shopmate-ai.vercel.app`).

### Deploying to Render
1. Go to [dashboard.render.com](https://dashboard.render.com/) and create a **New Static Site**.
2. Connect your GitHub repository.
3. Render automatically picks up [`render.yaml`](file:///c:/Users/anjan/Downloads/SHOP%20MATE/render.yaml):
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `./dist`
4. Click **Create Static Site** to get your live URL (e.g., `https://shopmate-ai.onrender.com`).

---

## 🔑 Configuration & Environment Variables

Create a `.env` file from [`.env.example`](file:///c:/Users/anjan/Downloads/SHOP%20MATE/.env.example):
```env
# Optional: Google Gemini API Key (or input directly into Admin Settings in UI)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Web App ID (Pre-configured)
VITE_FIREBASE_APP_ID=1:84930219485:web:9c7a8b6e4d2f01a3
```
