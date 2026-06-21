"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  login,
  signup,
} from "@/services/authService";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "user"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }

    setLoading(false);
  }, []);

  const loginUser = async (
    formData
  ) => {
    const response =
      await login(formData);

    localStorage.setItem(
      "token",
      response.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data
      )
    );

    setUser(
      response.data
    );

    return response;
  };

  const signupUser = async (
    formData
  ) => {
    return await signup(
      formData
    );
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        signupUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  () =>
    useContext(
      AuthContext
    );