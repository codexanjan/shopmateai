import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import {
  Coffee,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Star,
  Clock,
} from "lucide-react";

export default function LiveCatalogSection({ setCurrentView }) {
  const { menuItems, addToCart, toggleItemAvailability, showToast } = useStore();
  const { isAdmin } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "coffee", label: "Artisanal Coffee ☕" },
    { id: "tea", label: "Specialty Teas 🍵" },
    { id: "bakery", label: "Pastry & Bakery 🥐" },
    { id: "food", label: "Melts & Sourdough 🥪" },
  ];

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handleAddToCart = (item) => {
    if (!item.isAvailable) return;
    addToCart(item, 1);
    showToast("Added to Cart", `1x ${item.name}`, "success");
  };

  const handleSuggestAlternative = (item) => {
    // Finds in-stock alternative in same category
    const alternative = menuItems.find((i) => i.category === item.category && i.isAvailable && i.id !== item.id) || menuItems[0];
    addToCart(alternative, 1);
    showToast(
      "Smart Order Recovery",
      `${item.name} is sold out! Added chef recommendation: 1x ${alternative.name} (₹${alternative.price})`,
      "info"
    );
  };

  return (
    <section className="section-padding" style={{ background: "rgba(18, 15, 12, 0.6)", position: "relative" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.82rem",
              color: "var(--accent-amber-light)",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <span>Live Roastery & Bakery Inventory</span>
          </div>

          <h2 style={{ marginBottom: "14px" }}>
            Today's Fresh Harvest & <span className="text-gradient-amber">Live Stock Status</span>
          </h2>

          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
            Directly connected to our Indiranagar espresso bar. When an item sells out in our morning bake, our stock
            indicator updates in real time, and our AI instantly recommends chef-paired in-stock alternatives.
          </p>

          {/* Owner Quick Status Control Banner */}
          {isAdmin && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px 16px",
                borderRadius: "var(--radius-lg)",
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px dashed var(--accent-amber)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.85rem",
                color: "var(--accent-amber-light)",
              }}
            >
              <ShieldCheck size={18} color="#F59E0B" />
              <span>
                <strong>Owner Mode Active:</strong> You can toggle any item between <strong>In Stock</strong> and{" "}
                <strong>Sold Out</strong> using the switch on each card to test live customer sync!
              </span>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="tab-pill"
              style={{
                background: activeCategory === cat.id ? "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))" : "var(--bg-surface)",
                color: activeCategory === cat.id ? "#0F0D0B" : "var(--text-secondary)",
                fontWeight: activeCategory === cat.id ? 700 : 500,
                border: "1px solid var(--border-subtle)",
                padding: "8px 18px",
                fontSize: "0.88rem",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {filteredItems.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: item.isAvailable ? "1px solid var(--border-subtle)" : "1px solid rgba(239, 68, 68, 0.4)",
                background: item.isAvailable ? "var(--bg-surface)" : "rgba(28, 20, 18, 0.95)",
                position: "relative",
              }}
            >
              {/* Image Container with Stock Indicator */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: item.isAvailable ? "none" : "grayscale(85%) opacity(0.65)",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (item.isAvailable) e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {/* Live Stock Status Overlay Badge */}
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                  {item.isAvailable ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "0.72rem",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(16, 185, 129, 0.9)",
                        color: "#0F0D0B",
                        fontWeight: 800,
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0F0D0B" }} />
                      IN STOCK
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "0.72rem",
                        padding: "3px 9px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(239, 68, 68, 0.92)",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      }}
                    >
                      <AlertTriangle size={11} />
                      SOLD OUT TODAY
                    </span>
                  )}
                </div>

                {/* Dietary Tags */}
                <div style={{ position: "absolute", bottom: "10px", left: "10px", display: "flex", gap: "6px" }}>
                  {item.dietaryTags?.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(15, 13, 11, 0.82)",
                        color: "var(--text-secondary)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Item Info */}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                      {item.name}
                    </h3>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                      ₹{item.price}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "14px" }}>
                    {item.description}
                  </p>
                </div>

                {/* Card Actions & Owner Toggle */}
                <div>
                  {item.isAvailable ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-primary"
                      style={{ width: "100%", padding: "9px 14px", fontSize: "0.86rem" }}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Cart · ₹{item.price}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuggestAlternative(item)}
                      className="btn btn-secondary"
                      style={{
                        width: "100%",
                        padding: "9px 14px",
                        fontSize: "0.82rem",
                        borderColor: "var(--accent-amber)",
                        color: "var(--accent-amber-light)",
                      }}
                    >
                      <Sparkles size={14} color="#F59E0B" />
                      <span>Order Chef's Alternative</span>
                    </button>
                  )}

                  {/* Owner Live Toggle */}
                  {isAdmin && (
                    <button
                      onClick={() => toggleItemAvailability(item.id)}
                      style={{
                        marginTop: "8px",
                        width: "100%",
                        padding: "5px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px dashed var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.72rem",
                        color: item.isAvailable ? "#EF4444" : "#10B981",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      ⚡ Owner: Click to mark {item.isAvailable ? "Sold Out" : "In Stock"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setCurrentView("menu")}
            className="btn btn-secondary btn-lg"
            style={{
              padding: "12px 28px",
              borderColor: "var(--accent-amber)",
              color: "var(--accent-amber-light)",
            }}
          >
            <Coffee size={18} />
            <span>Explore All 24+ Artisanal Roasts & Bakes</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
