import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrashIcon, DownloadIcon, ArrowUpRightIcon } from "lucide-react";
import { dummyThumbnails } from "../../assets/Assets";

const MyGenerations = () => {
  const navigate = useNavigate();
  
  const aspectRatioClassMap = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  };

  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchThumbnails = async () => {
    
    setLoading(true);
    setThumbnails(dummyThumbnails);
    setLoading(false);
  };

  const handleDownload = (image_url) => {
    if (!image_url) return;
    window.open(image_url, '_blank');
  };

  const handleDelete = async (id) => {
    console.log("Deleting thumbnail:", id);
    
    setThumbnails(prev => prev.filter(item => item._id !== id));
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  return (
    <>
      {/* Background Decorative Blurs */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A]/40 blur-[120px]" />
        <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF]/40 blur-[120px]" />
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06]/40 blur-[120px]" />
      </div>

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 animate-pulse h-[260px]" />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">No thumbnails yet</h3>
            <p className="text-sm text-zinc-400 mt-2">Generate your first thumbnail to see it here</p>
          </div>
        )}

        {/* GRID */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb) => {
              
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio] || 'aspect-video';
              
              return (
                <div 
                  key={thumb._id} 
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                >
                  {/* IMAGE SECTION */}
                  <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                    {thumb.image_url ? (
                      <img 
                        src={thumb.image_url} 
                        alt={thumb.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                        {thumb.isGenerating ? 'Generating...' : 'No image'}
                      </div>
                    )}

                    {/* Generating Overlay */}
                    {thumb.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                        Generating...
                      </div>
                    )}
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{thumb.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className='px-2 py-0.5 rounded bg-white/8'>{thumb.style}</span>
                      <span className='px-2 py-0.5 rounded bg-white/8'>{thumb.color_scheme}</span>
                      <span className='px-2 py-0.5 rounded bg-white/8'>{thumb.aspect_ratio}</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {thumb.createdAt ? new Date(thumb.createdAt).toDateString() : "Date unknown"}
                    </p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <TrashIcon
                      onClick={() => handleDelete(thumb._id)}
                      className="size-8 bg-black/50 p-2 rounded hover:bg-red-600 transition-all text-white"
                    />
                    <DownloadIcon
                      onClick={() => handleDownload(thumb.image_url)}
                      className="size-8 bg-black/50 p-2 rounded hover:bg-orange-600 transition-all text-white"
                    />
                    <Link
                      target="_blank"
                      to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                    >
                      <ArrowUpRightIcon className="size-8 bg-black/50 p-2 rounded hover:bg-blue-600 transition-all text-white" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGenerations;