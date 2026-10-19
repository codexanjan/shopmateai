import React from "react";
import {
  Coffee,
  MessageSquare,
  Clock,
  LayoutDashboard,
  CalendarCheck,
  Brain,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Volume2,
} from "lucide-react";

export default function FeaturesPage({ setCurrentView }) {
  const featureList = [
    {
      icon: <MessageSquare size={28} color="#F59E0B" />,
      title: "Voice & Multilingual Ordering",
      desc: "Accept customer orders fluently in Kannada (ಕನ್ನಡ), Hindi (हिंदी), Tamil, Telugu, and English. Customers can type or tap the microphone to speak their order naturally, and hear the concierge respond aloud.",
      highlight: "Fluent in 8+ Languages",
    },
    {
      icon: <LayoutDashboard size={28} color="#10B981" />,
      title: "Kitchen Kanban & Barista Dispatch",
      desc: "Route paid orders directly to a 4-column visual board (New, Brewing, Ready, Completed). Baristas advance tickets with a single tap, triggering automatic customer audio and visual pickup alerts.",
      highlight: "Tablet & iPad Ready",
    },
    {
      icon: <Clock size={28} color="#3B82F6" />,
      title: "Dynamic Prep-Time & Order Tracking",
      desc: "Eliminates customer guessing with dynamic preparation time estimation calculated from active queue depth: Max(Prep Time) + (2.5 mins × Active Tickets). Live 4-step brewing countdown on customer devices.",
      highlight: "Real-Time ETA",
    },
    {
      icon: <Coffee size={28} color="#F59E0B" />,
      title: "Live Stock Sync & Smart Order Recovery",
      desc: "Toggle pastries or single-origin beans between In Stock and Sold Out with one click. When an item runs out, our Smart Order Recovery automatically recommends in-stock chef alternatives so you never lose a sale.",
      highlight: "Zero Disappointed Customers",
    },
    {
      icon: <CalendarCheck size={28} color="#8B5CF6" />,
      title: "Atmosphere Table Reservation Desk",
      desc: "Allow customers to book tables for work, meetings, or leisure across designated café zones: Sunlit Pet-Friendly Patio, Indoor Cozy Velvet Booths, or Quiet Work Zone with 300 Mbps Wi-Fi and power outlets.",
      highlight: "Instant Confirmation",
    },
    {
      icon: <ShieldCheck size={28} color="#EC4899" />,
      title: "Direct UPI & 0% Aggregator Commission",
      desc: "Customers pay directly to your café's UPI or card gateway with zero middleman fees. Retain 100% of your earnings instead of giving away 25%–30% in food aggregator commissions.",
      highlight: "Keep 100% Revenue",
    },
  ];

  return (
    <div className="container" style={{ padding: "50px 16px 90px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.03em" }}>
          Everything You Need to Run an <br />
          <span className="text-gradient-amber">Modern Artisan Café.</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Designed specifically for independent roasters, specialty coffee shops, and neighbourhood bakeries.
          Say goodbye to unanswered WhatsApp messages, paper tickets, and heavy aggregator commissions.
        </p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          marginBottom: "60px",
        }}
      >
        {featureList.map((f, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {f.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(245, 158, 11, 0.12)",
                    color: "var(--accent-amber)",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  {f.highlight}
                </span>
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px", lineHeight: 1.3 }}>
                {f.title}
              </h3>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div
        className="glass-panel"
        style={{
          padding: "40px",
          textAlign: "center",
          background: "linear-gradient(145deg, rgba(28, 22, 17, 0.98) 0%, rgba(18, 15, 12, 0.98) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px" }}>
          Ready to Modernize Your Café Operations?
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 28px" }}>
          Join independent cafés saving ₹24,000+ per month on commissions while elevating the customer experience.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setCurrentView("signup")}
            className="btn btn-primary btn-lg"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => setCurrentView("menu")}
            className="btn btn-secondary btn-lg"
          >
            <span>Browse Café Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
