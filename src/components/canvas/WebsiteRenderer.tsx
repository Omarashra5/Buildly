import React, { useState } from "react";
import { Project, Section, Product, SectionItem } from "../../types";
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  Check,
  ShoppingBag,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Award,
  Flame,
  Heart,
  Users,
  Trophy,
  Coffee,
  Building2,
  Dumbbell,
  Stethoscope,
  Scissors
} from "lucide-react";

interface WebsiteRendererProps {
  project: Project;
  isBuilderMode?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (id: string) => void;
}

export const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({
  project,
  isBuilderMode = false,
  selectedSectionId,
  onSelectSection
}) => {
  const { theme, sections, products, settings } = project;
  const currencySymbol = settings.localization.currencySymbol || "ج.م";

  // Client-side interactions inside preview/live mode
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState<string>("2026-08-24");
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((i) => `• ${i.product.name} (x${i.quantity}) - ${i.product.price * i.quantity} ${currencySymbol}`).join("\n");
    const text = `مرحباً ${settings.general.businessName}!
أود تقديم طلب جديد:
-----------------------
${itemsList}
-----------------------
الإجمالي: ${cartTotal} ${currencySymbol}
الاسم: ${orderName || "عميل"}
الهاتف: ${orderPhone || settings.contact.phone}
العنوان: ${orderAddress || "استلام من الفرع"}
ملاحظات: ${orderNotes || "بدون"}
شكراً لكم!`;

    const cleanWa = (settings.contact.whatsapp || "201000000000").replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleBookSlot = (slot: string, fieldTitle: string) => {
    const text = `مرحباً ${settings.general.businessName}!
أرغب في تأكيد حجز ${fieldTitle}:
التاريخ: ${bookingDate}
الموعد: ${slot}
الرجاء تأكيد الحجز واللوكيشن. شكراً!`;
    const cleanWa = (settings.contact.whatsapp || "201000000000").replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Dynamic style injection from theme
  const getFontClass = () => {
    if (theme.fontFamily === "Tajawal") return "font-['Tajawal']";
    if (theme.fontFamily === "Almarai") return "font-['Almarai']";
    if (theme.fontFamily === "IBM Plex Sans Arabic") return "font-['IBM_Plex_Sans_Arabic']";
    if (theme.fontFamily === "Outfit") return "font-['Outfit']";
    if (theme.fontFamily === "Playfair Display") return "font-['Playfair_Display']";
    return "font-['Cairo']";
  };

  const getBorderRadiusClass = () => {
    if (theme.borderRadius === "none") return "rounded-none";
    if (theme.borderRadius === "sm") return "rounded-sm";
    if (theme.borderRadius === "md") return "rounded-md";
    if (theme.borderRadius === "lg") return "rounded-xl";
    if (theme.borderRadius === "xl") return "rounded-2xl";
    if (theme.borderRadius === "2xl") return "rounded-3xl";
    return "rounded-2xl";
  };

  // Filter products by active category
  const filteredProducts = activeCategory === "الكل" || activeCategory === "كل المنيو" || activeCategory === "الرئيسية"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div
      dir={settings.localization.direction || "rtl"}
      className={`min-h-full transition-colors ${getFontClass()}`}
      style={{
        backgroundColor: theme.bgColor || "#0c0a09",
        color: theme.textColor || "#fafafa"
      }}
    >
      {/* Dynamic Render of Sorted Sections */}
      {sortedSections.map((section) => {
        if (section.hidden) return null;
        const isSelected = isBuilderMode && selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            onClick={(e) => {
              if (isBuilderMode && onSelectSection) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={`relative transition-all ${
              isBuilderMode ? "cursor-pointer hover:ring-2 hover:ring-amber-500/50" : ""
            } ${isSelected ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-zinc-950 z-10" : ""}`}
          >
            {/* Section Tag in Builder Mode */}
            {isBuilderMode && isSelected && (
              <div className="absolute top-2 left-2 z-30 bg-amber-500 text-black text-[11px] font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3 h-3" />
                {section.title || section.type}
              </div>
            )}

            {/* SECTION TYPE: NAVBAR */}
            {section.type === "navbar" && (
              <header
                className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
                style={{
                  backgroundColor: section.styles?.backgroundColor || theme.surfaceColor || "rgba(18, 18, 22, 0.85)",
                  borderColor: "rgba(255, 255, 255, 0.08)"
                }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                  {/* Brand & Logo */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 flex items-center justify-center font-black text-xl shadow-lg ${getBorderRadiusClass()}`}
                      style={{
                        backgroundColor: theme.primaryColor || "#EAB308",
                        color: theme.bgColor || "#000"
                      }}
                    >
                      {settings.general.businessName.charAt(0)}
                    </div>
                    <div>
                      <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">
                        {settings.general.businessName}
                      </h1>
                      {settings.general.tagline && (
                        <p className="text-[11px] font-medium" style={{ color: theme.textMutedColor || "#a1a1aa" }}>
                          {settings.general.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                    <a href="#hero" className="hover:opacity-80 transition-opacity">الرئيسية</a>
                    <a href="#products" className="hover:opacity-80 transition-opacity">المنيو والمنتجات</a>
                    <a href="#offers" className="hover:opacity-80 transition-opacity">العروض</a>
                    <a href="#contact" className="hover:opacity-80 transition-opacity">تواصل معنا</a>
                  </nav>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5">
                    {/* Cart Trigger */}
                    {products.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCartOpen(!isCartOpen);
                        }}
                        className={`relative p-2.5 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 ${getBorderRadiusClass()} transition-colors text-white`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        {cart.length > 0 && (
                          <span
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: theme.primaryColor, color: theme.bgColor }}
                          >
                            {cart.reduce((s, i) => s + i.quantity, 0)}
                          </span>
                        )}
                      </button>
                    )}

                    {/* WhatsApp CTA */}
                    <a
                      href={`https://wa.me/${(settings.contact.whatsapp || "").replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => isBuilderMode && e.preventDefault()}
                      className={`px-4 py-2.5 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:brightness-110 transition-all ${getBorderRadiusClass()}`}
                      style={{
                        backgroundColor: theme.primaryColor || "#EAB308",
                        color: "#000"
                      }}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span className="hidden sm:inline">طلب واتساب</span>
                      <span className="sm:hidden">واتساب</span>
                    </a>
                  </div>
                </div>
              </header>
            )}

            {/* SECTION TYPE: HERO */}
            {section.type === "hero" && (
              <section id="hero" className="relative py-16 sm:py-24 overflow-hidden">
                {/* Background glow & visuals */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 30%, ${theme.primaryColor || "#EAB308"} 0%, transparent 60%)`
                  }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Content Left / Right */}
                    <div className="lg:col-span-7 space-y-6 text-right">
                      {section.badge && (
                        <div
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md"
                          style={{
                            borderColor: `${theme.primaryColor}40`,
                            backgroundColor: `${theme.primaryColor}15`,
                            color: theme.primaryColor
                          }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{section.badge}</span>
                        </div>
                      )}

                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                        {section.title}
                      </h1>

                      <p
                        className="text-base sm:text-lg leading-relaxed max-w-2xl"
                        style={{ color: theme.textMutedColor || "#d4d4d8" }}
                      >
                        {section.subtitle}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap items-center gap-3.5 pt-2">
                        {section.ctaText && (
                          <a
                            href={section.ctaLink || "#products"}
                            onClick={(e) => isBuilderMode && e.preventDefault()}
                            className={`px-7 py-3.5 text-sm sm:text-base font-extrabold flex items-center gap-2 shadow-xl hover:scale-105 transition-all ${getBorderRadiusClass()}`}
                            style={{
                              backgroundColor: theme.primaryColor || "#EAB308",
                              color: "#000"
                            }}
                          >
                            <span>{section.ctaText}</span>
                            <ChevronLeft className="w-5 h-5" />
                          </a>
                        )}

                        {section.secondaryCtaText && (
                          <a
                            href={section.secondaryCtaLink || "#offers"}
                            onClick={(e) => isBuilderMode && e.preventDefault()}
                            className={`px-6 py-3.5 text-sm sm:text-base font-bold bg-zinc-800/80 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/80 transition-all ${getBorderRadiusClass()}`}
                          >
                            {section.secondaryCtaText}
                          </a>
                        )}
                      </div>

                      {/* Quick Badges / Micro Stats */}
                      <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/80">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>جودة ومذاق فاخر 100%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>توصيل فوري وباقات متجددة</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>دفع عند الاستلام أو إلكتروني</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Image */}
                    {section.imageUrl && (
                      <div className="lg:col-span-5 relative">
                        <div
                          className={`relative overflow-hidden border shadow-2xl ${getBorderRadiusClass()} aspect-[4/3] group`}
                          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                          <img
                            src={section.imageUrl}
                            alt={section.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: PRODUCTS & MENU */}
            {(section.type === "products" || section.type === "menu") && (
              <section id="products" className="py-16 sm:py-20 border-t border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  {/* Header */}
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                    {section.badge && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                      >
                        {section.badge}
                      </span>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    {section.subtitle && (
                      <p className="text-sm sm:text-base text-zinc-400">{section.subtitle}</p>
                    )}
                  </div>

                  {/* Categories Tabs */}
                  {project.categories.length > 0 && (
                    <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 no-scrollbar">
                      {["الكل", ...project.categories].map((cat) => (
                        <button
                          key={cat}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCategory(cat);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                            activeCategory === cat
                              ? "shadow-lg scale-105"
                              : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700"
                          }`}
                          style={
                            activeCategory === cat
                              ? { backgroundColor: theme.primaryColor, color: "#000" }
                              : {}
                          }
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Product Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className={`group bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:-translate-y-1 ${getBorderRadiusClass()}`}
                      >
                        {/* Product Image */}
                        <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                          {prod.image ? (
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <ShoppingBag className="w-8 h-8" />
                            </div>
                          )}

                          {prod.discount && prod.discount > 0 && (
                            <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-lg">
                              خصم {prod.discount}%
                            </span>
                          )}

                          {prod.isFeatured && (
                            <span
                              className="absolute top-2.5 left-2.5 text-black font-black text-[11px] px-2 py-0.5 rounded shadow-lg"
                              style={{ backgroundColor: theme.primaryColor }}
                            >
                              مميز ⭐
                            </span>
                          )}
                        </div>

                        {/* Product Content */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                              <span>{prod.category}</span>
                              {prod.isAvailable ? (
                                <span className="text-emerald-400 font-semibold text-[11px]">متوفر الآن</span>
                              ) : (
                                <span className="text-rose-400 font-semibold text-[11px]">نفذت الكمية</span>
                              )}
                            </div>
                            <h3 className="font-bold text-base sm:text-lg text-white leading-snug group-hover:text-amber-400 transition-colors">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mt-1.5">
                              {prod.description}
                            </p>
                          </div>

                          {/* Pricing & Action */}
                          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-lg font-black text-white flex items-baseline gap-1">
                                <span>{prod.price}</span>
                                <span className="text-xs font-semibold" style={{ color: theme.primaryColor }}>
                                  {currencySymbol}
                                </span>
                              </div>
                              {prod.oldPrice && prod.oldPrice > prod.price && (
                                <span className="text-xs text-zinc-500 line-through">
                                  {prod.oldPrice} {currencySymbol}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(prod);
                              }}
                              className={`px-3.5 py-2 font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all ${getBorderRadiusClass()}`}
                              style={{
                                backgroundColor: theme.primaryColor || "#EAB308",
                                color: "#000"
                              }}
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>طلب</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: SPORTS FIELD / PADEL BOOKING */}
            {section.type === "sports_field_booking" && (
              <section id="booking" className="py-16 sm:py-20 border-t border-zinc-800/60 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    <p className="text-sm text-zinc-400">{section.subtitle || "حدد اليوم والساعة المناسبة وأكد حجزك فوراً"}</p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Date Picker */}
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-400" />
                          اختر تاريخ الماتش:
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      {/* Time Slots Grid */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-zinc-300 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-400" />
                          المواعيد المتاحة اليوم:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            "06:00 م - 07:00 م",
                            "07:00 م - 08:00 م",
                            "08:00 م - 09:00 م",
                            "09:00 م - 10:00 م",
                            "10:00 م - 11:00 م",
                            "11:00 م - 12:00 ص",
                            "12:00 ص - 01:00 ص",
                            "01:00 ص - 02:00 ص"
                          ].map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSlot(slot);
                              }}
                              className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                                selectedSlot === slot
                                  ? "bg-emerald-500 border-emerald-400 text-black shadow-lg scale-105"
                                  : "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking Trigger */}
                    <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          الموعد المحدد: {selectedSlot ? <span className="text-emerald-400">{selectedSlot}</span> : "لم يتم التحديد"}
                        </p>
                        <p className="text-xs text-zinc-400">تأكيد الحجز يتم فورياً عبر الواتساب مع كابتن الملعب</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedSlot) handleBookSlot(selectedSlot, "ملعب خماسي VIP");
                        }}
                        disabled={!selectedSlot}
                        className={`px-8 py-3.5 font-bold text-sm bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black shadow-xl rounded-xl flex items-center gap-2 transition-all`}
                      >
                        <Check className="w-4 h-4" />
                        تأكيد حجز الموعد الآن
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: MEMBERSHIP PRICING */}
            {section.type === "membership_plans" && (
              <section id="pricing" className="py-16 sm:py-20 border-t border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    <p className="text-sm text-zinc-400">{section.subtitle || "اختر الباقة المناسبة لأهدافك الرياضية"}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {(section.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className={`p-6 sm:p-8 rounded-3xl bg-zinc-900 border flex flex-col justify-between relative shadow-xl ${
                          item.badge ? "border-amber-500 ring-2 ring-amber-500/20" : "border-zinc-800"
                        }`}
                      >
                        {item.badge && (
                          <span
                            className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-xs font-black text-black shadow-lg"
                            style={{ backgroundColor: theme.primaryColor }}
                          >
                            {item.badge}
                          </span>
                        )}

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black text-white">{item.price}</span>
                            <span className="text-sm font-semibold text-amber-400">{currencySymbol}</span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookSlot(item.title || "اشتراك", "باقة عضوية");
                          }}
                          className={`w-full mt-6 py-3 font-bold text-sm rounded-xl transition-all shadow-lg ${
                            item.badge
                              ? "bg-amber-500 hover:bg-amber-600 text-black"
                              : "bg-zinc-800 hover:bg-zinc-700 text-white"
                          }`}
                        >
                          اشترك في هذه الباقة
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: SERVICES */}
            {section.type === "services" && (
              <section className="py-16 sm:py-20 border-t border-zinc-800/60 bg-zinc-950/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    {section.subtitle && <p className="text-sm text-zinc-400">{section.subtitle}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(section.items || []).map((srv, idx) => (
                      <div
                        key={srv.id || idx}
                        className={`p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3 ${getBorderRadiusClass()}`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg"
                          style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-white">{srv.title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{srv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: OFFERS */}
            {section.type === "offers" && (
              <section id="offers" className="py-16 sm:py-20 border-t border-zinc-800/60 bg-gradient-to-b from-rose-950/20 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-rose-400 text-xs font-black">
                      <Flame className="w-4 h-4 fill-current" />
                      عروض لفترة محدودة
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    {section.subtitle && <p className="text-sm text-zinc-400">{section.subtitle}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {(section.items || []).map((offer, idx) => (
                      <div
                        key={offer.id || idx}
                        className={`p-6 rounded-3xl bg-zinc-900 border border-rose-500/30 flex flex-col justify-between shadow-2xl relative overflow-hidden`}
                      >
                        <div className="space-y-3">
                          {offer.badge && (
                            <span className="px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-black">
                              {offer.badge}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-white leading-snug">{offer.title}</h3>
                          <p className="text-xs text-zinc-400">{offer.description}</p>
                        </div>

                        <div className="pt-6 mt-4 border-t border-zinc-800 flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">{offer.price}</span>
                            <span className="text-xs text-rose-400 font-bold">{currencySymbol}</span>
                            {offer.oldPrice && (
                              <span className="text-xs text-zinc-500 line-through mr-2">
                                {offer.oldPrice} {currencySymbol}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookSlot(offer.title || "عرض", "عرض خاص");
                            }}
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
                          >
                            اطلب العرض الآن
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: TESTIMONIALS */}
            {section.type === "testimonials" && (
              <section className="py-16 sm:py-20 border-t border-zinc-800/60 bg-zinc-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-4xl font-black text-white">{section.title}</h2>
                    {section.subtitle && <p className="text-sm text-zinc-400">{section.subtitle}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(section.items || []).map((rev, idx) => (
                      <div
                        key={rev.id || idx}
                        className={`p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4 shadow-xl ${getBorderRadiusClass()}`}
                      >
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                          "{rev.description}"
                        </p>
                        <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-zinc-800 text-amber-400"
                          >
                            {(rev.author || "ع").charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{rev.author}</p>
                            {rev.role && <p className="text-[10px] text-zinc-400">{rev.role}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: CONTACT & MAP */}
            {section.type === "contact_map" && (
              <section id="contact" className="py-16 sm:py-20 border-t border-zinc-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">{section.title}</h2>
                        <p className="text-sm text-zinc-400">{section.subtitle || "يسعدنا دائماً استقبالكم والرد على استفساراتكم"}</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">العنوان والفرع الرئيسي</p>
                            <p className="text-sm font-bold text-white">{settings.contact.address || "القاهرة، مصر"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">الهاتف وخدمة العملاء</p>
                            <p className="text-sm font-bold text-white font-mono" dir="ltr">{settings.contact.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-400">مواعيد وساعات العمل</p>
                            <p className="text-sm font-bold text-white">{settings.contact.workingHours || "يومياً من 10 ص حتى 12 م"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Google Map Mockup / Card */}
                    <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden relative aspect-video sm:aspect-auto sm:h-80 shadow-2xl flex flex-col justify-end p-6 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center">
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                      <div className="relative z-10 space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-bold border border-zinc-700">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          موقعنا على الخريطة
                        </div>
                        <h4 className="text-lg font-bold text-white">{settings.general.businessName}</h4>
                        <p className="text-xs text-zinc-300">{settings.contact.address}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(settings.contact.address || settings.general.businessName)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:underline pt-1"
                        >
                          <span>فتح الاتجاهات عبر Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SECTION TYPE: FOOTER */}
            {section.type === "footer" && (
              <footer className="py-12 border-t border-zinc-800 bg-zinc-950 text-zinc-400 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {settings.general.businessName.charAt(0)}
                    </div>
                    <span className="font-bold text-white text-sm">{settings.general.businessName}</span>
                  </div>

                  <p>© {new Date().getFullYear()} جميع الحقوق محفوظة. تم الإنشاء بواسطة منصة مشروعي الذكية.</p>

                  <div className="flex items-center gap-4 text-zinc-300">
                    <a href="#hero" className="hover:text-white transition-colors">الرئيسية</a>
                    <a href="#products" className="hover:text-white transition-colors">المنيو</a>
                    <a href="#contact" className="hover:text-white transition-colors">اتصل بنا</a>
                  </div>
                </div>
              </footer>
            )}

            {/* SECTION TYPE: FLOATING WHATSAPP BUTTON */}
            {section.type === "whatsapp_floater" && (
              <div className="fixed bottom-6 right-6 z-40">
                <a
                  href={`https://wa.me/${(settings.contact.whatsapp || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، أود الاستفسار والطلب!")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => isBuilderMode && e.preventDefault()}
                  className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-full shadow-2xl hover:scale-105 transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span className="hidden sm:inline">تواصل عبر واتساب</span>
                </a>
              </div>
            )}
          </div>
        );
      })}

      {/* Cart Drawer in Preview / Live Mode */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-zinc-900 border-r border-zinc-800 h-full flex flex-col shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">سلة الطلبات ({cart.length})</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-3">
                <ShoppingBag className="w-12 h-12 opacity-40" />
                <p>سلة طلباتك فارغة حتى الآن</p>
              </div>
            ) : (
              <div className="flex-1 py-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-zinc-800/60 rounded-xl border border-zinc-700/50 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.product.name}</h4>
                        <p className="text-[11px] text-zinc-400">
                          {item.quantity} × {item.product.price} {currencySymbol}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-amber-400">
                        {item.product.price * item.quantity} {currencySymbol}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-300">بيانات التوصيل والتواصل:</h4>
                  <input
                    type="text"
                    placeholder="اسم العميل"
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={orderPhone}
                    onChange={(e) => setOrderPhone(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="عنوان التوصيل بالتفصيل"
                    value={orderAddress}
                    onChange={(e) => setOrderAddress(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>المجموع الإجمالي:</span>
                  <span className="text-amber-400 text-lg">
                    {cartTotal} {currencySymbol}
                  </span>
                </div>
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-xl text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  إرسال الطلب عبر الواتساب الآن
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
