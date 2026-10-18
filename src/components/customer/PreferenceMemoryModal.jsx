import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { X, Brain, Trash2, Check, ShieldCheck, Heart } from "lucide-react";

export default function PreferenceMemoryModal() {
  const {
    isPreferenceModalOpen,
    setIsPreferenceModalOpen,
    customerMemory,
    updateCustomerMemory,
    clearCustomerMemory,
  } = useStore();

  const [diet, setDiet] = useState(customerMemory?.dietaryPreference || "Vegetarian");
  const [milk, setMilk] = useState(customerMemory?.preferredMilk || "Oat Milk (+₹30)");
  const [sweetness, setSweetness] = useState(customerMemory?.sweetnessPreference || "50% Sweet (Balanced)");
  const [budget, setBudget] = useState(customerMemory?.usualBudget || 250);

  if (!isPreferenceModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateCustomerMemory({
      dietaryPreference: diet,
      preferredMilk: milk,
      sweetnessPreference: sweetness,
      usualBudget: parseInt(budget, 10) || 250,
    });
    setIsPreferenceModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPreferenceModalOpen(false)}>
      <div
        className="modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: "28px", maxWidth: "500px" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0F0D0B",
              }}
            >
              <Brain size={20} />
            </div>
            <div>
              <div className="badge badge-amber" style={{ fontSize: "0.7rem", marginBottom: "2px" }}>
                Feature #7 · Responsible AI
              </div>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Customer Preference Memory</h3>
            </div>
          </div>

          <button
            onClick={() => setIsPreferenceModalOpen(false)}
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

        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.5 }}>
          ShopMate AI remembers your taste to personalize food recommendations and coffee customizations without you repeating yourself every visit.
        </p>

        <form onSubmit={handleSave}>
          {/* Dietary preference */}
          <div className="form-group">
            <label className="form-label">Dietary Preference</label>
            <select
              className="form-select"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="Vegetarian">Vegetarian 🌱</option>
              <option value="Vegan">Strict Vegan 🌿</option>
              <option value="Gluten-Free">Gluten-Free 🌾</option>
              <option value="None">No Specific Dietary Restrictions</option>
            </select>
          </div>

          {/* Preferred Milk */}
          <div className="form-group">
            <label className="form-label">Default Coffee Milk</label>
            <select
              className="form-select"
              value={milk}
              onChange={(e) => setMilk(e.target.value)}
            >
              <option value="Oat Milk (+₹30)">Barista Oat Milk (+₹30)</option>
              <option value="Whole Milk">Whole Dairy Milk</option>
              <option value="Almond Milk (+₹30)">California Almond Milk (+₹30)</option>
              <option value="None (Black)">Black Coffee / Espresso Only</option>
            </select>
          </div>

          {/* Sweetness */}
          <div className="form-group">
            <label className="form-label">Default Sweetness</label>
            <select
              className="form-select"
              value={sweetness}
              onChange={(e) => setSweetness(e.target.value)}
            >
              <option value="Unsweetened (0%)">Unsweetened (0%)</option>
              <option value="Light Sweet (25%)">Light Sweet (25%)</option>
              <option value="50% Sweet (Balanced)">50% Sweet (Balanced)</option>
              <option value="Standard Sweet (100%)">Standard Sweet (100%)</option>
            </select>
          </div>

          {/* Usual budget */}
          <div className="form-group">
            <label className="form-label">Usual Per-Visit Budget (₹ INR)</label>
            <input
              type="number"
              className="form-input"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          {/* Privacy badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.75rem",
              color: "#34D399",
              marginBottom: "20px",
            }}
          >
            <ShieldCheck size={16} />
            <span>Stored with your consent on device. You can erase this anytime.</span>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Check size={16} />
              <span>Save AI Preferences</span>
            </button>

            <button
              type="button"
              onClick={() => {
                clearCustomerMemory();
                setIsPreferenceModalOpen(false);
              }}
              className="btn btn-secondary"
              title="Delete all saved memory"
            >
              <Trash2 size={16} />
              <span>Erase</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
