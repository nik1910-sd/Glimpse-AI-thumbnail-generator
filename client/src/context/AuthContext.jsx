import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../configs/api";                                     

// Create the Context without type interfaces
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Verifies the user session on application load
  const fetchUser = async () => {
    try {
      const { data } = await api.get('/api/auth/verify');
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Session verification failed:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Sign Up Logic
  const signUp = async ({ name, email, password }) => {
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Login Logic
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      if (data.user) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Logout Logic
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

// Custom hook for easy access to the Auth state
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};