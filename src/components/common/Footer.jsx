import React from "react";
import { Coffee, Wifi, MapPin, Phone, ShieldCheck, Heart, Sparkles, ExternalLink } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function Footer({ setCurrentView }) {
  const { cafeInfo } = useStore();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
        paddingTop: "60px",
        paddingBottom: "40px",
        marginTop: "auto",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "36px",
            marginBottom: "48px",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F0D0B",
                }}
              >
                <Coffee size={20} strokeWidth={2.4} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem" }}>
                ShopMate<span style={{ color: "var(--accent-amber)" }}>.AI</span>
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.6 }}>
              The AI-Powered Ordering & Kitchen Operations platform designed for independent cafés, roasters, and neighbourhood bakeries.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.78rem", color: "var(--accent-amber-light)" }}>
              <Sparkles size={14} />
              <span>₹499/mo Local Commerce SaaS</span>
            </div>
          </div>

          {/* Café Location & Hours */}
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Visit Our Roastery
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <MapPin size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{cafeInfo.address}</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Phone size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
                <span>{cafeInfo.phone}</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Wifi size={16} color="#10B981" style={{ flexShrink: 0 }} />
                <span>Guest Wi-Fi: <strong style={{ color: "var(--text-primary)" }}>{cafeInfo.wifiSsid}</strong> (Pass: <code style={{ color: "var(--accent-amber)" }}>{cafeInfo.wifiPass}</code>)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <li>
                <button
                  onClick={() => setCurrentView("menu")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Artisanal Coffee Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("admin")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Live Kitchen Kanban & Barista Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("tracker")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Live Brewing Order Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("landing")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Pricing & Business ROI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Specifications & Tech Stack */}
          <div>
            <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Architecture & Docs
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--accent-amber)" }}>●</span>
                <span>Powered by <strong>Google Gemini API</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--accent-amber)" }}>●</span>
                <span>Firebase Web ID: <code style={{ fontSize: "0.75rem" }}>1:84930219485</code></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--status-success)" }}>●</span>
                <span>Includes PRD, SRS, TRD & UI/UX Plans</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--status-success)" }}>●</span>
                <span>Ready for Vercel & Render edge deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © {new Date().getFullYear()} ShopMate AI · Brew & Bliss Café Management System. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>Crafted with</span>
            <Heart size={13} color="#EF4444" fill="#EF4444" />
            <span>for local coffee shops & passionate roasters</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
