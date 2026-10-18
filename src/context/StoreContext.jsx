import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CAFE_INFO,
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_RESERVATIONS,
  PROMO_CODES,
  DEFAULT_CUSTOMER_MEMORY,
  calculateDynamicETA,
} from "../data/mockData";
import { soundEngine } from "../services/audioService";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Café Info & Settings
  const [cafeInfo, setCafeInfo] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_cafe_info");
      return saved ? JSON.parse(saved) : CAFE_INFO;
    } catch {
      return CAFE_INFO;
    }
  });

  // 2. Menu Items
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_menu");
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // 3. Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_orders");
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // 4. Table Reservations
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_reservations");
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  // 5. Active Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Customer Preference Memory (Feature #7)
  const [customerMemory, setCustomerMemory] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_customer_memory");
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER_MEMORY;
    } catch {
      return DEFAULT_CUSTOMER_MEMORY;
    }
  });

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Active tracking order ID
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState("ORD-9421");

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [activeCustomizingItem, setActiveCustomizingItem] = useState(null);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const [isJudgeSimulationOpen, setIsJudgeSimulationOpen] = useState(false);
  const [isRecoveryBannerVisible, setIsRecoveryBannerVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("shopmate_cafe_info", JSON.stringify(cafeInfo));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [cafeInfo]);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_menu", JSON.stringify(menuItems));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_reservations", JSON.stringify(reservations));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_cart", JSON.stringify(cart));
      // Show smart order recovery banner if cart has items and is closed
      if (cart.length > 0 && !isCartOpen) {
        setIsRecoveryBannerVisible(true);
      } else {
        setIsRecoveryBannerVisible(false);
      }
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [cart, isCartOpen]);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_customer_memory", JSON.stringify(customerMemory));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [customerMemory]);

  // Toast dispatcher
  const showToast = (title, message = "", type = "info") => {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const newToast = { id, title, message, type };
    setToasts((prev) => [newToast, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle sound
  const toggleSound = () => {
    const newState = soundEngine.toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      soundEngine.playChime();
      showToast("Audio On", "Subtle sound effects enabled", "info");
    } else {
      showToast("Audio Muted", "Sound effects turned off", "info");
    }
  };

  // Cart Management
  const addToCart = (item, quantity = 1, customization = null) => {
    setCart((prevCart) => {
      const customKey = customization ? JSON.stringify(customization) : "standard";
      const existingIdx = prevCart.findIndex(
        (ci) => ci.id === item.id && (ci.customKey || "standard") === customKey
      );

      let itemPrice = item.price;
      if (customization?.milk && customization.milk.includes("+₹30")) {
        itemPrice += 30;
      }

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].qty += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...item,
            effectivePrice: itemPrice,
            qty: quantity,
            customization: customization || { temp: "Standard", sweetness: "Standard" },
            customKey,
            cartItemId: Date.now() + Math.random(),
          },
        ];
      }
    });

    soundEngine.playChime();
    showToast("Added to Cart", `${quantity}x ${item.name}`, "success");
  };

  const updateCartQty = (cartItemId, newQty) => {
    soundEngine.playClick();
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.cartItemId === cartItemId ? { ...i, qty: newQty } : i))
      );
    }
  };

  const removeFromCart = (cartItemId) => {
    soundEngine.playClick();
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setIsRecoveryBannerVisible(false);
  };

  const applyPromo = (codeStr) => {
    const code = codeStr.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      soundEngine.playChime();
      showToast("Coupon Applied!", `Promo code ${code} active`, "success");
      return true;
    } else {
      showToast("Invalid Promo", "Try 'FIRSTSIP' or 'CAFE50'", "warning");
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.effectivePrice || item.price) * item.qty, 0);
  
  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPct) {
      cartDiscount = Math.min(
        Math.round((cartSubtotal * appliedPromo.discountPct) / 100),
        appliedPromo.maxDiscount || 100
      );
    } else if (appliedPromo.flatDiscount && cartSubtotal >= (appliedPromo.minOrder || 0)) {
      cartDiscount = appliedPromo.flatDiscount;
    }
  }

  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.05); // 5% GST
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Dynamic ETA (Feature #5)
  const currentETA = calculateDynamicETA(cart, orders);

  // Place Order
  const placeOrder = ({ customerName, customerPhone, orderType, tableNumber, paymentMethod }) => {
    if (cart.length === 0) return null;

    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customerName: customerName || "Guest Alex",
      customerPhone: customerPhone || "+91 98112 34567",
      orderType: orderType || "dine-in",
      tableNumber: orderType === "dine-in" ? (tableNumber || "T-01") : null,
      status: "pending", // pending -> brewing -> ready -> completed
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      total: cartTotal,
      etaMinutes: currentETA.totalMinutes,
      paymentMethod: paymentMethod || "UPI (Instant Paid)",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);
    clearCart();
    setIsCartOpen(false);

    // Trigger celebration
    soundEngine.playSuccessOrder();
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#D97706", "#10B981", "#FDE68A"],
      });
    } catch {
      // Fallback
    }

    showToast("Order Placed!", `Order #${newOrder.id} sent! Est. ready in ${newOrder.etaMinutes} mins.`, "success");
    return newOrder;
  };

  // Update order status (Admin / Kitchen Kanban)
  const updateOrderStatus = (orderId, newStatus) => {
    soundEngine.playKitchenBell();
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showToast("Order Updated", `Order #${orderId} is now ${newStatus.toUpperCase()}`, "info");
  };

  // Table Reservations
  const createReservation = (resData) => {
    const newRes = {
      id: "RES-" + Math.floor(500 + Math.random() * 500),
      name: resData.name || "Alex Morgan",
      phone: resData.phone || "+91 98112 34567",
      date: resData.date,
      time: resData.time,
      guests: parseInt(resData.guests, 10) || 2,
      area: resData.area || "Indoor Cozy Booth",
      status: "confirmed",
      specialRequests: resData.specialRequests || "",
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [newRes, ...prev]);
    setIsReservationModalOpen(false);
    soundEngine.playSuccessOrder();
    showToast("Table Reserved!", `Confirmed for ${newRes.guests} guests on ${newRes.date} at ${newRes.time}`, "success");
    return newRes;
  };

  const updateReservationStatus = (resId, newStatus) => {
    soundEngine.playClick();
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: newStatus } : r))
    );
    showToast("Reservation Updated", `Status changed to ${newStatus}`, "info");
  };

  // Menu Management (Admin CRUD)
  const addMenuItem = (itemData) => {
    const newItem = {
      id: "item-" + Date.now().toString(36),
      name: itemData.name,
      category: itemData.category || "coffee",
      price: parseFloat(itemData.price) || 150,
      description: itemData.description || "",
      image: itemData.image || "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80",
      dietaryTags: itemData.dietaryTags || ["Vegetarian"],
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      prepTimeMinutes: parseInt(itemData.prepTimeMinutes, 10) || 4,
      customizable: itemData.category === "coffee" || itemData.category === "tea",
    };

    setMenuItems((prev) => [newItem, ...prev]);
    soundEngine.playChime();
    showToast("Menu Item Added", `${newItem.name} added to catalog`, "success");
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedFields } : i))
    );
    soundEngine.playClick();
    showToast("Item Updated", "Menu catalog synchronized", "info");
  };

  const toggleItemAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newState = !i.isAvailable;
          showToast(
            newState ? "Item Available" : "Item Marked Sold Out",
            i.name,
            newState ? "success" : "warning"
          );
          return { ...i, isAvailable: newState };
        }
        return i;
      })
    );
    soundEngine.playClick();
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
    soundEngine.playClick();
    showToast("Item Deleted", "Removed from menu", "warning");
  };

  const updateCafeSettings = (newSettings) => {
    setCafeInfo((prev) => ({ ...prev, ...newSettings }));
    soundEngine.playChime();
    showToast("Settings Saved", "Café details & API settings updated", "success");
  };

  // Customer Preference Memory Handlers (Feature #7)
  const updateCustomerMemory = (newPreferences) => {
    setCustomerMemory((prev) => ({
      ...prev,
      ...newPreferences,
      lastSavedAt: new Date().toLocaleDateString(),
    }));
    soundEngine.playChime();
    showToast("AI Memory Updated", "Your preferences have been saved", "success");
  };

  const clearCustomerMemory = () => {
    setCustomerMemory(null);
    soundEngine.playClick();
    showToast("AI Memory Cleared", "Saved preferences reset", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        cafeInfo,
        updateCafeSettings,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        orders,
        updateOrderStatus,
        placeOrder,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        reservations,
        createReservation,
        updateReservationStatus,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromo,
        removePromo,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartTotal,
        cartCount,
        currentETA,
        customerMemory,
        updateCustomerMemory,
        clearCustomerMemory,
        isPreferenceModalOpen,
        setIsPreferenceModalOpen,
        isJudgeSimulationOpen,
        setIsJudgeSimulationOpen,
        isRecoveryBannerVisible,
        setIsRecoveryBannerVisible,
        isCartOpen,
        setIsCartOpen,
        isReservationModalOpen,
        setIsReservationModalOpen,
        activeCustomizingItem,
        setActiveCustomizingItem,
        soundEnabled,
        toggleSound,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
