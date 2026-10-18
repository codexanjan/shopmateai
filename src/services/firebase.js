// Firebase Web Client Configuration
// Configured with Project & App ID: 1:84930219485:web:9c7a8b6e4d2f01a3

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-DEMO-SHOPMATE-KEY",
  authDomain: "shopmate-cafe.firebaseapp.com",
  projectId: "shopmate-cafe",
  storageBucket: "shopmate-cafe.appspot.com",
  messagingSenderId: "84930219485",
  appId: "1:84930219485:web:9c7a8b6e4d2f01a3",
  measurementId: "G-DEMOSHOPMATE"
};

// Check if Firebase cloud credentials are active
export const isFirebaseConfigured = () => {
  return (
    typeof import.meta.env.VITE_FIREBASE_API_KEY === "string" &&
    import.meta.env.VITE_FIREBASE_API_KEY.length > 10 &&
    !import.meta.env.VITE_FIREBASE_API_KEY.includes("DEMO")
  );
};
