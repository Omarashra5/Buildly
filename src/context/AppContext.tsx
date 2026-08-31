import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, Template, MediaItem, ActivityItem, UserSession, Section, Product, ThemeConfig } from "../types";
import { INITIAL_PROJECTS, TEMPLATES_LIBRARY, INITIAL_MEDIA, INITIAL_ACTIVITY } from "../data/mockData";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface AppContextType {
  // Navigation & Views
  activeView: "landing" | "wizard" | "dashboard" | "builder" | "preview" | "live_site" | "login";
  setActiveView: (view: "landing" | "wizard" | "dashboard" | "builder" | "preview" | "live_site" | "login") => void;
  dashboardTab: "overview" | "projects" | "templates" | "media" | "products" | "themes" | "ai" | "settings";
  setDashboardTab: (tab: "overview" | "projects" | "templates" | "media" | "products" | "themes" | "ai" | "settings") => void;

  // Projects State
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  publishProject: (id: string) => void;

  // Builder State
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  canvasDevice: "desktop" | "tablet" | "mobile";
  setCanvasDevice: (device: "desktop" | "tablet" | "mobile") => void;
  canvasZoom: number;
  setCanvasZoom: (zoom: number) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
  isMediaPickerOpen: boolean;
  setIsMediaPickerOpen: (open: boolean) => void;
  mediaPickerCallback: ((url: string) => void) | null;
  openMediaPicker: (onSelect: (url: string) => void) => void;

  // Sections & Content Manipulation
  addSection: (section: Partial<Section>) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: "up" | "down") => void;
  updateTheme: (updates: Partial<ThemeConfig>) => void;

  // Products Manipulation
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Templates & Media
  templates: Template[];
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, "id" | "createdAt">) => void;
  deleteMediaItem: (id: string) => void;
  searchOnlineImages: (query: string, category?: string) => Promise<Array<{ url: string; title: string; category: string; source: string }>>;

  // Activities & Logs
  activities: ActivityItem[];
  addActivity: (action: string, projectName: string, type: ActivityItem["type"]) => void;

  // Auth & Session
  userSession: UserSession;
  login: (password: string) => boolean;
  logout: () => void;

  // Notifications / Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem["type"]) => void;
  dismissToast: (id: string) => void;

  // AI Actions
  callGeminiAi: (prompt: string, action: string, context?: any) => Promise<{ success: boolean; data: any; isFallback?: boolean; message?: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial projects from localStorage or default
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("mashrouiy_projects");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read projects from localStorage", e);
    }
    return INITIAL_PROJECTS;
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(() => INITIAL_PROJECTS[0]);
  const [activeView, setActiveView] = useState<AppContextType["activeView"]>("landing");
  const [dashboardTab, setDashboardTab] = useState<AppContextType["dashboardTab"]>("overview");

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [canvasDevice, setCanvasDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [canvasZoom, setCanvasZoom] = useState<number>(100);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  // Templates, Media, Activity
  const [templates] = useState<Template[]>(TEMPLATES_LIBRARY);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem("mashrouiy_media");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MEDIA;
  });
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem("mashrouiy_activities");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ACTIVITY;
  });

  // User auth session
  const [userSession, setUserSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem("mashrouiy_session");
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      isAuthenticated: true,
      user: {
        name: "مدير المنصة (Owner)",
        email: "admin@mashrouiy.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: "owner"
      }
    };
  });

  // Toast system
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // History stack for Undo / Redo
  const [history, setHistory] = useState<Project[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("mashrouiy_projects", JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem("mashrouiy_media", JSON.stringify(mediaItems));
    } catch (e) {}
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem("mashrouiy_activities", JSON.stringify(activities));
    } catch (e) {}
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem("mashrouiy_session", JSON.stringify(userSession));
    } catch (e) {}
  }, [userSession]);

  const showToast = (message: string, type: ToastItem["type"] = "success") => {
    const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addActivity = (action: string, projectName: string, type: ActivityItem["type"]) => {
    const item: ActivityItem = {
      id: "act-" + Date.now(),
      action,
      timestamp: "الآن",
      projectName,
      type
    };
    setActivities((prev) => [item, ...prev.slice(0, 30)]);
  };

  // Push current project state to history stack
  const pushHistory = (project: Project) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      return [...next, JSON.parse(JSON.stringify(project))];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevProject = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentProject(prevProject);
      setProjects((all) => all.map((p) => (p.id === prevProject.id ? prevProject : p)));
      showToast("تم التراجع عن التعديل الأخير", "info");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextProject = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentProject(nextProject);
      setProjects((all) => all.map((p) => (p.id === nextProject.id ? nextProject : p)));
      showToast("تم إعادة التعديل", "info");
    }
  };

  const createProject = (data: Partial<Project>): Project => {
    const id = "proj-" + Date.now();
    const slug = (data.name || "my-project").toLowerCase().replace(/[^a-z0-9]+/g, "-") || `project-${Date.now()}`;
    const newProject: Project = {
      id,
      slug,
      name: data.name || "مشروعي الجديد",
      businessType: data.businessType || "custom",
      customIdeaDescription: data.customIdeaDescription || "",
      country: data.country || "egypt",
      designStyle: data.designStyle || "dark_modern",
      isPublished: false,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      previewThumbnail: data.previewThumbnail || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      theme: data.theme || {
        primaryColor: "#EAB308",
        secondaryColor: "#CA8A04",
        accentColor: "#FDE047",
        bgColor: "#09090b",
        surfaceColor: "#18181b",
        textColor: "#fafafa",
        textMutedColor: "#a1a1aa",
        fontFamily: "Cairo",
        borderRadius: "xl",
        shadow: "glow",
        backgroundType: "pattern",
        backgroundPattern: "radial"
      },
      settings: data.settings || {
        general: {
          projectName: data.name || "مشروع جديد",
          businessName: data.name || "مشروع جديد",
          description: data.customIdeaDescription || "موقع تجاري متكامل",
          category: String(data.businessType || "general")
        },
        branding: {},
        localization: {
          country: data.country || "egypt",
          language: "ar",
          direction: "rtl",
          currency: data.country === "egypt" ? "جنيه" : data.country === "saudi" ? "ريال" : "دولار",
          currencySymbol: data.country === "egypt" ? "ج.م" : data.country === "saudi" ? "ر.س" : "$"
        },
        contact: {
          phone: "01000000000",
          whatsapp: "201000000000",
          email: "info@myproject.com",
          address: "القاهرة، مصر"
        },
        social: {},
        seo: {
          title: data.name || "مشروعي",
          description: data.customIdeaDescription || "موقع تم إنشاؤه عبر منصة مشروعي",
          keywords: ["مشروعي", "موقع تجاري"]
        },
        publish: {
          subdomain: slug,
          isPublished: false
        }
      },
      categories: data.categories || ["الرئيسية", "المنتجات", "العروض", "تواصل معنا"],
      products: data.products || [],
      sections: data.sections || [
        { id: "sec-" + Date.now() + "-1", type: "navbar", title: "Navbar", order: 1 },
        {
          id: "sec-" + Date.now() + "-2",
          type: "hero",
          title: data.name || "مرحباً بكم في موقعنا",
          subtitle: data.customIdeaDescription || "نقدم أفضل الخدمات والمنتجات بأعلى جودة واحترافية.",
          ctaText: "تواصل معنا الآن",
          ctaLink: "#contact",
          imageUrl: data.previewThumbnail || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
          order: 2
        },
        { id: "sec-" + Date.now() + "-3", type: "products", title: "أبرز العروض والمنتجات", order: 3 },
        { id: "sec-" + Date.now() + "-4", type: "contact_map", title: "الموقع والتواصل", order: 4 },
        { id: "sec-" + Date.now() + "-5", type: "footer", title: "Footer", order: 5 }
      ]
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProject(newProject);
    addActivity("تم إنشاء مشروع جديد بنجاح", newProject.name, "create");
    showToast(`تم إنشاء المشروع "${newProject.name}" بنجاح!`);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = {
            ...p,
            ...updates,
            updatedAt: new Date().toISOString(),
            version: (p.version || 1) + 1
          };
          if (currentProject?.id === id) {
            pushHistory(updated);
            setCurrentProject(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (currentProject?.id === id) {
      const remaining = projects.filter((p) => p.id !== id);
      setCurrentProject(remaining[0] || null);
    }
    addActivity(`تم حذف المشروع ${target.name}`, target.name, "delete");
    showToast(`تم حذف المشروع "${target.name}"`, "info");
  };

  const duplicateProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const duplicated: Project = {
      ...JSON.parse(JSON.stringify(target)),
      id: "proj-" + Date.now(),
      name: target.name + " (نسخة مكررة)",
      slug: target.slug + "-copy-" + Date.now().toString().slice(-4),
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects((prev) => [duplicated, ...prev]);
    addActivity(`تم تكرار المشروع ${target.name}`, target.name, "create");
    showToast(`تم إنشاء نسخة مكررة من "${target.name}"`);
  };

  const publishProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const updated = {
      ...target,
      isPublished: true,
      settings: {
        ...target.settings,
        publish: {
          ...target.settings.publish,
          isPublished: true,
          publishedAt: new Date().toISOString()
        }
      }
    };
    updateProject(id, updated);
    addActivity(`تم نشر الموقع للجمهور`, target.name, "publish");
    showToast(`🎉 مبروك! تم نشر موقع "${target.name}" بنجاح.`);
  };

  // Section manipulation helpers
  const addSection = (section: Partial<Section>) => {
    if (!currentProject) return;
    const newSection: Section = {
      id: "sec-" + Date.now(),
      type: section.type || "services",
      title: section.title || "عنوان القسم الجديد",
      subtitle: section.subtitle || "وصف مختصر للقسم ومحتواه",
      items: section.items || [],
      order: currentProject.sections.length + 1,
      styles: section.styles || { alignment: "right" },
      ...section
    };
    const updatedSections = [...currentProject.sections, newSection];
    updateProject(currentProject.id, { sections: updatedSections });
    setSelectedSectionId(newSection.id);
    showToast(`تمت إضافة قسم "${newSection.title}"`);
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    if (!currentProject) return;
    const updatedSections = currentProject.sections.map((sec) => (sec.id === sectionId ? { ...sec, ...updates } : sec));
    updateProject(currentProject.id, { sections: updatedSections });
  };

  const deleteSection = (sectionId: string) => {
    if (!currentProject) return;
    const updatedSections = currentProject.sections.filter((sec) => sec.id !== sectionId);
    updateProject(currentProject.id, { sections: updatedSections });
    if (selectedSectionId === sectionId) setSelectedSectionId(null);
    showToast("تم حذف القسم بنجاح", "info");
  };

  const duplicateSection = (sectionId: string) => {
    if (!currentProject) return;
    const target = currentProject.sections.find((s) => s.id === sectionId);
    if (!target) return;
    const dup: Section = {
      ...JSON.parse(JSON.stringify(target)),
      id: "sec-" + Date.now(),
      title: target.title + " (نسخة)",
      order: target.order + 1
    };
    const updated = [...currentProject.sections, dup];
    updateProject(currentProject.id, { sections: updated });
    setSelectedSectionId(dup.id);
    showToast("تم تكرار القسم");
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    if (!currentProject) return;
    const index = currentProject.sections.findIndex((s) => s.id === sectionId);
    if (index < 0) return;
    const newSections = [...currentProject.sections];
    if (direction === "up" && index > 0) {
      const temp = newSections[index];
      newSections[index] = newSections[index - 1];
      newSections[index - 1] = temp;
    } else if (direction === "down" && index < newSections.length - 1) {
      const temp = newSections[index];
      newSections[index] = newSections[index + 1];
      newSections[index + 1] = temp;
    }
    // Update order numbers
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });
    updateProject(currentProject.id, { sections: newSections });
  };

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    if (!currentProject) return;
    const newTheme = { ...currentProject.theme, ...updates };
    updateProject(currentProject.id, { theme: newTheme });
    showToast("تم تحديث مظهر وهوية المشروع");
  };

  // Product manipulation helpers
  const addProduct = (product: Omit<Product, "id">) => {
    if (!currentProject) return;
    const newProd: Product = {
      ...product,
      id: "prod-" + Date.now()
    };
    const updated = [...currentProject.products, newProd];
    updateProject(currentProject.id, { products: updated });
    showToast(`تمت إضافة منتج "${newProd.name}"`);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    if (!currentProject) return;
    const updated = currentProject.products.map((p) => (p.id === productId ? { ...p, ...updates } : p));
    updateProject(currentProject.id, { products: updated });
    showToast("تم حفظ تعديلات المنتج");
  };

  const deleteProduct = (productId: string) => {
    if (!currentProject) return;
    const updated = currentProject.products.filter((p) => p.id !== productId);
    updateProject(currentProject.id, { products: updated });
    showToast("تم حذف المنتج", "info");
  };

  // Media Library
  const addMediaItem = (item: Omit<MediaItem, "id" | "createdAt">) => {
    const newItem: MediaItem = {
      ...item,
      id: "med-" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0]
    };
    setMediaItems((prev) => [newItem, ...prev]);
    showToast("تمت إضافة الصورة إلى مكتبة الوسائط");
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast("تم حذف الصورة", "info");
  };

  const openMediaPicker = (onSelect: (url: string) => void) => {
    setMediaPickerCallback(() => onSelect);
    setIsMediaPickerOpen(true);
  };

  const searchOnlineImages = async (query: string, category?: string) => {
    try {
      const res = await fetch(`/api/images/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category || "")}`);
      const data = await res.json();
      return data.results || [];
    } catch (e) {
      console.warn("Failed to search images", e);
      return [];
    }
  };

  // Auth
  const login = (password: string): boolean => {
    if (password === "admin" || password === "123456" || password.length >= 4) {
      setUserSession({
        isAuthenticated: true,
        user: {
          name: "مدير المنصة (Owner)",
          email: "admin@mashrouiy.com",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          role: "owner"
        }
      });
      showToast("مرحباً بك في لوحة تحكم مشروعي!");
      return true;
    }
    showToast("كلمة المرور غير صحيحة", "error");
    return false;
  };

  const logout = () => {
    setUserSession((prev) => ({ ...prev, isAuthenticated: false }));
    setActiveView("landing");
    showToast("تم تسجيل الخروج بنجاح", "info");
  };

  // AI assistant integration
  const callGeminiAi = async (prompt: string, action: string, context?: any) => {
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, action, context: context || currentProject })
      });
      const data = await res.json();
      return data;
    } catch (e: any) {
      return {
        success: false,
        isFallback: true,
        data: null,
        message: e?.message || "تعذر الاتصال بالخادم"
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        dashboardTab,
        setDashboardTab,
        projects,
        currentProject,
        setCurrentProject,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        publishProject,
        selectedSectionId,
        setSelectedSectionId,
        selectedElementId,
        setSelectedElementId,
        canvasDevice,
        setCanvasDevice,
        canvasZoom,
        setCanvasZoom,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isMediaPickerOpen,
        setIsMediaPickerOpen,
        mediaPickerCallback,
        openMediaPicker,
        addSection,
        updateSection,
        deleteSection,
        duplicateSection,
        moveSection,
        updateTheme,
        addProduct,
        updateProduct,
        deleteProduct,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        templates,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        searchOnlineImages,
        activities,
        addActivity,
        userSession,
        login,
        logout,
        toasts,
        showToast,
        dismissToast,
        callGeminiAi
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
