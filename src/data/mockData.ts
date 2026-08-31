import { Project, Template, MediaItem, ActivityItem, CountryCulture, DesignStyle } from "../types";

export interface CategoryInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  group: "food" | "sports" | "retail" | "tech" | "medical" | "hospitality" | "services" | "personal";
  popular?: boolean;
  tagline: string;
  defaultStyle: DesignStyle;
  defaultPrimary: string;
  suggestedSections: string[];
}

export const BUSINESS_CATEGORIES: CategoryInfo[] = [
  // Food & Beverage
  { id: "restaurant", nameAr: "مطعم فاخر ومأكولات", nameEn: "Restaurant & Fine Dining", iconName: "Utensils", group: "food", popular: true, tagline: "قوائم طعام تفاعلية، حجز طاولات، وطلب مباشر عبر واتساب", defaultStyle: "luxury_gold", defaultPrimary: "#EAB308", suggestedSections: ["hero", "menu", "offers", "testimonials", "contact_map"] },
  { id: "fastfood", nameAr: "برجر ووجبات سريعة", nameEn: "Burger & Fast Food", iconName: "Flame", group: "food", popular: true, tagline: "صور شهية، إضافات الوجبات، عروض الكومبو وتوصيل سريع", defaultStyle: "egyptian_heritage", defaultPrimary: "#EF4444", suggestedSections: ["hero", "products", "offers", "reviews", "whatsapp_floater"] },
  { id: "cafe", nameAr: "مقهى وكافيه سبيشالتي", nameEn: "Specialty Café & Roastery", iconName: "Coffee", group: "food", popular: true, tagline: "بن مختص، مشروبات مبتكرة، وأجواء مريحة", defaultStyle: "dark_modern", defaultPrimary: "#D97706", suggestedSections: ["hero", "menu", "gallery", "about", "contact_map"] },
  { id: "bakery", nameAr: "مخبوزات وحلويات شرقية وغربية", nameEn: "Bakery & Pastry", iconName: "Cake", group: "food", tagline: "حلويات طازجة، تورتات مناسبات، وتوصيل فوري", defaultStyle: "colorful_youth", defaultPrimary: "#EC4899", suggestedSections: ["hero", "products", "gallery", "contact_map"] },
  { id: "supermarket", nameAr: "سوبرماركت ومواد غذائية", nameEn: "Supermarket & Grocery", iconName: "ShoppingCart", group: "food", tagline: "عروض يومية، تسوق أقسام، وسلة مشتريات ذكية", defaultStyle: "clean_minimal", defaultPrimary: "#10B981", suggestedSections: ["hero", "categories", "products", "offers"] },

  // Sports & Wellness
  { id: "football", nameAr: "ملاعب كرة قدم وبادل", nameEn: "Football & Padel Arena", iconName: "Trophy", group: "sports", popular: true, tagline: "حجز مواعيد بالمباراة والساعة، كشافات وتأجير معدات", defaultStyle: "sporty_bold", defaultPrimary: "#22C55E", suggestedSections: ["hero", "sports_field_booking", "pricing", "location", "contact_map"] },
  { id: "gym", nameAr: "جيم ونادي رياضي", nameEn: "Gym & Fitness Club", iconName: "Dumbbell", group: "sports", popular: true, tagline: "اشتراكات شهرية، مدربين شخصيين، وجداول تمارين", defaultStyle: "dark_modern", defaultPrimary: "#F59E0B", suggestedSections: ["hero", "membership_plans", "team", "gallery", "testimonials"] },
  { id: "barber", nameAr: "صالون حلاقة ورجالي VIP", nameEn: "Gentleman Barber Salon", iconName: "Scissors", group: "sports", popular: true, tagline: "حجز دور، باقات VIP، وباقات عرسان", defaultStyle: "luxury_gold", defaultPrimary: "#D4AF37", suggestedSections: ["hero", "services", "team", "booking", "contact_map"] },
  { id: "salon", nameAr: "مركز تجميل وبيوتي سنتر", nameEn: "Beauty Center & Spa", iconName: "Sparkles", group: "sports", tagline: "جلسات عناية بالبشرة والمكياج وتصفيف الشعر", defaultStyle: "glassmorphism", defaultPrimary: "#F472B6", suggestedSections: ["hero", "services", "gallery", "booking"] },

  // Tech & Electronics
  { id: "iphone", nameAr: "متجر آيفون وأبل ستور", nameEn: "iPhone & Apple Hub", iconName: "Smartphone", group: "tech", popular: true, tagline: "أجهزة أصلية، إكسسوارات معتمدة، وضمان شامل", defaultStyle: "dark_modern", defaultPrimary: "#3B82F6", suggestedSections: ["hero", "products", "offers", "testimonials", "contact_map"] },
  { id: "electronics", nameAr: "إلكترونيات وكمبيوتر", nameEn: "Electronics & Gaming PC", iconName: "Laptop", group: "tech", tagline: "تجميعات جيمنج، لابتوبات وشاشات عالية الأداء", defaultStyle: "futuristic_cyber", defaultPrimary: "#8B5CF6", suggestedSections: ["hero", "products", "categories", "faq"] },

  // Retail & Fashion
  { id: "clothing", nameAr: "براند ملابس وأزياء عصرية", nameEn: "Fashion & Streetwear", iconName: "Shirt", group: "retail", popular: true, tagline: "كولكشن فصلي، دليل المقاسات، ودفع سلس", defaultStyle: "clean_minimal", defaultPrimary: "#18181B", suggestedSections: ["hero", "products", "gallery", "reviews", "instagram"] },
  { id: "shoes", nameAr: "أحذية وسنيكرز حصرية", nameEn: "Shoes & Sneaker Store", iconName: "Footprints", group: "retail", tagline: "سنيكرز أصلية، مقاسات متنوعة، وشحن فوري", defaultStyle: "dark_modern", defaultPrimary: "#EA580C", suggestedSections: ["hero", "products", "offers"] },
  { id: "perfume", nameAr: "عطور شرقية وفرنسية فاخرة", nameEn: "Luxury Perfumes", iconName: "Gem", group: "retail", tagline: "نوتات عطرية ساحرة، ثبات عالي، وباقات هدايا", defaultStyle: "luxury_gold", defaultPrimary: "#EAB308", suggestedSections: ["hero", "products", "testimonials"] },

  // Medical & Health
  { id: "pharmacy", nameAr: "صيدلية ورعاية صحية", nameEn: "Pharmacy & Wellness", iconName: "Cross", group: "medical", popular: true, tagline: "أدوية، مكملات غذائية، إرسال الروشتة وتوصيل فوري", defaultStyle: "clean_minimal", defaultPrimary: "#0D9488", suggestedSections: ["hero", "categories", "products", "services", "contact_map"] },
  { id: "clinic", nameAr: "عيادة طبية واستشارات", nameEn: "Medical Clinic", iconName: "HeartPulse", group: "medical", popular: true, tagline: "أطباء استشاريين، حجز كشف، ومواعيد مؤكدة", defaultStyle: "clean_minimal", defaultPrimary: "#0284C7", suggestedSections: ["hero", "services", "doctor_appointment", "team", "contact_map"] },
  { id: "dentist", nameAr: "مركز طب وجراحة الأسنان", nameEn: "Dental Center", iconName: "Smile", group: "medical", tagline: "ابتسامة هوليوود، زراعة وتقويم بأحدث الأجهزة", defaultStyle: "clean_minimal", defaultPrimary: "#06B6D4", suggestedSections: ["hero", "services", "before_after", "booking", "contact_map"] },

  // Hospitality & Living
  { id: "hotel", nameAr: "فندق ومنتجع سياحي فاخر", nameEn: "Luxury Hotel & Resort", iconName: "Building2", group: "hospitality", popular: true, tagline: "غرف بإطلالات ساحرة، خدمات 5 نجوم، وحجز مؤكد", defaultStyle: "luxury_gold", defaultPrimary: "#D4AF37", suggestedSections: ["hero", "hotel_booking", "gallery", "services", "testimonials"] },
  { id: "realestate", nameAr: "عقارات وفيلات وشقق", nameEn: "Real Estate & Villas", iconName: "Home", group: "hospitality", popular: true, tagline: "وحدات سكنية وتجارية فاخرة وأنظمة سداد مرنة", defaultStyle: "dark_modern", defaultPrimary: "#0EA5E9", suggestedSections: ["hero", "products", "services", "contact_map"] },

  // Services & Personal
  { id: "portfolio", nameAr: "معرض أعمال وبورتفوليو شخصي", nameEn: "Personal Portfolio & Bio", iconName: "UserCheck", group: "personal", popular: true, tagline: "عرض المهارات، المشاريع المنجزة، والتواصل السريع", defaultStyle: "dark_modern", defaultPrimary: "#6366F1", suggestedSections: ["hero", "about", "gallery", "services", "testimonials", "contact_map"] },
  { id: "agency", nameAr: "وكالة تسويق وبرمجة وتصميم", nameEn: "Digital Agency", iconName: "Briefcase", group: "services", popular: true, tagline: "حلول رقمية متكاملة، دراسات حالة، وطلب عروض أسعار", defaultStyle: "dark_modern", defaultPrimary: "#8B5CF6", suggestedSections: ["hero", "services", "pricing", "testimonials", "contact_map"] },
  { id: "cars", nameAr: "معرض وتأجير سيارات", nameEn: "Car Rental & Showroom", iconName: "Car", group: "services", tagline: "سيارات فارهة واقتصادية مع خيارات إيجار يومي وشهري", defaultStyle: "dark_modern", defaultPrimary: "#DC2626", suggestedSections: ["hero", "products", "services", "booking"] },
  { id: "education", nameAr: "أكاديمية وكورسات تعليمية", nameEn: "Academy & Online Courses", iconName: "GraduationCap", group: "services", tagline: "دورات تدريبية، شهادات معتمدة، ومحاضرين خبراء", defaultStyle: "clean_minimal", defaultPrimary: "#4F46E5", suggestedSections: ["hero", "products", "services", "team", "faq"] },
  { id: "custom", nameAr: "فكرة مختلفة ومخصصة تماماً", nameEn: "Custom Unique Idea", iconName: "Sparkles", group: "personal", popular: true, tagline: "اكتب وصف فكرتك بالكامل وسيقوم الذكاء الاصطناعي ببناء كل شيء", defaultStyle: "futuristic_cyber", defaultPrimary: "#F59E0B", suggestedSections: ["hero", "services", "products", "about", "contact_map"] }
];

export const CULTURE_PRESETS: Array<{ id: CountryCulture; nameAr: string; nameEn: string; flag: string; currency: string; symbol: string; defaultLang: "ar" | "ar-eg" | "en"; tone: string }> = [
  { id: "egypt", nameAr: "جمهورية مصر العربية", nameEn: "Egypt", flag: "🇪🇬", currency: "جنيه مصري", symbol: "EGP", defaultLang: "ar-eg", tone: "ودود، حماسي، مصري أصيل وشبابي" },
  { id: "saudi", nameAr: "المملكة العربية السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦", currency: "ريال سعودي", symbol: "SAR", defaultLang: "ar", tone: "فخم، راقي، رسمي واحترافي" },
  { id: "uae", nameAr: "الإمارات العربية المتحدة", nameEn: "United Arab Emirates", flag: "🇦🇪", currency: "درهم إماراتي", symbol: "AED", defaultLang: "ar", tone: "عالمي، فاخر، مستقبلي وحديث" },
  { id: "kuwait", nameAr: "دولة الكويت", nameEn: "Kuwait", flag: "🇰🇼", currency: "دينار كويتي", symbol: "KWD", defaultLang: "ar", tone: "راقي، أنيق، وجودة عالية" },
  { id: "morocco", nameAr: "المملكة المغربية", nameEn: "Morocco", flag: "🇲🇦", currency: "درهم مغربي", symbol: "MAD", defaultLang: "ar", tone: "أصيل، عريق، ولمسة مغاربية غنية" },
  { id: "turkey", nameAr: "تركيا", nameEn: "Turkey", flag: "🇹🇷", currency: "ليرة تركية", symbol: "TRY", defaultLang: "en", tone: "عصري، سياحي، وذوق عثماني كلاسيكي" },
  { id: "uk", nameAr: "المملكة المتحدة", nameEn: "United Kingdom", flag: "🇬🇧", currency: "جنيه إسترليني", symbol: "GBP", defaultLang: "en", tone: "Elegant, Minimalist, British Professional" },
  { id: "usa", nameAr: "الولايات المتحدة", nameEn: "United States", flag: "🇺🇸", currency: "دولار أمريكي", symbol: "USD", defaultLang: "en", tone: "Bold, High Conversion, Tech-Forward" },
  { id: "france", nameAr: "فرنسا", nameEn: "France", flag: "🇫🇷", currency: "يورو", symbol: "EUR", defaultLang: "en", tone: "Haute Couture, Artistic, Sophisticated" },
  { id: "italy", nameAr: "إيطاليا", nameEn: "Italy", flag: "🇮🇹", currency: "يورو", symbol: "EUR", defaultLang: "en", tone: "Artisanal, Culinary Heritage, Warm" },
  { id: "japan", nameAr: "اليابان", nameEn: "Japan", flag: "🇯🇵", currency: "ين ياباني", symbol: "JPY", defaultLang: "en", tone: "Zen, Ultra-Precise, Minimalist & Modern" },
  { id: "custom", nameAr: "دولة / ثقافة مخصصة", nameEn: "Custom Culture", flag: "🌐", currency: "دولار", symbol: "$", defaultLang: "ar", tone: "مخصص حسب الرغبة" }
];

export const STYLE_PRESETS: Array<{ id: DesignStyle; nameAr: string; nameEn: string; descAr: string; primary: string; bg: string; surface: string; font: "Cairo" | "Tajawal" | "Almarai" | "IBM Plex Sans Arabic" | "Outfit" | "Playfair Display" }> = [
  { id: "luxury_gold", nameAr: "ذهبي ملكي فاخر", nameEn: "Luxury Gold", descAr: "درجات الذهب والبرونز مع أسود عميق للمطاعم والفنادق الراقية والعطور", primary: "#EAB308", bg: "#09090b", surface: "#18181b", font: "Tajawal" },
  { id: "dark_modern", nameEn: "Dark Modern", nameAr: "داكن عصري احترافي", descAr: "خلفيات داكنة أنيقة مع إضاءات نيون ولمسات تقنية مريحة للعين", primary: "#3B82F6", bg: "#0a0a0f", surface: "#13131d", font: "Cairo" },
  { id: "clean_minimal", nameEn: "Clean Minimal", nameAr: "أبيض ناصع ومينيمال", descAr: "مساحات بيضاء واسعة، خطوط واضحة، مناسب للعيادات والصيدليات والبراندات الراقية", primary: "#0D9488", bg: "#F8FAFC", surface: "#FFFFFF", font: "Almarai" },
  { id: "glassmorphism", nameEn: "Glassmorphism", nameAr: "زجاجي مستقبلي شفاف", descAr: "تأثيرات الزجاج الشفاف مع بلور خفيف وتدرجات حيوية في الخلفية", primary: "#EC4899", bg: "#0f0728", surface: "rgba(255, 255, 255, 0.07)", font: "Tajawal" },
  { id: "egyptian_heritage", nameEn: "Egyptian Street", nameAr: "مصري شبابي وحيوي", descAr: "ألوان دافئة قوية مع طابع الوجبات والمطاعم الشعبية والعصرية في مصر", primary: "#DC2626", bg: "#0c0a09", surface: "#1c1917", font: "Cairo" },
  { id: "sporty_bold", nameEn: "Sporty & High Energy", nameAr: "رياضي وحماسي ناري", descAr: "ألوان النجيل والأخضر والنيون للملاعب والأكاديميات والنوادي", primary: "#22C55E", bg: "#05160e", surface: "#0a261a", font: "Cairo" },
  { id: "futuristic_cyber", nameEn: "Cyber Tech", nameAr: "سايبر وتقني مستقبلي", descAr: "أرجواني وفيروزي ساطع للشركات التقنية ومواقع الألعاب والذكاء الاصطناعي", primary: "#8B5CF6", bg: "#08051a", surface: "#120d2e", font: "IBM Plex Sans Arabic" },
  { id: "colorful_youth", nameEn: "Vibrant Youth", nameAr: "ملون وشبابي مبهج", descAr: "درجات الوردي والبرتقالي للمخبوزات والموضة ومحلات الألعاب", primary: "#F97316", bg: "#FFFBF5", surface: "#FFFFFF", font: "Cairo" }
];

// Rich Sample Preloaded Projects
export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-burger-zone",
    slug: "burger-zone",
    name: "Burger Zone | برجر زون مصر",
    businessType: "fastfood",
    country: "egypt",
    designStyle: "egyptian_heritage",
    isPublished: true,
    version: 3,
    createdAt: "2026-08-20T10:00:00.000Z",
    updatedAt: "2026-08-23T14:30:00.000Z",
    previewThumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    theme: {
      primaryColor: "#DC2626",
      secondaryColor: "#991B1B",
      accentColor: "#F59E0B",
      bgColor: "#0c0a09",
      surfaceColor: "#1c1917",
      textColor: "#fafaf9",
      textMutedColor: "#a8a29e",
      fontFamily: "Cairo",
      borderRadius: "xl",
      shadow: "glow",
      backgroundType: "pattern",
      backgroundPattern: "radial"
    },
    settings: {
      general: {
        projectName: "Burger Zone",
        businessName: "Burger Zone Gourmet",
        description: "أقوى برجر مشوي على الفحم في مصر مع صوصاتنا السرية الخاصة",
        category: "fastfood",
        tagline: "طعم الجريمة اللي بتدور عليها!"
      },
      branding: {
        brandSlogan: "مشوي على اللهب، مش مقلي في الزيت"
      },
      localization: {
        country: "egypt",
        language: "ar-eg",
        direction: "rtl",
        currency: "جنيه",
        currencySymbol: "ج.م"
      },
      contact: {
        phone: "01099887766",
        whatsapp: "201099887766",
        email: "order@burgerzone.eg",
        address: "شارع التسعين الشمالي، التجمع الخامس، القاهرة",
        workingHours: "يومياً من 12 ظهراً حتى 3 فجراً"
      },
      social: {
        facebook: "https://facebook.com/burgerzone",
        instagram: "https://instagram.com/burgerzone",
        tiktok: "https://tiktok.com/@burgerzone"
      },
      seo: {
        title: "برجر زون | أقوى برجر مشوي في القاهرة",
        description: "اطلب أونلاين الآن واستمتع بأشهى ساندوتشات البرجر البقري والدجاج المقرمش مع عروض الكومبو وتوصيل سريع في التجمع ومدينة نصر.",
        keywords: ["برجر", "مطاعم القاهرة", "برجر زون", "أكل سريع", "توصيل برجر"]
      },
      publish: {
        subdomain: "burger-zone",
        isPublished: true,
        publishedAt: "2026-08-21T18:00:00.000Z"
      }
    },
    categories: ["كل المنيو", "برجر بقري أنجوس", "دجاج كرسبي", "عروض الكومبو", "المقبلات والصوصات", "مشروبات وميلك شيك"],
    products: [
      {
        id: "prod-bz-1",
        name: "برجر ذا سموك ماستر (Double Beef)",
        description: "شريحتين 300 جم لحم بقري أنجوس، بيكون بقري مقرمش، صوص باربيكيو مدخن، وجبن شيدر هولندي ذائب",
        price: 185,
        oldPrice: 220,
        discount: 16,
        category: "برجر بقري أنجوس",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-bz-2",
        name: "ترافل مشروم برجر فاخر",
        description: "لحم مشوي طازج مع شرائح مشروم سوتريه بالزبدة وصوص الترافل الإيطالي وجبن إيمنتال سويسري",
        price: 195,
        oldPrice: 230,
        discount: 15,
        category: "برجر بقري أنجوس",
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-bz-3",
        name: "تشيكن كرانش ديناميت",
        description: "قطعة صدر دجاج ضخمة ومقرمشة ومحشوة بالجبن مع صوص ديناميت الحار وخس آيسبيرج طازج",
        price: 165,
        oldPrice: 190,
        discount: 13,
        category: "دجاج كرسبي",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-bz-4",
        name: "فرايز زون ديلوكس بالجبن",
        description: "بطاطس ذهبية متبلة مع صوص جبن الشيدر الحار، شرائح الهلابينو، وقطع البيكون المشوي",
        price: 85,
        oldPrice: 100,
        discount: 15,
        category: "المقبلات والصوصات",
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: false
      }
    ],
    sections: [
      {
        id: "sec-bz-nav",
        type: "navbar",
        title: "Navbar",
        order: 1,
        styles: { backgroundColor: "rgba(12, 10, 9, 0.9)" }
      },
      {
        id: "sec-bz-hero",
        type: "hero",
        title: "أقوى برجر حقيقي مشوي على الفحم في مصر",
        subtitle: "لحم أنجوس بلدي 100%، صوصاتنا الخاصة يومياً، وعيش بريوش مدهون بالزبدة السايحة.",
        badge: "🔥 العرض الأقوى اليوم: خصم 20% على طلبات الواتساب",
        ctaText: "اطلب دلوقتي على واتساب",
        ctaLink: "#products",
        secondaryCtaText: "تصفح المنيو والعروض",
        secondaryCtaLink: "#products",
        imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80",
        order: 2,
        styles: { layoutVariant: "split", alignment: "right" }
      },
      {
        id: "sec-bz-offers",
        type: "offers",
        title: "عروض الدوبل والتوفير الضخمة",
        subtitle: "وجبات عائلية وتجمعات الصحاب بأفضل سعر وجودة خرافية",
        order: 3,
        items: [
          { id: "off-1", title: "بوكس الصحاب 4 برجر + 2 فرايز + لتر كولا", description: "وفر 120 جنيه مع بوكس الويك إند", price: 490, oldPrice: 610, badge: "الأكثر مبيعاً" },
          { id: "off-2", title: "دابل كومبو سنجل + تشيز فرايز مجاناً", description: "مع كل ساندوتش حجم دابل استلم بطاطس جبن", price: 210, oldPrice: 280, badge: "عرض محدود" }
        ]
      },
      {
        id: "sec-bz-prods",
        type: "products",
        title: "المنيو الكامل وقائمة الساندوتشات",
        subtitle: "اختر وجبتك المفضلة وأضف الصوصات واطلب فوراً بضغطة زر واحدة",
        order: 4
      },
      {
        id: "sec-bz-reviews",
        type: "testimonials",
        title: "رأي عشاق البرجر فينا",
        subtitle: "أكثر من 25,000 عميل سعيد في كل فروع القاهرة",
        order: 5,
        items: [
          { id: "rev-1", author: "أحمد ممدوح", role: "فود بلوجر - القاهرة", description: "بأمانة المشروم ترافل عندهم في حتة تانية خالص، اللحمة جوسي والعيش خفيف جداً ومايتشبعش منه!", rating: 5 },
          { id: "rev-2", author: "سارة النجار", role: "التجمع الخامس", description: "أحسن تغليف وأسرع دليفري في التجمع، والأكل واصل مولع سخن زي ما طلع من الجريل.", rating: 5 },
          { id: "rev-3", author: "كابتن زياد طارق", role: "مدرب لياقة", description: "البرجر الدبل مشوي نظيف جداً ومناسب للدايت لو طلبتوه بدون مايونيز، طعم اللحم بلدي فاخر.", rating: 5 }
        ]
      },
      {
        id: "sec-bz-contact",
        type: "contact_map",
        title: "فروعنا ومواعيد العمل",
        subtitle: "زورنا في أقرب فرع ليك أو اطلب دليفري يوصلك لحد باب البيت",
        order: 6
      },
      {
        id: "sec-bz-floater",
        type: "whatsapp_floater",
        title: "طلب فوري واتساب",
        order: 7
      },
      {
        id: "sec-bz-footer",
        type: "footer",
        title: "Footer",
        order: 8
      }
    ]
  },
  {
    id: "proj-cairo-arena",
    slug: "cairo-arena",
    name: "Cairo Arena | ملاعب الساحة كايو",
    businessType: "football",
    country: "egypt",
    designStyle: "sporty_bold",
    isPublished: true,
    version: 2,
    createdAt: "2026-08-19T12:00:00.000Z",
    updatedAt: "2026-08-23T11:00:00.000Z",
    previewThumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    theme: {
      primaryColor: "#22C55E",
      secondaryColor: "#15803D",
      accentColor: "#EAB308",
      bgColor: "#05160e",
      surfaceColor: "#0b2e1d",
      textColor: "#f0fdf4",
      textMutedColor: "#86efac",
      fontFamily: "Cairo",
      borderRadius: "xl",
      shadow: "glow",
      backgroundType: "gradient"
    },
    settings: {
      general: {
        projectName: "Cairo Arena",
        businessName: "مجمع ملاعب الساحة الرياضي",
        description: "أحدث ملاعب خماسية وسباعية وملاعب بادل في القاهرة بإضاءة أولمبية ونجيل تركي معتمد",
        category: "football",
        tagline: "ملعبك جاهز.. ورنا لعبك!"
      },
      branding: {
        brandSlogan: "ماتشك في أجواء عالمية"
      },
      localization: {
        country: "egypt",
        language: "ar-eg",
        direction: "rtl",
        currency: "جنيه",
        currencySymbol: "ج.م"
      },
      contact: {
        phone: "01155443322",
        whatsapp: "201155443322",
        email: "booking@cairoarena.eg",
        address: "طريق النصر، بجوار النادي الأهلي، مدينة نصر، القاهرة",
        workingHours: "24 ساعة يومياً طوال أيام الأسبوع"
      },
      social: {
        facebook: "https://facebook.com/cairoarena",
        instagram: "https://instagram.com/cairoarena"
      },
      seo: {
        title: "حجز ملاعب كرة قدم وبادل في القاهرة | الساحة أرينا",
        description: "احجز ملعبك الخماسي أو البادل أونلاين في مدينة نصر والتجمع بأفضل الأسعار مع غرف تبديل وكافتيريا متكاملة.",
        keywords: ["حجز ملاعب", "ملاعب خماسي", "بادل القاهرة", "كرة قدم"]
      },
      publish: {
        subdomain: "cairo-arena",
        isPublished: true,
        publishedAt: "2026-08-20T14:00:00.000Z"
      }
    },
    categories: ["ملاعب خماسية", "ملاعب سباعية", "ملاعب بادل", "أكاديمية الناشئين", "بطولات ودوريات"],
    products: [
      {
        id: "prod-ca-1",
        name: "حجز ملعب خماسي VIP (ساعة مسائية)",
        description: "نجيل تركي جيل خامس، إضاءة ليد بدون ظلال، كرة رسمية، ومياه مثلجة للفريقين",
        price: 350,
        oldPrice: 400,
        discount: 12,
        category: "ملاعب خماسية",
        image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-ca-2",
        name: "حجز كورت بادل بانوراما (90 دقيقة)",
        description: "كورت زجاجي احترافي، مضارب كربونية مجاناً للإيجار، وكرات بادل جديدة",
        price: 450,
        oldPrice: 500,
        discount: 10,
        category: "ملاعب بادل",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      }
    ],
    sections: [
      { id: "sec-ca-nav", type: "navbar", title: "Navbar", order: 1 },
      {
        id: "sec-ca-hero",
        type: "hero",
        title: "احجز أقوى ملاعب كرة قدم وبادل في القاهرة أونلاين",
        subtitle: "نجيل صناعي معتمد من الفيفا، كشافات ليلية عملاقة، غرف تغيير ملابس فندقية، وكافيه مطل على الملاعب.",
        badge: " متاح حجز فوري للمساء اليوم",
        ctaText: "احجز موعد ماتشك الآن",
        ctaLink: "#booking",
        secondaryCtaText: "مشاهدة صور الملاعب",
        secondaryCtaLink: "#gallery",
        imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        order: 2
      },
      {
        id: "sec-ca-booking",
        type: "sports_field_booking",
        title: "جدول المواعيد والحجز المباشر",
        subtitle: "اختر نوع الملعب، اليوم، والساعة المفضلة وأكد حجزك عبر الواتساب فوراً",
        order: 3
      },
      {
        id: "sec-ca-services",
        type: "services",
        title: "مميزات اللعب في الساحة أرينا",
        subtitle: "أعلى مستوى من الراحة والاحترافية لتجربة كروية لا تُنسى",
        order: 4,
        items: [
          { id: "srv-1", title: "نجيل فيفا معتمد", description: "أرضية ممتصة للصدمات لحماية الركبة والمفاصل من الإصابات", icon: "Shield" },
          { id: "srv-2", title: "كاميرات تصوير الماتش HD", description: "احصل على فيديو الأهداف والمهارات لماتشك بجودة عالية مجاناً", icon: "Video" },
          { id: "srv-3", title: "كافيه وشاشات عرض", description: "مشروبات طازجة وشاشات لمشاهدة مباريات دوري أبطال أوروبا", icon: "Coffee" },
          { id: "srv-4", title: "حكام ومسعف طبي", description: "إمكانية طلب حكم معتمد ومسعف رياضي للبطولات والمباريات الرسمية", icon: "UserCheck" }
        ]
      },
      { id: "sec-ca-contact", type: "contact_map", title: "الموقع وطرق الوصول", order: 5 },
      { id: "sec-ca-footer", type: "footer", title: "Footer", order: 6 }
    ]
  },
  {
    id: "proj-elite-gym",
    slug: "elite-gym",
    name: "Elite Gym & Fitness | إليت جيم",
    businessType: "gym",
    country: "saudi",
    designStyle: "dark_modern",
    isPublished: true,
    version: 1,
    createdAt: "2026-08-18T09:00:00.000Z",
    updatedAt: "2026-08-23T08:00:00.000Z",
    previewThumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    theme: {
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706",
      accentColor: "#EAB308",
      bgColor: "#09090b",
      surfaceColor: "#18181b",
      textColor: "#fafafa",
      textMutedColor: "#a1a1aa",
      fontFamily: "Tajawal",
      borderRadius: "xl",
      shadow: "glow",
      backgroundType: "solid"
    },
    settings: {
      general: {
        projectName: "Elite Gym",
        businessName: "Elite Fitness Center",
        description: "النادي الصحي الأكثر تطوراً مع مدربين دوليين وأجهزة ألمانية متقدمة",
        category: "gym",
        tagline: "اصنع النسخة الأقوى من نفسك"
      },
      branding: {
        brandSlogan: "حيث تبدأ القوة الحقيقية"
      },
      localization: {
        country: "saudi",
        language: "ar",
        direction: "rtl",
        currency: "ريال",
        currencySymbol: "ر.س"
      },
      contact: {
        phone: "+966501234567",
        whatsapp: "966501234567",
        email: "info@elitegym.sa",
        address: "طريق الملك فهد، حي العليا، الرياض، المملكة العربية السعودية",
        workingHours: "السبت - الخميس: 6:00 ص - 12:00 م"
      },
      social: {
        instagram: "https://instagram.com/elitegym.sa"
      },
      seo: {
        title: "إليت جيم الرياض | اشتراكات نوادي ولياقة بدنية",
        description: "انضم الآن إلى أفضل جيم في الرياض مع خطط تغذية وتدريب شخصي مخصصة وبرامج ساونا وجاكوزي.",
        keywords: ["جيم الرياض", "نادي رياضي", "مدرب شخصي", "كمال أجسام"]
      },
      publish: {
        subdomain: "elite-gym",
        isPublished: true,
        publishedAt: "2026-08-19T10:00:00.000Z"
      }
    },
    categories: ["باقات العضوية", "التدريب الشخصي", "كلاسات الكارديو", "المكملات الغذائية"],
    products: [
      {
        id: "prod-eg-1",
        name: "اشتراك 3 أشهر الباقة الذهبية",
        description: "دخول غير محدود لجميع الفروع، 6 جلسات تدريب شخصي، قياس InBody شهري مجاناً، ودخول السبا",
        price: 1200,
        oldPrice: 1500,
        discount: 20,
        category: "باقات العضوية",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-eg-2",
        name: "اشتراك سنوي VIP بلاتينيوم",
        description: "دخول كامل على مدار السنة مع ضيف مجاني شهرياً، حقيبة إليت الرياضية، وبرنامج تغذية مخصص",
        price: 2900,
        oldPrice: 4200,
        discount: 30,
        category: "باقات العضوية",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      }
    ],
    sections: [
      { id: "sec-eg-nav", type: "navbar", title: "Navbar", order: 1 },
      {
        id: "sec-eg-hero",
        type: "hero",
        title: "حوّل جسمك وطاقتك في أفضل نادي رياضي متكامل",
        subtitle: "أحدث أجهزة كمال الأجسام واللياقة، مدربين معتمدين عالمياً، ومرافق استجمام فاخرة تشمل الساونا والجاكوزي.",
        badge: "🏆 خصم 30% على الاشتراكات السنوية هذا الأسبوع",
        ctaText: "اختر باقتك وانضم الآن",
        ctaLink: "#pricing",
        secondaryCtaText: "احجز جلسة تجريبية مجاناً",
        secondaryCtaLink: "#contact",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        order: 2
      },
      {
        id: "sec-eg-pricing",
        type: "membership_plans",
        title: "باقات العضوية والاشتراكات",
        subtitle: "خطط مرنة تناسب أهدافك مع إمكانية تجميد الاشتراك في أي وقت",
        order: 3,
        items: [
          { id: "plan-1", title: "الباقة الفضية (شهر)", price: 450, description: "دخول الصالة الرياضية + كلاسات لياقة عامة + إن بادي", badge: "للمبتدئين" },
          { id: "plan-2", title: "الباقة الذهبية (3 أشهر)", price: 1200, oldPrice: 1500, description: "دخول كامل + 6 جلسات تدريب خاص + سبا وساونا", badge: "الأكثر طلباً" },
          { id: "plan-3", title: "الباقة البلاتينية (سنة)", price: 2900, oldPrice: 4200, description: "شامل كل الفروع + تدريب مكثف + ضيف مجاني شهرياً", badge: "أفضل قيمة" }
        ]
      },
      { id: "sec-eg-footer", type: "footer", title: "Footer", order: 4 }
    ]
  },
  {
    id: "proj-iphone-hub",
    slug: "iphone-hub",
    name: "iPhone Hub | متجر آبل وإلكترونيات",
    businessType: "iphone",
    country: "uae",
    designStyle: "dark_modern",
    isPublished: true,
    version: 1,
    createdAt: "2026-08-17T15:00:00.000Z",
    updatedAt: "2026-08-22T19:00:00.000Z",
    previewThumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      accentColor: "#60A5FA",
      bgColor: "#030712",
      surfaceColor: "#111827",
      textColor: "#f9fafb",
      textMutedColor: "#9ca3af",
      fontFamily: "Outfit",
      borderRadius: "2xl",
      shadow: "glow",
      backgroundType: "pattern",
      backgroundPattern: "mesh"
    },
    settings: {
      general: {
        projectName: "iPhone Hub Dubai",
        businessName: "iPhone Hub Electronics",
        description: "أحدث هواتف أبل آيفون والأجهزة الذكية مع ضمان دولي وخدمة استبدال فورية",
        category: "iphone",
        tagline: "عالم أبل بين يديك"
      },
      branding: {
        brandSlogan: "الأصلي دائماً"
      },
      localization: {
        country: "uae",
        language: "ar",
        direction: "rtl",
        currency: "درهم",
        currencySymbol: "د.إ"
      },
      contact: {
        phone: "+97143998877",
        whatsapp: "97143998877",
        email: "sales@iphonehub.ae",
        address: "دبي مول، الطابق الثاني، دبي، الإمارات العربية المتحدة",
        workingHours: "يومياً من 10:00 ص إلى 12:00 منتصف الليل"
      },
      social: {
        instagram: "https://instagram.com/iphonehub.ae"
      },
      seo: {
        title: "آيفون هب دبي | أسعار آيفون 16 برو في الإمارات",
        description: "اطلب الآن أجهزة iPhone 16 Pro Max الأصلية بأفضل سعر في دبي وأبوظبي مع شحن فوري وضمان سنتين أبل كير.",
        keywords: ["آيفون دبي", "iPhone 16 Pro", "متجر أبل الإمارات", "شراء آيفون"]
      },
      publish: {
        subdomain: "iphone-hub",
        isPublished: true,
        publishedAt: "2026-08-18T11:00:00.000Z"
      }
    },
    categories: ["iPhone 16 Series", "MacBook & iPad", "Apple Watch", "AirPods & Audio", "إكسسوارات وكفرات شحن"],
    products: [
      {
        id: "prod-ih-1",
        name: "iPhone 16 Pro Max (256GB Desert Titanium)",
        description: "شريحة A18 Pro الجبارة، هيكل تيتانيوم مصقول، زر التحكم في الكاميرا، وبطارية تدوم يومين",
        price: 4999,
        oldPrice: 5299,
        discount: 6,
        category: "iPhone 16 Series",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: "prod-ih-2",
        name: "AirPods Pro (2nd Gen with USB-C)",
        description: "إلغاء ضوضاء نشط مضاعف، صوت مكاني مخصص، ومقاومة للماء والغبار",
        price: 849,
        oldPrice: 949,
        discount: 11,
        category: "AirPods & Audio",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      }
    ],
    sections: [
      { id: "sec-ih-nav", type: "navbar", title: "Navbar", order: 1 },
      {
        id: "sec-ih-hero",
        type: "hero",
        title: "الجيل الجديد من iPhone 16 Pro متوفر الآن",
        subtitle: "سرعة استثنائية، ذكاء أبل المدمج، وكاميرا سينمائية 4K 120fps مع شحن وتوصيل فوري خلال ساعتين في دبي.",
        badge: "✨ ضمان دولي معتمد + شاحن ماج سيف هدية",
        ctaText: "اطلب جهازك الآن",
        ctaLink: "#products",
        secondaryCtaText: "خدمة استبدال جهازك القديم",
        secondaryCtaLink: "#tradein",
        imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
        order: 2
      },
      { id: "sec-ih-prods", type: "products", title: "الأجهزة والمنتجات المتاحة", order: 3 },
      { id: "sec-ih-footer", type: "footer", title: "Footer", order: 4 }
    ]
  },
  {
    id: "proj-pharmacy-plus",
    slug: "pharmacy-plus",
    name: "Pharmacy Plus | صيدلية بلس للرعاية",
    businessType: "pharmacy",
    country: "egypt",
    designStyle: "clean_minimal",
    isPublished: true,
    version: 1,
    createdAt: "2026-08-16T14:00:00.000Z",
    updatedAt: "2026-08-21T16:00:00.000Z",
    previewThumbnail: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    theme: {
      primaryColor: "#0D9488",
      secondaryColor: "#0F766E",
      accentColor: "#14B8A6",
      bgColor: "#F8FAFC",
      surfaceColor: "#FFFFFF",
      textColor: "#0F172A",
      textMutedColor: "#64748B",
      fontFamily: "Almarai",
      borderRadius: "lg",
      shadow: "sm",
      backgroundType: "solid"
    },
    settings: {
      general: {
        projectName: "Pharmacy Plus",
        businessName: "صيدليات بلس الدولية",
        description: "خدمة دوائية ورعاية صحية على مدار الساعة مع توصيل روشتة واستشارات مجانية",
        category: "pharmacy",
        tagline: "صحتك أمانة في أيدٍ أمينة"
      },
      branding: {
        brandSlogan: "رعايتكم أولويتنا"
      },
      localization: {
        country: "egypt",
        language: "ar-eg",
        direction: "rtl",
        currency: "جنيه",
        currencySymbol: "ج.م"
      },
      contact: {
        phone: "19888",
        whatsapp: "201099881122",
        email: "care@pharmacyplus.eg",
        address: "ميدان مصطفى محمود، المهندسين، الجيزة",
        workingHours: "خدمة 24 ساعة طوال أيام السنة"
      },
      social: {},
      seo: {
        title: "صيدلية بلس | طلب أدوية وفيتامينات أونلاين",
        description: "صور روشتتك وابعتها على الواتساب توصلك في أقل من 30 دقيقة مع خصومات على منتجات العناية بالبشرة والمكملات.",
        keywords: ["صيدلية أونلاين", "توصيل أدوية", "روشتة واتساب", "فيتامينات"]
      },
      publish: {
        subdomain: "pharmacy-plus",
        isPublished: true,
        publishedAt: "2026-08-17T12:00:00.000Z"
      }
    },
    categories: ["أدوية وعلاجات", "فيتامينات ومكملات", "العناية بالبشرة والشعر", "رعاية الأطفال والأمهات", "أجهزة قياس الضغط والسكر"],
    products: [
      {
        id: "prod-pp-1",
        name: "مجموعة سيروم الهيالورونيك وفيتامين C الفرنسي",
        description: "نضارة فورية للبشرة، محاربة التجاعيد وترطيب عميق طوال 24 ساعة",
        price: 480,
        oldPrice: 600,
        discount: 20,
        category: "العناية بالبشرة والشعر",
        image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
        isFeatured: true
      }
    ],
    sections: [
      { id: "sec-pp-nav", type: "navbar", title: "Navbar", order: 1 },
      {
        id: "sec-pp-hero",
        type: "hero",
        title: "صحتك وصحة أسرتك في أمان مع صيدلية بلس 24/7",
        subtitle: "ابعت صورة الروشتة في ثوانٍ على الواتساب وسيقوم الصيدلي بتجهيز العلاج والتوصيل لباب بيتك مجاناً.",
        badge: "🩺 استشارة صيدلانية مجانية فورية",
        ctaText: "ابعت الروشتة عبر واتساب",
        ctaLink: "https://wa.me/201099881122",
        secondaryCtaText: "تصفح الفيتامينات والعناية",
        secondaryCtaLink: "#products",
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
        order: 2
      },
      { id: "sec-pp-prods", type: "products", title: "منتجات العناية والفيتامينات الأكثر طلباً", order: 3 },
      { id: "sec-pp-footer", type: "footer", title: "Footer", order: 4 }
    ]
  }
];

export const TEMPLATES_LIBRARY: Template[] = [
  {
    id: "tpl-burger-master",
    nameAr: "مطعم برجر عصري وسريع",
    nameEn: "Modern Burger & Fast Food",
    category: "fastfood",
    categoryNameAr: "وجبات سريعة ومطاعم",
    description: "قالب داكن حماسي مخصص لمطاعم البرجر والوجبات السريعة مع نظام طلب واتساب فوري وسلة تسوق مدمجة.",
    previewImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    badge: "الأكثر تحميلاً",
    downloadsCount: 1420,
    rating: 4.9,
    style: "egyptian_heritage",
    projectPreset: INITIAL_PROJECTS[0]
  },
  {
    id: "tpl-football-turf",
    nameAr: "حجز ملاعب وبادل ذكي",
    nameEn: "Football & Padel Arena",
    category: "football",
    categoryNameAr: "رياضة وملاعب",
    description: "نظام كامل لحجز المواعيد بالساعة، كشافات الملاعب، عرض الأكاديميات وتأجير المعدات مع واجهة خضراء رياضية جذابة.",
    previewImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    badge: "مميز",
    downloadsCount: 980,
    rating: 4.95,
    style: "sporty_bold",
    projectPreset: INITIAL_PROJECTS[1]
  },
  {
    id: "tpl-luxury-gym",
    nameAr: "نادي رياضي وجيم VIP",
    nameEn: "Elite Fitness & Gym",
    category: "gym",
    categoryNameAr: "لياقة وجيم",
    description: "تصميم فخم أسود وذهبي مع جدول الباقات والاشتراكات، استعراض المدربين، وشهادات المشتركين قبل وبعد.",
    previewImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    badge: "VIP",
    downloadsCount: 840,
    rating: 4.88,
    style: "luxury_gold",
    projectPreset: INITIAL_PROJECTS[2]
  },
  {
    id: "tpl-apple-store",
    nameAr: "متجر آيفون وإلكترونيات",
    nameEn: "Tech & Apple Hub",
    category: "iphone",
    categoryNameAr: "إلكترونيات وهواتف",
    description: "واجهة تقنية مستقبلية لعرض الهواتف الذكية مع حاسبة الاستبدال وجدول المواصفات التقنية وسلة الشراء.",
    previewImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "مستقبلي",
    downloadsCount: 1150,
    rating: 4.92,
    style: "futuristic_cyber",
    projectPreset: INITIAL_PROJECTS[3]
  },
  {
    id: "tpl-pharmacy-clean",
    nameAr: "صيدلية ومركز رعاية صحية",
    nameEn: "Pharmacy & Wellness",
    category: "pharmacy",
    categoryNameAr: "صحة ورعاية",
    description: "طابع أبيض ناصع نظيف ومريح للعين مع نموذج إرسال الروشتة السريع عبر الواتساب وفلترة الفيتامينات.",
    previewImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    downloadsCount: 720,
    rating: 4.85,
    style: "clean_minimal",
    projectPreset: INITIAL_PROJECTS[4]
  },
  {
    id: "tpl-istanbul-coffee",
    nameAr: "مقهى ومحمصة قهوة مختصة",
    nameEn: "Specialty Coffee Roastery",
    category: "cafe",
    categoryNameAr: "كافيهات ومقاهي",
    description: "أجواء خشبية دافئة مع استعراض محاصيل القن الفاخرة V60 وطرق التحضير وحجز طاولات الاسترخاء.",
    previewImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    downloadsCount: 650,
    rating: 4.9,
    style: "dark_modern",
    projectPreset: INITIAL_PROJECTS[0]
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: "med-1", title: "برجر كلاسيك مشوي فاخر", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", category: "burger", source: "curated", photographer: "Amirali Mirhashemian", createdAt: "2026-08-20" },
  { id: "med-2", title: "برجر ترافل مشروم دبل", url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80", category: "burger", source: "curated", photographer: "Jonathan Borba", createdAt: "2026-08-20" },
  { id: "med-3", title: "ملعب كرة قدم ليلي بإضاءة كشافات", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", category: "football", source: "curated", photographer: "Izuddin Helmi", createdAt: "2026-08-21" },
  { id: "med-4", title: "ملعب خماسي نجيل تركي صناعي", url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80", category: "football", source: "curated", photographer: "Emilio Garcia", createdAt: "2026-08-21" },
  { id: "med-5", title: "صالة جيم وأوزان حرة ديلوكس", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", category: "gym", source: "curated", photographer: "Sven Mieke", createdAt: "2026-08-22" },
  { id: "med-6", title: "آيفون 16 برو تيتانيوم صحراوي", url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", category: "iphone", source: "curated", photographer: "Denis Cherkashin", createdAt: "2026-08-22" },
  { id: "med-7", title: "صيدلية ورعاية ومنتجات تجميل", url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80", category: "pharmacy", source: "curated", photographer: "Laurynas Mereckas", createdAt: "2026-08-23" },
  { id: "med-8", title: "كافيه وقهوة تركية مختصة", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80", category: "coffee", source: "curated", photographer: "Tim Wright", createdAt: "2026-08-23" }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: "act-1", action: "تم نشر موقع برجر زون على النطاق الحي", timestamp: "منذ 10 دقائق", projectName: "Burger Zone", type: "publish" },
  { id: "act-2", action: "توليد 4 منتجات جديدة بالذكاء الاصطناعي", timestamp: "منذ ساعة", projectName: "Cairo Football Arena", type: "ai_generate" },
  { id: "act-3", action: "تعديل ألوان الهوية إلى النمط الرياضي الأخضر", timestamp: "منذ 3 ساعات", projectName: "Cairo Football Arena", type: "edit" },
  { id: "act-4", action: "إنشاء مشروع جديد بالذكاء الاصطناعي", timestamp: "أمس", projectName: "Elite Gym", type: "create" }
];
