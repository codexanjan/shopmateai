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
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Languages,
  DollarSign,
  Radio,
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
  const [selectedLanguage, setSelectedLanguage] = useState("auto");
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: `Hello! Namaskara! नमस्ते! I'm **ShopMate AI**, your voice & multilingual concierge at ${cafeInfo.name} ☕✨\n\nI speak and understand **ALL languages** — English, Kannada (ಕನ್ನಡ), Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Spanish, and more!\n\nI can also explain our **₹499/mo flat SaaS revenue model**, suggest food under a budget, or customize your brew. Tap 🔊 to listen to my voice!`,
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

  const quickChips = [
    { label: "💰 How does your ₹499/mo revenue model work?", text: "How does your ₹499/mo revenue model work and how much does a café save vs Swiggy/Zomato?" },
    { label: "ಕನ್ನಡ: Ondu filter coffee kodi", text: "Ondu filter coffee kodi" },
    { label: "हिंदी: Do masala chai chahiye", text: "Do masala chai chahiye" },
    { label: "🍫 Order Brownie (Test Sold Out Recovery)", text: "Can I get the Dark Chocolate Sea Salt Brownie?" },
    { label: "💰 Combo under ₹150 for 2", text: "Suggest a delicious combo under 150 rupees" },
    { label: "தமிழ்: Oru filter coffee kudunga", text: "Oru filter coffee kudunga" },
    { label: "తెలుగు: Oka croissant ivvandi", text: "Oka croissant ivvandi" },
    { label: "Español: Un café por favor", text: "Hola, un café por favor" },
    { label: "📶 Guest Wi-Fi & Hours", text: "What is your guest Wi-Fi password and hours?" },
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

  // Clean Markdown & Emojis for Natural Web Speech
  const cleanForSpeech = (raw) => {
    return raw
      .replace(/\[ACTION:[^\]]+\]/gi, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/[*_#`~]/g, "")
      .replace(/•/g, "")
      .replace(/₹(\d+)/g, "$1 rupees")
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
      .trim();
  };

  // Text-To-Speech (Bot Voice)
  const speakText = (textToSpeak, msgId = null) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    if (speakingMessageId === msgId && isSpeaking) {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      return;
    }

    const clean = cleanForSpeech(textToSpeak);
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Language Voice Matching
    if (/[\u0C80-\u0CFF]/.test(clean)) {
      utterance.lang = "kn-IN";
    } else if (/[\u0900-\u097F]/.test(clean)) {
      utterance.lang = "hi-IN";
    } else if (/[\u0B80-\u0BFF]/.test(clean)) {
      utterance.lang = "ta-IN";
    } else if (/[\u0C00-\u0C7F]/.test(clean)) {
      utterance.lang = "te-IN";
    } else if (selectedLanguage === "es" || /hola|café|gracias/i.test(clean)) {
      utterance.lang = "es-ES";
    } else if (selectedLanguage === "fr" || /bonjour|merci|croissant/i.test(clean)) {
      utterance.lang = "fr-FR";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingMessageId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    }
  };

  // Voice Input (Speech-To-Text / Microphone)
  const toggleVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("Voice Input", "Speech recognition is not supported in this browser.", "info");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        selectedLanguage === "hi"
          ? "hi-IN"
          : selectedLanguage === "kn"
          ? "kn-IN"
          : selectedLanguage === "es"
          ? "es-ES"
          : "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      showToast("Listening...", "Speak your order or question now", "info");

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setInput(spokenText);
        setIsListening(false);
        handleSend(spokenText);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

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

      const botMsgId = "bot-" + Date.now();
      const botMsg = {
        id: botMsgId,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // If auto-speak is enabled, speak aloud
      if (autoSpeak) {
        speakText(response.text, botMsgId);
      }

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
          text: "I had a momentary pause in connection. Please ask again or browse our menu! ☕",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    stopSpeaking();
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: `Fresh cup of coffee poured! How can I assist you at ${cafeInfo.name} today? Ask in any language or ask how our ₹499/mo revenue model works! ☕`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button (Fully visible, never cut off) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="animate-pulse-glow"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 950,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "var(--shadow-amber-strong), 0 8px 24px rgba(0,0,0,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0F0D0B",
            transition: "transform 0.2s ease",
          }}
          title="Open Voice & Multilingual AI Concierge"
        >
          <Bot size={28} strokeWidth={2.4} />
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

      {/* Expanded Voice Chat Modal */}
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
            border: "1px solid rgba(245, 158, 11, 0.4)",
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
                  <span style={{ fontWeight: 800, fontSize: "0.98rem" }}>ShopMate Voice AI</span>
                  {isSpeaking && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        fontSize: "0.65rem",
                        padding: "1px 6px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(245, 158, 11, 0.2)",
                        color: "var(--accent-amber-light)",
                        fontWeight: 700,
                      }}
                    >
                      <Radio size={10} className="animate-spin" /> Speaking...
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#34D399", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                  Speaks & Understands All Languages
                </div>
              </div>
            </div>

            {/* Header Controls: Auto-voice toggle, Restart, Close */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={() => {
                  if (autoSpeak) stopSpeaking();
                  setAutoSpeak(!autoSpeak);
                }}
                style={{
                  background: autoSpeak ? "rgba(245, 158, 11, 0.2)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${autoSpeak ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                  color: autoSpeak ? "var(--accent-amber-light)" : "var(--text-muted)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 8px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                title={autoSpeak ? "Voice Speech Enabled" : "Voice Speech Muted"}
              >
                {autoSpeak ? <Volume2 size={14} color="#F59E0B" /> : <VolumeX size={14} />}
                <span>Voice</span>
              </button>

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
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
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
              gap: "14px",
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isThisSpeaking = speakingMessageId === msg.id && isSpeaking;

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
                      padding: "12px 14px",
                      borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: isUser
                        ? "linear-gradient(135deg, var(--accent-amber) 0%, var(--accent-caramel) 100%)"
                        : "var(--bg-surface)",
                      color: isUser ? "#0F0D0B" : "var(--text-primary)",
                      fontWeight: isUser ? 600 : 400,
                      border: isUser
                        ? "none"
                        : isThisSpeaking
                        ? "1px solid var(--accent-amber)"
                        : "1px solid var(--border-subtle)",
                      fontSize: "0.88rem",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      boxShadow: isThisSpeaking ? "0 0 12px rgba(245, 158, 11, 0.3)" : "none",
                    }}
                  >
                    {msg.text}

                    {/* Bot Voice Speaker Button inside message */}
                    {!isUser && (
                      <div
                        style={{
                          marginTop: "8px",
                          paddingTop: "6px",
                          borderTop: "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => speakText(msg.text, msg.id)}
                          style={{
                            background: isThisSpeaking ? "rgba(245, 158, 11, 0.25)" : "rgba(255,255,255,0.06)",
                            border: `1px solid ${isThisSpeaking ? "var(--accent-amber)" : "var(--border-subtle)"}`,
                            color: isThisSpeaking ? "var(--accent-amber-light)" : "var(--text-secondary)",
                            borderRadius: "var(--radius-full)",
                            padding: "3px 8px",
                            fontSize: "0.72rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontWeight: 600,
                          }}
                        >
                          <Volume2 size={13} color={isThisSpeaking ? "#F59E0B" : "currentColor"} />
                          <span>{isThisSpeaking ? "Stop Voice" : "Listen in Voice"}</span>
                        </button>
                        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{msg.timestamp}</span>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "3px", padding: "0 4px" }}>
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", background: "var(--bg-surface)", borderRadius: "16px", width: "fit-content" }}>
                <Bot size={14} color="#F59E0B" />
                <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Brewing answer & voice synthesis...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips in Multiple Languages & Revenue Model */}
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

          {/* Input Box with Microphone & Send */}
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
            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: isListening ? "rgba(239, 68, 68, 0.25)" : "var(--bg-surface)",
                border: `1px solid ${isListening ? "#EF4444" : "var(--border-subtle)"}`,
                color: isListening ? "#EF4444" : "var(--accent-amber)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              title={isListening ? "Listening... (Click to stop)" : "Speak by voice"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              type="text"
              className="form-input"
              style={{
                borderRadius: "var(--radius-full)",
                fontSize: "0.88rem",
                padding: "9px 14px",
              }}
              placeholder={isListening ? "Listening to your voice..." : "Type or speak your order in ANY language..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="btn btn-primary"
              style={{
                width: "38px",
                height: "38px",
                padding: 0,
                borderRadius: "50%",
                flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
