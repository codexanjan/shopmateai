import React from "react";
import { Bot, LayoutDashboard, CalendarCheck, Sliders, DollarSign, Sparkles } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: <Bot size={26} color="#F59E0B" />,
      title: "1. Shop Order Bot (Gemini AI)",
      tag: "Customer Facing",
      description:
        "Answers FAQs (opening hours, Wi-Fi pass, vegan items, pet policies) and allows customers to add items or book tables directly inside natural conversation.",
      highlight: "Trained on your live menu & hours",
    },
    {
      icon: <LayoutDashboard size={26} color="#10B981" />,
      title: "2. Real-Time Barista Kanban",
      tag: "Kitchen Operations",
      description:
        "Orders appear instantly with acoustic chimes. Baristas advance items from New ➔ Brewing ➔ Ready with a single tap, updating the customer in real time.",
      highlight: "Acoustic audio alert feedback",
    },
    {
      icon: <CalendarCheck size={26} color="#8B5CF6" />,
      title: "3. Smart Table Reservations",
      tag: "Dine-in Experience",
      description:
        "Eliminates phone interruptions. Guests select date, time, party size, and seating area (Sunlit Patio vs Indoor Cozy) with instant booking tickets.",
      highlight: "Instant digital table pass",
    },
    {
      icon: <Sliders size={26} color="#3B82F6" />,
      title: "4. Deep Beverage Customizer",
      tag: "Artisanal Coffee",
      description:
        "Give coffee connoisseurs exactly what they want: Oat/Almond milk upgrades, 0%/50%/100% sweetness scales, and custom brewing notes.",
      highlight: "Zero order misunderstanding",
    },
    {
      icon: <DollarSign size={26} color="#F59E0B" />,
      title: "5. Zero Third-Party Commissions",
      tag: "Business Economics",
      description:
        "Stop giving away 20% to 30% of your hard-earned revenue to food aggregators. Pay just ₹499/month and keep 100% of your sales via direct UPI / Cards.",
      highlight: "Save ₹15,000+ every month",
    },
    {
      icon: <Sparkles size={26} color="#EC4899" />,
      title: "6. AI Owner Copilot",
      tag: "Admin Intelligence",
      description:
        "Draft enticing Instagram captions for your daily specials, analyze peak ordering hours, and generate stock restock advice with a single prompt.",
      highlight: "Built-in marketing generator",
    },
  ];

  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 50px auto" }}>
          <div className="badge badge-amber" style={{ marginBottom: "12px" }}>
            Why Local Cafés Choose ShopMate AI
          </div>
          <h2 style={{ marginBottom: "16px" }}>
            Everything Your Café Needs <br />
            <span className="text-gradient-amber">From First Sip to Daily Accounting</span>
          </h2>
          <p style={{ fontSize: "1.05rem" }}>
            Built specifically to solve the real-world operational challenges of busy baristas, passionate coffee roasters, and local bakery owners.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((f, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "var(--radius-lg)",
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {f.icon}
                </div>
                <span className="badge badge-neutral" style={{ fontSize: "0.7rem" }}>
                  {f.tag}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", marginBottom: "10px", color: "var(--text-primary)" }}>
                {f.title}
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                {f.description}
              </p>

              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "12px",
                  fontSize: "0.8rem",
                  color: "var(--accent-amber-light)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>✨</span>
                <span>{f.highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
