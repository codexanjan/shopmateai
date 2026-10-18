import React from "react";
import { useStore } from "../../context/StoreContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "24px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "360px",
      pointerEvents: "none",
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        return (
          <div
            key={toast.id}
            className="animate-fade-in"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(28, 23, 18, 0.94)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${isSuccess ? "rgba(16, 185, 129, 0.4)" : isWarning ? "rgba(245, 158, 11, 0.4)" : "rgba(245, 158, 11, 0.2)"}`,
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              color: "var(--text-primary)",
            }}
          >
            {isSuccess && <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0 }} />}
            {isWarning && <AlertCircle size={20} color="#F59E0B" style={{ flexShrink: 0 }} />}
            {!isSuccess && !isWarning && <Info size={20} color="#FBBF24" style={{ flexShrink: 0 }} />}
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{toast.title}</div>
              {toast.message && (
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
              }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
