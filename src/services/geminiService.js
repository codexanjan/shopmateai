// Google Gemini API Integration & Heuristic AI Engine for ShopMate AI
// Enhanced with the 7 Unique Features & Full REVHACK Pitch Knowledge

import { KANNADA_LANGUAGE_MAP } from "../data/mockData";

export const buildSystemPrompt = (cafeInfo, menuItems, customerMemory) => {
  const menuList = menuItems
    .map(
      (item) =>
        `- ${item.name} [ID: ${item.id}] (Category: ${item.category}, Price: ₹${item.price}, Dietary: ${item.dietaryTags.join(", ")}, Available: ${item.isAvailable ? "In Stock" : "SOLD OUT"}): ${item.description}`
    )
    .join("\n");

  const memoryContext = customerMemory
    ? `\nCustomer Saved Preferences (Feature #7):
- Dietary: ${customerMemory.dietaryPreference || "None"}
- Preferred Milk: ${customerMemory.preferredMilk || "Oat Milk"}
- Usual Budget: ₹${customerMemory.usualBudget || 250}
(Use these to personalize recommendations when relevant!).`
    : "";

  return `You are ShopMate AI, the warm, hospitable, and intelligent AI concierge for "${cafeInfo.name}".
You were built for the REVHACK 5-Minute Pitch as a Local Commerce AI Assistant (₹499/month per café).

Café Ground Truth:
- Name: ${cafeInfo.name}
- Address: ${cafeInfo.address}
- Hours: ${cafeInfo.hours}
- Wi-Fi: "${cafeInfo.wifiSsid}" (Password: "${cafeInfo.wifiPass}")
- Pet Policy: 100% Pet-friendly outdoor patio
- Pricing & Revenue Model: ₹499/month flat SaaS fee for café owners after a 14-day free trial.
- Discounts: "FIRSTSIP" (15% off), "CAFE50" (₹50 off over ₹300).
- UPI ID: ${cafeInfo.upiId}

Current Live Menu Catalog (SOURCE OF TRUTH - NEVER HALLUCINATE PRICES):
${menuList}
${memoryContext}

7 KEY FEATURES TO UPHOLD:
1. Smart Order Recovery: If an item is SOLD OUT (e.g. Dark Chocolate Brownie), explain it is sold out and recommend in-stock alternatives (e.g. French Butter Croissant or Almond Tart).
2. Local-Language Ordering (Kannada + English): Understand phrases like "Ondu filter coffee kodi", "Eradu masala chai beku", "Oota enide?". Confirm with both Kannada and English.
3. Smart Budget Meal Planner: When user asks "What can I order under ₹150?" or "Suggest combo for ₹150", calculate exact valid items from the menu (e.g. Classic Filter Coffee ₹80 + Cardamom Chai ₹70 = ₹150).
4. Realistic Pickup-Time Estimator: Estimates dynamic ETA based on preparation times.
5. Trustworthy AI: Ground every price and item in the live menu database. If an item is not sold (e.g. sushi, pizza), admit it clearly and suggest the closest café item.
6. REVHACK Pitch Knowledge: Be prepared to answer any judge questions regarding REVHACK, our 5-minute pitch, business model, and tech stack.

Action Commands:
When adding items to cart:
[ACTION:ADD_TO_CART:{"name":"Exact Item Name","qty":1}]
When booking table:
[ACTION:BOOK_TABLE:{"guests":2,"time":"07:30 PM","date":"today"}]`;
};

// Local Smart Heuristic Engine (100% Offline & Fallback Resilient)
export const generateHeuristicResponse = (userMessage, cafeInfo, menuItems, customerMemory) => {
  const text = userMessage.toLowerCase().trim();

  // FEATURE #2: Local-Language Ordering (Kannada + English / Kanglish)
  const isKannada =
    text.includes("kodi") ||
    text.includes("beku") ||
    text.includes("ideya") ||
    text.includes("oota") ||
    text.includes("ondu") ||
    text.includes("eradu") ||
    text.includes("kaapi") ||
    text.includes("kafi") ||
    text.includes("chaha");

  if (isKannada) {
    let matchedItem = null;
    let qty = 1;

    if (text.includes("eradu") || text.includes("2")) qty = 2;
    if (text.includes("mooru") || text.includes("3")) qty = 3;

    if (text.includes("kafi") || text.includes("kaapi") || text.includes("filter coffee")) {
      matchedItem = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    } else if (text.includes("chai") || text.includes("chaha") || text.includes("tea")) {
      matchedItem = menuItems.find((i) => i.id === "item-15") || menuItems[1];
    } else if (text.includes("cold brew") || text.includes("tanna")) {
      matchedItem = menuItems.find((i) => i.id === "item-1") || menuItems[0];
    } else if (text.includes("croissant") || text.includes("pastry")) {
      matchedItem = menuItems.find((i) => i.id === "item-8") || menuItems[2];
    } else if (text.includes("toast") || text.includes("rotti")) {
      matchedItem = menuItems.find((i) => i.id === "item-14") || menuItems[2];
    }

    if (matchedItem) {
      return {
        text: `🙏 **ಖಂಡಿತ (Sure)!**\n\nನಾನು ನಿಮ್ಮ ಕಾರ್ಟ್‌ಗೆ **${qty}x ${matchedItem.name}** (₹${matchedItem.price * qty}) ಸೇರಿಸಿದ್ದೇನೆ!\n\n*(Added ${qty}x ${matchedItem.name} to your cart. Anything else you'd like to enjoy?)* ☕✨`,
        action: {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty },
        },
      };
    } else if (text.includes("oota") || text.includes("enide")) {
      return {
        text: `🍛 **ನಮ್ಮ ಕೆಫೆಯಲ್ಲಿ ಇವು ಲಭ್ಯವಿವೆ (Available Today):**\n\n• **Classic Filter Coffee:** ₹80\n• **Cardamom Masala Chai:** ₹70\n• **Cinnamon Sugar Toast:** ₹95\n• **Flaky French Butter Croissant:** ₹160\n• **Truffle Mushroom Sourdough Melt:** ₹290\n\nನಿಮಗೆ ಯಾವುದು ಬೇಕು? (What would you like to order?) ☕`,
        action: null,
      };
    }
  }

  // FEATURE #1: Smart Order Recovery (Sold Out handling)
  if (text.includes("brownie") || text.includes("dark chocolate")) {
    const brownie = menuItems.find((i) => i.id === "item-10");
    if (brownie && !brownie.isAvailable) {
      return {
        text: `🍫 **Smart Order Recovery Alert:**\n\nOur **Dark Chocolate & Sea Salt Brownie** is freshly sold out for today because our morning batch just finished! 🥺\n\n💡 **Chef's In-Stock Alternatives:**\n• **Flaky French Butter Croissant (₹160)** — Fresh out of the oven!\n• **Almond Frangipane Tart (₹210)** — Double-baked with velvety almond cream.\n\nWould you like me to add a warm **French Croissant (₹160)** to your cart instead? 🥐`,
        action: null,
      };
    }
  }

  // FEATURE #3: Smart Budget Meal Planner (Under ₹150 / Budget query)
  if (
    text.includes("150") ||
    text.includes("budget") ||
    text.includes("cheap") ||
    text.includes("affordable") ||
    text.includes("under 150") ||
    text.includes("less than 150")
  ) {
    const under150Items = menuItems.filter((i) => i.price <= 150 && i.isAvailable);
    const itemList = under150Items.map((i) => `• **${i.name}** — ₹${i.price}`).join("\n");

    return {
      text: `💰 **Smart Budget Meal Planner (Under ₹150):**\n\nHere are our delicious in-stock artisanal items under ₹150:\n\n${itemList}\n\n💡 **Recommended ₹150 Budget Combo for 2:**\n• 1x **Classic Filter Coffee** (₹80) + 1x **Cardamom Masala Chai** (₹70) = **₹150 Exact!**\n\nWould you like me to add this combo to your cart? ☕`,
      action: null,
    };
  }

  // REVHACK Pitch Questions (For Judges)
  if (
    text.includes("revhack") ||
    text.includes("pitch") ||
    text.includes("judges") ||
    text.includes("business model") ||
    text.includes("revenue") ||
    text.includes("499")
  ) {
    return {
      text: `🏆 **REVHACK Project Summary — ShopMate AI:**\n\n• **Core Idea:** An automated 24/7 ordering concierge and kitchen operations assistant for small cafés.\n• **Problem:** Small cafés lose up to 35% of takeaway orders due to unanswered calls and DMs while baristas pull espresso shots.\n• **Business Model:** 14-day free trial, followed by flat **₹499/month SaaS subscription** (saving cafés ₹18,000+ in aggregator commissions).\n• **Tech Stack:** React 19, Modern CSS Design System, Google Gemini Flash API, Firebase Web Client, and Node.js.\n• **Unique Edge:** Grounded verified database prices (never hallucinating), Kannada + English multilingual ordering, and proactive Owner Decision Intelligence! 🚀`,
      action: null,
    };
  }

  // FEATURE #7: Customer Preference Memory Recall
  if (text.includes("preference") || text.includes("remember") || text.includes("my favorite") || text.includes("memory")) {
    const milk = customerMemory?.preferredMilk || "Oat Milk";
    const diet = customerMemory?.dietaryPreference || "Vegetarian";
    const fav = customerMemory?.favoriteItem || "Signature 18-Hour Cold Brew";

    return {
      text: `🧠 **Your Saved AI Preference Memory:**\n\n• **Dietary:** ${diet}\n• **Preferred Milk:** ${milk}\n• **Favorite Brew:** ${fav}\n• **Target Budget:** ₹${customerMemory?.usualBudget || 250}\n\nI always tailor my recommendations to match your taste! You can update or clear your memory anytime in the top preference badge. ✨`,
      action: null,
    };
  }

  // Wi-Fi inquiry
  if (text.includes("wifi") || text.includes("wi-fi") || text.includes("password") || text.includes("internet")) {
    return {
      text: `📶 Here is our complimentary high-speed guest Wi-Fi:\n\n• **Network:** \`${cafeInfo.wifiSsid}\`\n• **Password:** \`${cafeInfo.wifiPass}\`\n\nFeel free to plug in your laptop and work comfortably! ☕`,
      action: null,
    };
  }

  // Hours inquiry
  if (text.includes("hour") || text.includes("open") || text.includes("close") || text.includes("timing") || text.includes("time")) {
    return {
      text: `🕒 We are open every single day from **7:00 AM to 11:00 PM**!\n\nOur kitchen serves hot food until 10:30 PM, and fresh artisanal brews are pulled all day long. ☕✨`,
      action: null,
    };
  }

  // Pet policy inquiry
  if (text.includes("pet") || text.includes("dog") || text.includes("cat") || text.includes("puppy")) {
    return {
      text: `🐾 Yes! We are 100% pet-friendly on our sunlit garden patio! We even provide clean water bowls and complimentary pup treats upon request. Bring your furry best friend along! 🐶✨`,
      action: null,
    };
  }

  // Table reservation
  if (text.includes("book") || text.includes("table") || text.includes("reserve") || text.includes("reservation")) {
    let guests = 2;
    if (text.match(/\b([1-9]|10)\b/)) {
      guests = parseInt(text.match(/\b([1-9]|10)\b/)[0], 10);
    }
    return {
      text: `📅 I would love to reserve a table for you! Opening our instant Table Booking desk now. Just pick your preferred time and seating area! ✨`,
      action: {
        type: "OPEN_RESERVATION_MODAL",
        payload: { guests },
      },
    };
  }

  // Add to cart detection
  if (text.includes("add") || text.includes("order") || text.includes("buy") || text.includes("cart") || text.includes("get me")) {
    const matchedItem = menuItems.find((item) => {
      const itemNameWords = item.name.toLowerCase().split(" ");
      return itemNameWords.some((w) => w.length > 3 && text.includes(w));
    });

    if (matchedItem) {
      if (!matchedItem.isAvailable) {
        return {
          text: `⚠️ **Item Currently Sold Out:**\n\n${matchedItem.name} is temporarily out of stock! Would you like our in-stock **Signature 18-Hour Cold Brew** (₹210) or **Classic Filter Coffee** (₹80) instead?`,
          action: null,
        };
      }

      let qty = 1;
      const numMatch = text.match(/\b([1-9])\b/);
      if (numMatch) qty = parseInt(numMatch[1], 10);

      return {
        text: `🛒 Done! I have added **${qty}x ${matchedItem.name}** (₹${matchedItem.price * qty}) directly to your cart! You can view it in the slide-out cart drawer. Anything else to accompany this? 🥐☕`,
        action: {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty },
        },
      };
    }
  }

  // Trustworthy Out-of-Scope Queries (Feature #6)
  if (text.includes("pizza") || text.includes("burger") || text.includes("sushi") || text.includes("biryani")) {
    return {
      text: `🛡️ **Verified Café Menu Notice:**\n\nAt Brew & Bliss, we focus exclusively on handcrafted specialty coffees, teas, and artisanal baked goods. We do not serve pizzas or sushi. May we suggest our delicious **Truffle Wild Mushroom Sourdough Melt (₹290)** instead? 🥪✨`,
      action: null,
    };
  }

  // Default hospitality
  return {
    text: `Hello! I'm **ShopMate AI**, your concierge at ${cafeInfo.name} ☕\n\nI can assist in **English or Kannada**, help you order items under a budget, customize milk/sweetness, or share Wi-Fi credentials. How can I help you today?`,
    action: null,
  };
};

// Main Chat Query Function
export async function sendChatMessage({
  userMessage,
  chatHistory = [],
  apiKey,
  cafeInfo,
  menuItems,
  customerMemory,
}) {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  // Use heuristic response engine if no custom key provided or offline
  if (!effectiveKey || effectiveKey.trim() === "" || effectiveKey.includes("DEMO")) {
    await new Promise((r) => setTimeout(r, 450));
    return generateHeuristicResponse(userMessage, cafeInfo, menuItems, customerMemory);
  }

  try {
    const systemPrompt = buildSystemPrompt(cafeInfo, menuItems, customerMemory);

    const contents = [
      {
        role: "user",
        parts: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nAcknowledge as ShopMate AI.` }],
      },
      {
        role: "model",
        parts: [{ text: `Hello! I'm ShopMate AI, ready to assist with orders in English and Kannada, budget planning, and table reservations! ☕✨` }],
      },
    ];

    chatHistory.slice(-6).forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });

    contents.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${effectiveKey.trim()}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      return generateHeuristicResponse(userMessage, cafeInfo, menuItems, customerMemory);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      return generateHeuristicResponse(userMessage, cafeInfo, menuItems, customerMemory);
    }

    // Parse actions
    let cleanText = candidate;
    let action = null;

    const addCartRegex = /\[ACTION:ADD_TO_CART:(\{.*?\})\]/i;
    const matchCart = candidate.match(addCartRegex);
    if (matchCart) {
      try {
        const itemData = JSON.parse(matchCart[1]);
        const matched = menuItems.find(
          (i) => i.name.toLowerCase().includes(itemData.name.toLowerCase()) || itemData.name.toLowerCase().includes(i.name.toLowerCase())
        );
        if (matched) {
          action = {
            type: "ADD_TO_CART",
            payload: { item: matched, qty: itemData.qty || 1 },
          };
        }
      } catch (e) {
        console.warn("Parse error", e);
      }
      cleanText = cleanText.replace(addCartRegex, "").trim();
    }

    return { text: cleanText, action };
  } catch (err) {
    console.warn("Gemini fetch exception", err);
    return generateHeuristicResponse(userMessage, cafeInfo, menuItems, customerMemory);
  }
}
