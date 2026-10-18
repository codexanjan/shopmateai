import React, { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import {
  CheckCircle2,
  Clock,
  Coffee,
  Check,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function OrderTracker({ setCurrentView }) {
  const { orders, activeTrackingOrderId, updateOrderStatus, setActiveTrackingOrderId } = useStore();

  // Find the tracked order or latest
  const activeOrder =
    orders.find((o) => o.id === activeTrackingOrderId) || orders[0];

  const stages = [
    { key: "pending", label: "Order Received", desc: "Ticket received at barista station" },
    { key: "brewing", label: "Barista Brewing", desc: "Pulling espresso & steaming microfoam" },
    { key: "ready", label: "Ready for Pickup", desc: "Fresh & piping hot on counter" },
    { key: "completed", label: "Served & Enjoyed", desc: "Thank you for supporting craft coffee!" },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "brewing":
        return 1;
      case "ready":
        return 2;
      case "completed":
        return 3;
      default:
        return 0;
    }
  };

  const currentStageIdx = activeOrder ? getStageIndex(activeOrder.status) : 0;

  if (!activeOrder) {
    return (
      <section className="section-padding">
        <div className="container" style={{ textAlign: "center", maxWidth: "500px" }}>
          <AlertCircle size={48} color="#F59E0B" style={{ margin: "0 auto 16px auto" }} />
          <h3>No Active Orders Found</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
            You haven't placed an order yet. Browse our handcrafted beverages to get started!
          </p>
          <button onClick={() => setCurrentView("menu")} className="btn btn-primary">
            Explore Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" style={{ position: "relative" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        
        {/* Top Back & Order Selector */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <button
            onClick={() => setCurrentView("menu")}
            className="btn btn-ghost btn-sm"
            style={{ paddingLeft: 0 }}
          >
            <ArrowLeft size={16} />
            <span>Back to Menu</span>
          </button>

          {/* Quick Order Switcher */}
          {orders.length > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Recent Orders:</span>
              <select
                className="form-select"
                style={{ width: "auto", padding: "4px 10px", fontSize: "0.8rem" }}
                value={activeOrder.id}
                onChange={(e) => setActiveTrackingOrderId(e.target.value)}
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    #{o.id} ({o.status.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Main Status Hero Card */}
        <div
          className="glass-card animate-pulse-glow"
          style={{
            padding: "36px",
            borderRadius: "var(--radius-xl)",
            background: "linear-gradient(180deg, rgba(30, 25, 20, 0.95) 0%, rgba(18, 15, 12, 0.98) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            marginBottom: "32px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "24px",
              marginBottom: "32px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="badge badge-amber" style={{ fontSize: "0.8rem" }}>
                  Live Kitchen Tracker
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Order #{activeOrder.id}
                </span>
              </div>
              <h2 style={{ fontSize: "1.8rem", marginTop: "8px", marginBottom: "4px" }}>
                {stages[currentStageIdx].label}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0 }}>
                {stages[currentStageIdx].desc}
              </p>
            </div>

            {/* Estimated Timer Badge */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                padding: "12px 20px",
                borderRadius: "var(--radius-lg)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Est. Ready In
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                {currentStageIdx >= 2 ? "Ready Now! 🎉" : "3–5 Mins"}
              </div>
            </div>
          </div>

          {/* 4-Stage Visual Progress Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", position: "relative", marginBottom: "32px" }}>
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;

              return (
                <div key={stage.key} style={{ textAlign: "center" }}>
                  {/* Step Circle */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      margin: "0 auto 10px auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isPast
                        ? "#10B981"
                        : isCurrent
                        ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))"
                        : "var(--bg-surface-elevated)",
                      border: `2px solid ${isCurrent ? "var(--accent-amber-light)" : "var(--border-subtle)"}`,
                      color: isPast ? "#fff" : isCurrent ? "#0F0D0B" : "var(--text-muted)",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      boxShadow: isCurrent ? "0 0 15px rgba(245, 158, 11, 0.5)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isPast ? <Check size={18} strokeWidth={3} /> : idx + 1}
                  </div>

                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? "var(--accent-amber-light)" : isPast ? "#10B981" : "var(--text-muted)",
                    }}
                  >
                    {stage.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Interactive Stage Advancer (For Demo Testing) */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px dashed var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="#F59E0B" />
              <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <strong>Hackathon Demo Controller:</strong> Simulate kitchen status advance:
              </span>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              {stages.map((st) => (
                <button
                  key={st.key}
                  onClick={() => updateOrderStatus(activeOrder.id, st.key)}
                  className={`btn btn-sm ${activeOrder.status === st.key ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "0.72rem", padding: "4px 8px" }}
                >
                  {st.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div
          className="glass-card"
          style={{
            padding: "28px",
            borderRadius: "var(--radius-xl)",
            background: "var(--bg-surface)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Order Summary</h3>
            <span className="badge badge-neutral">
              {activeOrder.orderType.toUpperCase()}{" "}
              {activeOrder.tableNumber ? `· Table ${activeOrder.tableNumber}` : ""}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {activeOrder.items?.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                    {item.qty}x {item.name}
                  </div>
                  {item.customization && (
                    <div style={{ fontSize: "0.76rem", color: "var(--accent-amber-light)", marginTop: "2px" }}>
                      {[item.customization.milk, item.customization.sweetness, item.customization.temp]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  ₹{(item.effectivePrice || item.price) * item.qty}
                </div>
              </div>
            ))}
          </div>

          {/* Total & Payment details */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem" }}>
            <div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Payment Status</div>
              <div style={{ color: "#34D399", fontWeight: 700 }}>{activeOrder.paymentMethod}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Total Paid (incl. GST)</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                ₹{activeOrder.total}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
