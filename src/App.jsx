import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider } from "./context/StoreContext";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AuthModal from "./components/common/AuthModal";
import Toast from "./components/common/Toast";
import JudgePitchSimulator from "./components/common/JudgePitchSimulator";

// Landing Components
import HeroSection from "./components/landing/HeroSection";
import FeaturesGrid from "./components/landing/FeaturesGrid";
import PricingSection from "./components/landing/PricingSection";
import Testimonials from "./components/landing/Testimonials";

// Customer Components
import MenuCatalog from "./components/customer/MenuCatalog";
import ItemModal from "./components/customer/ItemModal";
import CartDrawer from "./components/customer/CartDrawer";
import OrderTracker from "./components/customer/OrderTracker";
import ReservationModal from "./components/customer/ReservationModal";
import PreferenceMemoryModal from "./components/customer/PreferenceMemoryModal";
import OrderRecoveryBanner from "./components/customer/OrderRecoveryBanner";

// Chatbot
import ChatWidget from "./components/chatbot/ChatWidget";

// Admin Dashboard
import AdminDashboard from "./components/admin/AdminDashboard";

function MainApp() {
  const [currentView, setCurrentView] = useState("landing"); // landing | menu | tracker | admin

  return (
    <div className="app-container">
      {/* Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Router */}
      <main className="main-content">
        {currentView === "landing" && (
          <>
            <HeroSection setCurrentView={setCurrentView} />
            <FeaturesGrid />
            <PricingSection setCurrentView={setCurrentView} />
            <Testimonials />
          </>
        )}

        {currentView === "menu" && (
          <MenuCatalog />
        )}

        {currentView === "tracker" && (
          <OrderTracker setCurrentView={setCurrentView} />
        )}

        {currentView === "admin" && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Global Interactive Overlays & 7 Killer Features */}
      <ItemModal />
      <CartDrawer setCurrentView={setCurrentView} />
      <ReservationModal />
      <AuthModal />
      <Toast />
      <ChatWidget />
      <JudgePitchSimulator setCurrentView={setCurrentView} />
      <PreferenceMemoryModal />
      <OrderRecoveryBanner />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainApp />
      </StoreProvider>
    </AuthProvider>
  );
}
