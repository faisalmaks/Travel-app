"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaGlobeAsia,
  FaCity,
  FaHotel,
  FaUtensils,
  FaMosque,
  FaMapMarkedAlt,
  FaStar,
  FaHeart,
  FaPassport,
  FaRoute,
  FaMoneyBillWave,
  FaChartPie,
  FaPlaneDeparture,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      label: "Explorer",
      href: "/explorer",
      icon: <FaPlaneDeparture />,
    },
    {
      label: "Countries",
      href: "/countries",
      icon: <FaGlobeAsia />,
    },
    {
      label: "Cities",
      href: "/cities",
      icon: <FaCity />,
    },
    {
      label: "Hotels",
      href: "/hotels",
      icon: <FaHotel />,
    },
    {
      label: "Restaurants",
      href: "/restaurants",
      icon: <FaUtensils />,
    },
    {
      label: "Mosques",
      href: "/mosques",
      icon: <FaMosque />,
    },
    {
      label: "Guides",
      href: "/guides",
      icon: <FaMapMarkedAlt />,
    },
    {
      label: "Reviews",
      href: "/reviews",
      icon: <FaStar />,
    },
    {
      label: "Favorites",
      href: "/favorites",
      icon: <FaHeart />,
    },
    {
      label: "My Trips",
      href: "/itineraries",
      icon: <FaRoute />,
    },
    {
      label: "Visa",
      href: "/visa",
      icon: <FaPassport />,
    },
    {
      label: "My Trips",
      href: "/itineraries",
      icon: <FaRoute />,
    },
    {
      label: "Expenses",
      href: "/travel-expenses",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 text-white flex flex-col">

      {/* LOGO */}

      <div className="p-6 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="bg-emerald-500 p-3 rounded-xl">

            <FaPlaneDeparture size={20} />

          </div>

          <div>

            <h1 className="font-bold text-xl">
              TravelCity
            </h1>

            <p className="text-xs text-slate-400">
               Muslim Friendly Explorer
            </p>

          </div>

        </div>

      </div>

      {/* USER */}

      <div className="p-5 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold">
            F
          </div>

          <div>

            <p className="font-semibold">
              Faisal
            </p>

            <p className="text-sm text-slate-400">
              Global Traveler
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 p-4 overflow-y-auto">

        <p className="text-xs uppercase tracking-wider text-slate-500 mb-4 px-3">
          Explore
        </p>

        {menu.map((item) => {

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition-all duration-300 ${
                active
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* FOOTER */}

      <div className="p-4 border-t border-slate-800">

        <div className="bg-slate-900 rounded-xl p-4">
        <p className="text-sm text-slate-400">
          Countries Available
        </p>

        <h3 className="text-2xl font-bold text-emerald-400">
          {menu.length}
        </h3>

        </div>

      </div>

    </aside>
  );
}