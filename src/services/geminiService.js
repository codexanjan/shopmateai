// Google Gemini API Integration & Multilingual Heuristic AI Engine for ShopMate AI
// Supports ALL languages: English, Kannada, Hindi, Tamil, Telugu, Spanish, French, German, and more.

export const buildSystemPrompt = (cafeInfo, menuItems, customerMemory) => {
  const menuList = menuItems
    .map(
      (item) =>
        `- ${item.name} [ID: ${item.id}] (Category: ${item.category}, Price: ₹${item.price}, Dietary: ${item.dietaryTags.join(", ")}, Available: ${item.isAvailable ? "In Stock" : "SOLD OUT"}): ${item.description}`
    )
    .join("\n");

  const memoryContext = customerMemory
    ? `\nCustomer Saved Preferences:
- Dietary: ${customerMemory.dietaryPreference || "None"}
- Preferred Milk: ${customerMemory.preferredMilk || "Oat Milk"}
- Usual Budget: ₹${customerMemory.usualBudget || 250}
(Use these to personalize recommendations when relevant!).`
    : "";

  return `You are ShopMate AI, the warm, hospitable, and extraordinarily capable multilingual AI concierge for "${cafeInfo.name}".

CRITICAL MULTILINGUAL INSTRUCTIONS:
- You must understand and answer in ALL LANGUAGES worldwide: English, Kannada (ಕನ್ನಡ), Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Malayalam (മലയാളം), Marathi (मराठी), Bengali (বাংলা), Gujarati (ગુજરાતી), Spanish (Español), French (Français), German (Deutsch), Arabic (العربية), Japanese (日本語), and any other tongue spoken by the customer.
- ALWAYS automatically detect the language or dialect used by the customer (including transliterated Hinglish, Kanglish, Tanglish) and respond in the EXACT SAME LANGUAGE with natural, polite hospitality.
- Ground all prices in Indian Rupees (₹) and use ONLY items from the live menu database below.

Café Ground Truth:
- Name: ${cafeInfo.name}
- Address: ${cafeInfo.address}
- Hours: ${cafeInfo.hours}
- Wi-Fi: "${cafeInfo.wifiSsid}" (Password: "${cafeInfo.wifiPass}")
- Pet Policy: 100% Pet-friendly outdoor patio
- Pricing & Revenue Model:
  * Flat ₹499/month SaaS subscription per location after a 14-day free trial.
  * 0% commission on orders (100% of order value goes directly to café via UPI/cards).
  * Saves cafés ₹24,501/month (₹2.94 Lakhs/yr) compared to 25% aggregator cuts (Swiggy/Zomato) on ₹1 Lakh orders.
  * Optional add-ons: Multi-location sync (₹999/mo), WhatsApp Cloud API ordering bot (₹1,499/mo).
  * 100% free for customers with zero service fees.
- Active Promo Codes: "FIRSTSIP" (15% off), "CAFE50" (₹50 off orders over ₹300).
- UPI ID: ${cafeInfo.upiId}

Current Live Menu Catalog (SOURCE OF TRUTH - NEVER HALLUCINATE):
${menuList}
${memoryContext}

7 KEY FEATURES TO UPHOLD:
1. Smart Order Recovery: If an item is SOLD OUT (e.g. Dark Chocolate Brownie), explain it is sold out in the user's language and recommend in-stock alternatives (e.g. French Butter Croissant or Almond Tart).
2. Universal Multilingual Ordering: Seamlessly handle food orders in English, Kannada, Hindi, Tamil, Telugu, Spanish, French, etc.
3. Smart Budget Meal Planner: When user asks "What can I order under ₹150?" or similar in any language, calculate exact valid items from the menu.
4. Realistic Pickup-Time Estimator: Estimates dynamic ETA based on preparation times.
5. Trustworthy AI: Ground every price and item in the live menu database. If an item is not sold (e.g. sushi, pizza), admit it clearly and suggest the closest café item.
6. Proactive Recommendations: Match with saved preferences (e.g. Oat Milk, Gluten-Free).
7. Action Commands:
When adding items to cart:
[ACTION:ADD_TO_CART:{"name":"Exact Item Name","qty":1}]
When booking table:
[ACTION:BOOK_TABLE:{"guests":2,"time":"07:30 PM","date":"today"}]`;
};

// Multilingual Smart Heuristic Engine (Offline Resilient for All Languages)
export const generateHeuristicResponse = (userMessage, cafeInfo, menuItems, customerMemory) => {
  const text = userMessage.toLowerCase().trim();

  // 1. KANNADA (ಕನ್ನಡ / Kanglish)
  const isKannada =
    text.includes("kodi") ||
    text.includes("beku") ||
    text.includes("ideya") ||
    text.includes("oota") ||
    text.includes("ondu") ||
    text.includes("eradu") ||
    text.includes("kaapi") ||
    text.includes("kafi") ||
    text.includes("namaskara") ||
    /[\u0C80-\u0CFF]/.test(userMessage);

  if (isKannada) {
    let matchedItem = null;
    let qty = 1;
    if (text.includes("eradu") || text.includes("2") || text.includes("ಎರಡು")) qty = 2;
    if (text.includes("mooru") || text.includes("3") || text.includes("ಮೂರು")) qty = 3;

    if (text.includes("kafi") || text.includes("kaapi") || text.includes("coffee") || text.includes("ಕಾಫಿ")) {
      matchedItem = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    } else if (text.includes("chai") || text.includes("chaha") || text.includes("tea") || text.includes("ಚಹಾ")) {
      matchedItem = menuItems.find((i) => i.id === "item-15") || menuItems[1];
    } else if (text.includes("cold brew") || text.includes("ತಣ್ಣ")) {
      matchedItem = menuItems.find((i) => i.id === "item-1") || menuItems[0];
    } else if (text.includes("croissant")) {
      matchedItem = menuItems.find((i) => i.id === "item-8") || menuItems[2];
    } else if (text.includes("toast") || text.includes("ಟೋಸ್ಟ್")) {
      matchedItem = menuItems.find((i) => i.id === "item-14") || menuItems[2];
    }

    if (matchedItem) {
      return {
        text: `🙏 **ನಮಸ್ಕಾರ! ಖಂಡಿತ (Certainly)!**\n\nನಾನು ನಿಮ್ಮ ಕಾರ್ಟ್‌ಗೆ **${qty}x ${matchedItem.name}** (₹${matchedItem.price * qty}) ಸೇರಿಸಿದ್ದೇನೆ!\n\n*(Added ${qty}x ${matchedItem.name} to your cart. Anything else you'd like?)* ☕✨`,
        action: {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty },
        },
      };
    } else if (text.includes("oota") || text.includes("enide") || text.includes("menu") || text.includes("ಮೆನು")) {
      return {
        text: `🍛 **ನಮ್ಮ ಕೆಫೆಯಲ್ಲಿ ಇವು ಲಭ್ಯವಿವೆ (Available Today at ${cafeInfo.name}):**\n\n• **Classic Filter Coffee:** ₹80\n• **Cardamom Masala Chai:** ₹70\n• **Flaky French Butter Croissant:** ₹160\n• **Truffle Sourdough Melt:** ₹290\n\nನಿಮಗೆ ಯಾವುದು ಬೇಕು? (What would you like to order?) ☕`,
        action: null,
      };
    } else {
      return {
        text: `🙏 **ನಮಸ್ಕಾರ!** ನಾನು ShopMate AI, ನಿಮ್ಮ ಕೆಫೆ ಸಹಾಯಕ. ನಾನು ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ತೆಗೆದುಕೊಳ್ಳಬಲ್ಲೆ. ನೀವು ಏನು ಸವಿಯಲು ಬಯಸುತ್ತೀರಿ? ☕`,
        action: null,
      };
    }
  }

  // 2. HINDI (हिंदी / Hinglish)
  const isHindi =
    text.includes("chahiye") ||
    text.includes("karo") ||
    text.includes("karna") ||
    text.includes("do") ||
    text.includes("de do") ||
    text.includes("namaste") ||
    text.includes("namaskar") ||
    text.includes("kya hai") ||
    text.includes("kitna") ||
    text.includes("khana") ||
    /[\u0900-\u097F]/.test(userMessage);

  if (isHindi) {
    let matchedItem = null;
    let qty = 1;
    if (text.includes("do ") || text.includes("2") || text.includes("दो")) qty = 2;
    if (text.includes("teen") || text.includes("3") || text.includes("तीन")) qty = 3;

    if (text.includes("coffee") || text.includes("कॉफ़ी") || text.includes("filter")) {
      matchedItem = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    } else if (text.includes("chai") || text.includes("चाय") || text.includes("tea")) {
      matchedItem = menuItems.find((i) => i.id === "item-15") || menuItems[1];
    } else if (text.includes("cold brew") || text.includes("कोल्ड ब्रू")) {
      matchedItem = menuItems.find((i) => i.id === "item-1") || menuItems[0];
    } else if (text.includes("croissant") || text.includes("पेस्ट्री")) {
      matchedItem = menuItems.find((i) => i.id === "item-8") || menuItems[2];
    }

    if (matchedItem) {
      return {
        text: `🙏 **नमस्ते! ज़रूर!**\n\nमैंने आपके कार्ट में **${qty}x ${matchedItem.name}** (₹${matchedItem.price * qty}) जोड़ दिया है!\n\n*(Added ${qty}x ${matchedItem.name} to your cart. क्या आप इसके साथ कुछ और लेना चाहेंगे?)* ☕✨`,
        action: {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty },
        },
      };
    } else if (text.includes("menu") || text.includes("kya hai") || text.includes("kya milta")) {
      return {
        text: `☕ **नमस्ते! हमारे मेनू में आज की लोकप्रिय चीज़ें:**\n\n• **क्लासिक फ़िल्टर कॉफ़ी (Filter Coffee):** ₹80\n• **इलायची मसाला चाय (Masala Chai):** ₹70\n• **फ्रेंच बटर क्रोइसैन (French Croissant):** ₹160\n• **ट्रफल मशरूम मेल्ट सैंडविच:** ₹290\n\nआप क्या ऑर्डर करना पसंद करेंगे? 🥐`,
        action: null,
      };
    } else if (text.includes("wifi") || text.includes("पासवर्ड")) {
      return {
        text: `📶 **वाई-फ़ाई की जानकारी:**\n• नेटवर्क: \`${cafeInfo.wifiSsid}\`\n• पासवर्ड: \`${cafeInfo.wifiPass}\`\n\nआराम से बैठकर काम कीजिए! 💻☕`,
        action: null,
      };
    } else {
      return {
        text: `🙏 **नमस्ते!** मैं ShopMate AI हूँ, ${cafeInfo.name} का आपका डिजिटल सहायक। मैं हिंदी, कन्नड़ और अंग्रेज़ी सहित सभी भाषाओं में आपकी मदद कर सकता हूँ। आप क्या ऑर्डर करना चाहेंगे? ☕`,
        action: null,
      };
    }
  }

  // 3. TAMIL (தமிழ் / Tanglish)
  const isTamil =
    text.includes("kudunga") ||
    text.includes("venum") ||
    text.includes("irukku") ||
    text.includes("vanakkam") ||
    text.includes("oru ") ||
    text.includes("rendu ") ||
    /[\u0B80-\u0BFF]/.test(userMessage);

  if (isTamil) {
    const item = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    return {
      text: `🙏 **வணக்கம் (Vanakkam)!**\n\nகண்டிப்பாக! உங்கள் கார்ட்டில் **${item.name}** (₹${item.price}) சேர்த்துள்ளேன்!\n\n*(Added ${item.name} to your cart. வேறு ஏதேனும் தேவையா?)* ☕✨`,
      action: {
        type: "ADD_TO_CART",
        payload: { item, qty: 1 },
      },
    };
  }

  // 4. TELUGU (తెలుగు / Telugish)
  const isTelugu =
    text.includes("ivvandi") ||
    text.includes("kaavaali") ||
    text.includes("emundi") ||
    text.includes("namaskaram") ||
    text.includes("oka ") ||
    /[\u0C00-\u0C7F]/.test(userMessage);

  if (isTelugu) {
    const item = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    return {
      text: `🙏 **నమస్కారం (Namaskaram)!**\n\nతప్పకుండా! మీ కార్ట్‌కి **${item.name}** (₹${item.price}) జోడించాను!\n\n*(Added ${item.name} to your cart. ఇంకేమైనా కావాలా?)* ☕✨`,
      action: {
        type: "ADD_TO_CART",
        payload: { item, qty: 1 },
      },
    };
  }

  // 5. SPANISH (Español)
  const isSpanish =
    text.includes("hola") ||
    text.includes("por favor") ||
    text.includes("café") ||
    text.includes("quiero") ||
    text.includes("mesa") ||
    text.includes("gracias");

  if (isSpanish) {
    const item = menuItems.find((i) => i.id === "item-1") || menuItems[0];
    return {
      text: `☕ **¡Hola! Bienvenido a ${cafeInfo.name}**\n\nCon mucho gusto. He añadido **1x ${item.name}** (₹${item.price}) a su carrito de compras.\n\n*(Added ${item.name} to cart. ¿Desea acompañarlo con un delicioso croissant o postre artesanal?)* 🥐✨`,
      action: {
        type: "ADD_TO_CART",
        payload: { item, qty: 1 },
      },
    };
  }

  // 6. FRENCH (Français)
  const isFrench =
    text.includes("bonjour") ||
    text.includes("s'il vous plaît") ||
    text.includes("merci") ||
    text.includes("croissant");

  if (isFrench) {
    const item = menuItems.find((i) => i.id === "item-8") || menuItems[2];
    return {
      text: `🥐 **Bonjour! Bienvenue chez ${cafeInfo.name}**\n\nAvec grand plaisir! J'ai ajouté **1x ${item.name}** (₹${item.price}) à votre panier.\n\n*(Added ${item.name} to your cart. Souhaitez-vous un café artisanal pour accompagner cela?)* ☕✨`,
      action: {
        type: "ADD_TO_CART",
        payload: { item, qty: 1 },
      },
    };
  }

  // 7. GERMAN (Deutsch)
  const isGerman =
    text.includes("guten tag") ||
    text.includes("hallo") ||
    text.includes("bitte") ||
    text.includes("danke") ||
    text.includes("speisekarte");

  if (isGerman) {
    const item = menuItems.find((i) => i.id === "item-13") || menuItems[0];
    return {
      text: `☕ **Guten Tag! Willkommen bei ${cafeInfo.name}**\n\nSehr gerne! Ich habe **1x ${item.name}** (₹${item.price}) in Ihren Warenkorb gelegt.\n\n*(Added ${item.name} to cart. Kann ich Ihnen noch etwas empfehlen?)* ✨`,
      action: {
        type: "ADD_TO_CART",
        payload: { item, qty: 1 },
      },
    };
  }

  // REVENUE MODEL & PRICING INQUIRIES (How our revenue model works)
  if (
    text.includes("revenue") ||
    text.includes("pricing") ||
    text.includes("subscription") ||
    text.includes("commission") ||
    text.includes("business model") ||
    text.includes("swiggy") ||
    text.includes("zomato") ||
    text.includes("how much does") ||
    text.includes("how do you make money") ||
    text.includes("roi")
  ) {
    return {
      text: `💰 **ShopMate AI Revenue Model & Transparent Pricing:**\n\n• **Flat SaaS Subscription:** Only **₹499 / month** per café location (includes a 14-day zero-risk free trial).\n• **0% Order Commission:** Unlike Swiggy & Zomato which charge 25%–30% per order, ShopMate AI charges 0% commission. 100% of the customer's payment goes directly into the café owner's UPI/bank account.\n• **Massive Monthly Savings:** On ₹1,00,000 in monthly digital orders:\n  - 25% Aggregator Commission = ₹25,000 lost\n  - ShopMate AI Flat Fee = ₹499\n  - **Net Café Owner Savings: ₹24,501 / month (₹2,94,012 / year)!**\n• **B2B Growth Add-Ons:** Multi-outlet sync (₹999/mo) and Meta WhatsApp Cloud API ordering bot (₹1,499/mo).\n• **For Customers:** 100% Free with zero convenience fees or menu markups!`,
      action: null,
    };
  }

  // FEATURE #1: Smart Order Recovery (Sold Out handling)
  if (text.includes("brownie") || text.includes("dark chocolate")) {
    const brownie = menuItems.find((i) => i.id === "item-10");
    if (brownie && !brownie.isAvailable) {
      return {
        text: `🍫 **Smart Order Recovery Alert:**\n\nOur **Dark Chocolate & Sea Salt Brownie** is freshly sold out for today because our morning batch was completely reserved! 🥺\n\n💡 **Chef's In-Stock Alternatives:**\n• **Flaky French Butter Croissant (₹160)** — Fresh out of the oven!\n• **Almond Frangipane Tart (₹210)** — Double-baked with velvety almond cream.\n\nWould you like me to add a warm **French Croissant (₹160)** to your cart instead? 🥐`,
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

  // Trustworthy Out-of-Scope Queries
  if (text.includes("pizza") || text.includes("burger") || text.includes("sushi") || text.includes("biryani")) {
    return {
      text: `🛡️ **Verified Café Menu Notice:**\n\nAt Brew & Bliss, we focus exclusively on handcrafted specialty coffees, teas, and artisanal baked goods. We do not serve pizzas or sushi. May we suggest our delicious **Truffle Wild Mushroom Sourdough Melt (₹290)** instead? 🥪✨`,
      action: null,
    };
  }

  // Default hospitality
  return {
    text: `Hello! I'm **ShopMate AI**, your multilingual concierge at ${cafeInfo.name} ☕\n\nI speak **English, Kannada (ಕನ್ನಡ), Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Spanish, and more**! You can ask for menu recommendations, budget combos, dietary options, or reserve a table. How may I assist you?`,
    action: null,
  };
};

// Main Chat Query Function (Calls Gemini with fallback to Multilingual Heuristics)
export async function sendChatMessage({
  userMessage,
  chatHistory = [],
  apiKey,
  cafeInfo,
  menuItems,
  customerMemory,
}) {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

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
        parts: [{ text: `Hello! I'm ShopMate AI, ready to assist with orders in ALL languages, budget meal planning, and table reservations! ☕✨` }],
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

    // Parse action commands if present
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
