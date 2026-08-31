import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { BUSINESS_CATEGORIES, CULTURE_PRESETS, STYLE_PRESETS } from "../../data/mockData";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Zap,
  Globe,
  Palette,
  Loader2,
  Building2,
  HelpCircle,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ProjectWizard: React.FC = () => {
  const { createProject, setActiveView, setCurrentProject, callGeminiAi, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [businessType, setBusinessType] = useState<string>("fastfood");
  const [isCustomIdea, setIsCustomIdea] = useState(false);
  const [customIdeaText, setCustomIdeaText] = useState("");
  const [projectName, setProjectName] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<string>("egypt");
  const [selectedStyle, setSelectedStyle] = useState<string>("dark_modern");

  // AI Generation Progress state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStepText, setGenerationStepText] = useState("جاري تحليل فكرة المشروع...");
  const [generationProgress, setGenerationProgress] = useState(15);

  const selectedCategoryObj = BUSINESS_CATEGORIES.find((c) => c.id === businessType);

  // Suggested Prompts for Quick Selection
  const sampleCustomIdeas = [
    "موقع لبيع ساعات رولكس مستعملة أصلية مع شهادة ضمان وكشف أصالة",
    "أكاديمية تدريب سباحة للأطفال مع اشتراكات شهرية وحجز مواعيد",
    "براند عطور شرقية وبخور فاخر مع تجربة عينات مجانية عند الطلب",
    "مكتب محاماة واستشارات قانونية للشركات مع حجز استشارة أونلاين",
    "مغسلة سيارات متنقلة دليفري بتوصل عند البيت بالموعد"
  ];

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(4);

    const name = projectName.trim() || (isCustomIdea ? "مشروعي المخصص" : selectedCategoryObj?.nameAr || "مشروعي الجديد");
    const ideaDesc = isCustomIdea ? customIdeaText : selectedCategoryObj?.tagline || "";

    // Simulated progress steps with real AI call
    setGenerationStepText("1/4: تحليل نموذج العمل وجمهور المشروع المستهدف...");
    setGenerationProgress(25);

    try {
      setTimeout(() => {
        setGenerationStepText("2/4: صياغة النصوص التسويقية والعناوين الجذابة...");
        setGenerationProgress(50);
      }, 1000);

      setTimeout(() => {
        setGenerationStepText("3/4: جلب الصور عالية الدقة المطابقة للنشاط...");
        setGenerationProgress(75);
      }, 2000);

      setTimeout(() => {
        setGenerationStepText("4/4: تركيب وتجهيز عناصر وألوان الموقع...");
        setGenerationProgress(95);
      }, 2800);

      // Call AI to generate rich tailored sections if custom idea
      const prompt = `أنشئ موقعاً تجارياً استثنائياً باسم "${name}" متخصص في (${ideaDesc}). البلد: ${selectedCountry}. نمط التصميم: ${selectedStyle}.`;
      await callGeminiAi(prompt, "generate_project");

      setTimeout(() => {
        // Find style colors
        const styleObj = STYLE_PRESETS.find((s) => s.id === selectedStyle);
        const countryObj = CULTURE_PRESETS.find((c) => c.id === selectedCountry);

        // Find thumbnail
        const previewThumbnail = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";

        const newProj = createProject({
          name,
          businessType: isCustomIdea ? "custom" : (businessType as any),
          customIdeaDescription: ideaDesc,
          country: selectedCountry as any,
          designStyle: selectedStyle as any,
          previewThumbnail,
          theme: {
            primaryColor: styleObj?.primary || "#7000FF",
            secondaryColor: "#5000C0",
            accentColor: "#00FFC2",
            bgColor: styleObj?.bg || "#030305",
            surfaceColor: styleObj?.surface || "#111115",
            textColor: "#ffffff",
            textMutedColor: "#9ca3af",
            fontFamily: styleObj?.font || "Cairo",
            borderRadius: "xl",
            shadow: "glow",
            backgroundType: "pattern",
            backgroundPattern: "radial"
          },
          settings: {
            general: {
              projectName: name,
              businessName: name,
              description: ideaDesc,
              category: isCustomIdea ? "مخصص" : selectedCategoryObj?.nameAr || "عام",
              tagline: "أفضل تجربة وقيمة لعملائنا دائماً"
            },
            branding: {},
            localization: {
              country: selectedCountry as any,
              language: "ar",
              direction: "rtl",
              currency: countryObj?.currency || "جنيه",
              currencySymbol: countryObj?.symbol || "ج.م"
            },
            contact: {
              phone: "01000000000",
              whatsapp: "201000000000",
              email: `contact@${name.toLowerCase().replace(/\s+/g, "")}.com`,
              address: `${countryObj?.nameAr || "القاهرة"}، الفرع الرئيسي`
            },
            social: {},
            seo: {
              title: `${name} | الموقع الرسمي`,
              description: ideaDesc,
              keywords: [name, "مشروعي", "موقع تجاري"]
            },
            publish: {
              subdomain: name.toLowerCase().replace(/[^a-z0-9]/g, "-") || `project-${Date.now()}`,
              isPublished: false
            }
          }
        });

        setCurrentProject(newProj);
        setIsGenerating(false);
        setActiveView("builder");
        showToast("تهانينا! تم إنشاء موقعك بنجاح وجاهز الآن للتحرير");
      }, 3500);
    } catch (err) {
      setIsGenerating(false);
      showToast("حدث خطأ أثناء التوليد، يمكنك المحاولة مجدداً");
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white font-['Cairo'] flex flex-col justify-between selection:bg-[#00FFC2] selection:text-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[300px] bg-[#7000FF]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00FFC2]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Wizard Navigation */}
      <header className="p-4 sm:p-6 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("landing")}
            className="p-2 rounded-xl bg-[#111115] hover:bg-[#1a1a20] border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#7000FF]/30">
              م
            </div>
            <span className="font-extrabold text-sm text-white">منشئ المواقع الذكي • Bento AI</span>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
          {[
            { step: 1, label: "فكرة النشاط" },
            { step: 2, label: "الدولة والعملة" },
            { step: 3, label: "الهوية والتصميم" },
            { step: 4, label: "توليد الـ AI" }
          ].map((s) => (
            <div
              key={s.step}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentStep === s.step
                  ? "bg-[#00FFC2] text-black font-black shadow-lg shadow-[#00FFC2]/20"
                  : currentStep > s.step
                  ? "text-[#A870FF] bg-[#7000FF]/20 border border-[#7000FF]/40"
                  : "text-white/40 bg-[#111115] border border-white/5"
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-black/20 font-bold">
                {currentStep > s.step ? "✓" : s.step}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Main Wizard Step Box */}
      <main className="max-w-4xl mx-auto w-full p-4 sm:p-8 flex-1 flex flex-col justify-center">
        {/* STEP 1: BUSINESS IDEA & CATEGORY */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">ما هي فكرة ونشاط موقعك؟</h2>
              <p className="text-sm text-white/50">اختر من الأنشطة الشائعة أو اكتب فكرتك الخاصة بحرية تامة</p>
            </div>

            {/* Switch between Presets vs Custom Idea */}
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsCustomIdea(false)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  !isCustomIdea
                    ? "bg-[#00FFC2] text-black shadow-lg shadow-[#00FFC2]/20 font-black"
                    : "bg-[#111115] text-white/50 hover:text-white border border-white/10"
                }`}
              >
                تصفح الأنشطة الجاهزة ({BUSINESS_CATEGORIES.length})
              </button>
              <button
                type="button"
                onClick={() => setIsCustomIdea(true)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCustomIdea
                    ? "bg-[#00FFC2] text-black shadow-lg shadow-[#00FFC2]/20 font-black"
                    : "bg-[#111115] text-white/50 hover:text-white border border-white/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7000FF]" />
                <span>كتابة فكرة مخصصة بالـ AI</span>
              </button>
            </div>

            {/* Custom Idea Prompt Box */}
            {isCustomIdea ? (
              <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-2">اسم المشروع أو البراند (اختياري)</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="مثال: متجر رويال، صيدلية الشفاء، كافيه مزاج..."
                    className="w-full px-4 py-3 bg-[#0c0c10] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#00FFC2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-2">
                    اشرح فكرة الموقع بكل تفاصيلها (الخدمات، المنتجات، طريقة التعامل)
                  </label>
                  <textarea
                    rows={4}
                    value={customIdeaText}
                    onChange={(e) => setCustomIdeaText(e.target.value)}
                    placeholder="اكتب كل ما يخطر في بالك: مثلاً أريد موقعاً لحجز وتأجير يخوت سياحية في البحر الأحمر مع معرض صور وكابتن وحجز بالساعة..."
                    className="w-full px-4 py-3 bg-[#0c0c10] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#00FFC2] leading-relaxed"
                  />
                </div>

                {/* Suggestions Quick Chips */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#00FFC2] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    أفكار جاهزة للتجربة السريعة:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sampleCustomIdeas.map((idea, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCustomIdeaText(idea);
                          setProjectName(idea.split(" ")[2] || "مشروعي الجديد");
                        }}
                        className="text-[11px] text-white/70 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-right transition-colors"
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Preset Categories Grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto p-1 no-scrollbar">
                {BUSINESS_CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setBusinessType(cat.id);
                      setProjectName(cat.nameAr);
                    }}
                    className={`bento-card p-4 cursor-pointer transition-all flex flex-col justify-between gap-3 text-right group relative overflow-hidden ${
                      businessType === cat.id
                        ? "border-[#00FFC2] bg-[#1a1a25] shadow-lg ring-1 ring-[#00FFC2]/50 scale-[1.02]"
                        : "hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white/30">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {businessType === cat.id ? (
                        <div className="w-5 h-5 rounded-full bg-[#00FFC2] text-black flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-xs text-[#A870FF]">جاهز !</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00FFC2] transition-colors">
                        {cat.nameAr}
                      </h4>
                      <p className="text-[10px] text-white/40 line-clamp-2 mt-1">{cat.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Next Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={isCustomIdea && !customIdeaText.trim()}
                className="px-8 py-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] disabled:opacity-40 text-white font-black rounded-xl text-sm transition-all flex items-center gap-2 shadow-xl shadow-[#7000FF]/30"
              >
                <span>المتابعة إلى إعدادات الدولة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: COUNTRY & CULTURE & CURRENCY */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">اختر الدولة والجمهور المستهدف</h2>
              <p className="text-sm text-white/50">سيتم ضبط العملة، صياغة النصوص، وأكواد الهواتف تلقائياً</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CULTURE_PRESETS.map((cntry) => (
                <div
                  key={cntry.id}
                  onClick={() => setSelectedCountry(cntry.id)}
                  className={`bento-card p-5 cursor-pointer transition-all space-y-3 ${
                    selectedCountry === cntry.id
                      ? "border-[#00FFC2] bg-[#1a1a25] shadow-xl ring-1 ring-[#00FFC2]/50"
                      : "hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{cntry.flag}</span>
                    <span className="text-xs font-mono font-bold text-[#00FFC2]">{cntry.symbol}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{cntry.nameAr}</h4>
                    <p className="text-xs text-white/50 mt-1">العملة: {cntry.currency}</p>
                    <p className="text-xs text-white/50">لهجة المحتوى: {cntry.tone}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-[#111115] hover:bg-[#1a1a20] border border-white/10 text-white/70 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع للخلف</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] text-white font-black rounded-xl text-sm transition-all flex items-center gap-2 shadow-xl shadow-[#7000FF]/30"
              >
                <span>المتابعة إلى أسلوب التصميم</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: DESIGN STYLE PRESET */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">اختر الطابع البصري وهوية الألوان</h2>
              <p className="text-sm text-white/50">يمكنك تعديل أي لون أو خط في أي وقت من داخل الكانفاس</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {STYLE_PRESETS.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`bento-card p-5 cursor-pointer transition-all space-y-3 ${
                    selectedStyle === style.id
                      ? "border-[#00FFC2] bg-[#1a1a25] shadow-xl ring-1 ring-[#00FFC2]/50"
                      : "hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-black/50"
                        style={{ backgroundColor: style.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/50"
                        style={{ backgroundColor: style.surface }}
                      />
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">{style.font}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{style.nameAr}</h4>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">{style.descAr}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-[#111115] hover:bg-[#1a1a20] border border-white/10 text-white/70 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع للخلف</span>
              </button>

              <button
                onClick={handleStartGeneration}
                className="px-10 py-4 bg-gradient-to-r from-[#7000FF] via-[#5000C0] to-[#00FFC2] text-white font-black rounded-2xl text-base transition-all flex items-center gap-2 shadow-2xl shadow-[#7000FF]/40 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 fill-current text-[#00FFC2]" />
                <span>إطلاق وتوليد الموقع بالذكاء الاصطناعي </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: AI GENERATION IN PROGRESS */}
        {currentStep === 4 && (
          <div className="text-center space-y-8 py-12">
            <div className="relative w-28 h-28 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-[#7000FF]/30 border-t-[#00FFC2] animate-spin" />
              <div className="absolute inset-3 rounded-full bg-[#111115] flex items-center justify-center text-[#00FFC2] shadow-inner">
                .. Please Wait
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white">الذكاء الاصطناعي يصنع موقعك الآن...</h3>
              <p className="text-sm text-[#00FFC2] font-bold animate-pulse">{generationStepText}</p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto bg-[#111115] border border-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7000FF] to-[#00FFC2]"
                initial={{ width: "10%" }}
                animate={{ width: `${generationProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <p className="text-xs text-white/40 font-mono">يستغرق التوليد الكامل حوالي 3 إلى 5 ثوانٍ فقط</p>
          </div>
        )}
      </main>
    </div>
  );
};
