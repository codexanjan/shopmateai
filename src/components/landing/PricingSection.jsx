import React, { useState } from "react";
import { Check, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function PricingSection({ setCurrentView }) {
  const { switchRole } = useAuth();
  const [dailyOrders, setDailyOrders] = useState(35);
  const avgOrderValue = 260; // in INR

  // Monthly metrics
  const monthlyRevenue = dailyOrders * avgOrderValue * 30;
  const aggregatorFee = Math.round(monthlyRevenue * 0.22); // 22% typical aggregator cut
  const shopMateCost = 499;
  const netSaved = aggregatorFee - shopMateCost;

  return (
    <section className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 50px auto" }}>
          <div className="badge badge-amber" style={{ marginBottom: "12px" }}>
            Simple, Transparent Pricing
          </div>
          <h2 style={{ marginBottom: "16px" }}>
            Flat <span className="text-gradient-amber">₹499/Month</span> Per Café
          </h2>
          <p style={{ fontSize: "1.05rem" }}>
            Zero setup fees. Zero commission on orders. Try it free for 14 days with your actual staff and menu.
          </p>
        </div>

        {/* Pricing Card & ROI Calculator Side-by-Side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {/* Flat Pricing Plan Card */}
          <div
            className="glass-card animate-pulse-glow"
            style={{
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--radius-xl)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              background: "linear-gradient(180deg, rgba(30, 25, 20, 0.9) 0%, rgba(18, 15, 12, 0.95) 100%)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span className="badge badge-amber">Artisan Café Plan</span>
              <span style={{ fontSize: "0.82rem", color: "#34D399", fontWeight: 700 }}>14-Day Free Trial</span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "3.2rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                ₹499
              </span>
              <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>/ month</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "28px" }}>
              Billed monthly. Cancel anytime with 1 click.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px", flex: 1 }}>
              {[
                "Unlimited AI Chatbot inquiries & drink recommendations",
                "Real-time Barista Kitchen Kanban board with audio chimes",
                "Online storefront with live menu & out-of-stock toggles",
                "Instant table reservation desk & guest tickets",
                "Direct UPI, Card, and Cash on counter checkouts",
                "AI Owner Marketing & Copilot assistant",
                "No hardware required — runs on existing tablet or phone",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.88rem" }}>
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <Check size={12} color="#10B981" strokeWidth={3} />
                  </div>
                  <span style={{ color: "var(--text-primary)" }}>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                switchRole("admin");
                setCurrentView("admin");
              }}
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
            >
              <span>Launch 14-Day Free Trial</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "10px" }}>
              No credit card required · Instant setup in &lt; 5 minutes
            </div>
          </div>

          {/* Interactive ROI Calculator */}
          <div
            className="glass-card"
            style={{
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--radius-xl)",
              background: "var(--bg-surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <TrendingUp size={22} color="#10B981" />
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Interactive ROI Calculator</h3>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              See how much your café saves by switching customer inquiries and takeaway orders from 22% commission platforms to ShopMate AI.
            </p>

            {/* Slider */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                <span>Average Daily Orders:</span>
                <strong style={{ color: "var(--accent-amber)", fontSize: "1.1rem" }}>{dailyOrders} orders / day</strong>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(parseInt(e.target.value, 10))}
                style={{
                  width: "100%",
                  accentColor: "var(--accent-amber)",
                  cursor: "pointer",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                <span>10 (Niche roastery)</span>
                <span>60 (Busy high-street)</span>
                <span>120 (Peak coffee bar)</span>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Est. Monthly Direct Sales:</span>
                <strong style={{ fontSize: "0.95rem" }}>₹{monthlyRevenue.toLocaleString()}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: "0.85rem", color: "#FCA5A5" }}>Aggregator Cuts Lost (22%):</span>
                <strong style={{ fontSize: "0.95rem", color: "#EF4444" }}>- ₹{aggregatorFee.toLocaleString()}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "var(--radius-lg)" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "#34D399", fontWeight: 700 }}>
                    Net Profit Retained / Month:
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    After paying ShopMate AI ₹499
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "#10B981" }}>
                  + ₹{netSaved.toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <ShieldCheck size={16} color="#F59E0B" />
              <span>Plus an estimated <strong>75 hours of barista time</strong> saved from answering repetitive calls.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
