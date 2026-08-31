import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { LeftSidebar } from "./LeftSidebar";
import { RightInspector } from "./RightInspector";
import { AiAssistantDrawer } from "./AiAssistantDrawer";
import { WebsiteRenderer } from "../canvas/WebsiteRenderer";
import { PublishSuccessModal } from "../common/PublishSuccessModal";
import {
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Eye,
  Globe,
  Sparkles,
  Save,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  ChevronDown,
  Layers,
  Sliders
} from "lucide-react";

export const VisualBuilder: React.FC = () => {
  const {
    currentProject,
    setActiveView,
    canvasDevice,
    setCanvasDevice,
    canvasZoom,
    setCanvasZoom,
    selectedSectionId,
    setSelectedSectionId,
    undo,
    redo,
    canUndo,
    canRedo,
    publishProject,
    showToast,
    setIsAiDrawerOpen
  } = useApp();

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState<"none" | "left" | "right">("none");

  if (!currentProject) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#030305] text-white">
        <div className="text-center space-y-4">
          <p>لا يوجد مشروع محدد للتحرير.</p>
          <button
            onClick={() => setActiveView("dashboard")}
            className="px-6 py-2 bg-[#00FFC2] text-black font-bold rounded-xl"
          >
            العودة للوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  const handlePublish = () => {
    publishProject(currentProject.id);
    setIsPublishModalOpen(true);
  };

  const getCanvasWidthClass = () => {
    if (canvasDevice === "mobile") return "w-[390px] h-[844px] rounded-[44px] border-[8px] border-zinc-800 shadow-2xl overflow-y-auto";
    if (canvasDevice === "tablet") return "w-[768px] min-h-[900px] rounded-3xl border-4 border-zinc-800 shadow-2xl overflow-y-auto";
    return "w-full min-h-screen";
  };

  return (
    <div className="h-screen flex flex-col bg-[#030305] text-zinc-100 overflow-hidden select-none font-['Cairo'] selection:bg-[#00FFC2] selection:text-black">
      {/* BUILDER TOP BAR - BENTO STYLED */}
      <header className="h-16 border-b border-white/10 bg-[#0a0a0f] px-4 flex items-center justify-between z-30 shrink-0">
        {/* Left: Back & Project Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView("dashboard")}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">لوحة التحكم</span>
          </button>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm text-white">{currentProject.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#7000FF]/20 text-[#00FFC2] border border-[#7000FF]/40">
                v{currentProject.version || 1}
              </span>
            </div>
            <p className="text-[10px] text-white/40 hidden sm:block font-mono">
              {currentProject.settings.publish.subdomain || currentProject.slug}.mashrouiy.com
            </p>
          </div>
        </div>

        {/* Center: Device Switcher & Undo/Redo & Zoom */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Responsive Devices */}
          <div className="bg-black/60 p-1 rounded-xl border border-white/10 flex items-center">
            <button
              onClick={() => setCanvasDevice("desktop")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                canvasDevice === "desktop" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"
              }`}
              title="عرض شاشة الكمبيوتر"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCanvasDevice("tablet")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                canvasDevice === "tablet" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"
              }`}
              title="عرض التابلت والايباد"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCanvasDevice("mobile")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                canvasDevice === "mobile" ? "bg-[#00FFC2] text-black shadow" : "text-white/40 hover:text-white"
              }`}
              title="عرض الموبايل الذكي"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="hidden md:flex items-center bg-black/60 p-1 rounded-xl border border-white/10">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20"
              title="تراجع (Undo)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 rounded-lg text-white/40 hover:text-white disabled:opacity-20"
              title="إعادة (Redo)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* AI Drawer Trigger */}
          <button
            onClick={() => setIsAiDrawerOpen(true)}
            className="py-1.5 px-3 bg-gradient-to-r from-[#7000FF] to-[#5000C0] hover:from-[#8010FF] text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#7000FF]/30 hover:brightness-110 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00FFC2]" />
            <span>مساعد AI</span>
          </button>
        </div>

        {/* Right: Preview & Publish */}
        <div className="flex items-center gap-2">
          {/* Preview View Button */}
          <button
            onClick={() => setActiveView("preview")}
            className="py-2 px-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">معاينة الزائر</span>
          </button>

          {/* Publish Website Button */}
          <button
            onClick={handlePublish}
            className="py-2 px-4 bg-[#00FFC2] hover:bg-[#00e6af] font-extrabold text-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-[#00FFC2]/20 hover:scale-105 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>نشر الموقع</span>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWERS BAR (Only on small screens) */}
      <div className="sm:hidden flex border-b border-white/10 bg-[#0a0a0f] p-2 gap-2">
        <button
          onClick={() => setMobileDrawer(mobileDrawer === "left" ? "none" : "left")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${
            mobileDrawer === "left" ? "bg-[#00FFC2] text-black" : "bg-white/5 text-white/70"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          الأقسام والهيكل
        </button>
        <button
          onClick={() => setMobileDrawer(mobileDrawer === "right" ? "none" : "right")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${
            mobileDrawer === "right" ? "bg-[#00FFC2] text-black" : "bg-white/5 text-white/70"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          خصائص القسم
        </button>
      </div>

      {/* MAIN BUILDER WORKSPACE (3-COLUMN LAYOUT) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: Section Catalog & Reorder Tree */}
        <div className={`shrink-0 ${mobileDrawer === "left" ? "absolute inset-y-0 right-0 z-30 w-72" : "hidden sm:block"}`}>
          <LeftSidebar />
        </div>

        {/* CENTER CANVAS: Live Website Renderer */}
        <main
          onClick={() => setSelectedSectionId(null)}
          className="flex-1 bg-[#030305] overflow-y-auto p-2 sm:p-6 flex items-start justify-center relative no-scrollbar"
        >
          <div className={`${getCanvasWidthClass()} transition-all duration-300 bg-black shadow-2xl relative`}>
            <WebsiteRenderer
              project={currentProject}
              isBuilderMode={true}
              selectedSectionId={selectedSectionId}
              onSelectSection={(id) => setSelectedSectionId(id)}
            />
          </div>
        </main>

        {/* RIGHT COLUMN: Section Inspector & Theme Controls */}
        <div className={`shrink-0 ${mobileDrawer === "right" ? "absolute inset-y-0 left-0 z-30 w-80" : "hidden lg:block"}`}>
          <RightInspector />
        </div>
      </div>

      {/* Floating AI Assistant Drawer */}
      <AiAssistantDrawer />

      {/* Publish Celebration Modal */}
      <PublishSuccessModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </div>
  );
};
