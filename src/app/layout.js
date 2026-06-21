import "./globals.css";

import { AuthProvider } from "@/context/AuthProvider";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TravelCity",
  description: "Modern Travel Management Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white antialiased">

        <AuthProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #1e293b",
              },
            }}
          />

          {children}

        </AuthProvider>

      </body>
    </html>
  );
}