import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import { REVHACK_PITCH_STAGES } from "../../data/mockData";
import {
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Bot,
  Languages,
  DollarSign,
  TrendingUp,
  Clock,
  Coffee,
  CheckCircle2,
} from "lucide-react";

export default function JudgePitchSimulator({ setCurrentView }) {
  const {
    isJudgeSimulationOpen,
    setIsJudgeSimulationOpen,
    addToCart,
    menuItems,
    orders,
    updateOrderStatus,
    setIsCartOpen,
  } = useStore();

  const { switchRole } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isJudgeSimulationOpen) return null;

  const stage = REVHACK_PITCH_STAGES[currentStep];

  const handleNext = () => {
    if (currentStep < REVHACK_PITCH_STAGES.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExecuteDemoAction = () => {
    if (stage.step === 1) {
      setCurrentView("landing");
      setIsJudgeSimulationOpen(false);
    } else if (stage.step === 2) {
      // Kannada ordering demo: add Chikmagalur filter coffee
      const item = menuItems.find((i) => i.id === "item-13") || menuItems[0];
      addToCart(item, 1, { notes: "Ondu filter coffee (Kannada order confirmed)" });
      setCurrentView("menu");
      setIsJudgeSimulationOpen(false);
    } else if (stage.step === 3) {
      // Budget meal planner: add combo under ₹150
      const coffee = menuItems.find((i) => i.id === "item-13");
      const chai = menuItems.find((i) => i.id === "item-15");
      if (coffee) addToCart(coffee, 1);
      if (chai) addToCart(chai, 1);
      setIsCartOpen(true);
      setIsJudgeSimulationOpen(false);
    } else if (stage.step === 4) {
      // Smart order recovery
      setCurrentView("menu");
      setIsJudgeSimulationOpen(false);
    } else if (stage.step === 5) {
      // Open kitchen kanban
      switchRole("admin");
      setCurrentView("admin");
      setIsJudgeSimulationOpen(false);
    } else if (stage.step === 6) {
      // View ROI pricing
      setCurrentView("landing");
      setIsJudgeSimulationOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsJudgeSimulationOpen(false)}>
      <div
        className="modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "640px",
          padding: "30px",
          background: "linear-gradient(180deg, rgba(28, 23, 18, 0.98) 0%, rgba(15, 13, 11, 0.98) 100%)",
          border: "2px solid rgba(245, 158, 11, 0.5)",
          boxShadow: "0 0 40px rgba(245, 158, 11, 0.35)",
        }}
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
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="badge badge-amber" style={{ fontSize: "0.72rem" }}>
                  REVHACK | 5-Minute Pitch Mode
                </span>
                <span style={{ fontSize: "0.75rem", color: "#34D399", fontWeight: 700 }}>
                  Time: {stage.time}
                </span>
              </div>
              <h3 style={{ fontSize: "1.25rem", margin: 0, marginTop: "2px" }}>
                Interactive Pitch Simulator
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsJudgeSimulationOpen(false)}
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

        {/* Step Indicator Bar */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
          {REVHACK_PITCH_STAGES.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(idx)}
              style={{
                flex: 1,
                height: "6px",
                borderRadius: "var(--radius-full)",
                background:
                  idx === currentStep
                    ? "var(--accent-amber)"
                    : idx < currentStep
                    ? "#10B981"
                    : "rgba(255, 255, 255, 0.12)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={s.title}
            />
          ))}
        </div>

        {/* Stage Content Card */}
        <div
          className="glass-card"
          style={{
            padding: "24px",
            borderRadius: "var(--radius-xl)",
            background: "rgba(24, 20, 16, 0.9)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--accent-amber)" }}>
              {stage.title}
            </span>
          </div>

          <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
            {stage.subtitle}
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            {stage.description}
          </p>

          {/* Demonstration Action CTA */}
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Click to launch this demo step live:
            </div>
            <button
              onClick={handleExecuteDemoAction}
              className="btn btn-primary btn-sm"
              style={{ fontSize: "0.82rem" }}
            >
              <span>{stage.actionLabel}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Navigation & Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === REVHACK_PITCH_STAGES.length - 1}
              className="btn btn-secondary btn-sm"
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Step <strong>{currentStep + 1}</strong> of {REVHACK_PITCH_STAGES.length}
          </div>
        </div>
      </div>
    </div>
  );
}
