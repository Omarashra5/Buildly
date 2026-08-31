import React, { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, Globe, ExternalLink, Copy, QrCode, Share2, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

interface PublishSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishSuccessModal: React.FC<PublishSuccessModalProps> = ({ isOpen, onClose }) => {
  const { currentProject, showToast, setActiveView } = useApp();

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen || !currentProject) return null;

  const publicUrl = `https://${currentProject.settings.publish.subdomain || currentProject.slug}.mashrouiy.com`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    showToast("تم نسخ رابط الموقع المباشر إلى الحافظة!");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`شاهد موقعي الجديد الذي تم بناؤه عبر منصة مشروعي الذكية: ${publicUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        className="bg-[#0e0e14] border border-[#00FFC2]/40 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative font-['Cairo']"
      >
        {/* Glow Header */}
        <div className="bg-gradient-to-b from-[#7000FF]/25 via-[#7000FF]/5 to-transparent p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-xl text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-black flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#7000FF]/30">
            <Sparkles className="w-8 h-8 text-black animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-white mb-2">🎉 مبروك! تم إطلاق مشروعك بنجاح</h2>
          <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
            موقع <span className="text-[#00FFC2] font-bold">{currentProject.name}</span> أصبح جاهزاً للعملاء ومتاحاً عبر الإنترنت على مدار الساعة!
          </p>
        </div>

        {/* URL Box */}
        <div className="px-6 pb-6 space-y-4">
          <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Globe className="w-4 h-4 text-[#00FFC2] shrink-0" />
              <span className="text-sm font-mono text-[#00FFC2] truncate" dir="ltr">
                {publicUrl}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="p-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors border border-white/10"
            >
              <Copy className="w-3.5 h-3.5" />
              نسخ
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose();
                setActiveView("live_site");
              }}
              className="py-3 px-4 bg-[#00FFC2] hover:bg-[#00e6af] font-bold text-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00FFC2]/20"
            >
              <ExternalLink className="w-4 h-4" />
              زيارة الموقع المباشر
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="py-3 px-4 bg-white/5 hover:bg-white/10 font-bold text-white border border-white/10 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              مشاركة بالواتساب
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
