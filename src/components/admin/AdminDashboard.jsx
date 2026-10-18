import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarCheck,
  TrendingUp,
  Bot,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles,
  DollarSign,
  Coffee,
  Volume2,
  VolumeX,
  X,
  Save,
  Check,
} from "lucide-react";

export default function AdminDashboard() {
  const {
    cafeInfo,
    updateCafeSettings,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    soundEnabled,
    toggleSound,
    showToast,
  } = useStore();

  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState("kanban"); // kanban | menu | reservations | analytics | copilot | settings

  // Menu Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCat, setNewItemCat] = useState("coffee");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [newItemTag, setNewItemTag] = useState("Chef's Special");

  // AI Copilot State
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [copilotResponse, setCopilotResponse] = useState("");
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({ ...cafeInfo });

  // Calculated Metrics
  const grossSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(grossSales / orders.length) : 0;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const brewingCount = orders.filter((o) => o.status === "brewing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    addMenuItem({
      name: newItemName,
      category: newItemCat,
      price: newItemPrice,
      description: newItemDesc || "Freshly handcrafted artisanal specialty.",
      image: newItemImage || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      dietaryTags: [newItemTag],
    });
    setNewItemName("");
    setNewItemPrice("");
    setNewItemDesc("");
    setNewItemImage("");
    setIsAddModalOpen(false);
  };

  const handleRunCopilot = (promptText) => {
    const prompt = promptText || copilotPrompt;
    if (!prompt.trim()) return;

    setIsCopilotThinking(true);
    setCopilotResponse("");

    setTimeout(() => {
      let response = "";
      const p = prompt.toLowerCase();
      if (p.includes("instagram") || p.includes("caption") || p.includes("social")) {
        response = `📸 **Instagram Reel & Post Caption:**\n\n"Golden hour hits different when paired with our slow-steeped 18-Hour Cold Brew & fresh warm French butter croissants. ☕✨ Handcrafted with single-origin beans and pure passion.\n\n📍 42 Roastery Lane, Indiranagar\n🌿 Pet-friendly garden patio open until 11 PM\n🏷️ Use code FIRSTSIP on ShopMate AI for 15% off!\n\n#SpecialtyCoffee #BengaluruCafes #IndiranagarCoffee #BrewAndBliss"`;
      } else if (p.includes("sales") || p.includes("summary") || p.includes("busiest")) {
        response = `📊 **Daily Operations Summary:**\n\n• **Gross Revenue:** ₹${grossSales.toLocaleString()} across ${orders.length} tickets\n• **Busiest Window:** 8:30 AM – 11:00 AM (Cold Brew & Macchiato rush)\n• **Top Seller:** Signature 18-Hour Cold Brew (42% of beverage volume)\n• **Bot Deflection:** 94% FAQ inquiries answered without staff intervention\n• **Recommendation:** Pre-prep 12 bottles of Cold Brew for tomorrow's morning rush.`;
      } else if (p.includes("inventory") || p.includes("reorder") || p.includes("stock")) {
        response = `📦 **Inventory Restock Forecast:**\n\n• **Oat Milk (Barista Edition):** 6 cartons remaining — Reorder 2 cases today.\n• **Chikmagalur Single-Origin Beans:** Healthy stock (14 kg remaining).\n• **Belgian Dark Chocolate (for brownies):** Low stock alert (2 kg remaining).\n• **Takeaway Kraft Cups (12oz):** Reorder recommended before Friday weekend rush.`;
      } else {
        response = `💡 **Owner AI Copilot Advice:**\n\nBased on your customer orders, drinks with Oat Milk alternatives generate ₹30 higher margin per cup. Consider introducing an "Oat Milk Tasting Flight" this weekend to boost average ticket value from ₹${avgOrderValue} to ₹320! ☕`;
      }

      setCopilotResponse(response);
      setIsCopilotThinking(false);
    }, 600);
  };

  return (
    <div style={{ paddingBottom: "80px", position: "relative" }}>
      
      {/* Shift Metrics Bar */}
      <section
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "24px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="badge badge-amber">Owner & Barista Studio</span>
                <span style={{ fontSize: "0.8rem", color: "#34D399", fontWeight: 700 }}>
                  ● Live Kitchen Link
                </span>
              </div>
              <h2 style={{ fontSize: "1.6rem", marginTop: "4px", margin: 0 }}>
                {cafeInfo.name} Command Center
              </h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "var(--bg-surface)",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{currentUser?.name}</span>
                <span className="badge badge-neutral" style={{ fontSize: "0.68rem" }}>
                  On Shift
                </span>
              </div>

              <button
                onClick={toggleSound}
                className="btn btn-secondary btn-sm"
                title={soundEnabled ? "Mute kitchen bells" : "Enable kitchen bells"}
              >
                {soundEnabled ? <Volume2 size={16} color="#F59E0B" /> : <VolumeX size={16} />}
                <span>{soundEnabled ? "Bells On" : "Muted"}</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            <div className="glass-card" style={{ padding: "16px" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Today's Gross Sales</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-amber)" }}>
                ₹{grossSales.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#34D399", marginTop: "2px" }}>+18% vs yesterday</div>
            </div>

            <div className="glass-card" style={{ padding: "16px" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Total Order Volume</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {orders.length} Tickets
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                {pendingCount} new · {brewingCount} brewing
              </div>
            </div>

            <div className="glass-card" style={{ padding: "16px" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Average Ticket Size</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#10B981" }}>
                ₹{avgOrderValue}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                Higher via AI suggestions
              </div>
            </div>

            <div className="glass-card" style={{ padding: "16px" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>AI Resolution Rate</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "#A78BFA" }}>
                94.2%
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                Zero barista interruption
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="container" style={{ marginTop: "28px", marginBottom: "28px" }}>
        <div className="tabs-container" style={{ width: "fit-content" }}>
          {[
            { id: "kanban", label: "Kitchen Kanban", icon: <LayoutDashboard size={16} /> },
            { id: "menu", label: "Menu Catalog Studio", icon: <UtensilsCrossed size={16} /> },
            { id: "reservations", label: "Table Reservations", icon: <CalendarCheck size={16} /> },
            { id: "analytics", label: "Business Analytics", icon: <TrendingUp size={16} /> },
            { id: "copilot", label: "AI Marketing Copilot", icon: <Bot size={16} /> },
            { id: "settings", label: "Café Settings", icon: <Settings size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-pill ${activeTab === tab.id ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="container">

        {/* 1. KITCHEN KANBAN BOARD */}
        {activeTab === "kanban" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              { status: "pending", title: "New Orders (Pending)", badgeClass: "badge-amber", count: pendingCount },
              { status: "brewing", title: "Barista Brewing", badgeClass: "badge-neutral", count: brewingCount },
              { status: "ready", title: "Ready for Pickup", badgeClass: "badge-vegan", count: readyCount },
              { status: "completed", title: "Completed / Served", badgeClass: "badge-neutral", count: orders.filter((o) => o.status === "completed").length },
            ].map((col) => {
              const colOrders = orders.filter((o) => o.status === col.status);

              return (
                <div
                  key={col.status}
                  style={{
                    background: "var(--bg-surface)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border-subtle)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "500px",
                  }}
                >
                  {/* Column Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "1rem", margin: 0 }}>{col.title}</h3>
                    <span className={`badge ${col.badgeClass}`} style={{ fontSize: "0.75rem" }}>
                      {col.count}
                    </span>
                  </div>

                  {/* Orders Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, overflowY: "auto" }}>
                    {colOrders.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        No orders in this stage
                      </div>
                    ) : (
                      colOrders.map((order) => (
                        <div
                          key={order.id}
                          className="glass-card"
                          style={{
                            padding: "16px",
                            borderRadius: "var(--radius-lg)",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                                #{order.id}
                              </div>
                              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                {order.customerName}
                              </div>
                            </div>
                            <span className="badge badge-amber" style={{ fontSize: "0.68rem" }}>
                              {order.orderType.toUpperCase()}{" "}
                              {order.tableNumber ? `· Table ${order.tableNumber}` : ""}
                            </span>
                          </div>

                          {/* Items List */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "12px 0", fontSize: "0.85rem" }}>
                            {order.items?.map((it, idx) => (
                              <div key={idx} style={{ borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "4px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span style={{ fontWeight: 600 }}>{it.qty}x {it.name}</span>
                                  <span>₹{(it.effectivePrice || it.price) * it.qty}</span>
                                </div>
                                {it.customization && (
                                  <div style={{ fontSize: "0.72rem", color: "var(--accent-amber-light)" }}>
                                    {[it.customization.milk, it.customization.sweetness, it.customization.temp]
                                      .filter(Boolean)
                                      .join(" · ")}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Footer & Status Forward Buttons */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "10px" }}>
                            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--accent-amber)" }}>
                              ₹{order.total}
                            </div>

                            <div style={{ display: "flex", gap: "6px" }}>
                              {col.status === "pending" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, "brewing")}
                                  className="btn btn-primary btn-sm"
                                  style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                                >
                                  <span>Start Brewing ➔</span>
                                </button>
                              )}
                              {col.status === "brewing" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, "ready")}
                                  className="btn btn-primary btn-sm"
                                  style={{ fontSize: "0.75rem", padding: "4px 10px", background: "#10B981" }}
                                >
                                  <span>Mark Ready ✓</span>
                                </button>
                              )}
                              {col.status === "ready" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, "completed")}
                                  className="btn btn-secondary btn-sm"
                                  style={{ fontSize: "0.75rem", padding: "4px 10px" }}
                                >
                                  <span>Complete ✓</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. MENU CATALOG STUDIO */}
        {activeTab === "menu" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "1.3rem", margin: 0 }}>Menu Inventory & Stock Manager</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                  Toggle items in/out of stock instantly. Changes reflect live on customer storefront.
                </p>
              </div>

              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Add New Item</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card"
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "64px", height: "64px", borderRadius: "var(--radius-md)", objectFit: "cover" }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--accent-amber)", fontWeight: 800 }}>
                      ₹{item.price}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                      <button
                        onClick={() => toggleItemAvailability(item.id)}
                        className={`btn btn-sm ${item.isAvailable ? "btn-secondary" : "btn-danger"}`}
                        style={{ fontSize: "0.72rem", padding: "3px 8px" }}
                      >
                        {item.isAvailable ? "In Stock ✓" : "Marked Sold Out"}
                      </button>

                      <button
                        onClick={() => deleteMenuItem(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                        title="Delete item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TABLE RESERVATIONS */}
        {activeTab === "reservations" && (
          <div>
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.3rem", margin: 0 }}>Upcoming Table Bookings</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Manage guest arrivals, seating preferences, and special dietary requests.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="glass-card"
                  style={{
                    padding: "20px",
                    borderRadius: "var(--radius-lg)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h4 style={{ fontSize: "1.05rem", margin: 0 }}>{res.name}</h4>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{res.phone}</div>
                    </div>
                    <span
                      className={`badge ${
                        res.status === "seated" ? "badge-vegan" : res.status === "cancelled" ? "btn-danger" : "badge-amber"
                      }`}
                    >
                      {res.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                    <div>📅 <strong>{res.date}</strong> at <strong>{res.time}</strong></div>
                    <div>👥 <strong>{res.guests} Guests</strong> · {res.area}</div>
                    {res.specialRequests && (
                      <div style={{ fontSize: "0.78rem", color: "var(--accent-amber-light)", fontStyle: "italic" }}>
                        Note: "{res.specialRequests}"
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                    {res.status !== "seated" && (
                      <button
                        onClick={() => updateReservationStatus(res.id, "seated")}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, fontSize: "0.75rem" }}
                      >
                        <span>Seat Guests</span>
                      </button>
                    )}
                    {res.status !== "cancelled" && (
                      <button
                        onClick={() => updateReservationStatus(res.id, "cancelled")}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: "0.75rem" }}
                      >
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BUSINESS ANALYTICS */}
        {activeTab === "analytics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {/* Peak Hours Chart */}
              <div className="glass-card" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}>Peak Hourly Sales Volume</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { hour: "08:00 AM - 10:00 AM (Morning Rush)", pct: 88, amount: "₹6,840" },
                    { hour: "12:00 PM - 02:00 PM (Lunch Sandwiches)", pct: 65, amount: "₹4,920" },
                    { hour: "04:30 PM - 07:00 PM (Evening Brews)", pct: 95, amount: "₹7,650" },
                    { hour: "08:00 PM - 10:30 PM (Desserts & Decaf)", pct: 45, amount: "₹3,410" },
                  ].map((h, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                        <span>{h.hour}</span>
                        <strong style={{ color: "var(--accent-amber)" }}>{h.amount}</strong>
                      </div>
                      <div style={{ height: "8px", background: "var(--bg-surface-elevated)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                        <div style={{ width: `${h.pct}%`, height: "100%", background: "linear-gradient(90deg, var(--accent-amber), var(--accent-caramel))" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Selling Items */}
              <div className="glass-card" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "16px" }}>Top Selling Menu Items</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { name: "Signature 18-Hour Cold Brew", sold: "64 cups", revenue: "₹13,440" },
                    { name: "Iced Salted Caramel Macchiato", sold: "52 cups", revenue: "₹12,480" },
                    { name: "Flaky French Butter Croissant", sold: "48 pastries", revenue: "₹7,680" },
                    { name: "Truffle Wild Mushroom Melt", sold: "31 melts", revenue: "₹8,990" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "var(--bg-surface)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.85rem",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700 }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.sold} sold</div>
                      </div>
                      <div style={{ fontWeight: 800, color: "#10B981" }}>{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. AI OWNER COPILOT */}
        {activeTab === "copilot" && (
          <div className="glass-card" style={{ padding: "32px", borderRadius: "var(--radius-xl)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F0D0B",
                }}
              >
                <Bot size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem", margin: 0 }}>AI Marketing & Operations Copilot</h3>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Powered by Google Gemini for Café Owners & Head Roasters
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Ask your Copilot to draft social captions, analyze revenue patterns, suggest weekend promos, or draft staff shifts.
            </p>

            {/* Quick Prompts */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {[
                "Draft Instagram caption for today's special pastry",
                "Summarize today's sales and peak rush hours",
                "Suggest inventory reorders based on coffee demand",
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCopilotPrompt(p);
                    handleRunCopilot(p);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: "0.78rem" }}
                >
                  <Sparkles size={13} color="#F59E0B" />
                  <span>{p}</span>
                </button>
              ))}
            </div>

            {/* Prompt Input Form */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="Ask your AI copilot anything about café operations or marketing..."
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
              />
              <button
                onClick={() => handleRunCopilot()}
                disabled={isCopilotThinking}
                className="btn btn-primary"
              >
                <span>Generate</span>
              </button>
            </div>

            {/* Output Box */}
            {isCopilotThinking && (
              <div style={{ padding: "20px", background: "var(--bg-surface)", borderRadius: "var(--radius-lg)", color: "var(--text-secondary)" }}>
                Thinking and analyzing café data... ☕
              </div>
            )}

            {copilotResponse && (
              <div
                className="animate-fade-in"
                style={{
                  padding: "24px",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  color: "var(--text-primary)",
                }}
              >
                {copilotResponse}
              </div>
            )}
          </div>
        )}

        {/* 6. CAFÉ SETTINGS */}
        {activeTab === "settings" && (
          <div className="glass-card" style={{ padding: "32px", borderRadius: "var(--radius-xl)", maxWidth: "680px" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "20px" }}>Store Configuration & API Settings</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCafeSettings(settingsForm);
              }}
            >
              <div className="form-group">
                <label className="form-label">Café Store Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Store Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Guest Wi-Fi Network</label>
                  <input
                    type="text"
                    className="form-input"
                    value={settingsForm.wifiSsid}
                    onChange={(e) => setSettingsForm({ ...settingsForm, wifiSsid: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Wi-Fi Password</label>
                  <input
                    type="text"
                    className="form-input"
                    value={settingsForm.wifiPass}
                    onChange={(e) => setSettingsForm({ ...settingsForm, wifiPass: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">UPI ID (For Direct Payments)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={settingsForm.upiId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Tables</label>
                  <input
                    type="number"
                    className="form-input"
                    value={settingsForm.totalTables}
                    onChange={(e) => setSettingsForm({ ...settingsForm, totalTables: e.target.value })}
                  />
                </div>
              </div>

              {/* Gemini API Key Setting */}
              <div className="form-group" style={{ background: "rgba(245, 158, 11, 0.08)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <label className="form-label" style={{ color: "var(--accent-amber-light)" }}>
                  Google Gemini API Key (Optional)
                </label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="AIzaSy..."
                  value={settingsForm.geminiApiKey || ""}
                  onChange={(e) => setSettingsForm({ ...settingsForm, geminiApiKey: e.target.value })}
                />
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Leave empty to use built-in smart domain barista heuristics, or provide your key to connect directly to live Google Gemini Flash!
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
                <Save size={16} />
                <span>Save Café Settings</span>
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add New Menu Item Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content animate-scale-up" onClick={(e) => e.stopPropagation()} style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Add New Menu Item</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddItemSubmit}>
              <div className="form-group">
                <label className="form-label">Dish / Drink Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Vanilla Bean Affogato"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newItemCat}
                    onChange={(e) => setNewItemCat(e.target.value)}
                  >
                    <option value="coffee">Artisanal Coffee</option>
                    <option value="tea">Specialty Tea</option>
                    <option value="bakery">Bakery & Pastry</option>
                    <option value="food">Sandwiches & Bowls</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    placeholder="220"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Crafted with single-origin beans..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (Unsplash or direct)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dietary Badge</label>
                <select
                  className="form-select"
                  value={newItemTag}
                  onChange={(e) => setNewItemTag(e.target.value)}
                >
                  <option value="Chef's Special">Chef's Special ⭐</option>
                  <option value="Vegan">Vegan 🌱</option>
                  <option value="Gluten-Free">Gluten-Free 🌾</option>
                  <option value="Vegetarian">Vegetarian</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                <span>Add Item to Menu</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
