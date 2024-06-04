'use client';

import React, { useState } from 'react';

interface ConfigButtonProp {
  children: React.ReactNode;
  active?: boolean;
}

const ConfigButton: React.FC<ConfigButtonProp> = ({ children, active }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const IsActive = active || isActive;


  return (
    <button
      className="
      relative
      bg-transparent
      transition 
      ease-in-out 
      opacity-70 
      w-[32px] 
      h-[32px]
      cursor:pointer
      hover:scale-105
      hover:opacity-100
      items-center
      justify-center
      "
      style={{ color: IsActive ? '#1db954': 'white', opacity: IsActive ? 1 : 0.7 }}
      onClick={handleClick}
    >
      {children}
      {IsActive && (
            <span 
            className="
            transform 
            bg-[#1db954]
            h-1 
            w-1 
            rounded-full
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            " 
            />
          )}
    </button>
  );
};

export default ConfigButton;
