"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { motion } from "framer-motion";
import { FaGlobeAsia } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await loginUser(formData);

      router.push("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">

        <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-3xl" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          <div className="w-[350px] h-[350px] rounded-full border border-emerald-400/30 flex items-center justify-center backdrop-blur-xl">

            <FaGlobeAsia
              size={220}
              className="text-emerald-400"
            />

          </div>
        </motion.div>

        <div className="absolute bottom-24 left-20 max-w-md">

          <h1 className="text-5xl font-bold text-white leading-tight">

            Explore The World
            <span className="block text-emerald-400">
              With TravelCity
            </span>

          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            Discover countries, cities,
            hotels, restaurants, mosques,
            travel guides and build your
            perfect itinerary.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-md"
        >

          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-400 mb-8">
              Login to continue your journey
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full mb-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-700 text-white outline-none"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-white py-4 rounded-xl font-semibold"
              >
                {isLoading
                  ? "Logging In..."
                  : "Login"}
              </button>

            </form>

            <p className="text-center text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-emerald-400 font-semibold"
              >
                Sign Up
              </Link>
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}