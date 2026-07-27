import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";

import { Loader } from "lucide-react";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default App;
