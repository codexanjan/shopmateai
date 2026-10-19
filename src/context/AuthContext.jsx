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
  // Registered users storage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("shopmate_registered_users");
      return saved ? JSON.parse(saved) : [DEMO_PROFILES.customer, DEMO_PROFILES.admin];
    } catch {
      return [DEMO_PROFILES.customer, DEMO_PROFILES.admin];
    }
  });

  // Current session user
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

  useEffect(() => {
    try {
      localStorage.setItem("shopmate_registered_users", JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn("Users write error", e);
    }
  }, [registeredUsers]);

  // Real Signup function
  const signup = async (name, email, password, role = "customer", cafeName = "") => {
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      // Allow update or re-login
      setCurrentUser(existing);
      return { success: true, user: existing };
    }

    const newUser = {
      id: "usr-" + Date.now().toString(36),
      name: name.trim() || email.split("@")[0],
      email: email.trim().toLowerCase(),
      password, // Stored in client state
      role,
      cafeName: role === "admin" ? cafeName || "My Artisan Roastery" : undefined,
      avatar:
        role === "admin"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      createdAt: new Date().toISOString(),
      loyaltyPoints: 100,
      token: "tok_" + Math.random().toString(36).substring(2),
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Real Login function
  const login = async (email, password) => {
    const found = registeredUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }

    // If not found in registered list, automatically create session account
    const autoUser = {
      id: "usr-" + Date.now().toString(36),
      name: email.split("@")[0].replace(".", " "),
      email: email.trim().toLowerCase(),
      role: email.includes("admin") || email.includes("owner") ? "admin" : "customer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      token: "tok_" + Math.random().toString(36).substring(2),
      loyaltyPoints: 50,
    };
    setRegisteredUsers((prev) => [...prev, autoUser]);
    setCurrentUser(autoUser);
    return { success: true, user: autoUser };
  };

  const loginWithDemo = (role) => {
    if (role === "admin") {
      setCurrentUser(DEMO_PROFILES.admin);
    } else {
      setCurrentUser(DEMO_PROFILES.customer);
    }
    setIsAuthModalOpen(false);
  };

  const switchRole = (targetRole) => {
    if (targetRole === "admin") {
      setCurrentUser(DEMO_PROFILES.admin);
    } else {
      setCurrentUser(DEMO_PROFILES.customer);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === "admin",
        isCustomer: currentUser?.role === "customer" || !currentUser?.role,
        switchRole,
        loginWithDemo,
        signup,
        login,
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
