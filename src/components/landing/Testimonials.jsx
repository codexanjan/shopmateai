import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Viraj Bagul",
      role: "Head Barista & Co-Founder",
      cafe: "Brew & Bliss Roastery, Indiranagar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      content:
        "Before ShopMate AI, my team was glued to WhatsApp answering 'Do you have oat milk?' during the peak 8:30 AM rush. Now the Gemini AI handles 94% of inquiries and sends paid orders right to our kitchen Kanban. It paid for itself in 24 hours.",
    },
    {
      name: "Priya Sengupta",
      role: "Café Manager",
      cafe: "The Daily Roast, Koramangala",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      content:
        "The automated table booking and live brewing tracker changed our customer experience completely. Our regulars love ordering directly from the AI chat, and we save over ₹22,000 every month on food aggregator commission fees.",
    },
    {
      name: "Arjun Nambiar",
      role: "Owner & Head Baker",
      cafe: "Flour & Bean Artisan Bakery",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      content:
        "Being able to toggle pastries as 'Sold Out' on the fly directly from the iPad kitchen view stopped us from ever having to disappoint a customer again. The UI looks stunning on both mobile and our store counter.",
    },
  ];

  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container">
        
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
          <div className="badge badge-amber" style={{ marginBottom: "12px" }}>
            Real Café Stories
          </div>
          <h2 style={{ marginBottom: "16px" }}>
            Loved by <span className="text-gradient-amber">Baristas & Coffee Roasters</span>
          </h2>
          <p style={{ fontSize: "1rem" }}>
            Hear how independent cafés are taking back their time and revenue with ShopMate AI.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Quote size={28} color="rgba(245, 158, 11, 0.3)" style={{ marginBottom: "16px" }} />

              <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={15} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "24px", flex: 1, fontStyle: "italic" }}>
                "{r.content}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                <img
                  src={r.image}
                  alt={r.name}
                  style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>{r.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--accent-amber-light)" }}>{r.role}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{r.cafe}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
