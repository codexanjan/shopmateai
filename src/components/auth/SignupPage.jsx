import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Coffee, ArrowRight, ArrowLeft, Mail, Lock, User, Building, Phone, CheckCircle } from "lucide-react";

export default function SignupPage({ setCurrentView }) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [cafeName, setCafeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await signup(name, email, password, role, cafeName);
      if (res.success) {
        setSuccessMsg("Account created successfully! Welcome aboard.");
        setTimeout(() => {
          if (role === "admin") {
            setCurrentView("admin");
          } else {
            setCurrentView("menu");
          }
        }, 600);
      } else {
        setErrorMsg(res.error || "Could not complete signup.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height) - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "radial-gradient(ellipse at top, rgba(245, 158, 11, 0.06) 0%, rgba(15, 13, 11, 0) 70%)",
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "40px 36px",
          background: "rgba(22, 18, 14, 0.98)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Back Link */}
        <button
          onClick={() => setCurrentView("landing")}
          className="btn btn-ghost btn-sm"
          style={{ padding: "4px 8px", marginBottom: "20px", display: "inline-flex", gap: "6px" }}
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
              margin: "0 auto 14px",
              boxShadow: "var(--shadow-amber)",
            }}
          >
            <Coffee size={26} strokeWidth={2.4} />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0, marginBottom: "6px" }}>
            Create Your Account
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
            {role === "admin" ? "Start your 14-day free café owner trial" : "Join the coffee lovers community"}
          </p>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "var(--radius-md)",
              color: "#F87171",
              fontSize: "0.85rem",
              marginBottom: "16px",
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "var(--radius-md)",
              color: "#34D399",
              fontSize: "0.85rem",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role Switcher */}
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">I am joining as:</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setRole("customer")}
                style={{
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${role === "customer" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                  background: role === "customer" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                  color: role === "customer" ? "var(--accent-amber-light)" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <User size={14} />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                style={{
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${role === "admin" ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                  background: role === "admin" ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                  color: role === "admin" ? "var(--accent-amber-light)" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Building size={14} />
                <span>Café Owner</span>
              </button>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label className="form-label">Full Name</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: "36px" }}
              />
              <User size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
            </div>
          </div>

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

          {role === "admin" && (
            <div className="form-group" style={{ marginBottom: "14px" }}>
              <label className="form-label">Café or Roastery Name</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
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

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">Create Password</label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                required
                className="form-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "36px" }}
              />
              <Lock size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px", fontSize: "0.95rem", fontWeight: 700 }}
          >
            <span>{isLoading ? "Creating Account..." : role === "admin" ? "Start 14-Day Free Trial" : "Join & Continue"}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Bottom Switch to Login */}
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentView("login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-amber)",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Sign In Here
          </button>
        </div>
      </div>
    </div>
  );
}
