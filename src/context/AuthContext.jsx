import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const DEMO_PROFILES = {
  customer: {
    id: "user-alex-101",
    name: "Alex Morgan",
    email: "alex.coffee@gmail.com",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98112 34567",
    loyaltyPoints: 340,
    preferredMilk: "Oat Milk",
  },
  admin: {
    id: "admin-viraj-001",
    name: "Viraj Bagul",
    email: "owner@brewbliss.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    title: "Head Barista & Co-Founder",
    shiftStatus: "Active On Shift",
  },
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_user");
      return saved ? JSON.parse(saved) : DEMO_PROFILES.customer;
    } catch {
      return DEMO_PROFILES.customer;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_user", JSON.stringify(currentUser));
    } catch (e) {
      console.warn("Storage write error", e);
    }
  }, [currentUser]);

  // Switch between customer and admin roles directly
  const switchRole = (targetRole) => {
    if (targetRole === "admin") {
      setCurrentUser(DEMO_PROFILES.admin);
    } else {
      setCurrentUser(DEMO_PROFILES.customer);
    }
  };

  const loginWithDemo = (role) => {
    if (role === "admin") {
      setCurrentUser(DEMO_PROFILES.admin);
    } else {
      setCurrentUser(DEMO_PROFILES.customer);
    }
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (email, password, role = "customer") => {
    const newUser = {
      id: "user-" + Date.now().toString(36),
      name: email.split("@")[0].replace(".", " "),
      email,
      role,
      avatar:
        role === "admin"
          ? DEMO_PROFILES.admin.avatar
          : DEMO_PROFILES.customer.avatar,
      loyaltyPoints: 50,
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    // Reset to default guest or customer
    setCurrentUser(DEMO_PROFILES.customer);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === "admin",
        isCustomer: currentUser?.role === "customer",
        switchRole,
        loginWithDemo,
        loginWithCredentials,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
