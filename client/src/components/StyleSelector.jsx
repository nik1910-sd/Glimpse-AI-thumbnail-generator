import React from 'react';
import { Sparkles, Square, Image, PenTool, Cpu, ChevronDown } from 'lucide-react';

const StyleSelector = ({ value, onChange, isOpen, setIsOpen }) => {
  
  const styleDescriptions = {
    "Bold & Graphic": "High contrast, bold typography, striking visuals",
    "Minimalist": "Clean, simple, lots of white space",
    "Photorealistic": "Photo-based, natural looking",
    "Illustrated": "Hand-drawn, artistic, creative",
    "Tech/Futuristic": "Modern, sleek, tech-inspired",
  };

  const styleIcons = {
    "Bold & Graphic": <Sparkles className="h-4 w-4" />,
    "Minimalist": <Square className="h-4 w-4" />,
    "Photorealistic": <Image className="h-4 w-4" />,
    "Illustrated": <PenTool className="h-4 w-4" />,
    "Tech/Futuristic": <Cpu className="h-4 w-4" />,
  };

  return (
    <div className="relative space-y-3">
      <label className="block font-medium text-sm text-zinc-200">
        Thumbnail Style
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition bg-white/5 border-white/10 text-zinc-200 hover:bg-white/10"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[rgb(214,76,18)]">{styleIcons[value]}</span>
            <span>{value}</span>
          </div>
          <p className="text-xs text-zinc-500 line-clamp-1">{styleDescriptions[value]}</p>
        </div>
        <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

     
{isOpen && (
  <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-white/10 bg-zinc-900 p-1 shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto 
    /* Scrollbar Styling */
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-zinc-700
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
    
    {Object.keys(styleDescriptions).map((style) => (
      <button
        key={style}
        type="button"
        onClick={() => {
          onChange(style);
          setIsOpen(false);
        }}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5 ${
          value === style ? 'bg-white/10' : ''
        }`}
      >
        <div className={value === style ? 'text-[rgb(214,76,18)]' : 'text-zinc-500'}>
          {styleIcons[style]}
        </div>
        
        <div className="flex flex-col">
          <div className="text-sm font-medium text-zinc-200 leading-tight">{style}</div>
          <div className="text-[10px] text-zinc-500 leading-tight">{styleDescriptions[style]}</div>
        </div>
      </button>
    ))}
  </div>
)}


    </div>
  );
};

export default StyleSelector;