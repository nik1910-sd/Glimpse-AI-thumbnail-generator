import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import { thumbnailStyles, colorSchemes, aspectRatios } from "../../assets/Assets";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";
import api from "../configs/api";

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState(null); 
  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0]);
  const [colorSchemeId, setColorSchemeId] = useState(colorSchemes[0].id);
  const [style, setStyle] = useState(thumbnailStyles[0]);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error('Please login to generate thumbnails');
    if (!title.trim()) return toast.error('Title is required');
    
    setLoading(true);

    const api_payload = {
      title,
      prompt: additionalDetails,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: colorSchemeId,
      text_overlay: true,
    };

    try {
      const { data } = await api.post('/api/thumbnail/generate', api_payload);
      if (data.thumbnail) {
        navigate('/generate/' + data.thumbnail._id);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Generation failed");
      setLoading(false);
    }
  };

  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnail/${id}`);
      setThumbnail(data?.thumbnail);
      setLoading(!data?.thumbnail?.image_url);
      setAdditionalDetails(data?.thumbnail?.user_prompt || "");
      setTitle(data?.thumbnail?.title || "");
      setColorSchemeId(data?.thumbnail?.color_scheme);
      setAspectRatio(data?.thumbnail?.aspect_ratio);
      setStyle(data?.thumbnail?.style);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Poll for status if generating
  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
    }
    if (id && loading && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn]);

  // Clear state when navigating away from a specific generation
  useEffect(() => {
    if (!id) {
      setThumbnail(null);
      setTitle("");
      setAdditionalDetails("");
      setLoading(false);
    }
  }, [pathname, id]);

  return (
    <>
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        <div className="absolute rounded-full top-80 left-[40%] -translate-x-1/2 size-[520px] bg-[#D10A8A]/40 blur-[120px]" />
        <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-[520px] bg-[#2E08CF]/40 blur-[120px]" />
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-[520px] bg-[#F26A06]/40 blur-[120px]" />
      </div>

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            
            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id ? "pointer-events-none opacity-80" : ""}`}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-6">
                <div>
                  <h2 className="text-white text-2xl font-bold tracking-tight">Create Your Thumbnail</h2>
                  <p className="text-white/60 text-sm mt-1">Describe your vision and let AI bring it to life</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-white font-medium mb-1.5">Title or Topic</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g., how to control a bad habit"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-zinc-100 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-zinc-400">{title.length}/100</span>
                    </div>
                  </div>

                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                  <div className="space-y-2">
                    <label className="block text-white font-medium mb-1.5">
                      Additional Prompts <span className="text-zinc-400 text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                      placeholder="Add specific elements, mood, or style preferences..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-zinc-100 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    />
                  </div>
                </div>

                {!id && (
                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 transition-all shadow-lg shadow-orange-900/20"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                
                <PreviewPanel 
                  thumbnail={thumbnail} 
                  isLoading={loading} 
                  aspectRatio={aspectRatio} 
                />
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;