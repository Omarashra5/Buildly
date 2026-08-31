import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { SectionType } from "../../types";
import {
  Layers,
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  ShoppingBag,
  Calendar,
  Award,
  Flame,
  Star,
  MapPin,
  MessageCircle,
  Footprints,
  LayoutTemplate
} from "lucide-react";

export const LeftSidebar: React.FC = () => {
  const {
    currentProject,
    selectedSectionId,
    setSelectedSectionId,
    addSection,
    deleteSection,
    duplicateSection,
    moveSection,
    updateSection,
    setIsAiDrawerOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<"sections" | "add_catalog">("sections");

  if (!currentProject) return null;

  // Catalog of addable section types with icons and descriptions
  const sectionCatalog: Array<{
    type: SectionType;
    title: string;
    description: string;
    icon: React.ReactNode;
    defaultData: any;
  }> = [
    {
      type: "hero",
      title: "قسم الواجهة الرئيسية (Hero)",
      description: "عنوان عريض، نص تعريفي، أزرار طلب وصورة رئيسية",
      icon: <Sparkles className="w-4 h-4 text-[#00FFC2]" />,
      defaultData: {
        title: "اكتشف الطعم والجودة الاستثنائية",
        subtitle: "نصنع لكم تجربة فريدة مع أحدث الخدمات وأفضل الأسعار.",
        ctaText: "تصفح المنيو والطلب",
        imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
      }
    },
    {
      type: "products",
      title: "شبكة المنتجات والمنيو (Products Grid)",
      description: "عرض المنتجات مع فلتر التصنيفات، الأسعار، والسلة",
      icon: <ShoppingBag className="w-4 h-4 text-[#00FFC2]" />,
      defaultData: {
        title: "قائمة المنتجات الأكثر طلباً",
        subtitle: "تم اختيارها بعناية لتناسب كل الأذواق"
      }
    },
    {
      type: "booking",
      title: "نظام الحجز والمواعيد (Booking)",
      description: "حجز طاولات، ملاعب، أو جلسات مع اختيار التاريخ والوقت",
      icon: <Calendar className="w-4 h-4 text-[#A870FF]" />,
      defaultData: {
        title: "احجز موعدك أو طاولتك الآن",
        subtitle: "تأكيد فوري عبر واتساب وبدون انتظار"
      }
    },
    {
      type: "offers",
      title: "العروض الخاصة والخصومات (Offers)",
      description: "بانرات تفاعلية للخصومات مع كود الخصم وزر الطلب",
      icon: <Flame className="w-4 h-4 text-rose-400" />,
      defaultData: {
        title: "عروض لفترة محدودة 🔥",
        subtitle: "استفد من أقوى التخفيضات الحصرية اليوم"
      }
    },
    {
      type: "features",
      title: "مميزاتنا ولماذا تختارنا (Features)",
      description: "أيقونات ونقاط قوة تميز مشروعك عن المنافسين",
      icon: <Award className="w-4 h-4 text-cyan-400" />,
      defaultData: {
        title: "لماذا يفضلنا عملاؤنا دائماً؟",
        subtitle: "نلتزم بأعلى معايير الجودة والسرعة"
      }
    },
    {
      type: "testimonials",
      title: "آراء وتقييمات العملاء (Reviews)",
      description: "تقييمات النجوم، تعليقات العملاء، وتجاربهم الموثقة",
      icon: <Star className="w-4 h-4 text-amber-400" />,
      defaultData: {
        title: "تجارب حقيقية من عملائنا",
        subtitle: "أكثر من 500+ تقييم 5 نجوم على منصاتنا"
      }
    },
    {
      type: "branches",
      title: "الفروع والمواقع الجغرافية (Branches)",
      description: "ساعات العمل، أرقام التواصل، وروابط خرائط جوجل",
      icon: <MapPin className="w-4 h-4 text-emerald-400" />,
      defaultData: {
        title: "فروعنا ومواقع الخدمة",
        subtitle: "يسعدنا استقبالكم في أقرب فرع إليكم"
      }
    },
    {
      type: "whatsapp_cta",
      title: "بانر التواصل السريع واتساب (WhatsApp CTA)",
      description: "زر مباشر لفتح محادثة واتساب برابط مخصص",
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      defaultData: {
        title: "هل لديك أي استفسار أو طلب خاص؟",
        subtitle: "فريقنا متواجد على مدار الساعة لخدمتك عبر واتساب",
        ctaText: "تواصل معنا مباشرة عبر واتساب"
      }
    },
    {
      type: "footer",
      title: "تذييل الصفحة (Footer)",
      description: "حقوق النشر، روابط السوشيال ميديا وساعات العمل",
      icon: <Footprints className="w-4 h-4 text-zinc-400" />,
      defaultData: {
        title: currentProject.name,
        subtitle: "جميع الحقوق محفوظة © " + new Date().getFullYear()
      }
    }
  ];

  return (
    <aside className="w-72 h-full bg-[#0a0a0f] border-l border-white/10 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Tab Bar */}
      <div className="p-3 border-b border-white/10 flex items-center gap-1.5 bg-[#0e0e14]">
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "sections"
              ? "bg-[#00FFC2] text-black shadow-md"
              : "bg-white/5 text-white/60 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>هيكل الصفحة ({currentProject.sections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("add_catalog")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "add_catalog"
              ? "bg-[#00FFC2] text-black shadow-md"
              : "bg-white/5 text-white/60 hover:text-white"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة أقسام</span>
        </button>
      </div>

      {/* Tab: Structure & Sections Manager */}
      {activeTab === "sections" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* AI Re-order / Section Generator Banner */}
          <div className="p-3 bg-gradient-to-r from-[#7000FF]/10 to-transparent border-b border-white/10">
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-[#00FFC2] text-xs font-bold rounded-xl border border-[#00FFC2]/30 flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A870FF] animate-pulse" />
              <span>مساعد الذكاء الاصطناعي لتوليد أقسام</span>
            </button>
          </div>

          {/* Sections List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {currentProject.sections.map((sec, index) => {
              const isSelected = selectedSectionId === sec.id;
              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`group p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#7000FF]/20 border-[#00FFC2] text-white shadow-md ring-1 ring-[#00FFC2]/40"
                      : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-[11px] font-mono text-white/40 shrink-0">#{index + 1}</span>
                      <p className="text-xs font-bold truncate">{sec.title || sec.type}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      {/* Hide/Show Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateSection(sec.id, { hidden: !sec.hidden });
                        }}
                        className="p-1 rounded text-white/40 hover:text-white"
                        title={sec.hidden ? "إظهار" : "إخفاء"}
                      >
                        {sec.hidden ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      {/* Move Up */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(sec.id, "up");
                        }}
                        disabled={index === 0}
                        className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20"
                        title="تحريك لأعلى"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSection(sec.id, "down");
                        }}
                        disabled={index === currentProject.sections.length - 1}
                        className="p-1 rounded text-white/40 hover:text-white disabled:opacity-20"
                        title="تحريك لأسفل"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSection(sec.id);
                        }}
                        className="p-1 rounded text-white/40 hover:text-white"
                        title="تكرار"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSection(sec.id);
                        }}
                        className="p-1 rounded text-white/40 hover:text-rose-400"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Add Sections Catalog */}
      {activeTab === "add_catalog" && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          <p className="text-[11px] text-white/40 px-1 font-semibold">اضغط على أي قسم لإضافته فوراً إلى مشروعك:</p>
          {sectionCatalog.map((item) => (
            <div
              key={item.type}
              onClick={() => {
                addSection({
                  type: item.type,
                  ...item.defaultData
                });
                setActiveTab("sections");
              }}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00FFC2]/60 rounded-xl cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#0e0e14] border border-white/10">{item.icon}</div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#00FFC2] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <Plus className="w-4 h-4 text-white/40 group-hover:text-[#00FFC2] group-hover:scale-125 transition-all" />
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed pr-8">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
