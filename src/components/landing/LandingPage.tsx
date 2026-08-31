import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { BUSINESS_CATEGORIES, INITIAL_PROJECTS } from "../../data/mockData";
import { WebsiteRenderer } from "../canvas/WebsiteRenderer";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Zap,
  ShoppingBag,
  Calendar,
  Layers,
  Palette,
  Phone,
  ShieldCheck,
  MessageCircle,
  Flame,
  ArrowRight,
  Laptop,
  Check,
  Play,
  Sliders,
  Award,
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin }) => {
  const { setActiveView, setCurrentProject, projects } = useApp();

  const [heroPrompt, setHeroPrompt] = useState("");
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  const previewProject = projects[activePreviewIndex] || INITIAL_PROJECTS[0];

  const handleStartWithPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView("wizard");
  };

  const handleSelectCategory = (catId: string) => {
    setActiveView("wizard");
  };

  const handleOpenDemoInBuilder = (proj: any) => {
    setCurrentProject(proj);
    setActiveView("builder");
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-[#00FFC2] selection:text-black font-['Cairo'] overflow-x-hidden relative">
      {/* GLOW BACKGROUND ORBS - BENTO NEON THEME */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[400px] bg-[#7000FF]/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-[#00FFC2]/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[450px] h-[450px] bg-[#7000FF]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* STICKY TOP NAVBAR */}
      <nav className="h-20 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView("landing")}>
            <div className="w-10 h-10 bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-[#7000FF]/30">
              م
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                مشروعي
              </span>
              <span className="hidden sm:inline-block mr-2 px-2 py-0.5 rounded-full text-[9px] font-black bg-[#7000FF]/20 text-[#A870FF] border border-[#7000FF]/30">
                BENTO AI FACTORY
              </span>
            </div>
          </div>

          <div className="hidden lg:flex gap-8 text-sm font-medium text-white/50">
            <a href="#hero-bento" className="hover:text-white transition-colors">الرئيسية</a>
            <a href="#showcase" className="hover:text-[#00FFC2] transition-colors">النماذج الحية</a>
            <a href="#categories" className="hover:text-[#00FFC2] transition-colors">الأنشطة</a>
            <a href="#features" className="hover:text-[#00FFC2] transition-colors">المميزات</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="text-xs sm:text-sm font-medium text-white/70 px-3 sm:px-4 py-2 hover:text-white transition-colors flex items-center gap-1.5 border border-white/5 hover:border-white/20 rounded-xl bg-[#111115]"
          >
            <ShieldCheck className="w-4 h-4 text-[#A870FF]" />
            <span>لوحة الإدارة</span>
          </button>
          <button
            onClick={() => setActiveView("wizard")}
            className="bg-white text-black text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 rounded-full hover:bg-[#00FFC2] transition-all transform hover:scale-105 shadow-xl shadow-white/10"
          >
            ابدأ مشروعك
          </button>
        </div>
      </nav>

      {/* HERO SECTION - BENTO GRID MASTER LAYOUT */}
      <section id="hero-bento" className="max-w-7xl mx-auto p-4 sm:p-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left / Primary Column (7 cols): Big Headline, Prompt Box, Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 bg-gradient-to-br from-[#1a1a20]/80 to-[#111115]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#7000FF]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7000FF]/20 border border-[#7000FF]/30 text-[#A870FF] text-[10px] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#00FFC2] animate-pulse"></span>
                عصر الذكاء الاصطناعي وصل
              </div>

              <h1 className="text-4xl sm:text-6xl xl:text-[72px] leading-[1.05] font-black tracking-tighter text-white">
                ابني <span className="text-[#00FFC2]">مشروعك</span>
                <br />
                بطريقتك.
              </h1>

              <p className="text-sm sm:text-base text-white/50 max-w-xl leading-relaxed font-light">
                اصنع أي موقع تتخيله في ثوانٍ. تحكم في كل التفاصيل برؤية فنية. ابدأ من قالب احترافي، أو دع الذكاء الاصطناعي يبني لك متجراً أو موقع خدمات متكاملاً ومربوطاً بطلبات الواتساب.
              </p>
            </div>

            {/* Glowing AI Prompt Bar */}
            <div className="relative max-w-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7000FF] to-[#00FFC2] blur-xl opacity-25 group-hover:opacity-50 transition-opacity rounded-2xl" />
              <form
                onSubmit={handleStartWithPrompt}
                className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-[#111115] border border-white/15 rounded-2xl p-2 gap-2 shadow-2xl"
              >
                <div className="flex-1 flex items-center px-4 gap-2">
                  <Sparkles className="w-4 h-4 text-[#00FFC2] shrink-0" />
                  <input
                    type="text"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    placeholder="صف مشروعك هنا... (مثلاً: مطعم مأكولات بحرية، جيم، بادل)"
                    className="flex-1 bg-transparent py-2 sm:py-3 outline-none text-white/90 placeholder:text-white/25 text-xs sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] hover:to-[#6010D0] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-[#7000FF]/40 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>توليد الموقع</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bento Stats Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white">+1,200</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">قالب جاهز</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00FFC2]">12.4k</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">مشروع نُشر</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#A870FF]">99.9%</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">وقت التشغيل</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Bento Feature Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {/* Bento Cell 1: Fast Food */}
            <div
              onClick={() => handleSelectCategory("fastfood")}
              className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#00FFC2]/50 transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFC2]/40" />
              <div className="text-[#00FFC2] font-black text-3xl opacity-25">01</div>
              <div className="space-y-1 mt-4">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00FFC2] transition-colors">
                  مطاعم وكافيهات
                </h3>
                <p className="text-xs text-white/40">منيو ذكي، حجز طاولات، وطلبات أونلاين عبر واتساب</p>
              </div>
            </div>

            {/* Bento Cell 2: E-Commerce */}
            <div
              onClick={() => handleSelectCategory("ecommerce")}
              className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#7000FF]/50 transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#7000FF]/40" />
              <div className="text-[#7000FF] font-black text-3xl opacity-25">02</div>
              <div className="space-y-1 mt-4">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#A870FF] transition-colors">
                  متاجر إلكترونية
                </h3>
                <p className="text-xs text-white/40">إدارة منتجات، دفع، وسلة شراء تفاعلية فورية</p>
              </div>
            </div>

            {/* Bento Cell 3: Full Width Hero Card */}
            <div
              onClick={() => setActiveView("wizard")}
              className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between sm:col-span-2 group hover:bg-[#1a1a25] hover:border-white/20 transition-all relative cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00FFC2]/15 text-[#00FFC2] text-[10px] font-bold">
                    الأكثر طلباً بالـ AI
                  </span>
                  <h3 className="font-black text-xl sm:text-2xl text-white">الأعمال والشركات</h3>
                  <p className="text-xs sm:text-sm text-white/40 max-w-[280px]">
                    حلول متكاملة للهوية البصرية والخدمات المهنية والعيادات
                  </p>
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] flex items-center justify-center text-black font-black text-lg">
                    W
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Cell 4: Sports & Padel */}
            <div
              onClick={() => handleSelectCategory("padel")}
              className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <div className="text-blue-400 font-black text-3xl opacity-25">04</div>
              <div className="space-y-1 mt-4">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors">
                  ملاعب وبادل
                </h3>
                <p className="text-xs text-white/40">جدول مواعيد وحجز الساعات التفاعلي</p>
              </div>
            </div>

            {/* Bento Cell 5: Gym & Clinic */}
            <div
              onClick={() => handleSelectCategory("gym")}
              className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:border-pink-500/50 transition-all cursor-pointer"
            >
              <div className="text-pink-400 font-black text-3xl opacity-25">05</div>
              <div className="space-y-1 mt-4">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-pink-400 transition-colors">
                  جيم ولياقة
                </h3>
                <p className="text-xs text-white/40">باقات اشتراك، تدريب شخصي، وتواصل مباشر</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE SHOWCASE SWITCHER - BENTO FRAME */}
      <section id="showcase" className="py-16 sm:py-20 border-t border-white/5 bg-[#07070a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFC2]/10 border border-[#00FFC2]/20 text-[#00FFC2] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                نماذج حية جاهزة للتصفح والتحرير
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                شاهد كيف تبدو المواقع المولدة عبر "مشروعي"
              </h3>
              <p className="text-sm text-white/40 max-w-xl">
                اضغط على أي نشاط لمعاينة موقعه التفاعلي، وجرّب سلة الطلبات وحجز المواعيد بنفسك!
              </p>
            </div>

            {/* Interactive Category Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActivePreviewIndex(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activePreviewIndex === idx
                      ? "bg-[#00FFC2] text-black shadow-lg shadow-[#00FFC2]/20 font-black scale-105"
                      : "bg-[#111115] border border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span>{proj.name}</span>
                  <span className="text-[10px] opacity-70">({proj.businessType})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Website Interactive Bento Frame */}
          <div className="rounded-3xl border border-white/10 bg-[#111115] overflow-hidden shadow-2xl relative">
            {/* Browser Top Chrome */}
            <div className="p-4 bg-[#09090d] border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>

              <div className="bg-[#15151c] px-4 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-[#00FFC2] flex items-center gap-2" dir="ltr">
                <Globe className="w-3.5 h-3.5" />
                https://{previewProject.settings.publish.subdomain || previewProject.slug}.mashrouiy.com
              </div>

              <button
                onClick={() => handleOpenDemoInBuilder(previewProject)}
                className="px-4 py-1.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#7000FF]/30"
              >
                <Sliders className="w-3.5 h-3.5 text-[#00FFC2]" />
                <span>تعديل هذا النموذج في الكانفاس</span>
              </button>
            </div>

            {/* Embedded Live Renderer */}
            <div className="max-h-[650px] overflow-y-auto bg-black">
              <WebsiteRenderer project={previewProject} isBuilderMode={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 50+ BUSINESS CATEGORIES EXPLORER - BENTO CARDS */}
      <section id="categories" className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#A870FF] text-xs font-bold uppercase tracking-wider">أنشطة لا حصر لها</span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              يدعم أكثر من 50 نموذج عمل تجاري وخدمي
            </h3>
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              اختر نشاطك لتبدأ بقالب مهيأ مسبقاً بقوائم طعام، باقات اشتراك، أو جداول حجز متطورة
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {BUSINESS_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="bento-card p-5 cursor-pointer transition-all flex flex-col justify-between gap-4 group text-right hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#00FFC2] flex items-center justify-center font-bold text-base group-hover:bg-[#7000FF]/30 group-hover:scale-110 transition-all">
                    V
                  </div>
                  <span className="text-[11px] font-mono text-white/20 font-bold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[#00FFC2] transition-colors">
                    {cat.nameAr}
                  </h4>
                  <p className="text-[11px] text-white/40 line-clamp-2 mt-1 leading-relaxed">{cat.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURISTIC FEATURES BENTO GRID */}
      <section id="features" className="py-16 sm:py-20 border-t border-white/5 bg-[#07070a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#00FFC2] text-xs font-bold uppercase tracking-wider">أدوات خارقة مدمجة</span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              كل ما تحتاجه لإطلاق وإدارة مشروعك في مكان واحد
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl hover:border-[#00FFC2]/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FFC2]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-[#00FFC2] flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">سلة واتساب ذكية ومباشرة</h4>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                العملاء يختارون منتجاتهم وساندوتشاتهم وتصلك الطلبات منسقة ومفصلة مع الإجمالي والعنوان مباشرة على الواتساب.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl hover:border-[#7000FF]/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#7000FF]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-[#7000FF]/10 border border-[#7000FF]/30 text-[#A870FF] flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">محرك حجز الملاعب والعيادات</h4>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                جدول زمني لاختيار مواعيد مباريات كرة القدم والبادل أو حجز الكشف الطبي مع تأكيد الحجز الفوري.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 rounded-3xl p-8 space-y-4 shadow-xl hover:border-blue-500/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">صياغة محتوى باللهجة المحلية</h4>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                الذكاء الاصطناعي يعيد صياغة العناوين والنصوص بالعامية المصرية أو اللهجة الخليجية الفاخرة لزيادة المبيعات.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#7000FF] via-[#5000C0] to-[#00FFC2] p-[1px] shadow-2xl">
          <div className="bg-[#0c0c10] rounded-[23px] p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              جاهز تطلق موقعك التجاري الأول الآن؟
            </h3>

            <p className="text-base sm:text-lg text-white/60 font-medium max-w-xl mx-auto">
              انضم للآلاف من أصحاب الأعمال والمشاريع وابدأ في بناء موقعك بالذكاء الاصطناعي خلال 30 ثانية فقط.
            </p>

            <div className="pt-4">
              <button
                onClick={() => setActiveView("wizard")}
                className="px-10 py-4 bg-white hover:bg-[#00FFC2] text-black font-black text-sm sm:text-base rounded-2xl shadow-2xl hover:scale-105 transition-all"
              >
                ابدأ مشروعك مجاناً فوراً
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - BENTO STYLE */}
      <footer className="h-16 border-t border-white/5 flex items-center justify-between px-4 sm:px-8 text-[11px] text-white/30 tracking-wider font-mono bg-[#030305]">
        <div>حقوق الطبع والنشر © {new Date().getFullYear()} مشروعي - منصة بناء المستقبل <br />
        </div>
          <div className="text-center">
       Created By Omar Ashraf 
          </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFC2] animate-pulse"></span>
            جميع الأنظمة تعمل
          </span>
          <span className="hidden sm:inline">V 2.0.4-BENTO</span>
        </div>
      </footer>

      {/* FLOATING ACTION LAUNCHER (Bento Floating Chat/Action Bubble) */}
      <div
        onClick={() => setActiveView("wizard")}
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#7000FF] rounded-2xl shadow-2xl shadow-[#7000FF]/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-50 group border border-white/10"
        title="توليد فكرة مشروع جديدة"
      >
        ! GO
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00FFC3] rounded-full border-2 border-[#030305]" />
      </div>
    </div>
  );
};
