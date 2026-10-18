# Product Requirements Document (PRD)
## Project: ShopMate AI — AI-Powered Café Ordering & Customer Support Bot
**Target Industry:** Local Commerce / Food & Beverage / Specialty Cafés  
**Document Version:** 1.0.0  
**Status:** Approved for Implementation  

---

### 1. Executive Summary & Problem Statement
Small-to-medium cafés, artisan roasteries, and neighbourhood bakeries lose an estimated 20% to 35% of daily online and takeaway orders because staff are busy pulling espresso shots or serving tables, leaving digital inquiries (Instagram DMs, WhatsApp messages, website queries) unanswered.

**Key Pain Points:**
1. **Slow Query Response Times:** Inquiries regarding opening hours, Wi-Fi passwords, table bookings, dietary options (vegan, gluten-free), and daily brew specials go unanswered during peak hours.
2. **Third-Party Commission Fees:** Platforms like Swiggy, Zomato, or UberEats charge 20–30% commission per order, eroding small café margins.
3. **Disjointed Kitchen Workflow:** Orders received over phone or chat are scribbled on napkins or lost, leading to kitchen delays and wrong customizations.

### 2. Product Vision & Value Proposition
**ShopMate AI** turns any café into an automated 24/7 digital storefront with an intelligent, conversational ordering assistant powered by Google Gemini AI, seamless customer checkout, real-time kitchen Kanban order tracking, table reservations, and an owner business dashboard.

**Value Metrics:**
- **Zero Complicated Setup:** Ready in under 5 minutes.
- **Revenue Model:** Free 14-day trial, then ₹499/month flat SaaS fee (saving owners thousands in commissions).
- **Time Saved:** Eliminates 2.5 hours/day of repetitive customer Q&A.
- **Conversion Lift:** 28% higher basket size via AI upselling and drink recommendations.

---

### 3. User Personas

#### Persona A: Alex (The Customer / Coffee Enthusiast)
- **Profile:** Remote professional or college student looking for artisanal coffee, quiet workspace, and quick takeaway.
- **Needs:** Fast menu exploration, instant answers about vegan oat milk or allergen info, ability to customize sweetness/ice levels, seamless table reservation, and real-time status updates without calling the counter.
- **Goals:** Order ahead, avoid queues, have personalized drink recommendations.

#### Persona B: Viraj / Priya (The Café Owner & Head Barista)
- **Profile:** Passionate small business owner managing front-of-house, kitchen, and inventory.
- **Needs:** Live order board that dings when new orders arrive, instant menu item toggles (mark items as sold-out on the fly), table booking oversight, revenue analytics, and an AI copilot to generate daily marketing specials.
- **Goals:** Reduce staff overhead, eliminate missed orders, maintain high customer satisfaction.

---

### 4. Core Features & Functional Requirements

#### 4.1. Consumer-Facing Storefront & Ordering
- **Artisanal Menu Catalog:** Filterable by category (Artisanal Coffees, Speciality Teas, Fresh Pastries & Bakery, Gourmet Sandwiches, Healthy Bowls) and dietary preferences (Vegan, Vegetarian, Gluten-Free, Nut-Free).
- **Item Customizer:** Modal options for Milk (Whole, Oat +₹30, Almond +₹30), Sweetness (0%, 50%, 100%), Temperature (Hot, Iced), and Special Instructions.
- **Slide-out Cart & Checkout:** Real-time subtotal, GST (5%), discount promo codes (`FIRSTSIP`, `CAFE50`), dine-in (with table number), takeaway, or delivery option, instant simulated payment (UPI / QR / Card / Cash on counter).
- **Live Order Tracking:** Step-by-step visual tracker (Order Received ➔ Brewing ➔ Ready for Pickup ➔ Completed) with estimated preparation time countdown.
- **Table Reservation System:** Date, time-slot selection, party size, indoor vs outdoor seating preference, instant digital booking confirmation pass.

#### 4.2. Conversational AI Assistant ("ShopMate AI")
- **Natural Language Understanding:** Powered by Google Gemini AI (`gemini-1.5-flash` / `gemini-2.0-flash`) with prompt engineering tailored for local café hospitality.
- **Action-Executing Agent:** Chatbot can answer FAQs AND take direct actions:
  - *"Add 2 cold brews to my cart"* ➔ automatically syncs to cart.
  - *"Book a table for 2 tomorrow at 5 PM"* ➔ auto-populates reservation.
  - *"What are your opening hours and Wi-Fi password?"* ➔ instant accurate reply.
- **Resilient Fallback Engine:** Built-in café domain knowledge base ensures 100% uptime even if offline or prior to API key configuration.

#### 4.3. Merchant / Café Owner Dashboard
- **Live Kitchen Kanban Board:** Drag-and-drop or one-click status transitions (New ➔ Brewing ➔ Ready ➔ Completed) with audio ding notification.
- **Menu Management Studio:** Add, edit, delete menu items, change prices, upload or select food imagery, toggle stock availability with instant live reflection.
- **Reservation Manager:** Overview of all table reservations, status toggles (Confirmed, Seated, Cancelled).
- **Business Analytics & Intelligence:** Daily Gross Revenue, Order Volume, Average Ticket Size, Peak Ordering Hours chart, Top Selling Items ranking, AI Resolution Rate metrics.
- **AI Business Copilot:** Executive assistant for owners to draft promo messages, analyze sales, and suggest stock replenishment.
- **Café Configuration:** Edit café name, address, hours, Wi-Fi credentials, UPI payment details, and Gemini API keys.

---

### 5. Success Metrics (KPIs)
1. **Order Completion Rate:** > 85% of users who initiate checkout complete the order.
2. **AI Inquiry Resolution Rate:** > 90% of FAQ queries answered without staff intervention.
3. **Average Order Speed:** < 45 seconds from landing on page to order placement.
4. **Owner Administrative Efficiency:** < 3 clicks to update order status or mark an item out-of-stock.
