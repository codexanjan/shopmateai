import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { X, Coffee, ShieldCheck, Sparkles, User, ArrowRight } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithDemo, loginWithCredentials } = useAuth();
  const [tab, setTab] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginWithCredentials(email, password, selectedRole);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "28px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0F0D0B",
            }}>
              <Coffee size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>ShopMate AI Portal</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                {tab === "login" ? "Sign in to your account" : "Create your guest account"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Instant 1-Click Demo Profiles (For Instant Evaluation) */}
        <div style={{
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: "var(--radius-lg)",
          padding: "16px",
          marginBottom: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <Sparkles size={16} color="#F59E0B" />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-amber-light)" }}>
              Instant 1-Click Demo Profiles
            </span>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              onClick={() => loginWithDemo("customer")}
              className="btn btn-secondary btn-sm"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                textAlign: "left",
                gap: "2px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                <User size={14} color="#10B981" />
                <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--text-primary)" }}>Customer</span>
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Alex Morgan</span>
            </button>

            <button
              onClick={() => loginWithDemo("admin")}
              className="btn btn-secondary btn-sm"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                textAlign: "left",
                gap: "2px",
                borderColor: "rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                <ShieldCheck size={14} color="#F59E0B" />
                <span style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--accent-amber-light)" }}>Café Owner</span>
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Viraj Bagul (Admin)</span>
            </button>
          </div>
        </div>

        {/* Tabs: Standard Login / Signup */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "12px", marginBottom: "16px" }}>
          <button
            onClick={() => setTab("login")}
            style={{
              background: "none",
              border: "none",
              color: tab === "login" ? "var(--accent-amber)" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              paddingBottom: "4px",
              borderBottom: tab === "login" ? "2px solid var(--accent-amber)" : "2px solid transparent",
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            style={{
              background: "none",
              border: "none",
              color: tab === "signup" ? "var(--accent-amber)" : "var(--text-muted)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              paddingBottom: "4px",
              borderBottom: tab === "signup" ? "2px solid var(--accent-amber)" : "2px solid transparent",
            }}
          >
            New Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="e.g. coffee.lover@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {tab === "signup" && (
            <div className="form-group">
              <label className="form-label">Account Role</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <label style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  background: selectedRole === "customer" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                  border: `1px solid ${selectedRole === "customer" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}>
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === "customer"}
                    onChange={() => setSelectedRole("customer")}
                  />
                  <span>Customer</span>
                </label>
                <label style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-md)",
                  background: selectedRole === "admin" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                  border: `1px solid ${selectedRole === "admin" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}>
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === "admin"}
                    onChange={() => setSelectedRole("admin")}
                  />
                  <span>Café Owner</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <span>{tab === "login" ? "Sign In & Continue" : "Create Account"}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
