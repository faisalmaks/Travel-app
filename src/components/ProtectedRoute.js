"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function ProtectedRoute({
  children,
}) {
  const router =
    useRouter();

  const [authorized,
    setAuthorized] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      router.replace(
        "/login"
      );

      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-400">
            Loading...
          </p>

        </div>

      </div>
    );
  }

  return children;
}