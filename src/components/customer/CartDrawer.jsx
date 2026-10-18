import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  QrCode,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

export default function CartDrawer({ setCurrentView }) {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    placeOrder,
  } = useStore();

  const { currentUser } = useAuth();

  const [orderType, setOrderType] = useState("dine-in"); // dine-in | takeaway | delivery
  const [tableNumber, setTableNumber] = useState("T-04");
  const [promoInput, setPromoInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay / PhonePe)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromo(promoInput);
    setPromoInput("");
  };

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const placed = placeOrder({
        customerName: currentUser?.name || "Guest Alex",
        customerPhone: currentUser?.phone || "+91 98112 34567",
        orderType,
        tableNumber: orderType === "dine-in" ? tableNumber : null,
        paymentMethod,
      });
      setIsSubmitting(false);
      if (placed && setCurrentView) {
        setCurrentView("tracker");
      }
    }, 700);
  };

  return (
    <div
      className="modal-overlay"
      style={{ justifyContent: "flex-end", padding: 0 }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          borderRadius: "0",
          borderTop: "none",
          borderBottom: "none",
          borderRight: "none",
          borderLeft: "1px solid var(--border-medium)",
          background: "var(--bg-secondary)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(18, 15, 12, 0.95)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} color="#F59E0B" />
            <div>
              <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Your Order Cart</h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                {cart.length} {cart.length === 1 ? "item" : "items"} selected
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Body */}
        {cart.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <ShoppingBag size={32} color="#F59E0B" />
            </div>
            <h4 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Your Cart is Empty</h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "260px" }}>
              Explore our freshly roasted coffees, cold brews, and flaky pastries!
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                if (setCurrentView) setCurrentView("menu");
              }}
              className="btn btn-primary"
            >
              Browse Café Menu
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            
            {/* Order Type Selector */}
            <div style={{ marginBottom: "20px" }}>
              <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                Order Fulfillment
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { id: "dine-in", label: "Dine-In 🍽️" },
                  { id: "takeaway", label: "Takeaway 🛍️" },
                  { id: "delivery", label: "Delivery 🛵" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setOrderType(type.id)}
                    style={{
                      padding: "8px 4px",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textAlign: "center",
                      border: `1px solid ${orderType === type.id ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                      background: orderType === type.id ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
                      color: orderType === type.id ? "var(--accent-amber-light)" : "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {orderType === "dine-in" && (
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Table Number:</span>
                  <input
                    type="text"
                    className="form-input"
                    style={{ width: "90px", padding: "6px 10px", fontSize: "0.85rem" }}
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. T-04"
                  />
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 style={{ fontSize: "0.92rem", margin: 0, color: "var(--text-primary)" }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Customizations tags */}
                    {item.customization && (
                      <div style={{ fontSize: "0.74rem", color: "var(--accent-amber-light)", marginTop: "3px" }}>
                        {[
                          item.customization.milk,
                          item.customization.sweetness,
                          item.customization.temp,
                          item.customization.notes,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                        ₹{(item.effectivePrice || item.price) * item.qty}
                      </div>

                      {/* Quantity Modifier */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          onClick={() => updateCartQty(item.cartItemId, item.qty - 1)}
                          style={{
                            width: "24px",
                            height: "24px",
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
                          <Minus size={12} />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: "0.85rem", minWidth: "16px", textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.cartItemId, item.qty + 1)}
                          style={{
                            width: "24px",
                            height: "24px",
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
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div style={{ marginBottom: "24px" }}>
              {appliedPromo ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Tag size={15} color="#10B981" />
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#34D399" }}>
                      Coupon "{appliedPromo.code}" Applied! (-₹{cartDiscount})
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Promo code (e.g. FIRSTSIP)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      style={{ fontSize: "0.85rem", textTransform: "uppercase" }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: "0 14px" }}>
                      Apply
                    </button>
                  </form>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    Try promo <strong>FIRSTSIP</strong> (15% off) or <strong>CAFE50</strong> (₹50 off)
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: "24px" }}>
              <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>
                Payment Method
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { id: "UPI (Google Pay / PhonePe)", label: "UPI Instant (GPay / PhonePe / QR)", icon: <QrCode size={15} color="#10B981" /> },
                  { id: "Card (Visa / Mastercard)", label: "Credit / Debit Card", icon: <CreditCard size={15} color="#3B82F6" /> },
                  { id: "Cash on Counter", label: "Cash on Barista Counter", icon: <DollarSign size={15} color="#F59E0B" /> },
                ].map((m) => (
                  <label
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-md)",
                      background: paymentMethod === m.id ? "rgba(245, 158, 11, 0.12)" : "var(--bg-surface)",
                      border: `1px solid ${paymentMethod === m.id ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                    />
                    {m.icon}
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bill Breakdown */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "16px",
                fontSize: "0.88rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal:</span>
                <span>₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10B981" }}>
                  <span>Discount:</span>
                  <span>- ₹{cartDiscount}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>GST (5%):</span>
                <span>₹{cartTax}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "10px",
                  marginTop: "4px",
                }}
              >
                <span>Total Payable:</span>
                <span style={{ color: "var(--accent-amber)" }}>₹{cartTotal}</span>
              </div>
            </div>

          </div>
        )}

        {/* Drawer Footer CTA */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "16px 24px",
              background: "rgba(18, 15, 12, 0.95)",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: "100%" }}
            >
              {isSubmitting ? (
                <span>Brewing Order...</span>
              ) : (
                <>
                  <span>Place Order — ₹{cartTotal}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "6px" }}>
              Instant kitchen dispatch · Live brewing updates
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
