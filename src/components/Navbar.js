"use client";

import { useAuth } from "@/context/AuthProvider";

import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaGlobeAsia,
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <div className="relative">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search destinations, hotels, restaurants..."
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              pl-12
              pr-4
              py-3
              text-white
              w-[420px]
              outline-none
              focus:border-emerald-500
              transition
            "
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* LIVE STATUS */}

        <div className="hidden md:flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">

          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

          <span className="text-sm text-slate-300">
            Real Time
          </span>

        </div>

        {/* GLOBE */}

        <button className="bg-slate-900 border border-slate-800 p-3 rounded-xl hover:bg-slate-800 transition">

          <FaGlobeAsia
            className="text-emerald-400"
          />

        </button>

        {/* NOTIFICATIONS */}

        <button className="relative bg-slate-900 border border-slate-800 p-3 rounded-xl hover:bg-slate-800 transition">

          <FaBell
            className="text-white"
          />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            9
          </span>

        </button>

        {/* USER */}

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">

          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white">
            {user?.email?.[0]?.toUpperCase() ||
              "U"}
          </div>

          <div className="hidden md:block">

            <p className="text-white text-sm font-semibold">
              Travel Explorer
            </p>

            <p className="text-slate-400 text-xs">
              {user?.email}
            </p>

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-3 rounded-xl flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </header>
  );
}