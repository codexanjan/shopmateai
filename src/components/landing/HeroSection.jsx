import React from "react";
import { Coffee, ArrowRight, Sparkles, ShieldCheck, Star, Bot, Clock, HeartHandshake } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function HeroSection({ setCurrentView }) {
  const { switchRole } = useAuth();

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "50px", paddingBottom: "70px" }}>
      {/* Ambient background glow orbs */}
      <div className="glow-bg" style={{ top: "-100px", left: "10%" }} />
      <div className="glow-bg" style={{ top: "150px", right: "5%", background: "radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(18, 16, 14, 0) 70%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div>
            {/* Pill Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                color: "var(--accent-amber-light)",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              <Sparkles size={15} color="#F59E0B" />
              <span>Idea #10 · Local Commerce AI Assistant</span>
            </div>

            {/* Main Headline */}
            <h1 style={{ marginBottom: "20px" }}>
              Turn Your Café Into a <br />
              <span className="text-gradient-amber">Smart 24/7 Ordering Hub</span> with Conversational AI
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "32px", lineHeight: 1.65, maxWidth: "540px" }}>
              Small cafés lose up to 35% of takeaway orders to unanswered WhatsApp and Instagram inquiries.
              <strong> ShopMate AI</strong> automates menu Q&As, takes customizations, and routes paid orders straight to your kitchen Kanban board.
            </p>

            {/* Primary Action Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
              <button
                onClick={() => setCurrentView("menu")}
                className="btn btn-primary btn-lg"
              >
                <Coffee size={20} />
                <span>Explore Menu & Order</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  switchRole("admin");
                  setCurrentView("admin");
                }}
                className="btn btn-secondary btn-lg"
              >
                <ShieldCheck size={19} color="#F59E0B" />
                <span>Barista Kitchen Board</span>
              </button>
            </div>

            {/* Social Proof & Rating Highlights */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", borderTop: "1px solid var(--border-subtle)", paddingTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>4.9/5 Rating</strong> by 1,240+ Artisan Coffee Lovers
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div style={{ position: "relative" }}>
            <div
              className="glass-card animate-pulse-glow"
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                background: "rgba(24, 20, 16, 0.85)",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(18, 15, 12, 0.9)",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0F0D0B",
                    }}
                  >
                    <Bot size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>ShopMate AI Concierge</div>
                    <div style={{ fontSize: "0.72rem", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981" }} />
                      Connected to Brew & Bliss Roastery
                    </div>
                  </div>
                </div>

                <span className="badge badge-amber">Gemini Flash</span>
              </div>

              {/* Chat Simulation Content */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.88rem" }}>
                {/* Guest message */}
                <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: "rgba(245, 158, 11, 0.2)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "10px 14px", borderRadius: "16px 16px 4px 16px", color: "var(--text-primary)" }}>
                  "Hey! What sweet iced coffee do you recommend, and can I get it with oat milk?"
                </div>

                {/* AI response */}
                <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", color: "var(--text-secondary)" }}>
                  <p style={{ margin: 0, marginBottom: "8px", color: "var(--text-primary)" }}>
                    ☕ Our <strong>Iced Salted Caramel Macchiato</strong> (₹240) is our most loved drink! Layered cold vanilla milk, double espresso, and house-made salted caramel.
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    🌾 Absolutely! We use organic Barista Oat Milk (+₹30) that foams with perfect velvety microfoam.
                  </p>

                  <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setCurrentView("menu")}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                    >
                      <Coffee size={13} />
                      <span>Order This (₹270)</span>
                    </button>
                    <button
                      onClick={() => setCurrentView("tracker")}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                    >
                      <Clock size={13} />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                {/* Live Kitchen Notification Teaser */}
                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px dashed rgba(16, 185, 129, 0.35)",
                    borderRadius: "var(--radius-md)",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: "0.78rem", color: "#34D399" }}>
                    <strong>Kitchen Live:</strong> Barista Viraj is brewing Order #9421 (Est. ready in 3 mins)
                  </span>
                </div>
              </div>

              {/* Bottom Quick Chips */}
              <div
                style={{
                  padding: "12px 20px",
                  background: "rgba(15, 13, 11, 0.95)",
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                }}
              >
                <span className="badge badge-neutral" style={{ cursor: "pointer" }} onClick={() => setCurrentView("menu")}>
                  🥐 Vegan Pastries
                </span>
                <span className="badge badge-neutral" style={{ cursor: "pointer" }} onClick={() => setCurrentView("menu")}>
                  📶 Guest Wi-Fi
                </span>
                <span className="badge badge-neutral" style={{ cursor: "pointer" }} onClick={() => setCurrentView("menu")}>
                  🐾 Pet Friendly
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Stat Ticker */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "60px",
          }}
        >
          <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--accent-amber)" }}>
              &lt; 1s
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              AI Response Latency
            </div>
          </div>

          <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "#10B981" }}>
              ₹499
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Flat Monthly SaaS Fee
            </div>
          </div>

          <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--accent-amber-light)" }}>
              2.5 hrs
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Saved Daily by Barista
            </div>
          </div>

          <div className="glass-card" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "#A78BFA" }}>
              0%
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
              Third-Party Commissions
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
