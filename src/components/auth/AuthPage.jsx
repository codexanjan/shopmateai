import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Coffee,
  ShieldCheck,
  Sparkles,
  User,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Phone,
  Building,
  CheckCircle,
  Eye,
  EyeOff,
  Globe,
  Heart,
} from "lucide-react";

export default function AuthPage({ setCurrentView }) {
  const { loginWithDemo, loginWithCredentials, currentUser } = useAuth();
  const [tab, setTab] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);

    setTimeout(() => {
      loginWithCredentials(email, password, selectedRole);
      setIsSubmitting(false);
      setSuccessMsg(
        tab === "login"
          ? "Welcome back! Redirecting you to your portal..."
          : "Account created successfully! Welcome to ShopMate AI!"
      );
      setTimeout(() => {
        if (selectedRole === "admin") {
          setCurrentView("admin");
        } else {
          setCurrentView("menu");
        }
      }, 900);
    }, 600);
  };

  const handleDemoSelect = (role) => {
    loginWithDemo(role);
    setSuccessMsg(`Logged in as demo ${role === "admin" ? "Café Owner" : "Customer"}!`);
    setTimeout(() => {
      if (role === "admin") {
        setCurrentView("admin");
      } else {
        setCurrentView("menu");
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height) - 100px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "radial-gradient(ellipse at top, rgba(245, 158, 11, 0.08) 0%, rgba(15, 13, 11, 0) 70%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "stretch",
        }}
        className="auth-grid-responsive"
      >
        {/* Left Side: Brand Value Proposition & Trust Highlights */}
        <div
          className="glass-panel"
          style={{
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(145deg, rgba(28, 23, 19, 0.95) 0%, rgba(18, 15, 12, 0.98) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle amber glow in background */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "-80px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "rgba(245, 158, 11, 0.12)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div>
            <button
              onClick={() => setCurrentView("landing")}
              className="btn btn-ghost btn-sm"
              style={{
                padding: "6px 12px",
                marginBottom: "28px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.85rem",
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F0D0B",
                  boxShadow: "var(--shadow-amber)",
                }}
              >
                <Coffee size={26} strokeWidth={2.4} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                  ShopMate<span style={{ color: "var(--accent-amber)" }}>.AI</span>
                </h2>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Artisanal Café Ordering & Kitchen AI
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginTop: "20px", marginBottom: "12px", lineHeight: 1.3 }}>
              {tab === "login"
                ? "Welcome back to your personalized café portal."
                : "Join the future of frictionless café ordering."}
            </h3>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "28px" }}>
              Experience automated conversational ordering in any language, proactive kitchen operations, dynamic pickup
              ETAs, and direct savings with zero aggregator commissions.
            </p>

            {/* Feature Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <strong>Multilingual AI Concierge:</strong> Order fluently in English, Kannada, Hindi & more
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <strong>Smart Order Recovery:</strong> Real-time sold-out alternative recommendations
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <strong>Kitchen Kanban:</strong> Live queue management & restock decision intelligence
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle size={18} color="#10B981" />
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                  <strong>Transparent SaaS:</strong> Flat ₹499/month for owners vs 30% commission loss
                </span>
              </div>
            </div>
          </div>

          {/* Social Proof / Security Badge */}
          <div
            style={{
              marginTop: "32px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}
          >
            <span>🔒 256-bit Encrypted Session</span>
            <span>⚡ Instant Live Sync</span>
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <div
          className="glass-panel"
          style={{
            padding: "36px 32px",
            background: "rgba(22, 18, 14, 0.98)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Quick 1-Click Demo Profiles (For Instant Evaluation) */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <Sparkles size={16} color="#F59E0B" />
                <span style={{ fontSize: "0.86rem", fontWeight: 700, color: "var(--accent-amber-light)" }}>
                  Quick 1-Click Instant Demo Logins
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => handleDemoSelect("customer")}
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
                    <User size={15} color="#10B981" />
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>Customer</span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Alex Morgan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSelect("admin")}
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
                    <ShieldCheck size={15} color="#F59E0B" />
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--accent-amber-light)" }}>
                      Café Owner
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Viraj Bagul (Admin)</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation: Sign In vs Sign Up */}
            <div
              style={{
                display: "flex",
                background: "var(--bg-surface)",
                padding: "4px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setTab("login");
                  setSuccessMsg("");
                }}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  border: "none",
                  borderRadius: "calc(var(--radius-md) - 2px)",
                  background: tab === "login" ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                  color: tab === "login" ? "#0F0D0B" : "var(--text-muted)",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  setTab("signup");
                  setSuccessMsg("");
                }}
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  border: "none",
                  borderRadius: "calc(var(--radius-md) - 2px)",
                  background: tab === "signup" ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                  color: tab === "signup" ? "#0F0D0B" : "var(--text-muted)",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                }}
              >
                Create Account
              </button>
            </div>

            {/* Success message banner */}
            {successMsg && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "var(--radius-md)",
                  color: "#34D399",
                  fontSize: "0.86rem",
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleFormSubmit}>
              {tab === "signup" && (
                <>
                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label">Full Name</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Alex Morgan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{ paddingLeft: "36px" }}
                      />
                      <User size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: "14px" }}>
                    <label className="form-label">Phone Number (Optional)</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ paddingLeft: "36px" }}
                      />
                      <Phone size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group" style={{ marginBottom: "14px" }}>
                <label className="form-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: "36px" }}
                  />
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="form-label">Password</label>
                  {tab === "login" && (
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent-amber)",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                      }}
                      onClick={() => alert("Demo password reset: Enter any password or use the 1-Click Demo Logins!")}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: "36px", paddingRight: "36px" }}
                  />
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "10px",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role Selection for Sign Up */}
              {tab === "signup" && (
                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label className="form-label">Account Role</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-md)",
                        background: selectedRole === "customer" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                        border: `1px solid ${selectedRole === "customer" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      <input
                        type="radio"
                        name="auth_role"
                        checked={selectedRole === "customer"}
                        onChange={() => setSelectedRole("customer")}
                      />
                      <span>Customer</span>
                    </label>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 12px",
                        borderRadius: "var(--radius-md)",
                        background: selectedRole === "admin" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                        border: `1px solid ${selectedRole === "admin" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      <input
                        type="radio"
                        name="auth_role"
                        checked={selectedRole === "admin"}
                        onChange={() => setSelectedRole("admin")}
                      />
                      <span>Café Owner</span>
                    </label>
                  </div>

                  {selectedRole === "admin" && (
                    <div style={{ marginTop: "12px" }}>
                      <label className="form-label">Café or Roastery Name</label>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Brew & Bliss Artisan Roastery"
                          value={cafeName}
                          onChange={(e) => setCafeName(e.target.value)}
                          style={{ paddingLeft: "36px" }}
                        />
                        <Building size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  marginTop: "8px",
                }}
              >
                <span>{tab === "login" ? "Sign In & Continue" : "Create Account & Start"}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {tab === "login" ? (
              <span>
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setTab("signup")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-amber)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-amber)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
