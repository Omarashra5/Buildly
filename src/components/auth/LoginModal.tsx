import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Lock, Mail, KeyRound, ShieldCheck, ArrowRight, Eye, EyeOff, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, setActiveView } = useApp();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onClose();
      setActiveView("dashboard");
    } else {
      setErrorMsg("كلمة المرور غير صحيحة. جرب: admin أو 123456");
    }
  };

  const handleQuickDemo = () => {
    login("admin");
    onClose();
    setActiveView("dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#0e0e14] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#7000FF]/30">
            <ShieldCheck className="w-7 h-7 text-black" />
          </div>
          <h2 className="text-2xl font-black text-white">تسجيل الدخول إلى لوحة التحكم</h2>
          <p className="text-xs text-white/40">خاص بمدير منصة "مشروعي" لإدارة كافة المواقع والمشاريع</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">البريد الإلكتروني للإدارة</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                defaultValue="admin@mashrouiy.com"
                readOnly
                className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-xs focus:outline-none cursor-not-allowed font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">كلمة المرور الرئيسية</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="أدخل كلمة المرور (أو جرب admin)"
                className="w-full pl-10 pr-10 py-3 bg-[#16161f] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-1.5">{errorMsg}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-extrabold text-white rounded-xl text-sm transition-all shadow-lg shadow-[#7000FF]/30"
          >
            دخول للوحة التحكم
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <button
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-[#00FFC2] flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#A870FF]" />
            <span>تجربة فورية بضغطة زر (Quick Demo Login)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
