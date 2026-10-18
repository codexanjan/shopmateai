import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import { sendChatMessage } from "../../services/geminiService";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ShoppingBag,
  CalendarCheck,
  RotateCcw,
  Volume2,
  VolumeX,
  Globe,
  Languages,
} from "lucide-react";

export default function ChatWidget() {
  const {
    cafeInfo,
    menuItems,
    customerMemory,
    addToCart,
    setIsReservationModalOpen,
    soundEnabled,
    toggleSound,
    showToast,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("auto"); // auto, kn, hi, ta, te, es, fr, de, en
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! Namaskara! नमस्ते! I'm **ShopMate AI**, your multilingual concierge at ${cafeInfo.name} ☕✨\n\nI understand and answer in **ALL languages** — English, Kannada (ಕನ್ನಡ), Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Spanish (Español), French (Français), and more!\n\nHow may I brew your day today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const languageTabs = [
    { id: "auto", label: "🌐 Auto-Detect" },
    { id: "en", label: "English" },
    { id: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { id: "hi", label: "हिंदी (Hindi)" },
    { id: "ta", label: "தமிழ் (Tamil)" },
    { id: "te", label: "తెలుగు (Telugu)" },
    { id: "es", label: "Español" },
    { id: "fr", label: "Français" },
  ];

  // Dynamic chips based on chosen language
  const quickChips = [
    { label: "ಕನ್ನಡ: Ondu filter coffee kodi", text: "Ondu filter coffee kodi" },
    { label: "हिंदी: Do masala chai chahiye", text: "Do masala chai chahiye" },
    { label: "தமிழ்: Oru filter coffee kudunga", text: "Oru filter coffee kudunga" },
    { label: "తెలుగు: Oka croissant ivvandi", text: "Oka croissant ivvandi" },
    { label: "Español: Un café por favor", text: "Hola, un café por favor" },
    { label: "Français: Quel est le menu?", text: "Bonjour, quel est le menu aujourd'hui?" },
    { label: "💰 Combo under ₹150 for 2", text: "Suggest a delicious combo under 150 rupees" },
    { label: "🍫 Test Sold-Out Brownie Recovery", text: "Can I get the Dark Chocolate Sea Salt Brownie?" },
    { label: "📶 Guest Wi-Fi password", text: "What is your guest Wi-Fi password and hours?" },
    { label: "🧠 Recall my saved preferences", text: "What are my saved AI preferences?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await sendChatMessage({
        userMessage: textToSend,
        chatHistory: messages,
        apiKey: cafeInfo.geminiApiKey,
        cafeInfo,
        menuItems,
        customerMemory,
      });

      const botMsg = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Execute AI action if extracted
      if (response.action) {
        if (response.action.type === "ADD_TO_CART") {
          const { item, qty } = response.action.payload;
          addToCart(item, qty);
          showToast("AI Concierge Updated Cart", `${qty}x ${item.name}`, "success");
        } else if (response.action.type === "OPEN_RESERVATION_MODAL") {
          setIsReservationModalOpen(true);
        }
      }
    } catch (err) {
      console.error("Chatbot processing error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "bot",
          text: "I'm having a brief connection pause with the roastery. Feel free to browse our menu or ask again! ☕",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: `Fresh cup of coffee poured! How can I assist you at ${cafeInfo.name} in any language today? ☕`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="animate-pulse-glow"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 950,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)",
            border: "2px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "var(--shadow-amber-strong), 0 8px 24px rgba(0,0,0,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0F0D0B",
            transition: "transform 0.2s ease",
          }}
          title="Open Multilingual AI Assistant"
        >
          <Bot size={30} strokeWidth={2.4} />
          {/* Notification ping badge */}
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#10B981",
              border: "2px solid #0F0D0B",
            }}
          />
        </button>
      )}

      {/* Expanded Chat Modal */}
      {isOpen && (
        <div
          className="glass-panel animate-scale-up"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 950,
            width: "calc(100% - 48px)",
            maxWidth: "460px",
            height: "620px",
            maxHeight: "88vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg), var(--shadow-amber)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            background: "rgba(18, 15, 12, 0.98)",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "rgba(24, 20, 16, 0.98)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-amber), var(--accent-caramel))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0F0D0B",
                  boxShadow: "var(--shadow-amber)",
                }}
              >
                <Bot size={22} />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontWeight: 800, fontSize: "0.98rem" }}>ShopMate AI</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "2px 7px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(245, 158, 11, 0.15)",
                      color: "var(--accent-amber)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      fontWeight: 700,
                    }}
                  >
                    All Languages 🌐
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                  24/7 Multilingual Concierge
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={handleClear}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
                title="Restart Chat"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={toggleSound}
                style={{
                  background: "transparent",
                  border: "none",
                  color: soundEnabled ? "var(--accent-amber)" : "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px",
                }}
                title={soundEnabled ? "Mute audio" : "Enable audio"}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Multilingual Quick Language Selector Ribbon */}
          <div
            style={{
              padding: "6px 12px",
              background: "rgba(14, 12, 10, 0.95)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <Languages size={13} color="#F59E0B" style={{ flexShrink: 0, marginRight: "2px" }} />
            {languageTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedLanguage(tab.id)}
                style={{
                  background: selectedLanguage === tab.id ? "rgba(245, 158, 11, 0.2)" : "transparent",
                  border: `1px solid ${selectedLanguage === tab.id ? "var(--accent-amber)" : "rgba(255,255,255,0.08)"}`,
                  color: selectedLanguage === tab.id ? "var(--accent-amber-light)" : "var(--text-muted)",
                  borderRadius: "var(--radius-full)",
                  padding: "2px 8px",
                  fontSize: "0.68rem",
                  fontWeight: selectedLanguage === tab.id ? 700 : 500,
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "var(--transition-fast)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: "10px 14px",
                      borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: isUser
                        ? "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)"
                        : "var(--bg-surface)",
                      color: isUser ? "#0F0D0B" : "var(--text-primary)",
                      fontWeight: isUser ? 600 : 400,
                      border: isUser ? "none" : "1px solid var(--border-subtle)",
                      fontSize: "0.88rem",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "3px", padding: "0 4px" }}>
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "var(--bg-surface)", borderRadius: "16px", width: "fit-content" }}>
                <Bot size={14} color="#F59E0B" />
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Brewing multilingual answer...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips in Multiple Languages */}
          <div
            style={{
              padding: "8px 14px",
              background: "rgba(15, 13, 11, 0.98)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.text)}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 10px",
                  fontSize: "0.72rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-amber)";
                  e.currentTarget.style.color = "var(--accent-amber-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: "12px 14px",
              background: "rgba(20, 16, 13, 0.98)",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              className="form-input"
              style={{
                borderRadius: "var(--radius-full)",
                fontSize: "0.88rem",
                padding: "9px 14px",
              }}
              placeholder="Ask in ANY language (Kannada, Hindi, English, Spanish...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="btn btn-primary"
              style={{
                width: "40px",
                height: "40px",
                padding: 0,
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
