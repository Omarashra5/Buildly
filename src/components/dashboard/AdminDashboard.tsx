import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Project, Template, Product } from "../../types";
import {
  LayoutDashboard,
  FolderKanban,
  LayoutTemplate,
  ShoppingBag,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Settings,
  Plus,
  Search,
  ExternalLink,
  Edit,
  Copy,
  Trash2,
  Globe,
  CheckCircle2,
  TrendingUp,
  Users,
  Eye,
  Activity,
  ArrowUpRight,
  LogOut,
  Upload,
  Filter,
  Download
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const {
    projects,
    templates,
    mediaItems,
    activities,
    currentProject,
    setCurrentProject,
    createProject,
    deleteProject,
    duplicateProject,
    publishProject,
    dashboardTab,
    setDashboardTab,
    setActiveView,
    logout,
    openMediaPicker,
    showToast,
    addProduct
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // New product form state
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState(150);
  const [newProdCategory, setNewProdCategory] = useState("الرئيسية");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.businessType === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPublished = projects.filter((p) => p.isPublished).length;
  const totalProducts = projects.reduce((sum, p) => sum + (p.products?.length || 0), 0);

  const handleEditProject = (proj: Project) => {
    setCurrentProject(proj);
    setActiveView("builder");
  };

  const handlePreviewProject = (proj: Project) => {
    setCurrentProject(proj);
    setActiveView("preview");
  };

  const handleCloneTemplate = (tmpl: Template) => {
    const newProj = createProject({
      name: tmpl.nameAr,
      businessType: tmpl.category as any,
      customIdeaDescription: tmpl.description,
      previewThumbnail: tmpl.previewImage,
      theme: tmpl.projectPreset.theme,
      sections: tmpl.projectPreset.sections,
      products: tmpl.projectPreset.products
    });
    setCurrentProject(newProj);
    setActiveView("builder");
    showToast(`تم استنساخ قالب "${tmpl.nameAr}" وبدء تحريره بنجاح!`);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mashrouiy_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("تم تصدير نسخة احتياطية من كافة المشاريع بنجاح!");
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white flex flex-col md:flex-row overflow-hidden font-['Cairo'] selection:bg-[#00FFC2] selection:text-black">
      {/* SIDEBAR NAVIGATION - BENTO THEMED */}
      <aside className="w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 md:border-l border-white/10 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Logo & Brand */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#7000FF]/30">
                م
              </div>
              <div>
                <h1 className="font-extrabold text-base text-white tracking-tight">مشروعي</h1>
                <p className="text-[11px] text-[#A870FF] font-semibold">Bento AI Hub</p>
              </div>
            </div>
            <button
              onClick={() => setActiveView("landing")}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-xs transition-colors"
              title="العودة للصفحة الرئيسية"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Create Button */}
          <div className="p-4">
            <button
              onClick={() => setActiveView("wizard")}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#7000FF]/25 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 stroke-[3] text-[#00FFC2]" />
              <span>إنشاء موقع جديد بالـ AI</span>
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="px-3 space-y-1">
            {[
              { id: "overview", label: "نظرة عامة وإحصائيات", icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: "projects", label: `كل المشاريع (${projects.length})`, icon: <FolderKanban className="w-4 h-4" /> },
              { id: "templates", label: "سوق القوالب الجاهزة", icon: <LayoutTemplate className="w-4 h-4" /> },
              { id: "products", label: `إدارة المنتجات (${totalProducts})`, icon: <ShoppingBag className="w-4 h-4" /> },
              { id: "media", label: `مكتبة الصور والوسائط`, icon: <ImageIcon className="w-4 h-4" /> },
              { id: "themes", label: "استوديو الهوية والتصميم", icon: <Palette className="w-4 h-4" /> },
              { id: "ai", label: "أوامر الذكاء الاصطناعي", icon: <Sparkles className="w-4 h-4 text-[#00FFC2]" /> },
              { id: "settings", label: "إعدادات المنصة والدومين", icon: <Settings className="w-4 h-4" /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setDashboardTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-right ${
                  dashboardTab === item.id
                    ? "bg-[#00FFC2] text-black shadow-md font-extrabold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Account / Footer */}
        <div className="p-4 border-t border-white/10 bg-[#06060a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#7000FF]/20 text-[#A870FF] border border-[#7000FF]/40 flex items-center justify-center font-bold text-xs">
              👑
            </div>
            <div>
              <p className="text-xs font-bold text-white">المدير العام (Owner)</p>
              <p className="text-[10px] text-[#00FFC2] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFC2] animate-pulse"></span>
                جلسة نشطة
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-white/40 hover:text-rose-400 hover:bg-white/5 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#030305]">
        {/* TAB 1: OVERVIEW & STATS - BENTO GRID */}
        {dashboardTab === "overview" && (
          <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">مرحباً بك في مصنع المواقع "مشروعي" 🚀</h2>
                <p className="text-xs sm:text-sm text-white/50 mt-1">
                  تحكم بجميع مواقعك وأنشطتك التجارية المختلفة من شاشة مركزية واحدة بتصميم بينتو الموحد.
                </p>
              </div>
              <button
                onClick={() => setActiveView("wizard")}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-[#7000FF]/30 self-start"
              >
                <Plus className="w-4 h-4 text-[#00FFC2]" />
                إنشاء مشروع جديد
              </button>
            </div>

            {/* Bento Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bento-card p-5 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span>إجمالي المشاريع</span>
                  <FolderKanban className="w-4 h-4 text-[#A870FF]" />
                </div>
                <div className="text-3xl font-black font-mono text-white">{projects.length}</div>
                <p className="text-[11px] text-[#00FFC2] flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3 h-3" />
                  جاهزة للتحرير والتخصيص
                </p>
              </div>

              <div className="bento-card p-5 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span>المواقع المنشورة (Live)</span>
                  <Globe className="w-4 h-4 text-[#00FFC2]" />
                </div>
                <div className="text-3xl font-black font-mono text-[#00FFC2]">{totalPublished}</div>
                <p className="text-[11px] text-white/40">متاحة ومربوطة بشهادة SSL</p>
              </div>

              <div className="bento-card p-5 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span>إجمالي المنتجات والخدمات</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black font-mono text-white">{totalProducts}</div>
                <p className="text-[11px] text-white/40">مع الطلب المباشر عبر واتساب</p>
              </div>

              <div className="bento-card p-5 space-y-2">
                <div className="flex items-center justify-between text-white/40 text-xs">
                  <span>قوالب ومكتبات الذكاء الاصطناعي</span>
                  <Sparkles className="w-4 h-4 text-[#A870FF]" />
                </div>
                <div className="text-3xl font-black font-mono text-[#A870FF]">{templates.length}</div>
                <p className="text-[11px] text-white/40">أنشطة متعددة جاهزة للاستنساخ</p>
              </div>
            </div>

            {/* Recent Projects Showcase */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">أحدث المشاريع النشطة</h3>
                <button
                  onClick={() => setDashboardTab("projects")}
                  className="text-xs text-[#00FFC2] hover:underline font-bold"
                >
                  عرض جميع المشاريع ({projects.length}) ←
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.slice(0, 3).map((proj) => (
                  <div
                    key={proj.id}
                    className="bento-card overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={proj.previewThumbnail}
                        alt={proj.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {proj.isPublished ? (
                          <span className="px-2.5 py-1 bg-[#00FFC2] text-black text-[11px] font-black rounded-lg shadow">
                            منشور Live
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-[#111115]/90 text-white/70 text-[11px] font-bold rounded-lg border border-white/10">
                            مسودة (Draft)
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 left-3">
                        <h4 className="text-base font-bold text-white leading-tight">{proj.name}</h4>
                        <p className="text-xs text-white/60 truncate mt-0.5">{proj.settings.publish.subdomain}.mashrouiy.com</p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#111115] border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-white/40 font-mono">
                        {proj.sections.length} أقسام • {proj.products.length} منتجات
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePreviewProject(proj)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                          title="معاينة الزائر"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white text-xs flex items-center gap-1.5 shadow transition-all"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#00FFC2]" />
                          <span>تحرير الكانفاس</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Log Stream */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00FFC2]" />
                <h3 className="text-sm font-bold text-white">سجل العمليات والأنشطة الأخيرة</h3>
              </div>
              <div className="divide-y divide-white/5">
                {activities.slice(0, 5).map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#00FFC2]" />
                      <span className="font-semibold text-white/90">{act.action}</span>
                      <span className="text-white/40 font-mono">({act.projectName})</span>
                    </div>
                    <span className="text-white/40 font-mono text-[11px]">{act.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {dashboardTab === "projects" && (
          <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">إدارة المشاريع والمواقع ({projects.length})</h2>
                <p className="text-xs text-white/40 mt-1">تعديل، نشر، تكرار أو حذف أي موقع من مواقعك</p>
              </div>
              <button
                onClick={() => setActiveView("wizard")}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs flex items-center gap-2 shadow-lg self-start"
              >
                <Plus className="w-4 h-4 text-[#00FFC2]" />
                إنشاء مشروع جديد
              </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم المشروع أو الدومين..."
                  className="w-full pl-4 pr-10 py-2.5 bg-[#111115] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#00FFC2]"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 bg-[#111115] border border-white/10 rounded-xl text-white/70 text-xs focus:outline-none focus:border-[#00FFC2]"
              >
                <option value="all">جميع الأنشطة والتصنيفات</option>
                <option value="burger">مطاعم وبرجر</option>
                <option value="football_padel">ملاعب وبادل</option>
                <option value="tech_electronics">تقنية وهواتف</option>
                <option value="gym_fitness">جيم ولياقة</option>
                <option value="custom">مشاريع مخصصة</option>
              </select>
            </div>

            {/* Projects Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bento-card overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={proj.previewThumbnail}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      {proj.isPublished ? (
                        <span className="px-2.5 py-1 bg-[#00FFC2] text-black text-[11px] font-black rounded-lg shadow">
                          منشور Live
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#111115]/90 text-white/70 text-[11px] font-bold rounded-lg border border-white/10">
                          مسودة
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <h4 className="text-base font-bold text-white leading-tight">{proj.name}</h4>
                      <p className="text-xs text-white/60 truncate mt-0.5">{proj.settings.publish.subdomain}.mashrouiy.com</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-[#111115]">
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>النشاط: {proj.businessType}</span>
                      <span>المنتجات: {proj.products.length}</span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handlePreviewProject(proj)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors"
                          title="معاينة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateProject(proj.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors"
                          title="نسخ مكرر"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/80 text-white/40 hover:text-rose-400 text-xs transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleEditProject(proj)}
                        className="px-4 py-2 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#00FFC2]" />
                        <span>فتح الكانفاس</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEMPLATES MARKETPLACE */}
        {dashboardTab === "templates" && (
          <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div>
              <h2 className="text-2xl font-black text-white">سوق القوالب الجاهزة ({templates.length})</h2>
              <p className="text-xs text-white/40 mt-1">اختر قالباً واستنسخه بنقرة واحدة لتبدأ التعديل فوراً</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bento-card overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={tmpl.previewImage}
                      alt={tmpl.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-bold text-[#00FFC2] border border-white/10">
                      {tmpl.categoryNameAr || tmpl.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#111115]">
                    <div>
                      <h4 className="text-lg font-bold text-white">{tmpl.nameAr}</h4>
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">{tmpl.description}</p>
                    </div>

                    <button
                      onClick={() => handleCloneTemplate(tmpl)}
                      className="w-full py-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-extrabold text-white rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-[#00FFC2]" />
                      <span>استنساخ وبدء هذا القالب</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS CATALOG */}
        {dashboardTab === "products" && (
          <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">كتالوج المنتجات والخدمات</h2>
                <p className="text-xs text-white/40 mt-1">إضافة وتعديل المنتجات على المشروع النشط ({currentProject?.name})</p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs flex items-center gap-2 shadow-lg self-start"
              >
                <Plus className="w-4 h-4 text-[#00FFC2]" />
                إضافة منتج جديد
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(currentProject?.products || []).map((prod) => (
                <div key={prod.id} className="bento-card overflow-hidden shadow-xl flex flex-col justify-between">
                  <div className="relative aspect-square bg-black">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2 bg-[#111115]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/40">{prod.category}</span>
                      <span className="font-bold text-[#00FFC2] font-mono">{prod.price} {currentProject?.settings.localization.currencySymbol}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white">{prod.name}</h4>
                    <p className="text-xs text-white/40 line-clamp-2">{prod.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#0e0e14] border border-white/10 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">إضافة منتج / وجبة جديدة</h3>
                    <button onClick={() => setIsAddProductModalOpen(false)} className="text-white/40 hover:text-white">✕</button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">اسم المنتج</label>
                    <input
                      type="text"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="مثال: دبل تشيز برجر باربيكيو"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1">السعر</label>
                      <input
                        type="number"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-1">التصنيف</label>
                      <input
                        type="text"
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        placeholder="البرجر، العروض..."
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">الوصف والمكونات</label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="وصف تفصيلي..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-white/80">رابط الصورة</label>
                      <button
                        onClick={() => openMediaPicker((url) => setNewProdImage(url))}
                        className="text-xs text-[#00FFC2] font-bold hover:underline"
                      >
                        ابحث عن صورة بالـ AI
                      </button>
                    </div>
                    <input
                      type="url"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#00FFC2]"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!newProdName.trim()) return;
                      addProduct({
                        name: newProdName,
                        price: newProdPrice,
                        category: newProdCategory,
                        description: newProdDesc,
                        image: newProdImage || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
                        isAvailable: true
                      });
                      setIsAddProductModalOpen(false);
                      setNewProdName("");
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] text-white font-extrabold rounded-xl text-xs shadow-lg transition-all"
                  >
                    حفظ المنتج وإضافته للموقع
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MEDIA LIBRARY */}
        {dashboardTab === "media" && (
          <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">مكتبة الوسائط والصور ({mediaItems.length})</h2>
                <p className="text-xs text-white/40 mt-1">تصفح ورفع واستخدام الصور عالية الجودة في مختلف الأقسام</p>
              </div>
              <button
                onClick={() => openMediaPicker(() => {})}
                className="px-5 py-2.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs flex items-center gap-2 shadow-lg self-start"
              >
                <Search className="w-4 h-4 text-[#00FFC2]" />
                البحث في صور Unsplash
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaItems.map((med) => (
                <div key={med.id} className="bento-card overflow-hidden shadow-lg group">
                  <div className="aspect-square bg-black overflow-hidden relative">
                    <img src={med.url} alt={med.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-3 bg-[#111115]">
                    <p className="text-xs font-bold text-white truncate">{med.title}</p>
                    <p className="text-[10px] text-white/40">{med.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & EXPORT */}
        {dashboardTab === "settings" && (
          <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto w-full">
            <div>
              <h2 className="text-2xl font-black text-white">إعدادات المنصة والنسخ الاحتياطي</h2>
              <p className="text-xs text-white/40 mt-1">تخصيص الخيارات العامة وتصدير البيانات</p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a20] to-[#111115] border border-white/10 rounded-3xl p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">تصدير وحفظ المشاريع (Data Backup)</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  يمكنك تحميل نسخة كاملة من جميع مواقعك، منتجاتك، وأقسامك كملف JSON آمن لاستعادته في أي وقت.
                </p>
                <button
                  onClick={handleExportData}
                  className="mt-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-[#00FFC2] border border-[#00FFC2]/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  تصدير ملف النسخة الاحتياطية (JSON)
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white">إعدادات الدومينات المخصصة (Custom Domains)</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  لربط أي دومين خاص (مثل yourbrand.com)، قم بتوجيه سجل CNAME إلى:
                  <code className="block mt-2 p-2.5 bg-[#09090d] border border-white/10 rounded-xl text-[#00FFC2] font-mono text-xs">
                    cname.mashrouiy.com
                  </code>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
