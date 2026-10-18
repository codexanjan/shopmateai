import React from "react";
import { useStore } from "../../context/StoreContext";
import { ShoppingBag, ArrowRight, X, Clock, Sparkles } from "lucide-react";

export default function OrderRecoveryBanner() {
  const {
    isRecoveryBannerVisible,
    setIsRecoveryBannerVisible,
    cart,
    cartTotal,
    currentETA,
    setIsCartOpen,
  } = useStore();

  if (!isRecoveryBannerVisible || cart.length === 0) return null;

  return (
    <div
      className="animate-fade-in"
      style={{
        position: "fixed",
        bottom: "94px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 920,
        width: "calc(100% - 40px)",
        maxWidth: "520px",
        background: "linear-gradient(135deg, rgba(30, 24, 18, 0.98) 0%, rgba(20, 16, 12, 0.98) 100%)",
        border: "1px solid rgba(245, 158, 11, 0.45)",
        borderRadius: "var(--radius-xl)",
        padding: "12px 18px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0F0D0B",
            flexShrink: 0,
          }}
        >
          <ShoppingBag size={18} />
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent-amber-light)" }}>
              Order In Progress ({cart.length} {cart.length === 1 ? "item" : "items"})
            </span>
            <span style={{ fontSize: "0.72rem", color: "#34D399", display: "flex", alignItems: "center", gap: "2px" }}>
              <Clock size={11} />
              {currentETA.totalMinutes}m ETA
            </span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
            Resume checkout for ₹{cartTotal} before your brew slot resets!
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={() => setIsCartOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ padding: "6px 14px", fontSize: "0.78rem" }}
        >
          <span>Resume</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => setIsRecoveryBannerVisible(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
