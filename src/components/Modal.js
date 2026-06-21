"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  open,
  title,
  onClose,
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">

              <h2 className="text-2xl font-bold text-white">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-500 transition text-white"
              >
                ✕
              </button>

            </div>

            <div className="p-6">
              {children}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}