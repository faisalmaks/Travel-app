"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export default function SignupPage() {
  const router = useRouter();
  const { signupUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signupUser(formData);

      router.push("/login");
    } catch (error) {
      alert(
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 px-6">

      <div className="w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-slate-300 mt-2">
              Join Travel City Dashboard
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="text-white text-sm mb-2 block">
                Full Name
              </label>

              <div className="relative">

                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  required
                />

              </div>

            </div>

            <div>

              <label className="text-white text-sm mb-2 block">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  required
                />

              </div>

            </div>

            <div>

              <label className="text-white text-sm mb-2 block">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />

                <input
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition"
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
            >
              {loading ? "Creating..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          <p className="text-center text-slate-300 mt-8">

            Already have an account?

            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}