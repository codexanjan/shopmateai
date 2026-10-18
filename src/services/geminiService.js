// Google Gemini API Integration for ShopMate AI

export const DEFAULT_GEMINI_MODEL = "gemini-1.5-flash";

export const buildSystemPrompt = (cafeInfo, menuItems) => {
  const menuList = menuItems
    .map(
      (item) =>
        `- ${item.name} (Category: ${item.category}, Price: ₹${item.price}, Dietary: ${item.dietaryTags.join(", ")}, Available: ${item.isAvailable ? "Yes" : "Out of Stock"}): ${item.description}`
    )
    .join("\n");

  return `You are ShopMate AI, the warm, hospitable, and knowledgeable digital concierge & ordering assistant for "${cafeInfo.name}".
Your goal is to assist café guests, answer questions accurately, recommend food/beverage pairings, explain ingredients and dietary details (vegan, gluten-free, nut-free), take table reservations, and help add items to their cart.

Café Details:
- Name: ${cafeInfo.name}
- Address: ${cafeInfo.address}
- Phone: ${cafeInfo.phone}
- Hours: ${cafeInfo.hours}
- Guest Wi-Fi: "${cafeInfo.wifiSsid}" / Password: "${cafeInfo.wifiPass}"
- Pet Policy: ${cafeInfo.petFriendly ? "100% Pet-friendly outdoor garden patio with fresh water bowls." : "Service animals only."}
- Discounts & Promos: "FIRSTSIP" gives 15% off first order. "CAFE50" gives ₹50 flat off orders over ₹300.
- UPI ID: ${cafeInfo.upiId}

Current Live Menu Catalog:
${menuList}

Action Command Capabilities:
You have the special power to directly trigger actions in the guest's app!
1. When a user explicitly asks you to add an item to their order/cart (e.g., "Add 2 cold brews", "Can you put a croissant in my cart?"), include this exact action tag on a new line at the end of your response:
[ACTION:ADD_TO_CART:{"name":"Exact Item Name From Menu","qty":1}]
(If multiple items, output one tag per item or specify proper qty).

2. When a user asks to book or reserve a table (e.g., "Book a table for 2 tomorrow at 7pm"):
[ACTION:BOOK_TABLE:{"guests":2,"time":"07:00 PM","date":"tomorrow"}]

Tone Guidelines:
- Be delightful, polite, concise, and enthusiastic about craft coffee and bakery.
- Use emojis tastefully (☕, 🥐, ✨, 🌿).
- If an item is out of stock, politely inform the customer and suggest an alternative.
- Keep responses within 2 to 4 sentences unless the customer asks for a detailed breakdown.`;
};

// Local Smart Heuristic Fallback Engine
export const generateHeuristicResponse = (userMessage, cafeInfo, menuItems) => {
  const text = userMessage.toLowerCase().trim();

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

  // Location / Address
  if (text.includes("location") || text.includes("address") || text.includes("where are you") || text.includes("directions") || text.includes("reach")) {
    return {
      text: `📍 You'll find us at **${cafeInfo.address}** (near 100ft Road). Valet and bicycle parking are available right out front! 🛵`,
      action: null,
    };
  }

  // Discount / Coupon codes
  if (text.includes("discount") || text.includes("coupon") || text.includes("promo") || text.includes("offer") || text.includes("code")) {
    return {
      text: `🎉 Here are our current specials you can apply at checkout:\n\n• **FIRSTSIP** — 15% off your entire first order!\n• **CAFE50** — ₹50 flat off orders above ₹300.\n\nEnter them in your cart drawer to save instantly! 🏷️`,
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
      text: `📅 I would love to reserve a table for you! I'm opening our instant Table Booking desk for you now. Just pick your preferred time and seating area! ✨`,
      action: {
        type: "OPEN_RESERVATION_MODAL",
        payload: { guests },
      },
    };
  }

  // Add to cart detection
  if (text.includes("add") || text.includes("order") || text.includes("buy") || text.includes("cart") || text.includes("get me")) {
    // Try to match an item from menu
    const matchedItem = menuItems.find((item) => {
      const itemNameWords = item.name.toLowerCase().split(" ");
      return itemNameWords.some((w) => w.length > 3 && text.includes(w));
    });

    if (matchedItem) {
      let qty = 1;
      const numMatch = text.match(/\b([1-9])\b/);
      if (numMatch) qty = parseInt(numMatch[1], 10);

      return {
        text: `🛒 Done! I have added **${qty}x ${matchedItem.name}** (₹${matchedItem.price * qty}) directly to your cart! You can view it anytime in the slide-out cart drawer. Anything else to accompany this? 🥐☕`,
        action: {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty },
        },
      };
    }
  }

  // Vegan / Dietary recommendation
  if (text.includes("vegan") || text.includes("plant") || text.includes("dairy free")) {
    const veganItems = menuItems.filter((i) => i.dietaryTags.some((t) => t.toLowerCase().includes("vegan")));
    const names = veganItems.map((i) => `• **${i.name}** (₹${i.price})`).join("\n");
    return {
      text: `🌱 Here are our popular 100% plant-based & vegan options:\n\n${names}\n\nWe also offer organic Oat Milk and California Almond Milk for any of our espresso drinks! 🥛`,
      action: null,
    };
  }

  // Best cold coffee / recommendation
  if (text.includes("cold") || text.includes("iced") || text.includes("recommend") || text.includes("special") || text.includes("best")) {
    return {
      text: `✨ I highly recommend our **Signature 18-Hour Cold Brew** (₹210) for pure smooth notes, or our **Iced Salted Caramel Macchiato** (₹240) if you love a silky sweet treat! Would you like me to add either to your cart? 🧊☕`,
      action: null,
    };
  }

  // General fallback
  return {
    text: `Hello! I'm **ShopMate AI**, your personal barista assistant at ${cafeInfo.name}. ☕\n\nI can help you browse our handcrafted coffees, check ingredients, customize drinks (oat/almond milk), share Wi-Fi credentials, or reserve a table. How can I assist you today?`,
    action: null,
  };
};

// Parse action tags from Gemini API response
const parseActionsFromResponse = (aiText, menuItems) => {
  let cleanText = aiText;
  let action = null;

  // Regex for [ACTION:ADD_TO_CART:{"name":"...","qty":1}]
  const addCartRegex = /\[ACTION:ADD_TO_CART:(\{.*?\})\]/i;
  const matchCart = aiText.match(addCartRegex);
  if (matchCart) {
    try {
      const data = JSON.parse(matchCart[1]);
      const matchedItem = menuItems.find(
        (i) => i.name.toLowerCase().includes(data.name.toLowerCase()) || data.name.toLowerCase().includes(i.name.toLowerCase())
      );
      if (matchedItem) {
        action = {
          type: "ADD_TO_CART",
          payload: { item: matchedItem, qty: data.qty || 1 },
        };
      }
    } catch {
      // JSON parse fallback
    }
    cleanText = cleanText.replace(addCartRegex, "").trim();
  }

  // Regex for [ACTION:BOOK_TABLE:{"guests":2}]
  const bookRegex = /\[ACTION:BOOK_TABLE:(\{.*?\})\]/i;
  const matchBook = aiText.match(bookRegex);
  if (matchBook) {
    try {
      const data = JSON.parse(matchBook[1]);
      action = {
        type: "OPEN_RESERVATION_MODAL",
        payload: { guests: data.guests || 2, time: data.time, date: data.date },
      };
    } catch {
      // JSON parse fallback
    }
    cleanText = cleanText.replace(bookRegex, "").trim();
  }

  return { text: cleanText, action };
};

// Main Chat Query Function
export async function sendChatMessage({
  userMessage,
  chatHistory = [],
  apiKey,
  cafeInfo,
  menuItems,
}) {
  const effectiveKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  // If no API key configured or offline, use heuristic response engine
  if (!effectiveKey || effectiveKey.trim() === "" || effectiveKey.includes("DEMO")) {
    // Artificial small delay for natural conversational feel (400ms)
    await new Promise((r) => setTimeout(r, 450));
    return generateHeuristicResponse(userMessage, cafeInfo, menuItems);
  }

  try {
    const systemPrompt = buildSystemPrompt(cafeInfo, menuItems);

    const contents = [
      {
        role: "user",
        parts: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nPlease acknowledge with a friendly hello.` }],
      },
      {
        role: "model",
        parts: [{ text: `Hello! I'm ShopMate AI, ready to help guests at ${cafeInfo.name} with our menu, orders, and reservations! ☕✨` }],
      },
    ];

    // Append recent chat history
    chatHistory.slice(-6).forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });

    // Append current user message
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
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn("Gemini API returned error status:", response.status, "Falling back to local heuristic engine.");
      return generateHeuristicResponse(userMessage, cafeInfo, menuItems);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      return generateHeuristicResponse(userMessage, cafeInfo, menuItems);
    }

    return parseActionsFromResponse(candidate, menuItems);
  } catch (err) {
    console.warn("Gemini fetch exception:", err, "Using smart local fallback.");
    return generateHeuristicResponse(userMessage, cafeInfo, menuItems);
  }
}
