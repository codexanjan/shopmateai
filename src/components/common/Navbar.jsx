import React, { useState } from "react";
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
  Brain,
  Home,
  Menu as MenuIcon,
  X,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Navbar({ currentView, setCurrentView }) {
  const { currentUser, isAdmin, switchRole, logout } = useAuth();
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    setIsReservationModalOpen,
    setIsPreferenceModalOpen,
    soundEnabled,
    toggleSound,
    activeTrackingOrderId,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

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
        background: "rgba(18, 15, 12, 0.94)",
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
          gap: "12px",
          position: "relative",
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo("landing")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-amber)",
              color: "#0F0D0B",
            }}
          >
            <Coffee size={22} strokeWidth={2.4} />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
                ShopMate<span style={{ color: "var(--accent-amber)" }}>.AI</span>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.65rem",
                  padding: "1px 6px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34D399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#10B981",
                    display: "inline-block",
                  }}
                />
                OPEN
              </span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "-2px" }}>
              Brew & Bliss Artisan Roastery
            </div>
          </div>
        </div>

        {/* Center Menu Bar Navigation Links (Clean & Responsive) */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="hide-mobile"
        >
          <button
            onClick={() => navigateTo("landing")}
            className={`btn btn-ghost btn-sm ${currentView === "landing" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "landing" ? 700 : 500,
              background: currentView === "landing" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
            }}
          >
            <Home size={15} />
            <span>Home</span>
          </button>

          <button
            onClick={() => navigateTo("menu")}
            className={`btn btn-ghost btn-sm ${currentView === "menu" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "menu" ? 700 : 500,
              background: currentView === "menu" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
            }}
          >
            <UtensilsCrossed size={15} />
            <span>Café Menu</span>
          </button>

          <button
            onClick={() => navigateTo("table")}
            className={`btn btn-ghost btn-sm ${currentView === "table" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "table" ? 700 : 500,
              background: currentView === "table" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
            }}
          >
            <CalendarCheck size={15} />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => navigateTo("tracker")}
            className={`btn btn-ghost btn-sm ${currentView === "tracker" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "tracker" ? 700 : 500,
              background: currentView === "tracker" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
            }}
          >
            <Clock size={15} />
            <span>Order Tracker</span>
          </button>

          <button
            onClick={() => {
              switchRole("admin");
              navigateTo("admin");
            }}
            className={`btn btn-ghost btn-sm ${currentView === "admin" ? "text-amber" : ""}`}
            style={{
              fontWeight: currentView === "admin" ? 700 : 500,
              background: currentView === "admin" ? "rgba(245, 158, 11, 0.12)" : "transparent",
              color: isAdmin ? "var(--accent-amber-light)" : "var(--text-secondary)",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
            }}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Right Action Tools: AI Memory, Role Switcher, Sound, Cart, Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* AI Memory Badge */}
          <button
            onClick={() => setIsPreferenceModalOpen(true)}
            className="hide-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(139, 92, 246, 0.12)",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "var(--radius-full)",
              padding: "5px 9px",
              fontSize: "0.72rem",
              color: "#C4B5FD",
              cursor: "pointer",
              fontWeight: 600,
            }}
            title="Customer Taste & Diet AI Memory"
          >
            <Brain size={13} color="#A78BFA" />
            <span>Memory</span>
          </button>

          {/* Quick Role Toggle Pill (Customer vs Owner) */}
          <div
            className="hide-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-full)",
              padding: "2px",
            }}
          >
            <button
              onClick={() => {
                switchRole("customer");
                if (currentView === "admin") navigateTo("menu");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                border: "none",
                background: !isAdmin ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                color: !isAdmin ? "#0F0D0B" : "var(--text-muted)",
                fontWeight: 700,
                fontSize: "0.72rem",
                padding: "4px 8px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
              title="Customer Mode"
            >
              <User size={12} />
              <span>Customer</span>
            </button>

            <button
              onClick={() => {
                switchRole("admin");
                navigateTo("admin");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                border: "none",
                background: isAdmin ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "transparent",
                color: isAdmin ? "#0F0D0B" : "var(--text-muted)",
                fontWeight: 700,
                fontSize: "0.72rem",
                padding: "4px 8px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
              title="Owner Mode"
            >
              <ShieldCheck size={12} />
              <span>Owner</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="btn btn-ghost btn-icon"
            style={{
              width: "34px",
              height: "34px",
              color: soundEnabled ? "var(--accent-amber)" : "var(--text-muted)",
              flexShrink: 0,
            }}
            title={soundEnabled ? "Mute UI Sounds" : "Enable UI Sounds"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Cart Trigger Button - NEVER CLIPPED */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{
              padding: "7px 14px",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <ShoppingBag size={16} />
            <span style={{ fontWeight: 700 }}>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: "#0F0D0B",
                  color: "var(--accent-amber)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "1px 6px",
                  marginLeft: "2px",
                }}
              >
                {cartCount} · ₹{cartTotal}
              </span>
            )}
          </button>

          {/* Separate Login / Signup Page Trigger */}
          <button
            onClick={() => navigateTo("auth")}
            className="btn btn-secondary btn-sm"
            style={{
              padding: "6px 12px",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              border: currentView === "auth" ? "1px solid var(--accent-amber)" : "1px solid var(--border-subtle)",
            }}
            title={currentUser ? `Account: ${currentUser.name}` : "Sign In or Register"}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <LogIn size={14} />
            )}
            <span className="hide-mobile">
              {currentUser ? currentUser.name.split(" ")[0] : "Sign In"}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-icon show-mobile"
            style={{ width: "36px", height: "36px", flexShrink: 0 }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          className="glass-panel animate-slide-down show-mobile"
          style={{
            position: "absolute",
            top: "var(--navbar-height)",
            left: 0,
            right: 0,
            background: "rgba(18, 15, 12, 0.98)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxShadow: "var(--shadow-lg)",
            zIndex: 999,
          }}
        >
          <button
            onClick={() => navigateTo("landing")}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start", gap: "10px", width: "100%" }}
          >
            <Home size={18} />
            <span>Home (Landing)</span>
          </button>

          <button
            onClick={() => navigateTo("menu")}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start", gap: "10px", width: "100%" }}
          >
            <UtensilsCrossed size={18} />
            <span>Café Menu & Order</span>
          </button>

          <button
            onClick={() => navigateTo("table")}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start", gap: "10px", width: "100%" }}
          >
            <CalendarCheck size={18} />
            <span>Book Table</span>
          </button>

          <button
            onClick={() => navigateTo("tracker")}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start", gap: "10px", width: "100%" }}
          >
            <Clock size={18} />
            <span>Order Tracker</span>
          </button>

          <button
            onClick={() => {
              switchRole("admin");
              navigateTo("admin");
            }}
            className="btn btn-ghost"
            style={{ justifyContent: "flex-start", gap: "10px", width: "100%" }}
          >
            <LayoutDashboard size={18} />
            <span>Kitchen & Admin Dashboard</span>
          </button>

          <button
            onClick={() => navigateTo("auth")}
            className="btn btn-secondary"
            style={{ justifyContent: "center", gap: "8px", width: "100%", marginTop: "8px" }}
          >
            <LogIn size={16} />
            <span>Sign In / Create Account</span>
          </button>
        </div>
      )}
    </header>
  );
}
