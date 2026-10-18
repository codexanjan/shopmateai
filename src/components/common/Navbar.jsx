import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import {
  Coffee,
  ShoppingBag,
  Volume2,
  VolumeX,
  User,
  ShieldCheck,
  CalendarCheck,
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Navbar({ currentView, setCurrentView }) {
  const { currentUser, isAdmin, switchRole, setIsAuthModalOpen } = useAuth();
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    setIsReservationModalOpen,
    soundEnabled,
    toggleSound,
    activeTrackingOrderId,
  } = useStore();

  return (
    <header
      className="glass-panel"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        borderRadius: 0,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(18, 15, 12, 0.88)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        className="container"
        style={{
          height: "var(--navbar-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Brand Logo & Live Pulse */}
        <div
          onClick={() => setCurrentView("landing")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-amber)",
              color: "#0F0D0B",
            }}
          >
            <Coffee size={24} strokeWidth={2.4} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
                ShopMate<span style={{ color: "var(--accent-amber)" }}>.AI</span>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.68rem",
                  padding: "2px 7px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34D399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10B981",
                    display: "inline-block",
                    animation: "liveBadgePulse 2s infinite",
                  }}
                />
                OPEN
              </span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "-2px" }}>
              Brew & Bliss Artisan Roastery
            </div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          className="hide-mobile"
        >
          <button
            onClick={() => setCurrentView("menu")}
            className={`btn btn-ghost btn-sm ${currentView === "menu" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "menu" ? 700 : 500,
              background: currentView === "menu" ? "rgba(245, 158, 11, 0.12)" : "transparent",
            }}
          >
            <UtensilsCrossed size={16} />
            <span>Café Menu</span>
          </button>

          <button
            onClick={() => setIsReservationModalOpen(true)}
            className="btn btn-ghost btn-sm"
          >
            <CalendarCheck size={16} />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => setCurrentView("tracker")}
            className={`btn btn-ghost btn-sm ${currentView === "tracker" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "tracker" ? 700 : 500,
              background: currentView === "tracker" ? "rgba(245, 158, 11, 0.12)" : "transparent",
            }}
          >
            <Clock size={16} />
            <span>Live Brewing #{activeTrackingOrderId.split("-")[1] || "Track"}</span>
          </button>

          <button
            onClick={() => setCurrentView("admin")}
            className={`btn btn-ghost btn-sm ${currentView === "admin" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "admin" ? 700 : 500,
              background: currentView === "admin" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              color: isAdmin ? "var(--accent-amber-light)" : "var(--text-secondary)",
            }}
          >
            <LayoutDashboard size={16} />
            <span>Kitchen & Admin</span>
          </button>
        </nav>

        {/* Right Action Tools: Role Switcher, Sound, Cart, Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Quick Role Toggle Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "3px",
            }}
          >
            <button
              onClick={() => {
                switchRole("customer");
                if (currentView === "admin") setCurrentView("menu");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                border: "none",
                background: !isAdmin ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                color: !isAdmin ? "#0F0D0B" : "var(--text-muted)",
                fontWeight: 700,
                fontSize: "0.75rem",
                padding: "5px 10px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
              title="Switch to Customer Experience (Alex)"
            >
              <User size={13} />
              <span>Customer</span>
            </button>

            <button
              onClick={() => {
                switchRole("admin");
                setCurrentView("admin");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                border: "none",
                background: isAdmin ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                color: isAdmin ? "#0F0D0B" : "var(--text-muted)",
                fontWeight: 700,
                fontSize: "0.75rem",
                padding: "5px 10px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
              title="Switch to Kitchen Kanban & Owner Mode (Viraj)"
            >
              <ShieldCheck size={13} />
              <span>Owner</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="btn btn-ghost btn-icon"
            style={{ width: "36px", height: "36px", color: soundEnabled ? "var(--accent-amber)" : "var(--text-muted)" }}
            title={soundEnabled ? "Mute UI Sounds" : "Enable UI Sounds"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Slide-out Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{
              padding: "8px 16px",
              fontSize: "0.88rem",
              position: "relative",
            }}
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: "#0F0D0B",
                  color: "var(--accent-amber)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "1px 7px",
                  marginLeft: "2px",
                }}
              >
                {cartCount} · ₹{cartTotal}
              </span>
            )}
          </button>

          {/* User Profile / Auth Modal trigger */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-full)",
              background: "transparent",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={`Logged in as ${currentUser?.name} (${currentUser?.role})`}
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
