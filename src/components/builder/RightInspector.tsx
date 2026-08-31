import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sliders,
  Palette,
  Type,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Layout,
  Globe,
  Settings,
  AlignRight,
  AlignCenter,
  AlignLeft,
  ChevronDown
} from "lucide-react";

export const RightInspector: React.FC = () => {
  const {
    currentProject,
    selectedSectionId,
    updateSection,
    updateTheme,
    updateProject,
    openMediaPicker,
    showToast,
    callGeminiAi
  } = useApp();

  const [activeInspectorTab, setActiveInspectorTab] = useState<"section" | "theme" | "settings">("section");
  const [isAiRephrasing, setIsAiRephrasing] = useState(false);

  if (!currentProject) return null;

  const currentSection = currentProject.sections.find((s) => s.id === selectedSectionId) || currentProject.sections[0];
  const { theme, settings } = currentProject;

  const handleAiRephrase = async (field: "title" | "subtitle") => {
    if (!currentSection) return;
    setIsAiRephrasing(true);
    showToast("جاري إعادة الصياغة الإبداعية عبر الذكاء الاصطناعي...", "info");
    try {
      const prompt = `أعد صياغة هذا النص التجاري ليكون جذاباً وقوياً جداً لنشاط (${currentProject.name}): "${currentSection[field]}"`;
      const res = await callGeminiAi(prompt, "rephrase");
      if (res.success && res.data) {
        const text = typeof res.data === "string" ? res.data : res.data.rephrasedText || res.data.title || currentSection[field];
        updateSection(currentSection.id, { [field]: text });
        showToast("تم تحسين النص بنجاح!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiRephrasing(false);
    }
  };

  return (
    <aside className="w-80 bg-[#0a0a0f] border-r border-white/10 flex flex-col h-full overflow-hidden select-none">
      {/* Top Inspector Tabs */}
      <div className="p-3 border-b border-white/10 flex gap-2 bg-[#0e0e14]">
        <button
          onClick={() => setActiveInspectorTab("section")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            activeInspectorTab === "section"
              ? "bg-[#00FFC2] text-black shadow-md"
              : "bg-white/5 text-white/60 hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>القسم المحدد</span>
        </button>

        <button
          onClick={() => setActiveInspectorTab("theme")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
            activeInspectorTab === "theme"
              ? "bg-[#00FFC2] text-black shadow-md"
              : "bg-white/5 text-white/60 hover:text-white"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>الهوية والألوان</span>
        </button>

        <button
          onClick={() => setActiveInspectorTab("settings")}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center transition-colors ${
            activeInspectorTab === "settings"
              ? "bg-[#00FFC2] text-black shadow-md"
              : "bg-white/5 text-white/60 hover:text-white"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION PROPERTIES TAB */}
      {activeInspectorTab === "section" && currentSection && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-xs font-black text-white">{currentSection.title || currentSection.type}</h3>
              <p className="text-[10px] text-white/40">نوع القسم: {currentSection.type}</p>
            </div>
            <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-[#00FFC2]">
              #{currentSection.order}
            </span>
          </div>

          {/* Section Title & Subtitle */}
          <div className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white/80">عنوان القسم الرئيسي</label>
                <button
                  onClick={() => handleAiRephrase("title")}
                  disabled={isAiRephrasing}
                  className="text-[11px] text-[#00FFC2] hover:underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#A870FF]" />
                  صياغة AI
                </button>
              </div>
              <input
                type="text"
                value={currentSection.title || ""}
                onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-white/80">الوصف الفرعي (Subtitle)</label>
                <button
                  onClick={() => handleAiRephrase("subtitle")}
                  disabled={isAiRephrasing}
                  className="text-[11px] text-[#00FFC2] hover:underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#A870FF]" />
                  صياغة AI
                </button>
              </div>
              <textarea
                rows={3}
                value={currentSection.subtitle || ""}
                onChange={(e) => updateSection(currentSection.id, { subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2] resize-none"
              />
            </div>

            {/* Badge Tag (Optional) */}
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">الشارة الترويجية (Badge)</label>
              <input
                type="text"
                placeholder="مثال: خصم 20% لفترة محدودة 🔥"
                value={currentSection.badge || ""}
                onChange={(e) => updateSection(currentSection.id, { badge: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
              />
            </div>
          </div>

          {/* CTA Buttons Config (For Hero / Promo) */}
          {(currentSection.type === "hero" || currentSection.type === "offers") && (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white">أزرار الإجراء (Call to Action)</h4>
              <div>
                <label className="block text-[11px] text-white/40 mb-1">نص الزر الأساسي</label>
                <input
                  type="text"
                  value={currentSection.ctaText || ""}
                  onChange={(e) => updateSection(currentSection.id, { ctaText: e.target.value })}
                  placeholder="مثال: اطلب الآن"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-white/40 mb-1">رابط الزر (Link / Anchor)</label>
                <input
                  type="text"
                  value={currentSection.ctaLink || ""}
                  onChange={(e) => updateSection(currentSection.id, { ctaLink: e.target.value })}
                  placeholder="#products أو https://..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                />
              </div>
            </div>
          )}

          {/* Background Image / Media Picker */}
          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/80">صورة القسم أو الخلفية</label>
              <button
                onClick={() =>
                  openMediaPicker((url) => {
                    updateSection(currentSection.id, { imageUrl: url });
                  })
                }
                className="px-2.5 py-1 bg-gradient-to-r from-[#7000FF] to-[#5000C0] font-bold text-white text-[11px] rounded-lg flex items-center gap-1 transition-all"
              >
                <ImageIcon className="w-3 h-3 text-[#00FFC2]" />
                تغيير الصورة
              </button>
            </div>

            {currentSection.imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-black">
                <img
                  src={currentSection.imageUrl}
                  alt="Section"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => updateSection(currentSection.id, { imageUrl: "" })}
                  className="absolute top-2 left-2 p-1.5 bg-black/80 hover:bg-rose-600 rounded-lg text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() =>
                  openMediaPicker((url) => {
                    updateSection(currentSection.id, { imageUrl: url });
                  })
                }
                className="p-4 border border-dashed border-white/20 hover:border-[#00FFC2] rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white/40 hover:text-white transition-colors"
              >
                <ImageIcon className="w-6 h-6 opacity-60" />
                <span className="text-xs font-semibold">اختر صورة من محرك البحث العالمي</span>
              </div>
            )}
          </div>

          {/* Section Dynamic Items (Services, Reviews, Plans, Offers) */}
          {currentSection.items && (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">عناصر القسم ({currentSection.items.length})</h4>
                <button
                  onClick={() => {
                    const newItem = {
                      id: "item-" + Date.now(),
                      title: "عنصر جديد",
                      description: "وصف تفصيلي للعنصر والمزايا المقدمة",
                      price: 150
                    };
                    updateSection(currentSection.id, {
                      items: [...(currentSection.items || []), newItem]
                    });
                  }}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 text-[#00FFC2] rounded-lg text-[11px] font-bold flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  إضافة عنصر
                </button>
              </div>

              <div className="space-y-2.5">
                {currentSection.items.map((item, idx) => (
                  <div key={item.id || idx} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updated = [...(currentSection.items || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateSection(currentSection.id, { items: updated });
                        }}
                        className="bg-transparent font-bold text-xs text-white focus:outline-none border-b border-transparent focus:border-[#00FFC2] w-full"
                        placeholder="عنوان العنصر"
                      />
                      <button
                        onClick={() => {
                          const updated = (currentSection.items || []).filter((_, i) => i !== idx);
                          updateSection(currentSection.id, { items: updated });
                        }}
                        className="text-white/40 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => {
                        const updated = [...(currentSection.items || [])];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        updateSection(currentSection.id, { items: updated });
                      }}
                      className="bg-black/40 px-2 py-1 rounded text-[11px] text-white/70 focus:outline-none w-full"
                      placeholder="الوصف"
                    />

                    {(item.price !== undefined || currentSection.type === "membership_plans" || currentSection.type === "offers") && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40">السعر:</span>
                        <input
                          type="number"
                          value={item.price || 0}
                          onChange={(e) => {
                            const updated = [...(currentSection.items || [])];
                            updated[idx] = { ...updated[idx], price: Number(e.target.value) };
                            updateSection(currentSection.id, { items: updated });
                          }}
                          className="bg-black/40 px-2 py-0.5 rounded text-xs text-[#00FFC2] font-bold w-20 focus:outline-none font-mono"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* THEME & DESIGN TAB */}
      {activeInspectorTab === "theme" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <h3 className="text-xs font-black text-white pb-2 border-b border-white/10">
            تخصيص الألوان والخطوط والتصميم العام
          </h3>

          {/* Quick Color Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/80">لوحات ألوان جاهزة ومقترحة</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "بينتو نيون فوتشري", primary: "#00FFC2", bg: "#030305", surface: "#111115" },
                { name: "بنفسجي إبداعي VIP", primary: "#7000FF", bg: "#090514", surface: "#170c2e" },
                { name: "أصفر ذهبي فاخر", primary: "#EAB308", bg: "#09090b", surface: "#18181b" },
                { name: "أخضر نيون ملاعب", primary: "#10B981", bg: "#022c22", surface: "#064e3b" },
                { name: "أحمر برجر ناري", primary: "#EF4444", bg: "#0f0505", surface: "#1f0a0a" },
                { name: "أزرق تكنولوجي حديث", primary: "#3B82F6", bg: "#030712", surface: "#0f172a" }
              ].map((pal, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    updateTheme({
                      primaryColor: pal.primary,
                      bgColor: pal.bg,
                      surfaceColor: pal.surface
                    })
                  }
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-right flex items-center justify-between gap-2 transition-colors"
                >
                  <span className="text-[11px] font-bold text-white/80">{pal.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: pal.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.bg }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Colors */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">اللون الأساسي للعلامة (Primary Color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor || "#00FFC2"}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="w-10 h-9 rounded-lg bg-black border border-white/10 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor || "#00FFC2"}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00FFC2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 mb-1.5">لون الخلفية (Background Color)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.bgColor || "#030305"}
                  onChange={(e) => updateTheme({ bgColor: e.target.value })}
                  className="w-10 h-9 rounded-lg bg-black border border-white/10 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.bgColor || "#030305"}
                  onChange={(e) => updateTheme({ bgColor: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00FFC2]"
                />
              </div>
            </div>
          </div>

          {/* Typography Font Family */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-bold text-white/80">نوع الخط العربي (Typography)</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: "Cairo (القاهرة - حديث ومتوازن)", value: "Cairo" },
                { name: "Tajawal (تجوال - أنيق وعصري)", value: "Tajawal" },
                { name: "Almarai (المراعي - واضح ومقروء)", value: "Almarai" },
                { name: "IBM Plex Sans Arabic (تقني ومحترف)", value: "IBM Plex Sans Arabic" }
              ].map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateTheme({ fontFamily: font.value })}
                  className={`p-2.5 rounded-xl border text-xs text-right transition-all ${
                    theme.fontFamily === font.value
                      ? "border-[#00FFC2] bg-[#00FFC2]/10 text-white font-bold"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius Style */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="text-xs font-bold text-white/80">انحناء الزوايا والبطاقات (Border Radius)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "حادة (Sharp)", value: "none" },
                { label: "دائرية خفيفة", value: "md" },
                { label: "دائرية كاملة", value: "2xl" }
              ].map((rad) => (
                <button
                  key={rad.value}
                  onClick={() => updateTheme({ borderRadius: rad.value as any })}
                  className={`p-2 rounded-xl text-center text-xs border transition-all ${
                    theme.borderRadius === rad.value
                      ? "border-[#00FFC2] bg-[#00FFC2]/10 text-white font-bold"
                      : "border-white/10 bg-white/5 text-white/70"
                  }`}
                >
                  {rad.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROJECT GENERAL SETTINGS TAB */}
      {activeInspectorTab === "settings" && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h3 className="text-xs font-black text-white pb-2 border-b border-white/10">بيانات المشروع والتواصل</h3>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">اسم النشاط التجاري</label>
            <input
              type="text"
              value={settings.general.businessName}
              onChange={(e) =>
                updateProject(currentProject.id, {
                  name: e.target.value,
                  settings: {
                    ...settings,
                    general: { ...settings.general, businessName: e.target.value }
                  }
                })
              }
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">رقم الواتساب لاستقبال الطلبات</label>
            <input
              type="tel"
              value={settings.contact.whatsapp || ""}
              onChange={(e) =>
                updateProject(currentProject.id, {
                  settings: {
                    ...settings,
                    contact: { ...settings.contact, whatsapp: e.target.value }
                  }
                })
              }
              placeholder="مثال: 201001234567"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">عنوان الفرع الرئيسي</label>
            <input
              type="text"
              value={settings.contact.address || ""}
              onChange={(e) =>
                updateProject(currentProject.id, {
                  settings: {
                    ...settings,
                    contact: { ...settings.contact, address: e.target.value }
                  }
                })
              }
              placeholder="المدينة والحي والشارع"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/80 mb-1.5">رمز العملة (Currency)</label>
            <input
              type="text"
              value={settings.localization.currencySymbol || "ج.م"}
              onChange={(e) =>
                updateProject(currentProject.id, {
                  settings: {
                    ...settings,
                    localization: { ...settings.localization, currencySymbol: e.target.value }
                  }
                })
              }
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
            />
          </div>
        </div>
      )}
    </aside>
  );
};
