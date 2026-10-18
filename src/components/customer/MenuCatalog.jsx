import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { MENU_CATEGORIES } from "../../data/mockData";
import { Search, Star, Clock, Plus, Sliders, Sparkles, AlertCircle } from "lucide-react";

export default function MenuCatalog() {
  const { menuItems, addToCart, setActiveCustomizingItem } = useStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all");

  const dietaryOptions = [
    { id: "all", label: "All Dietary" },
    { id: "vegan", label: "Vegan 🌱" },
    { id: "gluten-free", label: "Gluten-Free 🌾" },
    { id: "chef", label: "Chef's Special ⭐" },
  ];

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== "all") {
        if (dietaryFilter === "vegan" && !item.dietaryTags?.some((t) => t.toLowerCase().includes("vegan"))) {
          return false;
        }
        if (dietaryFilter === "gluten-free" && !item.dietaryTags?.some((t) => t.toLowerCase().includes("gluten"))) {
          return false;
        }
        if (dietaryFilter === "chef" && !item.dietaryTags?.some((t) => t.toLowerCase().includes("chef"))) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesTag = item.dietaryTags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section className="section-padding" style={{ position: "relative" }}>
      <div className="container">
        
        {/* Header & Title */}
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 36px auto" }}>
          <div className="badge badge-amber" style={{ marginBottom: "12px" }}>
            Artisan Craft Menu
          </div>
          <h2 style={{ marginBottom: "12px" }}>
            Handcrafted <span className="text-gradient-amber">Brews & Fresh Bakery</span>
          </h2>
          <p style={{ fontSize: "1rem" }}>
            Roasted in small batches from high-altitude estates. Click any beverage to customize milk, sweetness, and temperature.
          </p>
        </div>

        {/* Controls Bar: Search & Dietary Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          {/* Category Tabs */}
          <div className="tabs-container">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`tab-pill ${selectedCategory === cat.id ? "active" : ""}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: "relative", minWidth: "260px", flex: "1 1 240px", maxWidth: "400px" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "42px", borderRadius: "var(--radius-full)" }}
              placeholder="Search brews, cold coffees, croissants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dietary Pills Row */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginBottom: "32px", paddingBottom: "4px" }}>
          {dietaryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDietaryFilter(opt.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: `1px solid ${dietaryFilter === opt.id ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                background: dietaryFilter === opt.id ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                color: dietaryFilter === opt.id ? "var(--accent-amber-light)" : "var(--text-secondary)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "var(--transition-fast)",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: "60px 20px",
              textAlign: "center",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <AlertCircle size={40} color="#F59E0B" style={{ margin: "0 auto 16px auto" }} />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>No Menu Items Found</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "20px" }}>
              No items match your active filters. Try clearing your search term or selecting another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setDietaryFilter("all");
                setSearchQuery("");
              }}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: "var(--radius-xl)",
                  opacity: item.isAvailable ? 1 : 0.6,
                }}
              >
                {/* Image Container with Badges */}
                <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(18, 15, 12, 0.85) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Dietary Tag Pill */}
                  <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                    {item.dietaryTags?.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className={tag.includes("Vegan") ? "badge badge-vegan" : "badge badge-amber"}
                        style={{ fontSize: "0.68rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Prep time badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.72rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Clock size={12} color="#F59E0B" />
                    <span>{item.prepTimeMinutes || 4} mins</span>
                  </div>

                  {!item.isAvailable && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.75)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span className="badge badge-neutral" style={{ background: "#EF4444", color: "#fff", fontWeight: 700 }}>
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Box */}
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Rating & Review */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-amber)" }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{item.rating}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      ({item.reviewsCount} reviews)
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      marginBottom: "20px",
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Price & Action Button */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: "14px",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Price</span>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
                        ₹{item.price}
                      </div>
                    </div>

                    {item.isAvailable ? (
                      item.customizable ? (
                        <button
                          onClick={() => setActiveCustomizingItem(item)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: "8px 14px" }}
                        >
                          <Sliders size={14} />
                          <span>Customize</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="btn btn-primary btn-sm"
                          style={{ padding: "8px 14px" }}
                        >
                          <Plus size={15} />
                          <span>Add to Cart</span>
                        </button>
                      )
                    ) : (
                      <button disabled className="btn btn-secondary btn-sm">
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
