'use client';

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[0.3]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-white 
            focus:bg-green-500
            rounded-full 
            h-full
            "
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="
          block 
          w-5 
          h-5
          bg-white 
          shadow-md 
          rounded-full
          focus:outline-none
          focus:ring-2
          focus:ring-black
          "
        aria-label="Volume"
      />
    </RadixSlider.Root>
  );
};

export default Slider;
