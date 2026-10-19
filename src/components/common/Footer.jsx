import React from "react";
import { Coffee, Wifi, MapPin, Phone, ShieldCheck, Heart, Sparkles, Clock, Globe } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function Footer({ setCurrentView }) {
  const { cafeInfo } = useStore();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
        paddingTop: "56px",
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
            gap: "36px",
            marginBottom: "44px",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F0D0B",
                }}
              >
                <Coffee size={22} strokeWidth={2.4} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>
                ShopMate<span style={{ color: "var(--accent-amber)" }}>.AI</span>
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.6 }}>
              Brew & Bliss Artisan Roastery & Bakery. Specialty coffee, slow-fermented sourdough, and intelligent 24/7 ordering.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "5px 12px", borderRadius: "var(--radius-full)", fontSize: "0.78rem", color: "var(--accent-amber-light)", fontWeight: 600 }}>
              <Sparkles size={14} color="#F59E0B" />
              <span>Independent Commerce · Zero Aggregator Cut</span>
            </div>
          </div>

          {/* Café Location & Hours */}
          <div>
            <h4 style={{ fontSize: "0.92rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
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
                <span>Guest Wi-Fi: <strong style={{ color: "var(--text-primary)" }}>{cafeInfo.wifiSsid}</strong></span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Clock size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
                <span>Open Daily: <strong>7:00 AM – 11:00 PM</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ fontSize: "0.92rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
              Explore Café
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.86rem", padding: 0, margin: 0 }}>
              <li>
                <button
                  onClick={() => setCurrentView("landing")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Home & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("menu")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Artisanal Coffee & Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("table")}
                  style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-amber)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  → Book Table (Patio / Booth / Work Zone)
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
                  → Barista & Kitchen Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("auth")}
                  style={{ background: "none", border: "none", color: "var(--accent-amber)", cursor: "pointer", padding: 0, fontWeight: 700 }}
                >
                  → Customer & Partner Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Roastery & Coffee Heritage */}
          <div>
            <h4 style={{ fontSize: "0.92rem", color: "var(--text-primary)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
              Direct-Trade Sourcing
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--accent-amber)" }}>☕</span>
                <span><strong>Chikmagalur Arabica:</strong> Shade-grown at 4,200 ft elevation with notes of hazelnut & cocoa.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--accent-amber)" }}>🌿</span>
                <span><strong>Organic Oat & Almond:</strong> Fresh dairy alternatives crafted for silky microfoam.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "#10B981" }}>🍞</span>
                <span><strong>24-Hour Fermented Sourdough:</strong> Daily artisan bakery made with French cultured butter.</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "#A78BFA" }}>🌐</span>
                <span><strong>Voice & Multilingual AI:</strong> Speaks and understands Kannada, Hindi, English, and Spanish.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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
            © {new Date().getFullYear()} Brew & Bliss Artisan Roastery. Powered by ShopMate AI. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Crafted with</span>
            <Heart size={13} color="#EF4444" fill="#EF4444" />
            <span>for passionate coffee lovers & neighborhood bakeries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
