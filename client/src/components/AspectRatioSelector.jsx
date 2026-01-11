
import { RectangleHorizontal, RectangleVertical, Square } from 'lucide-react';
import { aspectRatios } from '../../assets/Assets';

const AspectRatioSelector = ({ value, onChange }) => {
  const iconMap = {
    '16:9': <RectangleHorizontal className="size-5" />,
    '1:1': <Square className="size-5" />,
    '9:16': <RectangleVertical className="size-5" />,
  };

  return (
    <div className="space-y-3">
      
      <label className="block text-sm font-medium text-zinc-200">
        Aspect Ratio
      </label>

      <div className="flex flex-wrap gap-5">
        {aspectRatios.map((ratio) => (
          <button
            type="button" 
            key={ratio}
            onClick={() => onChange(ratio)}
            className={`flex-1 min-w-[80px] p-2 rounded-xl border transition-all flex flex-row items-center justify-center gap-2 ${
              value === ratio
                ? 'border-[rgb(214,76,18)] bg-[rgb(214,76,18)]/10 text-[rgb(214,76,18)]'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
            }`}
          >
            {iconMap[ratio]}
            <span className="text-xs font-medium">{ratio}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;


