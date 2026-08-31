import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Search, Upload, Image as ImageIcon, Sparkles, Check, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const MediaPickerModal: React.FC = () => {
  const {
    isMediaPickerOpen,
    setIsMediaPickerOpen,
    mediaPickerCallback,
    mediaItems,
    addMediaItem,
    searchOnlineImages,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<"search" | "library" | "upload">("search");
  const [searchQuery, setSearchQuery] = useState("burger");
  const [searchResults, setSearchResults] = useState<Array<{ url: string; title: string; category: string; source: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  // Quick category chips
  const searchChips = [
    { label: "برجر ووجبات", query: "burger" },
    { label: "مطاعم وأكلات", query: "restaurant" },
    { label: "بيتزا وإيطالي", query: "pizza" },
    { label: "كافيه وقهوة", query: "coffee" },
    { label: "ملاعب وكرة قدم", query: "football" },
    { label: "جيم ولياقة", query: "gym" },
    { label: "آيفون وتكنولوجيا", query: "iphone" },
    { label: "صيدلية وصحة", query: "pharmacy" },
    { label: "فنادق وسياحة", query: "hotel" },
    { label: "أزياء وموضة", query: "fashion" },
    { label: "صالون حلاقة", query: "barber" },
    { label: "عيادة وأسنان", query: "clinic" },
    { label: "عقارات وفيلات", query: "realestate" }
  ];

  // Upload state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadCategory, setUploadCategory] = useState("general");

  const executeSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchOnlineImages(query);
      setSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (isMediaPickerOpen && activeTab === "search") {
      executeSearch(searchQuery);
    }
  }, [isMediaPickerOpen, activeTab]);

  if (!isMediaPickerOpen) return null;

  const handleSelect = (url: string) => {
    if (mediaPickerCallback) {
      mediaPickerCallback(url);
    }
    showToast("تم اختيار الصورة بنجاح!");
    setIsMediaPickerOpen(false);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl.trim()) return;
    addMediaItem({
      title: uploadTitle.trim() || "صورة مخصصة",
      url: uploadUrl.trim(),
      category: uploadCategory,
      source: "upload"
    });
    handleSelect(uploadUrl.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-['Cairo']">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#0e0e14] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7000FF] to-[#00FFC2] flex items-center justify-center text-black shadow-lg shadow-[#7000FF]/25">
              <ImageIcon className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">مكتبة ومحرك البحث عن الصور الذكية</h3>
              <p className="text-xs text-white/40">ابحث عن صور عالية الجودة بدون حقوق أو ارفع صورتك الخاصة</p>
            </div>
          </div>
          <button
            onClick={() => setIsMediaPickerOpen(false)}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 pt-4 border-b border-white/10 flex gap-4">
          <button
            onClick={() => setActiveTab("search")}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "search"
                ? "border-[#00FFC2] text-[#00FFC2]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#A870FF]" />
            البحث في الصور العالمية (Unsplash / AI)
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "library"
                ? "border-[#00FFC2] text-[#00FFC2]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            المكتبة المحفوظة ({mediaItems.length})
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "upload"
                ? "border-[#00FFC2] text-[#00FFC2]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            <Upload className="w-4 h-4" />
            رفع رابط صورة مخصص
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-[380px]">
          {activeTab === "search" && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-white/40 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && executeSearch(searchQuery)}
                    placeholder="ابحث بالإنجليزية أو العربية (مثل: burger, pizza, gym, iphone, luxury cafe...)"
                    className="w-full pl-4 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FFC2] text-sm"
                  />
                </div>
                <button
                  onClick={() => executeSearch(searchQuery)}
                  disabled={isSearching}
                  className="px-5 py-2.5 bg-[#00FFC2] hover:bg-[#00e6af] font-bold text-black rounded-xl text-sm transition-all flex items-center gap-2"
                >
                  {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Search className="w-4 h-4" />}
                  بحث
                </button>
              </div>

              {/* Category Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {searchChips.map((chip) => (
                  <button
                    key={chip.query}
                    onClick={() => {
                      setSearchQuery(chip.query);
                      executeSearch(chip.query);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                      searchQuery.toLowerCase() === chip.query.toLowerCase()
                        ? "bg-[#00FFC2]/20 text-[#00FFC2] border border-[#00FFC2]/40"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Grid of Search Results */}
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-16 text-white/40 gap-3">
                  <Loader2 className="w-8 h-8 text-[#00FFC2] animate-spin" />
                  <p className="text-sm">جاري جلب الصور عالية الدقة المطابقة للبحث...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12 text-white/30">
                  <p>لم يتم العثور على نتائج. جرب كلمة بحث أخرى مثل (burger, coffee, gym, tech).</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {searchResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedUrl(item.url)}
                      className={`group relative rounded-2xl overflow-hidden border cursor-pointer aspect-video bg-black transition-all ${
                        selectedUrl === item.url
                          ? "border-[#00FFC2] ring-2 ring-[#00FFC2]/40 scale-[1.02]"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-white/60">{item.source || "Unsplash"}</p>
                      </div>
                      {selectedUrl === item.url && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00FFC2] text-black flex items-center justify-center shadow-lg">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "library" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedUrl(item.url)}
                  className={`group relative rounded-2xl overflow-hidden border cursor-pointer aspect-video bg-black transition-all ${
                    selectedUrl === item.url
                      ? "border-[#00FFC2] ring-2 ring-[#00FFC2]/40 scale-[1.02]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-2 flex flex-col justify-end">
                    <p className="text-xs font-medium text-white truncate">{item.title}</p>
                  </div>
                  {selectedUrl === item.url && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00FFC2] text-black flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "upload" && (
            <form onSubmit={handleUploadSubmit} className="max-w-lg mx-auto space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">عنوان أو اسم الصورة</label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="مثال: شعار المطعم أو صورة وجبة البرجر"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00FFC2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">رابط الصورة المباشر (URL)</label>
                <input
                  type="url"
                  required
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00FFC2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">القسم / التصنيف</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#111115] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#00FFC2]"
                >
                  <option value="general">عام</option>
                  <option value="burger">مطاعم وبرجر</option>
                  <option value="sports">رياضة وملاعب</option>
                  <option value="tech">تقنية وإلكترونيات</option>
                  <option value="medical">صحة وطب</option>
                  <option value="fashion">أزياء وموضة</option>
                </select>
              </div>

              {uploadUrl && (
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-white/40 mb-2">معاينة الصورة:</p>
                  <img
                    src={uploadUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                    onError={() => showToast("تعذر تحميل رابط الصورة. تأكد من صحة الرابط", "error")}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#00FFC2] hover:bg-[#00e6af] font-bold text-black rounded-xl text-sm transition-colors"
              >
                إضافة واستخدام هذه الصورة
              </button>
            </form>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-[#08080c] flex items-center justify-between">
          <div className="text-xs text-white/40">
            {selectedUrl ? <span className="text-[#00FFC2]">تم اختيار صورة جاهزة للتطبيق</span> : "حدد صورة للبدء"}
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => setIsMediaPickerOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold rounded-xl transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={() => selectedUrl && handleSelect(selectedUrl)}
              disabled={!selectedUrl}
              className="px-6 py-2 bg-[#00FFC2] hover:bg-[#00e6af] disabled:opacity-40 font-bold text-black text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              استخدم هذه الصورة
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
