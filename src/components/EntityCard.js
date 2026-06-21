"use client";

import { motion } from "framer-motion";

export default function EntityCard({
  title,
  subtitle,
  description,
  badge,
  onEdit,
  onDelete,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
    >
      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <p className="text-slate-400">
            {subtitle}
          </p>

        </div>

        {badge && (
          <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
            {badge}
          </span>
        )}

      </div>

      {description && (
        <p className="text-slate-300 mt-4 line-clamp-3">
          {description}
        </p>
      )}

      <div className="flex gap-3 mt-6">

        <button
          onClick={onEdit}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
        >
          Delete
        </button>

      </div>

    </motion.div>
  );
}