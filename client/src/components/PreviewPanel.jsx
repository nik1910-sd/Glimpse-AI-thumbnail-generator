
import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react";
 

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }) => {

  const aspectClasses = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]'
  };

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, '_blank');
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
     
      <div className={`relative overflow-hidden transition-all duration-300 ${aspectClasses[aspectRatio] || 'aspect-video'}`}>
      
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm">
            <Loader2Icon className="size-10 animate-spin text-[rgb(214,76,18)]" />
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-200">AI is creating your thumbnail...</p>
              <p className="mt-1 text-xs text-zinc-400">This may take 10-20 seconds</p>
            </div>
          </div>
        )}

        {!isLoading && thumbnail?.image_url ? (
          <div className="group relative h-full w-full">
            <img 
              src={thumbnail.image_url} 
              alt={thumbnail.title || "AI Generated Thumbnail"} 
              className="h-full w-full object-cover rounded-xl"
            />
      
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button 
                onClick={onDownload} 
                type="button" 
                className="flex items-center gap-2 rounded-full p-4 transition bg-white/10 ring-1 ring-white/20 backdrop-blur-md hover:scale-110 active:scale-95 text-white"
                title="Download Image"
              >
                <DownloadIcon className="size-6" />
              </button>
            </div>
          </div>
        ) : (

          !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/10 bg-white/5">
              <div className="flex size-20 items-center justify-center rounded-full bg-white/5">
                <ImageIcon className="size-10 text-white opacity-20" />
              </div>
              <div className="text-center">
                <p className="text-zinc-200 font-medium">Ready to Generate</p>
                <p className="text-sm text-zinc-500">Fill out the form and click Generate</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;