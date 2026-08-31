import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { LandingPage } from "./components/landing/LandingPage";
import { ProjectWizard } from "./components/wizard/ProjectWizard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { VisualBuilder } from "./components/builder/VisualBuilder";
import { WebsiteRenderer } from "./components/canvas/WebsiteRenderer";
import { ToastContainer } from "./components/common/ToastContainer";
import { MediaPickerModal } from "./components/common/MediaPickerModal";
import { LoginModal } from "./components/auth/LoginModal";
import {
  ArrowRight,
  ExternalLink,
  Sliders,
  Monitor,
  Tablet,
  Smartphone,
  Globe,
  Share2,
  Lock,
  ArrowLeft
} from "lucide-react";

const MainAppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentProject,
    userSession,
    canvasDevice,
    setCanvasDevice
  } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // PREVIEW VIEW (Full Screen Preview for the user to test the site)
  if (activeView === "preview" && currentProject) {
    return (
      <div className="h-screen flex flex-col bg-[#030305] text-white overflow-hidden font-['Cairo'] selection:bg-[#00FFC2] selection:text-black">
        {/* Top Preview Bar - Bento Grid Themed */}
        <div className="h-14 bg-[#0a0a0f] border-b border-white/10 px-4 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView("builder")}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold flex items-center gap-1.5 text-white/70 hover:text-white transition-colors border border-white/10"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للكانفاس</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{currentProject.name}</span>
              <span className="text-[10px] text-[#00FFC2] font-mono hidden sm:inline" dir="ltr">
                ({currentProject.settings.publish.subdomain}.mashrouiy.com)
              </span>
            </div>
          </div>

          {/* Device switcher */}
          <div className="bg-black/60 p-1 rounded-xl border border-white/10 flex items-center">
            <button
              onClick={() => setCanvasDevice("desktop")}
              className={`p-1 rounded-lg ${canvasDevice === "desktop" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCanvasDevice("tablet")}
              className={`p-1 rounded-lg ${canvasDevice === "tablet" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCanvasDevice("mobile")}
              className={`p-1 rounded-lg ${canvasDevice === "mobile" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Edit / Dashboard button */}
          <button
            onClick={() => setActiveView("builder")}
            className="px-4 py-1.5 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-[#7000FF]/25"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00FFC2]" />
            <span>تعديل هذا الموقع</span>
          </button>
        </div>

        {/* Preview Container */}
        <div className="flex-1 overflow-y-auto bg-[#030305] flex items-start justify-center p-2 sm:p-4 no-scrollbar">
          <div
            className={`transition-all duration-300 ${
              canvasDevice === "mobile"
                ? "w-[390px] min-h-[844px] rounded-[40px] border-8 border-zinc-800 shadow-2xl overflow-hidden my-4"
                : canvasDevice === "tablet"
                ? "w-[768px] min-h-[900px] rounded-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden my-4"
                : "w-full min-h-screen"
            }`}
          >
            <WebsiteRenderer project={currentProject} isBuilderMode={false} />
          </div>
        </div>
      </div>
    );
  }

  // LIVE SITE VIEW (Pure Visitor Experience)
  if (activeView === "live_site" && currentProject) {
    return (
      <div className="min-h-screen bg-black text-white relative font-['Cairo']">
        {/* Floating Top Floating Bar to return */}
        <div className="fixed top-3 left-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setActiveView("dashboard")}
            className="px-3.5 py-1.5 bg-black/80 hover:bg-black text-[#00FFC2] text-xs font-bold rounded-full border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-1.5 transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لمنصة مشروعي</span>
          </button>
        </div>

        <WebsiteRenderer project={currentProject} isBuilderMode={false} />
      </div>
    );
  }

  // WIZARD VIEW
  if (activeView === "wizard") {
    return <ProjectWizard />;
  }

  // VISUAL BUILDER VIEW
  if (activeView === "builder") {
    return <VisualBuilder />;
  }

  // ADMIN DASHBOARD VIEW
  if (activeView === "dashboard") {
    if (!userSession.isAuthenticated) {
      return (
        <div className="h-screen flex items-center justify-center bg-[#030305] text-white p-4 font-['Cairo']">
          <div className="bg-[#0e0e14] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] text-black flex items-center justify-center mx-auto shadow-lg shadow-[#7000FF]/25">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-xl font-bold">تسجيل الدخول مطلوب</h2>
            <p className="text-xs text-white/40">يجب تسجيل الدخول للوصول إلى لوحة تحكم مشروعي</p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] font-bold text-white rounded-xl text-xs shadow-lg shadow-[#7000FF]/25 transition-all"
            >
              تسجيل الدخول الآن
            </button>
          </div>
          <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
      );
    }
    return <AdminDashboard />;
  }

  // DEFAULT VIEW: LANDING PAGE
  return (
    <>
      <LandingPage onOpenLogin={() => setIsLoginModalOpen(true)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
      <ToastContainer />
      <MediaPickerModal />
    </AppProvider>
  );
}

export default App;
