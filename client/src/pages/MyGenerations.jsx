import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrashIcon, DownloadIcon, ArrowUpRightIcon } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import api from '../configs/api';
import { toast } from 'react-toastify';

const MyGenerations = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const aspectRatioClassMap = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  };

  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true); 

  // REDIRECT PROTECTION
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate('/login');
    }
  }, [isLoggedIn, loading, navigate]);

  const fetchThumbnails = async () => {
    try {
      setLoading(true);
    
      const { data } = await api.get('/api/user/thumbnails');
      setThumbnails(data.thumbnails || []);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load generations");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (image_url) => {
  if (!image_url) return toast.error("Image not ready for download");

  try {
    const response = await fetch(image_url);
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    link.setAttribute('download', `glimpse-thumbnail-${Date.now()}.png`);
    
    document.body.appendChild(link);
    link.click();
   
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success("Download started!");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download image. Try right-clicking and 'Save As'.");
  }
};

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this thumbnail?')) return;
      
      const { data } = await api.delete(`/api/thumbnail/delete/${id}`);
      toast.success(data.message || "Deleted successfully");
      
      setThumbnails(prev => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchThumbnails();
    }
  }, [isLoggedIn]);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-pink-500/30">

      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute rounded-full top-80 left-[20%] -translate-x-1/2 size-96 bg-pink-600/20 blur-[120px]" />
        <div className="absolute rounded-full top-40 right-0 size-96 bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-100">My Generations</h1>
          <p className="text-zinc-400 mt-2">Manage and export your AI-powered designs.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 animate-pulse h-64" />
            ))}
          </div>
        ) : thumbnails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30">
            <h3 className="text-xl font-medium text-zinc-300">No thumbnails found</h3>
            <button 
              onClick={() => navigate('/generate')}
              className="btn glass"
            >
              Create Your First Glimpse
            </button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {thumbnails.map((thumb) => (
              <div 
                key={thumb._id} 
                className="break-inside-avoid group relative rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-pink-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-2xl"
                onClick={() => navigate(`/generate/${thumb._id}`)}
              >
                {/* THUMBNAIL PREVIEW */}
                <div className={`relative overflow-hidden ${aspectRatioClassMap[thumb.aspect_ratio] || 'aspect-video'} bg-zinc-800`}>
                  {thumb.image_url ? (
                    <img src={thumb.image_url} alt={thumb.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                      {thumb.isGenerating ? "Processing AI..." : "No Image Data"}
                    </div>
                  )}
                </div>

                {/* INFO PANEL */}
                <div className="p-4 bg-gradient-to-b from-zinc-900/50 to-black/80">
                  <h3 className="text-sm font-medium text-zinc-100 truncate">{thumb.title}</h3>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">{thumb.style}</span>
                  </div>
                </div>

                {/* HOVER ACTIONS */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20"
                >
                  <button onClick={() => handleDelete(thumb._id)} className="p-2 bg-black/60 backdrop-blur-md rounded-lg hover:bg-red-500 text-white transition-colors">
                    <TrashIcon size={18} />
                  </button>
                  <button onClick={() => handleDownload(thumb.image_url)} className="p-2 bg-black/60 backdrop-blur-md rounded-lg hover:bg-pink-500 text-white transition-colors">
                    <DownloadIcon size={18} />
                  </button>
                  <Link to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`} target="_blank" className="p-2 bg-black/60 backdrop-blur-md rounded-lg hover:bg-blue-500 text-white transition-colors">
                    <ArrowUpRightIcon size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGenerations;