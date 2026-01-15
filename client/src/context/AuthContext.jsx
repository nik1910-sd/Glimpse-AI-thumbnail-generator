import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../configs/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // NEW: Add a loading state to prevent race conditions
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // Start verification
      setAuthLoading(true);
      const { data } = await api.get('/api/auth/verify');
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Session verification failed:", error);
      // Ensure state is reset if verification fails
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      // Always stop loading after the check is done
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signUp = async ({ name, email, password }) => {
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post('/api/auth/logout');
      setUser(null);
      setIsLoggedIn(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    authLoading, // Export this so components know if we are still checking the session
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};