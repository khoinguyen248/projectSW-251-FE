// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  bootstrapAuth,
  signin as apiSignin,
  signup as apiSignup,
  signout as apiSignout,
  me as apiMe,
} from "../hooks/useAuth"; // dùng api.js bạn vừa tạo

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Khởi tạo auth khi app start
  // Khởi tạo auth khi app start
useEffect(() => {
  (async () => {
    try {
      const token = await bootstrapAuth();
      if (token) {
        // Chỉ gọi /auth/me nếu có token hợp lệ
        const userData = await apiMe();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Bootstrap auth failed:", error.message);
      setUser(null);
    } finally {
      setReady(true);
    }
  })();
}, []);

  // Đăng nhập
  async function login(credentials) {
    setLoading(true);
    try {
      await apiSignin(credentials);
      const userData = await apiMe();
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // Đăng ký
  async function register(userData) {
    setLoading(true);
    try {
      await apiSignup(userData);
      // Tự động đăng nhập sau khi đăng ký
      await apiSignin({ email: userData.email, password: userData.password });
      const currentUser = await apiMe();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  // Đăng xuất
  async function logout() {
    try {
      await apiSignout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      ready,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user, ready, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
