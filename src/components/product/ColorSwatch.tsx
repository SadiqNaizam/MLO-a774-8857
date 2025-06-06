import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorOption {
  id: string | number;
  name: string; // e.g., "Red", "Midnight Blue"
  hexColor: string; // e.g., "#FF0000", "#00008B"
  isAvailable?: boolean;
}

interface ColorSwatchProps {
  options: ColorOption[];
  selectedColorId?: string | number | null;
  onColorSelect: (colorId: string | number) => void;
  swatchSize?: 'sm' | 'md' | 'lg'; // Tailwind control: sm: h-6 w-6, md: h-8 w-8, lg: h-10 w-10
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  options,
  selectedColorId,
  onColorSelect,
  swatchSize = 'md',
  className,
}) => {
  console.log("Rendering ColorSwatch, selected:", selectedColorId);

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {options.map((option) => {
        const isSelected = option.id === selectedColorId;
        const isAvailable = option.isAvailable !== false; // Default to true if undefined

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => isAvailable && onColorSelect(option.id)}
            disabled={!isAvailable}
            className={cn(
              "rounded-full border-2 flex items-center justify-center transition-all duration-150 relative",
              sizeClasses[swatchSize],
              isSelected ? 'border-gray-700 ring-2 ring-offset-1 ring-gray-700' : 'border-gray-300',
              !isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500 cursor-pointer'
            )}
            style={{ backgroundColor: option.hexColor }}
            aria-label={`Select color ${option.name}${!isAvailable ? ' (unavailable)' : ''}`}
            title={option.name}
          >
            {isSelected && <Check className="h-4 w-4 text-white mix-blend-difference" />}
            {!isAvailable && (
              // Line through for unavailable colors
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="block w-full h-0.5 bg-gray-500 transform rotate-45 origin-center opacity-70"></span>
                <span className="block w-full h-0.5 bg-gray-500 transform -rotate-45 origin-center opacity-70"></span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorSwatch;