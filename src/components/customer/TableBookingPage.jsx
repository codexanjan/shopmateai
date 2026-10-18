import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Coffee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  Phone,
  User,
} from "lucide-react";

export default function TableBookingPage({ setCurrentView }) {
  const { createReservation, reservations, cafeInfo } = useStore();
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser?.name || "Alex Morgan");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98112 34567");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("Sunlit Patio (Pet Friendly)");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "04:30 PM",
    "06:30 PM",
    "07:30 PM",
    "08:45 PM",
  ];

  const areaOptions = [
    {
      id: "Sunlit Patio (Pet Friendly)",
      label: "Sunlit Patio 🌿",
      desc: "Outdoor botanical garden, open breeze, 100% pet-friendly with water bowls.",
      badge: "Most Popular",
    },
    {
      id: "Indoor Cozy Booth",
      label: "Indoor Cozy Booth ☕",
      desc: "Warm ambient mahogany lighting, velvet banquettes, soft jazz background.",
      badge: "Romantic & Chill",
    },
    {
      id: "Quiet Work Zone (Power outlets)",
      label: "Quiet Work Zone 💻",
      desc: "Dedicated 300 Mbps Wi-Fi, ergonomic chairs & dual power outlets per table.",
      badge: "Remote Work",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      name,
      phone,
      date,
      time,
      guests,
      area,
      specialRequests,
    };
    createReservation(newReservation);
    setConfirmedBooking(newReservation);
    setIsSuccess(true);
  };

  return (
    <div className="container" style={{ padding: "40px 16px 80px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
        <div className="badge badge-amber" style={{ marginBottom: "12px", fontSize: "0.82rem" }}>
          <Sparkles size={14} />
          <span>Complimentary Table Reservation</span>
        </div>
        <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Reserve Your Table at <span className="text-amber">{cafeInfo.name}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
          Whether you're stopping by for a quiet pour-over session, meeting team members for remote work, or bringing
          your furry friend to the patio, we have the perfect spot ready.
        </p>
      </div>

      {isSuccess ? (
        <div
          className="glass-panel animate-scale-up"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "40px",
            textAlign: "center",
            background: "rgba(24, 20, 16, 0.98)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34D399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <CheckCircle size={36} />
          </div>

          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "10px" }}>Table Confirmed!</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "24px" }}>
            We've reserved a table for <strong>{confirmedBooking?.guests} guests</strong> on{" "}
            <strong>{confirmedBooking?.date}</strong> at <strong>{confirmedBooking?.time}</strong> in the{" "}
            <strong>{confirmedBooking?.area}</strong>.
          </p>

          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              textAlign: "left",
              marginBottom: "28px",
              fontSize: "0.88rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--text-muted)" }}>Guest Name:</span>
              <span style={{ fontWeight: 600 }}>{confirmedBooking?.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--text-muted)" }}>Phone:</span>
              <span style={{ fontWeight: 600 }}>{confirmedBooking?.phone}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "var(--text-muted)" }}>Wi-Fi Access:</span>
              <span style={{ fontWeight: 600, color: "var(--accent-amber)" }}>{cafeInfo.wifiSsid}</span>
            </div>
            {confirmedBooking?.specialRequests && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Special Note:</span>
                <span style={{ fontWeight: 500 }}>{confirmedBooking?.specialRequests}</span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => setCurrentView("menu")} className="btn btn-primary">
              <span>Explore Café Menu & Pre-Order</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">
              <span>Book Another Table</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "28px",
          }}
          className="auth-grid-responsive"
        >
          {/* Reservation Form */}
          <div
            className="glass-panel"
            style={{
              padding: "32px",
              background: "rgba(22, 18, 14, 0.98)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Name & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ paddingLeft: "36px" }}
                    />
                    <User size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone Number</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ paddingLeft: "36px" }}
                    />
                    <Phone size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                  </div>
                </div>
              </div>

              {/* Date & Guests */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Number of Guests</label>
                  <select
                    className="form-select"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="form-group" style={{ marginBottom: "22px" }}>
                <label className="form-label">Select Preferred Time Slot</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      style={{
                        padding: "9px 6px",
                        borderRadius: "var(--radius-md)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        border: `1px solid ${time === slot ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        background: time === slot ? "rgba(245, 158, 11, 0.22)" : "var(--bg-surface)",
                        color: time === slot ? "var(--accent-amber-light)" : "var(--text-secondary)",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div className="form-group" style={{ marginBottom: "22px" }}>
                <label className="form-label">Select Atmosphere / Seating Area</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {areaOptions.map((opt) => (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-md)",
                        background: area === opt.id ? "rgba(245, 158, 11, 0.12)" : "var(--bg-surface)",
                        border: `1px solid ${area === opt.id ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="page_area"
                        checked={area === opt.id}
                        onChange={() => setArea(opt.id)}
                        style={{ marginTop: "4px" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {opt.label}
                          </span>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              padding: "2px 8px",
                              borderRadius: "var(--radius-full)",
                              background: "rgba(245, 158, 11, 0.15)",
                              color: "var(--accent-amber)",
                              fontWeight: 600,
                            }}
                          >
                            {opt.badge}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "3px" }}>
                          {opt.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Special Requests (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bringing a dog, birthday surprise, quiet window table"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                <span>Confirm Instant Table Booking</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Info Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              className="glass-panel"
              style={{
                padding: "24px",
                background: "rgba(22, 18, 14, 0.95)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Coffee size={18} color="#F59E0B" />
                <span>Café Highlights & Amenities</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <li style={{ display: "flex", gap: "8px" }}>
                  <span>📶</span>
                  <span><strong>Complimentary High-Speed Wi-Fi:</strong> 300 Mbps fiber internet for seamless work.</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <span>🐾</span>
                  <span><strong>100% Pet-Friendly Patio:</strong> Fresh water bowls & complimentary treats.</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <span>🔌</span>
                  <span><strong>Charging Outlets:</strong> Available at all indoor booths & work desks.</span>
                </li>
                <li style={{ display: "flex", gap: "8px" }}>
                  <span>🚗</span>
                  <span><strong>Valet & Parking:</strong> Free 2-hour café parking right out front.</span>
                </li>
              </ul>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: "24px",
                background: "linear-gradient(145deg, rgba(245, 158, 11, 0.08) 0%, rgba(18, 15, 12, 0.95) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Clock size={16} color="#F59E0B" />
                <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--accent-amber-light)" }}>
                  Operating Hours
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0 }}>
                Open 7 Days a Week: <strong>7:00 AM – 11:00 PM</strong>
                <br />
                Kitchen orders close at 10:30 PM.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
