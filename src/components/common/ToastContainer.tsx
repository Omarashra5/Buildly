import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-xl text-sm font-medium ${
              toast.type === "success"
                ? "bg-zinc-900/95 border-emerald-500/40 text-emerald-100"
                : toast.type === "error"
                ? "bg-zinc-900/95 border-rose-500/40 text-rose-100"
                : toast.type === "warning"
                ? "bg-zinc-900/95 border-amber-500/40 text-amber-100"
                : "bg-zinc-900/95 border-blue-500/40 text-blue-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
              <span className="leading-relaxed">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
