import React from "react";
import { Coffee, Wifi, MapPin, Phone, ShieldCheck, Heart, Sparkles, LogIn, CalendarCheck } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function Footer({ setCurrentView }) {
  const { cafeInfo } = useStore();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
        paddingTop: "50px",
        paddingBottom: "36px",
        marginTop: "auto",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
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
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "14px", lineHeight: 1.6 }}>
              Artisanal Café Ordering, Multilingual Concierge & Kitchen Decision Intelligence platform. Built for independent food commerce.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.25)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", color: "var(--accent-amber-light)" }}>
              <Sparkles size={13} />
              <span>Flat ₹499/mo · Zero Aggregator Commissions</span>
            </div>
          </div>

          {/* Café Location & Hours */}
          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Brew & Bliss Roastery
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <MapPin size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{cafeInfo.address}</span>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Phone size={15} color="#F59E0B" style={{ flexShrink: 0 }} />
                <span>{cafeInfo.phone}</span>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Wifi size={15} color="#10B981" style={{ flexShrink: 0 }} />
                <span>Wi-Fi: <strong style={{ color: "var(--text-primary)" }}>{cafeInfo.wifiSsid}</strong></span>
              </div>
            </div>
          </div>

          {/* Separate Pages Navigation */}
          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explore Pages
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", fontSize: "0.85rem", padding: 0, margin: 0 }}>
              <li>
                <button
                  onClick={() => setCurrentView("landing")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Landing Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("menu")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Café Menu & Ordering
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("table")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Book Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("tracker")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Live Order Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("admin")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Owner & Kitchen Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("auth")}
                  style={{ background: "none", border: "none", color: "var(--accent-amber)", cursor: "pointer", padding: 0, fontWeight: 600 }}
                >
                  → Sign In / Register Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Multilingual & System Specs */}
          <div>
            <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Multilingual Engine
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--accent-amber)" }}>●</span>
                <span>Fluent in English, ಕನ್ನಡ, हिंदी, தமிழ், తెలుగు</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--accent-amber)" }}>●</span>
                <span>Powered by Google Gemini 1.5 Flash</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--status-success)" }}>●</span>
                <span>PRD, SRS & TRD Documentation Included</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "var(--status-success)" }}>●</span>
                <span>Edge Deployed on Vercel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © {new Date().getFullYear()} ShopMate AI · Brew & Bliss Roastery. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>Crafted with</span>
            <Heart size={12} color="#EF4444" fill="#EF4444" />
            <span>for local cafés and independent coffee roasters</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
