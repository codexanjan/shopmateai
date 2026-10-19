import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider } from "./context/StoreContext";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AuthModal from "./components/common/AuthModal";
import Toast from "./components/common/Toast";

// Separate Auth Screens
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";

// Separate Product Pages
import FeaturesPage from "./components/pages/FeaturesPage";
import PricingPage from "./components/pages/PricingPage";

// Landing Components
import HeroSection from "./components/landing/HeroSection";
import LiveCatalogSection from "./components/landing/LiveCatalogSection";
import FeaturesGrid from "./components/landing/FeaturesGrid";
import PricingSection from "./components/landing/PricingSection";
import Testimonials from "./components/landing/Testimonials";
import LandingAuthSection from "./components/landing/LandingAuthSection";

// Customer Components
import MenuCatalog from "./components/customer/MenuCatalog";
import TableBookingPage from "./components/customer/TableBookingPage";
import ItemModal from "./components/customer/ItemModal";
import CartDrawer from "./components/customer/CartDrawer";
import OrderTracker from "./components/customer/OrderTracker";
import ReservationModal from "./components/customer/ReservationModal";
import PreferenceMemoryModal from "./components/customer/PreferenceMemoryModal";
import OrderRecoveryBanner from "./components/customer/OrderRecoveryBanner";

// Voice & Multilingual Chatbot
import ChatWidget from "./components/chatbot/ChatWidget";

// Admin Dashboard
import AdminDashboard from "./components/admin/AdminDashboard";

function MainApp() {
  const [currentView, setCurrentView] = useState("landing"); // landing | features | pricing | menu | table | tracker | admin | login | signup

  return (
    <div className="app-container">
      {/* Navigation Menu Bar */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Router */}
      <main className="main-content">
        {/* Landing Page */}
        {currentView === "landing" && (
          <div className="animate-fade-in">
            <HeroSection setCurrentView={setCurrentView} />
            <LiveCatalogSection setCurrentView={setCurrentView} />
            <FeaturesGrid />
            <PricingSection setCurrentView={setCurrentView} />
            <Testimonials />
            <LandingAuthSection setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Features Page */}
        {currentView === "features" && (
          <div className="animate-fade-in">
            <FeaturesPage setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Pricing Page */}
        {currentView === "pricing" && (
          <div className="animate-fade-in">
            <PricingPage setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Café Menu Page */}
        {currentView === "menu" && (
          <div className="animate-fade-in">
            <MenuCatalog />
          </div>
        )}

        {/* Separate Table Booking Page */}
        {currentView === "table" && (
          <div className="animate-fade-in">
            <TableBookingPage setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Live Order Tracker Page */}
        {currentView === "tracker" && (
          <div className="animate-fade-in">
            <OrderTracker setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Kitchen & Admin Dashboard */}
        {currentView === "admin" && (
          <div className="animate-fade-in">
            <AdminDashboard />
          </div>
        )}

        {/* Separate Login Screen */}
        {currentView === "login" && (
          <div className="animate-fade-in">
            <LoginPage setCurrentView={setCurrentView} />
          </div>
        )}

        {/* Separate Signup Screen */}
        {currentView === "signup" && (
          <div className="animate-fade-in">
            <SignupPage setCurrentView={setCurrentView} />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Global Interactive Overlays */}
      <ItemModal />
      <CartDrawer setCurrentView={setCurrentView} />
      <ReservationModal />
      <AuthModal />
      <Toast />
      <ChatWidget />
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
