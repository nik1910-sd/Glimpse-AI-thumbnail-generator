import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { yt_html } from "../../assets/Assets";

const YtPreview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const thumbnail_url = searchParams.get("thumbnail_url");
  const title = searchParams.get("title");

  const renderedHtml = useMemo(() => {
    if (!thumbnail_url || !title) return "";

    return yt_html
      .replace("%%THUMBNAIL_URL%%", decodeURIComponent(thumbnail_url))
      .replace("%%TITLE%%", title);
  }, [thumbnail_url, title]);

  if (!thumbnail_url || !title) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Preview data missing. Redirecting...</p>
        {setTimeout(() => navigate('/my-generations'), 2000)}
      </div>
    );
  }

  return (
  
    <div className='fixed inset-0 z-[100] bg-yt overflow-hidden'>
     
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 right-6 z-[110] px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium transition-all"
      >
        Close Preview
      </button>

      <iframe 
        srcDoc={renderedHtml} 
        className="w-full h-full border-none" 
        title="YouTube Thumbnail Preview"
        allowFullScreen
      ></iframe>
    </div> 
  );
};

export default YtPreview;