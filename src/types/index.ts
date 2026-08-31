export type BusinessCategoryType =
  | "restaurant"
  | "cafe"
  | "fastfood"
  | "bakery"
  | "supermarket"
  | "pharmacy"
  | "gym"
  | "football"
  | "padel"
  | "barber"
  | "salon"
  | "clothing"
  | "shoes"
  | "electronics"
  | "iphone"
  | "hotel"
  | "realestate"
  | "clinic"
  | "dentist"
  | "education"
  | "portfolio"
  | "agency"
  | "cars"
  | "cleaning"
  | "perfume"
  | "jewelry"
  | "custom";

export type CountryCulture =
  | "egypt"
  | "saudi"
  | "uae"
  | "kuwait"
  | "turkey"
  | "morocco"
  | "france"
  | "italy"
  | "uk"
  | "usa"
  | "japan"
  | "custom";

export type DesignStyle =
  | "luxury_gold"
  | "dark_modern"
  | "clean_minimal"
  | "glassmorphism"
  | "futuristic_cyber"
  | "egyptian_heritage"
  | "sporty_bold"
  | "colorful_youth"
  | "vintage_retro"
  | "corporate_tech";

export type SectionType =
  | "navbar"
  | "hero"
  | "products"
  | "menu"
  | "categories"
  | "services"
  | "features"
  | "branches"
  | "booking"
  | "sports_field_booking"
  | "doctor_appointment"
  | "hotel_booking"
  | "membership_plans"
  | "gallery"
  | "testimonials"
  | "about"
  | "offers"
  | "countdown"
  | "team"
  | "faq"
  | "opening_hours"
  | "contact_map"
  | "whatsapp_floater"
  | "whatsapp_cta"
  | "footer"
  | "custom";

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
  fontFamily: "Cairo" | "Tajawal" | "Almarai" | "IBM Plex Sans Arabic" | "Outfit" | "Playfair Display";
  headingFont?: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  shadow: "none" | "sm" | "md" | "lg" | "glow";
  backgroundType: "solid" | "gradient" | "pattern" | "image" | "glass";
  backgroundPattern?: "dots" | "grid" | "mesh" | "radial" | "none";
  customBgImage?: string;
}

export interface SectionItem {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  image?: string;
  icon?: string;
  badge?: string;
  rating?: number;
  author?: string;
  role?: string;
  timeSlot?: string;
  isAvailable?: boolean;
  link?: string;
  category?: string;
  tag?: string;
}

export interface SectionStyles {
  paddingTop?: string;
  paddingBottom?: string;
  backgroundColor?: string;
  textColor?: string;
  alignment?: "left" | "center" | "right";
  columns?: 1 | 2 | 3 | 4 | 6;
  layoutVariant?: "cards" | "grid" | "list" | "slider" | "compact" | "split" | "overlay";
  showBadge?: boolean;
  borderRadius?: string;
  boxShadow?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  items?: SectionItem[];
  styles?: SectionStyles;
  hidden?: boolean;
  order: number;
  metadata?: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  image: string;
  gallery?: string[];
  tags?: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  attributes?: Record<string, string | number>;
}

export interface ProjectSettings {
  general: {
    projectName: string;
    businessName: string;
    description: string;
    category: string;
    logoUrl?: string;
    tagline?: string;
  };
  branding: {
    faviconUrl?: string;
    brandSlogan?: string;
  };
  localization: {
    country: CountryCulture;
    language: "ar" | "ar-eg" | "en" | "ar-en";
    direction: "rtl" | "ltr";
    currency: string;
    currencySymbol: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    googleMapsEmbed?: string;
    workingHours?: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  publish: {
    subdomain: string;
    customDomain?: string;
    isPublished: boolean;
    publishedAt?: string;
  };
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  businessType: BusinessCategoryType | string;
  customIdeaDescription?: string;
  country: CountryCulture;
  designStyle: DesignStyle;
  theme: ThemeConfig;
  sections: Section[];
  products: Product[];
  categories: string[];
  settings: ProjectSettings;
  isPublished: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
  previewThumbnail?: string;
}

export interface Template {
  id: string;
  nameAr: string;
  nameEn: string;
  category: BusinessCategoryType;
  categoryNameAr: string;
  description: string;
  previewImage: string;
  badge?: string;
  downloadsCount: number;
  rating: number;
  style: DesignStyle;
  projectPreset: Partial<Project>;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: string;
  source: "upload" | "unsplash" | "ai" | "curated";
  photographer?: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  projectName: string;
  type: "create" | "edit" | "publish" | "ai_generate" | "delete";
}

export interface UserSession {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "owner";
  };
}
