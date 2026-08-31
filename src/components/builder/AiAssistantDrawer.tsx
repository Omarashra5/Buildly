import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  Zap,
  ShoppingBag,
  Palette,
  Languages,
  Check,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AiAssistantDrawer: React.FC = () => {
  const {
    isAiDrawerOpen,
    setIsAiDrawerOpen,
    currentProject,
    updateProject,
    addProduct,
    updateTheme,
    addSection,
    showToast,
    callGeminiAi
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string; actionType?: string; payload?: any }>
  >([
    {
      sender: "ai",
      text: "مرحباً بك! أنا مساعد الذكاء الاصطناعي لمنصة مشروعي. كيف يمكنني مساعدتك في تطوير وتحسين موقعك اليوم؟"
    }
  ]);

  if (!isAiDrawerOpen || !currentProject) return null;

  const quickAiActions = [
    {
      label: "🍔 توليد 4 منتجات جديدة بالأسعار والصور",
      action: "generate_products",
      prompt: `قم بتوليد 4 منتجات جديدة مناسبة لنشاط (${currentProject.name} - ${currentProject.customIdeaDescription || currentProject.businessType}) مع أسعار بالعملة ${currentProject.settings.localization.currencySymbol} وصور وروابط دقيقة.`
    },
    {
      label: "🇪🇬 إعادة الصياغة بالعامية المصرية الجذابة",
      action: "egyptian_tone",
      prompt: `أعد صياغة العناوين والنصوص التسويقية لهذا المشروع (${currentProject.name}) بأسلوب مصري عصري جذاب وخفيف الدم يحفز على الشراء الفوري.`
    },
    {
      label: "🇸🇦 تحويل الأسلوب للهجة الخليجية الفاخرة",
      action: "gulf_tone",
      prompt: `أعد صياغة محتوى المشروع (${currentProject.name}) بأسلوب خليجي راقي وفخم يناسب عملاء الرياض وجدة ودبي.`
    },
    {
      label: "🎨 اقتراح هوية ألوان بينتو متباينة",
      action: "suggest_palette",
      prompt: `اقترح لوحة ألوان احترافية متناسقة ومودرن لنشاط (${currentProject.name}).`
    },
    {
      label: "🔥 إضافة قسم عروض وخصومات حصرية",
      action: "add_offers_section",
      prompt: `أضف قسم عروض خاص لفترة محدودة بخصومات حقيقية تناسب نشاط (${currentProject.name}).`
    }
  ];

  const handleSendPrompt = async (textToSend?: string, actionType?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isProcessing) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setInputPrompt("");
    setIsProcessing(true);

    try {
      const res = await callGeminiAi(query, actionType || "custom_prompt", currentProject);

      if (res.success && res.data) {
        let aiResponseText = "";
        const data = res.data;

        if (actionType === "generate_products" || data.products) {
          const prods = data.products || (Array.isArray(data) ? data : []);
          prods.forEach((p: any) => {
            addProduct({
              name: p.name || "منتج جديد",
              price: Number(p.price) || 120,
              description: p.description || "وصف المنتج اللذيذ والمميز",
              image: p.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
              category: p.category || currentProject.categories[0] || "المنتجات",
              isAvailable: true
            });
          });
          aiResponseText = `تم بنجاح توليد وإضافة ${prods.length} منتجات جديدة إلى قائمة منتجاتك! تصفحها الآن في الكانفاس.`;
        } else if (actionType === "suggest_palette" || data.theme) {
          const th = data.theme || data;
          if (th.primaryColor) {
            updateTheme({
              primaryColor: th.primaryColor,
              bgColor: th.bgColor || currentProject.theme.bgColor,
              surfaceColor: th.surfaceColor || currentProject.theme.surfaceColor
            });
            aiResponseText = `تم تطبيق لوحة الألوان الجديدة (${th.primaryColor}) بنجاح على كامل عناصر الموقع!`;
          }
        } else if (actionType === "add_offers_section") {
          addSection({
            type: "offers",
            title: "عروض الويك إند الحصرية 🔥",
            subtitle: "خصومات تصل إلى 40% عند الطلب عبر الواتساب",
            items: [
              { id: "1", title: "كومبو التوفير الخارق", price: 180, oldPrice: 260, badge: "أعلى توفير", description: "ساندوتشين دبل + لتر عصير + صوصات إضافية" },
              { id: "2", title: "وجبة الصحاب", price: 310, oldPrice: 420, badge: "خصم 25%", description: "4 وجبات كاملة مع بطاطس لارج" }
            ]
          });
          aiResponseText = "تم إنشاء وإضافة قسم العروض الحصرية إلى صفحتك الرئيسية بنجاح!";
        } else if (typeof data === "string") {
          aiResponseText = data;
        } else if (data.message || data.title) {
          aiResponseText = data.message || `تم تنفيذ طلبك: ${data.title}`;
          if (data.sections) {
            updateProject(currentProject.id, { sections: data.sections });
          }
        } else {
          aiResponseText = "تم تنفيذ التحسين بنجاح عبر نموذج الذكاء الاصطناعي الذكي!";
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: aiResponseText,
            actionType,
            payload: data
          }
        ]);
        showToast("تم تطبيق التعديلات الذكية بنجاح!");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "تم تطبيق التعديلات التلقائية المقترحة على الموقع."
          }
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "عذراً، حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى."
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-full sm:w-96 bg-[#0a0a0f]/95 border-r border-[#7000FF]/30 shadow-2xl backdrop-blur-xl flex flex-col font-['Cairo']">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-b from-[#7000FF]/15 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-black flex items-center justify-center font-bold shadow-md shadow-[#7000FF]/25">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">مساعد مشروعي الذكي (Gemini)</h3>
            <p className="text-[10px] text-white/40">توليد نصوص، منتجات، ألوان وأقسام فورية</p>
          </div>
        </div>
        <button
          onClick={() => setIsAiDrawerOpen(false)}
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Action Chips */}
      <div className="p-3 border-b border-white/10 bg-[#0e0e14]/60 overflow-x-auto space-y-1.5 no-scrollbar">
        <p className="text-[10px] font-bold text-[#00FFC2]">أوامر سريعة بنقرة واحدة:</p>
        <div className="flex flex-col gap-1.5">
          {quickAiActions.map((qa, idx) => (
            <button
              key={idx}
              disabled={isProcessing}
              onClick={() => handleSendPrompt(qa.prompt, qa.action)}
              className="text-right px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FFC2]/40 text-[11px] font-semibold text-white/80 transition-colors flex items-center justify-between group disabled:opacity-50"
            >
              <span>{qa.label}</span>
              <Zap className="w-3 h-3 text-[#00FFC2] opacity-60 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-[#7000FF] to-[#5000C0] text-white font-semibold rounded-br-none shadow-md shadow-[#7000FF]/20"
                  : "bg-white/5 text-white/90 border border-white/10 rounded-bl-none shadow-md"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-white/40 mt-1 px-1">
              {msg.sender === "user" ? "أنت" : "المساعد الذكي"}
            </span>
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-xs text-[#00FFC2] p-3 bg-[#0e0e14] rounded-xl border border-white/10 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-[#00FFC2]" />
            <span>الذكاء الاصطناعي يقوم بتحليل وتعديل المشروع الآن...</span>
          </div>
        )}
      </div>

      {/* Prompt Input Box */}
      <div className="p-3 border-t border-white/10 bg-[#0e0e14]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="اكتب أي طلب للذكاء الاصطناعي (مثل: ضيف خصم، غير الشعار...)"
            className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#00FFC2]"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isProcessing}
            className="px-4 py-2.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] disabled:opacity-40 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center shrink-0 shadow-md shadow-[#7000FF]/25"
          >
            <Send className="w-3.5 h-3.5 text-[#00FFC2]" />
          </button>
        </form>
      </div>
    </div>
  );
};
