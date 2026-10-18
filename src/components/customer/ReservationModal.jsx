import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import { X, Calendar, Clock, Users, MapPin, Check, Sparkles } from "lucide-react";

export default function ReservationModal() {
  const { isReservationModalOpen, setIsReservationModalOpen, createReservation } = useStore();
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser?.name || "Alex Morgan");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98112 34567");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:30 PM");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("Sunlit Patio (Pet Friendly)");
  const [specialRequests, setSpecialRequests] = useState("");

  if (!isReservationModalOpen) return null;

  const timeSlots = [
    "09:00 AM",
    "11:30 AM",
    "02:00 PM",
    "04:30 PM",
    "06:30 PM",
    "07:30 PM",
    "08:45 PM",
  ];

  const areaOptions = [
    { id: "Sunlit Patio (Pet Friendly)", label: "Sunlit Patio 🌿", desc: "Outdoor garden, 100% pet-friendly" },
    { id: "Indoor Cozy Booth", label: "Indoor Cozy Booth ☕", desc: "Warm ambient lighting, soft seating" },
    { id: "Quiet Work Zone (Power outlets)", label: "Work Zone 💻", desc: "Dedicated high-speed Wi-Fi & plugs" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation({
      name,
      phone,
      date,
      time,
      guests,
      area,
      specialRequests,
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsReservationModalOpen(false)}>
      <div
        className="modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "28px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <div className="badge badge-amber" style={{ marginBottom: "6px" }}>
              Table Reservation
            </div>
            <h3 style={{ fontSize: "1.3rem", margin: 0 }}>Book Your Table</h3>
          </div>

          <button
            onClick={() => setIsReservationModalOpen(false)}
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

        <form onSubmit={handleSubmit}>
          {/* Guest Name & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                required
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Date & Guests */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">Reservation Date</label>
              <input
                type="date"
                required
                className="form-input"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <select
                className="form-select"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slots */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">Available Time Slots</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    border: `1px solid ${time === slot ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                    background: time === slot ? "rgba(245, 158, 11, 0.2)" : "var(--bg-surface)",
                    color: time === slot ? "var(--accent-amber-light)" : "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Seating Area Selection */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label className="form-label">Seating Preference</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {areaOptions.map((opt) => (
                <label
                  key={opt.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    background: area === opt.id ? "rgba(245, 158, 11, 0.12)" : "var(--bg-surface)",
                    border: `1px solid ${area === opt.id ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="area"
                    checked={area === opt.id}
                    onChange={() => setArea(opt.id)}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="form-group">
            <label className="form-label">Special Requests (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Anniversary celebration, corner booth, high chair"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          {/* Submit CTA */}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "10px" }}>
            <span>Confirm Reservation</span>
          </button>
        </form>
      </div>
    </div>
  );
}
