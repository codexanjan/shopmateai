import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Coffee, ArrowRight, ArrowLeft, Mail, Lock, User, ShieldCheck, CheckCircle } from "lucide-react";

export default function LoginPage({ setCurrentView }) {
  const { login, loginWithDemo } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => {
          if (res.user.role === "admin") {
            setCurrentView("admin");
          } else {
            setCurrentView("menu");
          }
        }, 600);
      } else {
        setErrorMsg(res.error || "Invalid email or password.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = (role) => {
    loginWithDemo(role);
    setSuccessMsg(`Logged in as ${role === "admin" ? "Café Owner" : "Customer"}! Redirecting...`);
    setTimeout(() => {
      if (role === "admin") {
        setCurrentView("admin");
      } else {
        setCurrentView("menu");
      }
    }, 500);
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
          maxWidth: "460px",
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
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
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
            Sign In to Your Account
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
            Welcome back to Brew & Bliss Roastery
          </p>
        </div>

        {/* Quick Demo Access */}
        <div
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-amber-light)", marginBottom: "8px" }}>
            Quick 1-Click Demo Profiles:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <button
              type="button"
              onClick={() => handleDemoSelect("customer")}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "0.78rem", padding: "6px 10px", justifyContent: "flex-start", gap: "6px" }}
            >
              <User size={13} color="#10B981" />
              <span>Customer Alex</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoSelect("admin")}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: "0.78rem", padding: "6px 10px", justifyContent: "flex-start", gap: "6px" }}
            >
              <ShieldCheck size={13} color="#F59E0B" />
              <span>Owner Viraj</span>
            </button>
          </div>
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "16px" }}>
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

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label">Password</label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset: You can sign in with any password or use the 1-Click Demo Profiles!");
                }}
                style={{ fontSize: "0.78rem", color: "var(--accent-amber)" }}
              >
                Forgot password?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
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
            <span>{isLoading ? "Signing In..." : "Sign In & Continue"}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Bottom Switch to Sign Up */}
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Don't have an account yet?{" "}
          <button
            type="button"
            onClick={() => setCurrentView("signup")}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-amber)",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
