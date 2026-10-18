import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { X, Plus, Minus, Check, Coffee, Sparkles } from "lucide-react";

export default function ItemModal() {
  const { activeCustomizingItem, setActiveCustomizingItem, addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [milk, setMilk] = useState("Whole Milk");
  const [sweetness, setSweetness] = useState("50% Sweet (Balanced)");
  const [temp, setTemp] = useState("Iced");
  const [notes, setNotes] = useState("");

  if (!activeCustomizingItem) return null;

  const item = activeCustomizingItem;
  const isCoffeeOrTea = item.category === "coffee" || item.category === "tea";

  const milkOptions = [
    { label: "Whole Milk", extra: 0 },
    { label: "Oat Milk (+₹30)", extra: 30 },
    { label: "Almond Milk (+₹30)", extra: 30 },
    { label: "None (Black / Clear)", extra: 0 },
  ];

  const sweetnessOptions = [
    "Unsweetened (0%)",
    "Light Sweet (25%)",
    "50% Sweet (Balanced)",
    "Standard Sweet (100%)",
  ];

  const tempOptions = ["Iced with Ice Cubes", "Piping Hot"];

  const handleAddToCart = () => {
    const customization = isCoffeeOrTea
      ? { milk, sweetness, temp, notes }
      : { notes };

    addToCart(item, quantity, customization);
    setActiveCustomizingItem(null);
  };

  const extraCost = milk.includes("+₹30") ? 30 : 0;
  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="modal-overlay" onClick={() => setActiveCustomizingItem(null)}>
      <div
        className="modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "0", overflow: "hidden" }}
      >
        {/* Top Image Banner */}
        <div style={{ position: "relative", height: "200px" }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(23, 19, 16, 0.95) 100%)",
            }}
          />

          <button
            onClick={() => setActiveCustomizingItem(null)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>

          <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
              {item.dietaryTags?.map((tag, i) => (
                <span key={i} className="badge badge-amber" style={{ fontSize: "0.68rem" }}>
                  {tag}
                </span>
              ))}
            </div>
            <h3 style={{ fontSize: "1.3rem", color: "#fff", margin: 0 }}>{item.name}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px", maxHeight: "60vh", overflowY: "auto" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.5 }}>
            {item.description}
          </p>

          {isCoffeeOrTea && (
            <>
              {/* Serving Temp */}
              <div style={{ marginBottom: "20px" }}>
                <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                  Temperature / Serving Style
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {tempOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTemp(opt)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "var(--radius-md)",
                        background: temp === opt ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                        border: `1px solid ${temp === opt ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        color: temp === opt ? "var(--accent-amber-light)" : "var(--text-secondary)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      {temp === opt && <Check size={14} color="#F59E0B" />}
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Choice */}
              <div style={{ marginBottom: "20px" }}>
                <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                  Choice of Milk
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {milkOptions.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setMilk(m.label)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "var(--radius-md)",
                        background: milk === m.label ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                        border: `1px solid ${milk === m.label ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        color: milk === m.label ? "var(--accent-amber-light)" : "var(--text-secondary)",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        textAlign: "center",
                      }}
                    >
                      {milk === m.label && <Check size={14} color="#F59E0B" />}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div style={{ marginBottom: "20px" }}>
                <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                  Sweetness Level
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {sweetnessOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSweetness(s)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "var(--radius-md)",
                        background: sweetness === s ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                        border: `1px solid ${sweetness === s ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        color: sweetness === s ? "var(--accent-amber-light)" : "var(--text-secondary)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      {sweetness === s && <Check size={12} color="#F59E0B" />}
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Notes for barista */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">Special Barista Instructions</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Extra hot, light ice, serve with warm water"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Quantity Stepper & Price Calculation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
              marginBottom: "20px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Quantity</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--bg-surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--bg-surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Item Cost</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                ₹{totalPrice}
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg"
            style={{ width: "100%" }}
          >
            <span>Add to Cart — ₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
