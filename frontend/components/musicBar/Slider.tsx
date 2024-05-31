'use client';

import { useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
    console.log(newValue);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
      "
      defaultValue={[1]}
      value={[value]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          h-[4px]
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-white
            rounded-full 
            h-full
          "
          style={{ backgroundColor: isHovered ? '#1db954' : 'white' }}
        />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="
          block 
          w-3 
          h-3
          shadow-md 
          rounded-full
          // hover:bg-white
          // hover:outline-none
          // hover:white
          "
        style={{ backgroundColor: isHovered ? 'white' : 'transparent' }}
        aria-label="Volume"
      />
    </RadixSlider.Root>
  );
};

export default Slider;
