import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Coffee, User, ShieldCheck, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function LandingAuthSection({ setCurrentView }) {
  const { loginWithDemo, currentUser } = useAuth();

  const handleDemo = (role) => {
    loginWithDemo(role);
    if (role === "admin") {
      setCurrentView("admin");
    } else {
      setCurrentView("menu");
    }
  };

  return (
    <section className="section-padding" style={{ background: "radial-gradient(ellipse at bottom, rgba(245, 158, 11, 0.08) 0%, rgba(15, 13, 11, 0) 70%)" }}>
      <div className="container">
        <div
          className="glass-panel"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "48px 36px",
            background: "linear-gradient(145deg, rgba(26, 21, 17, 0.96) 0%, rgba(16, 13, 11, 0.98) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "36px",
            alignItems: "center",
          }}
          className="auth-grid-responsive"
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                padding: "5px 12px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                color: "var(--accent-amber-light)",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              <span>Customer & Owner Access Portal</span>
            </div>

            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "14px", lineHeight: 1.25 }}>
              Ready for Frictionless <br />
              <span className="text-gradient-amber">Artisan Café Ordering?</span>
            </h2>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Log in to save your favorite milk & sweetness preferences, track real-time pour-overs, or access the
              kitchen dispatch dashboard.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <CheckCircle size={16} color="#10B981" />
                <span>Zero service fees or commission markups for customers</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <CheckCircle size={16} color="#10B981" />
                <span>AI Concierge remembers dietary requirements & oat milk choices</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <CheckCircle size={16} color="#10B981" />
                <span>Instant dispatch directly to barista kitchen screens</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView("auth")}
              className="btn btn-primary btn-lg"
              style={{ padding: "12px 24px" }}
            >
              <span>Open Dedicated Sign In / Signup Page</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column: 1-Click Fast Passes */}
          <div
            style={{
              background: "rgba(18, 15, 12, 0.8)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Instant 1-Click Fast Pass
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--accent-amber)" }}>No password required</span>
            </div>

            <button
              onClick={() => handleDemo("customer")}
              className="btn btn-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#34D399",
                  }}
                >
                  <User size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    Enter as Customer
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Alex Morgan · Oat Milk & Cold Brew Fan
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="var(--accent-amber)" />
            </button>

            <button
              onClick={() => handleDemo("admin")}
              className="btn btn-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                textAlign: "left",
                borderColor: "rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(245, 158, 11, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-amber)",
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--accent-amber-light)" }}>
                    Enter as Café Owner
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Viraj Bagul · Kitchen Kanban & Analytics
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="var(--accent-amber)" />
            </button>

            <div style={{ textAlign: "center", paddingTop: "8px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Prefer to create a new personalized account?{" "}
              <button
                onClick={() => setCurrentView("auth")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent-amber)",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Sign Up Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
