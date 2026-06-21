"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "@/context/AuthProvider";

export default function SignupPage() {
  const router =
    useRouter();

  const {
    signupUser,
  } = useAuth();

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await signupUser(
          formData
        );

        router.push(
          "/login"
        );
      } catch (error) {
  console.log(error);

  console.log(error.response);

  alert(
    JSON.stringify(
      error.response?.data ||
      error.message
    )
  );
}
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">
          Signup
        </h1>

        <input
          placeholder="Name"
          value={
            formData.name
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              name:
                e.target.value,
            })
          }
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              email:
                e.target.value,
            })
          }
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              password:
                e.target.value,
            })
          }
          className="border p-3 rounded w-full mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Signup
        </button>

      </form>

    </div>
  );
}