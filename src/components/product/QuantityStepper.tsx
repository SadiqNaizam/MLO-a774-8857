import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange: (value: number) => void;
  onBlur?: (value: number) => void; // For when input loses focus
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  size?: 'sm' | 'default' | 'lg';
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  initialValue = 1,
  minValue = 1,
  maxValue = Infinity,
  step = 1,
  onChange,
  onBlur,
  disabled = false,
  className,
  inputClassName,
  buttonClassName,
  size = 'default',
}) => {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    setQuantity(initialValue);
  }, [initialValue]);

  console.log("Rendering QuantityStepper, current quantity:", quantity);

  const handleIncrement = () => {
    const newValue = Math.min(quantity + step, maxValue);
    setQuantity(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(quantity - step, minValue);
    setQuantity(newValue);
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
        // Allow empty input temporarily, handle on blur
        setQuantity(NaN); // Use NaN to indicate empty field
        return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(minValue, Math.min(numValue, maxValue));
      setQuantity(clampedValue);
      onChange(clampedValue);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let finalValue = quantity;
    if (isNaN(quantity) || quantity < minValue) {
      finalValue = minValue;
    } else if (quantity > maxValue) {
      finalValue = maxValue;
    }
    setQuantity(finalValue);
    onChange(finalValue); // Ensure parent is updated with final clamped value
    if (onBlur) {
        onBlur(finalValue);
    }
  };
  
  const buttonSizeClass = size === 'sm' ? 'h-8 w-8 p-0' : size === 'lg' ? 'h-12 w-12 p-0' : 'h-10 w-10 p-0';
  const inputSizeClass = size === 'sm' ? 'h-8 px-2 text-sm' : size === 'lg' ? 'h-12 px-4 text-lg' : 'h-10 px-3';
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;


  return (
    <div className={cn("flex items-center border border-gray-300 rounded-md overflow-hidden", disabled && "opacity-50 bg-gray-100", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDecrement}
        disabled={disabled || quantity <= minValue}
        className={cn("rounded-none border-r border-gray-300 hover:bg-gray-100", buttonSizeClass, buttonClassName)}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </Button>
      <Input
        type="number" // Use number for better mobile UX, but handle validation carefully
        value={isNaN(quantity) ? '' : quantity.toString()}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        className={cn(
          "w-12 text-center border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none rounded-none",
          inputSizeClass,
          inputClassName
        )}
        min={minValue}
        max={maxValue}
        step={step}
        aria-label="Quantity"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleIncrement}
        disabled={disabled || quantity >= maxValue}
        className={cn("rounded-none border-l border-gray-300 hover:bg-gray-100", buttonSizeClass, buttonClassName)}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </Button>
    </div>
  );
};

export default QuantityStepper;