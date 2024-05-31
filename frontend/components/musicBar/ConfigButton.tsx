'use client';

interface ConfigButtonProp {
  children: React.ReactNode;
}

const ConfigButton: React.FC<ConfigButtonProp> = ({ children }) => {
  return (
    <button
      className="

      bg-transparent
      transition 
      ease-in-out 
      opacity-70 
      min-w-4 
      min-h-4
      cursor:pointer
      hover:scale-105
      hover:opacity-100
      hover:green-slider
      active:scale-100
      active:opacity-70
      
    "
    >
      {children}
    </button>
  );
};

export default ConfigButton;
