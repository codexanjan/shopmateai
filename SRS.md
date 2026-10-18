# Software Requirements Specification (SRS)
## Project: ShopMate AI — AI-Powered Café Ordering & Customer Support Bot
**IEEE-830 Standard Aligned**  
**Document Version:** 1.0.0  

---

### 1. Introduction
#### 1.1 Purpose
This document provides a detailed specification for the ShopMate AI Web Application, including functional specifications, data models, interface requirements, performance constraints, and external interface specifications.

#### 1.2 Scope of System
ShopMate AI is a progressive web application encompassing:
- High-conversion customer storefront with menu filtering, drink customization, and multi-tier checkout.
- Multi-role authentication (Customer, Store Owner / Admin, and 1-Click Demo Profiles).
- Conversational AI Assistant integrated with Google Gemini API and local reactive state dispatch.
- Real-time Kitchen Operations & Order Kanban Dashboard.
- Menu Inventory CRUD manager and Table Reservation tracking.
- Business metrics analytics engine.

---

### 2. Overall Description

#### 2.1 Product Perspective
ShopMate AI operates as an autonomous, ultra-fast client-side responsive application with persistent client storage (LocalStorage / IndexedDB) and modular cloud backend connectors (Firebase Web SDK / REST API / Google Gemini API).

#### 2.2 User Classes and Characteristics
1. **Unauthenticated Visitor:** Can view landing page, browse menu, interact with AI demo, and simulate cart.
2. **Authenticated Customer:** Can place orders, track live status, customize food/beverages, book tables, and save past orders.
3. **Café Manager / Barista (Admin):** Can modify order states, manage menu items, review reservations, analyze metrics, and manage café system settings.

#### 2.3 Operating Environment
- Modern Evergreen Web Browsers: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+, Mobile Safari, Mobile Chrome.
- Responsive breakpoints: Mobile (<640px), Tablet (640px–1024px), Desktop (>1024px).

---

### 3. System Features & Functional Specifications

#### 3.1 Authentication & Session Management (FR-AUTH)
- **FR-AUTH-01:** System shall provide Email/Password registration and login.
- **FR-AUTH-02:** System shall provide "1-Click Demo Switcher" allowing immediate switching between:
  - Customer Persona ("Alex Morgan")
  - Admin/Owner Persona ("Brew & Bliss Manager")
- **FR-AUTH-03:** Session persistence via encrypted browser local state with instant reactivity.

#### 3.2 Menu & Catalog Module (FR-CATALOG)
- **FR-CATALOG-01:** Items must have `id`, `name`, `category`, `price`, `description`, `image`, `dietaryTags` (`["Vegan", "Gluten-Free", "Chef's Special"]`), `rating`, and `isAvailable`.
- **FR-CATALOG-02:** Real-time search by keyword and category pill filtering.
- **FR-CATALOG-03:** Drink customization options: Milk options, Sweetness percentage (0%, 50%, 100%), Temperature (Hot/Iced), Special instructions.

#### 3.3 Cart & Order Processing (FR-ORDER)
- **FR-ORDER-01:** Real-time cart state with quantity modifiers, custom notes, and promo code verification (`FIRSTSIP` for 15% off, `CAFE50` for ₹50 off).
- **FR-ORDER-02:** Support for order types: Dine-In (Table # prompt), Takeaway (counter pickup), or Local Delivery.
- **FR-ORDER-03:** Simulation of payment gateway with realistic state transitions (Processing ➔ Confetti Celebratory Success ➔ Order ID generated).
- **FR-ORDER-04:** Live order tracking displaying visual stages: `Received` ➔ `Brewing/Preparing` ➔ `Ready` ➔ `Completed`.

#### 3.4 Table Reservation System (FR-RESERVE)
- **FR-RESERVE-01:** Date picker (preventing past dates), time slot selection (10:00 AM to 10:00 PM), party size (1–12 guests), and seating area (Indoor Cozy, Sunlit Patio, Quiet Work Zone).
- **FR-RESERVE-02:** Instant reservation ticket generation with booking reference ID.

#### 3.5 AI Conversational Engine (FR-AI)
- **FR-AI-01:** Support direct connection to Google Gemini API (`gemini-1.5-flash` / `gemini-2.0-flash`).
- **FR-AI-02:** System prompt injected with live menu catalog, café hours, Wi-Fi details, and dietary info.
- **FR-AI-03:** Function Calling / Intent Detection:
  - Intent `ADD_TO_CART`: Extracts item name, quantity, and adds to active cart.
  - Intent `BOOK_TABLE`: Extracts date, time, and guests to launch booking.
  - Intent `FAQ`: Answers Wi-Fi, location, pet policy, opening hours.
- **FR-AI-04:** Offline / Default Hybrid Engine: When Gemini API key is not supplied, executes intelligent heuristics so the demo never fails.

#### 3.6 Owner / Admin Back-Office (FR-ADMIN)
- **FR-ADMIN-01:** Live Kitchen Kanban board with columns: New Orders, Brewing, Ready for Pickup, Delivered.
- **FR-ADMIN-02:** Audio chime toggle on new incoming orders.
- **FR-ADMIN-03:** Inventory CRUD: Add new dish, update price/photo, toggle instant stock availability.
- **FR-ADMIN-04:** Analytics engine calculating Gross Sales, Order Count, Average Basket Value, Popular Items, and Chatbot deflection stats.
- **FR-ADMIN-05:** AI Owner Copilot: Generate marketing copy, review sales summaries.

---

### 4. Non-Functional Requirements

#### 4.1 Performance (NFR-PERF)
- Initial First Contentful Paint (FCP): < 1.0 second.
- Time to Interactive (TTI): < 1.5 seconds.
- Local state transition latency: < 50ms.
- Chatbot response latency: < 1200ms (via Gemini Stream/Flash).

#### 4.2 Usability & Aesthetic Quality (NFR-UI)
- Visual Theme: Premium Artisan Coffee Aesthetic (warm espresso tones, velvety amber accents `#D97706`, creamy latte `#FBF7F0`, deep charcoal glass `#1E1B18`).
- Micro-interactions on buttons, floating cart badges, and glowing live indicators.
- Accessibility compliance with WCAG 2.1 AA color contrast.

#### 4.3 Reliability & Fault Tolerance (NFR-REL)
- Zero crash policy on missing network/API connectivity.
- Graceful error boundary wrapping all interactive components.
- Persistent data recovery on browser refresh.
