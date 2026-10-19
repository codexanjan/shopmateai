import React, { useState } from "react";
import { Check, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function PricingPage({ setCurrentView }) {
  const [monthlySales, setMonthlySales] = useState(100000);

  const aggregatorCut = Math.round(monthlySales * 0.25);
  const shopmateCost = 499;
  const netSavings = aggregatorCut - shopmateCost;
  const annualSavings = netSavings * 12;

  const plans = [
    {
      id: "starter",
      name: "Starter",
      desc: "One shop, bakery or local café",
      price: "₹499",
      period: "/ month",
      locations: "1 Café Location",
      orders: "500 digital orders / mo",
      team: "2 Staff & Barista accounts",
      popular: false,
      features: [
        "Artisanal Menu Catalog & Customizer",
        "Live Kitchen Kanban Dispatch Screen",
        "Table Booking & Reservation Desk",
        "0% Commission Direct UPI Payments",
        "Real-Time Stock & Sold-Out Sync",
        "Dynamic Prep-Time Countdown",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      desc: "A growing café with a few branches",
      price: "₹999",
      period: "/ month",
      locations: "Up to 5 Locations",
      orders: "Unlimited orders / mo",
      team: "5 Staff accounts per location",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Multilingual Ordering (Kannada, Hindi, etc.)",
        "Voice Assistant & Audio Order Alerts",
        "Predictive Inventory & Ingredient Restock",
        "Customer Dietary & Taste Memory",
        "Peak Morning Rush & Revenue Analytics",
        "Priority Customer Support",
      ],
    },
    {
      id: "agency",
      name: "Agency & Franchise",
      desc: "Chains managing multiple locations",
      price: "₹1,999",
      period: "/ month",
      locations: "Unlimited Locations",
      orders: "Unlimited orders / mo",
      team: "Unlimited Team & Managers",
      popular: false,
      features: [
        "Everything in Pro, plus:",
        "Meta WhatsApp Cloud API Bot",
        "Thermal Cloud Receipt Printer Sync",
        "Multi-Branch Centralized Menu Management",
        "Custom Domain & White-Label Branding",
        "Dedicated Account Manager & SLA",
      ],
    },
  ];

  return (
    <div className="container" style={{ padding: "50px 16px 90px" }}>
      {/* Top Header */}
      <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.03em" }}>
          Plans that grow with <span className="text-gradient-amber">your café & locations.</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Every plan starts with a <strong>14-day free trial</strong>. Predictable flat pricing with{" "}
          <strong>0% order commissions</strong> so you keep 100% of your hard-earned revenue.
        </p>
      </div>

      {/* 3 Pricing Cards (Modeled on ReviewPilot) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "28px",
          alignItems: "stretch",
          marginBottom: "60px",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="glass-card"
            style={{
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "var(--radius-xl)",
              border: plan.popular ? "2px solid var(--accent-amber)" : "1px solid var(--border-subtle)",
              background: plan.popular
                ? "linear-gradient(165deg, rgba(32, 25, 20, 0.98) 0%, rgba(18, 15, 12, 0.98) 100%)"
                : "var(--bg-surface)",
              boxShadow: plan.popular ? "var(--shadow-amber), 0 8px 30px rgba(0,0,0,0.5)" : "none",
              position: "relative",
            }}
          >
            {plan.popular && (
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  color: "#0F0D0B",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "3px 14px",
                  borderRadius: "var(--radius-full)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Most Popular
              </div>
            )}

            <div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "6px" }}>{plan.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>{plan.desc}</p>

              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "24px" }}>
                <span style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--accent-amber-light)" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{plan.period}</span>
              </div>

              {/* Key Location & Account Specs */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "0.85rem",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Locations:</span>
                  <span style={{ fontWeight: 600 }}>{plan.locations}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Orders:</span>
                  <span style={{ fontWeight: 600 }}>{plan.orders}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-muted)" }}>Team:</span>
                  <span style={{ fontWeight: 600 }}>{plan.team}</span>
                </div>
              </div>

              {/* Features List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.86rem" }}>
                    <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "var(--text-secondary)" }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentView("signup")}
              className={`btn ${plan.popular ? "btn-primary" : "btn-secondary"}`}
              style={{ width: "100%", padding: "12px", fontSize: "0.92rem", fontWeight: 700 }}
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ReviewPilot-Inspired Feature Comparison Table */}
      <div
        className="glass-panel"
        style={{
          padding: "32px",
          background: "var(--bg-surface)",
          marginBottom: "60px",
          overflowX: "auto",
        }}
      >
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "20px" }}>Detailed Plan Comparison</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-medium)" }}>
              <th style={{ textAlign: "left", padding: "12px 14px", color: "var(--text-muted)" }}>Feature</th>
              <th style={{ textAlign: "center", padding: "12px 14px" }}>Starter (₹499)</th>
              <th style={{ textAlign: "center", padding: "12px 14px", color: "var(--accent-amber-light)" }}>
                Pro (₹999)
              </th>
              <th style={{ textAlign: "center", padding: "12px 14px" }}>Agency (₹1,999)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "12px 14px" }}>Café Locations</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>1</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>5</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>Unlimited</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "12px 14px" }}>Commission on Orders</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "#10B981", fontWeight: 700 }}>0%</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "#10B981", fontWeight: 700 }}>0%</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "#10B981", fontWeight: 700 }}>0%</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "12px 14px" }}>Kitchen Kanban Dispatch Screen</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "12px 14px" }}>Multilingual & Voice Ordering</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--text-muted)" }}>Basic</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--accent-amber)" }}>Full Suite</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--accent-amber)" }}>Full Suite</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td style={{ padding: "12px 14px" }}>Predictive Restock & Morning Rush Alerts</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--text-muted)" }}>—</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
            </tr>
            <tr>
              <td style={{ padding: "12px 14px" }}>WhatsApp Cloud API Integration</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--text-muted)" }}>—</td>
              <td style={{ textAlign: "center", padding: "12px 14px", color: "var(--text-muted)" }}>Add-on</td>
              <td style={{ textAlign: "center", padding: "12px 14px" }}>✓ Included</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Interactive Savings Calculator */}
      <div
        className="glass-panel"
        style={{
          padding: "36px",
          background: "linear-gradient(145deg, rgba(28, 22, 17, 0.98) 0%, rgba(18, 15, 12, 0.98) 100%)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 30px" }}>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "8px" }}>
            See How Much You Save vs Aggregators
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Swiggy and Zomato take 25% to 30% of your gross sales. Calculate your direct savings with ShopMate's flat
            ₹499/mo plan.
          </p>
        </div>

        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Monthly Digital Orders:</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent-amber)" }}>
              ₹{monthlySales.toLocaleString("en-IN")}
            </span>
          </div>

          <input
            type="range"
            min="20000"
            max="500000"
            step="10000"
            value={monthlySales}
            onChange={(e) => setMonthlySales(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-amber)", marginBottom: "28px", cursor: "pointer" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "var(--radius-md)", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "0.78rem", color: "#F87171", fontWeight: 600 }}>Aggregator Cut (25%)</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#EF4444", marginTop: "4px" }}>
                -₹{aggregatorCut.toLocaleString("en-IN")}/mo
              </div>
            </div>

            <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "var(--radius-md)", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "0.78rem", color: "#34D399", fontWeight: 600 }}>Your Net Monthly Savings</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#10B981", marginTop: "4px" }}>
                +₹{netSavings.toLocaleString("en-IN")}/mo
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: "0.95rem", color: "var(--accent-amber-light)", fontWeight: 700 }}>
            That's ₹{annualSavings.toLocaleString("en-IN")} kept in your café every year!
          </div>
        </div>
      </div>
    </div>
  );
}
