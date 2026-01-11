import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thumbnailStyles,colorSchemes ,aspectRatios,dummyThumbnails } from "../../assets/Assets";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector   from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";


const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [thumbnail, setThumbnail] = useState(dummyThumbnails);
  const [loading, setLoading] = useState(false);

  const[aspectRatio,setAspectRatio] =useState(aspectRatios[0]);
  const[colorSchemeId,setColorSchemeId]=useState(colorSchemes[0].id);
  const[style,setStyle]=useState(thumbnailStyles[0]);
  const[styleDropdownOpen,setStyleDropdownOpen]=useState(false);

  const handelGenerate = async() => {

  }

  const fetchThumbnail = async() =>{
      if(id){
        const thumbnail = dummyThumbnails.find((thumbnail)=>thumbnail._id === id);
        setThumbnail(thumbnail);
        setAdditionalDetails(thumbnail.user_prompt);
        setTitle(thumbnail.title);
        setColorSchemeId(thumbnail.color_scheme);
        setAspectRatio(thumbnail.aspect_ratio);
        setStyle(thumbnail.style);
        setLoading(false); 
      }
  }

   useEffect(()=>{
    if(id){
      fetchThumbnail()
    }
   },[id])
  return (
    <>
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
       
    <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A]/40 blur-[120px]" />
    <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF]/40 blur-[120px]" />
    <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06]/40 blur-[120px]" />
    </div>
      

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 1g:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-white text-2xl font-bold tracking-tight">
                    Create Your Thumbnail
                  </h2>
                  <p className="text-white/60 text-sm mt-1 font-normal">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>
                <div className="space-y-5">
                  {/*TITLE INPUT*/}
                  <div>
                    <label className="block text-white font-medium mb-1.5">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g., how to control a bad habit"
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-[rgb(214,76,18)]  resize-none"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">
                        {title.length}/100
                      </span>
                    </div>
                  </div>
                  {/*AspectRatioSelector*/}
                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio}/>
                  {/* StyleSelector */}
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen}/>
                  {/* ColorSchemeSelector */}
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId}/>

                  {/* DETAILS */}
                  <div className="space-y-2">
                    <label className="block text-white font-medium mb-1.5">
                      Additional Prompts
                      <span className="text-zinc-400 text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                      placeholder="Add any specific elements.mood,or style preferences..."
                      className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400
                       focus:outline-none focus:ring-2 focus:ring-[rgb(214,76,18)]  resize-none"
                    />
                  </div>
                </div>
                {/*Button*/}
                {!id && (
                  <button className="text-[15px] w-full py-3.5 rounded-xl font-medium text-white bg-[rgb(214,76,18)] hover:bg-[rgb(185,60,12)] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-900/20">
                    {loading ? "Generating..." : "Generate"}
                  </button>
                )}
              </div>
            </div>
            {/* RIGHT PANEL */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
