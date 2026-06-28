import React from 'react';

interface NeoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const NeoLogo: React.FC<NeoLogoProps> = ({ size = 'md', showText = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const scale = size === 'sm' ? 0.5 : size === 'md' ? 0.75 : size === 'lg' ? 1 : 1.5;

  return (
    <div className={`flex flex-col items-center justify-center ${showText ? 'gap-4' : ''}`}>
      {/* Geometric Icon */}
      <div 
        className={`relative bg-[#fde047] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${sizeClasses[size]} overflow-hidden`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      >
        {/* Diagonal Line */}
        <div className="absolute top-0 left-0 w-[150%] h-[1px] bg-black/30 origin-top-left rotate-45"></div>
        
        {/* Top Left Teal Square */}
        <div className="absolute top-1.5 left-1.5 w-4 h-4 bg-[#2dd4bf] border-2 border-black z-10"></div>
        
        {/* Plus Sign */}
        <div className="absolute top-2 left-6 z-10">
          <div className="relative w-4 h-4">
            <div className="absolute top-1.5 left-0 w-4 h-1 bg-black"></div>
            <div className="absolute top-0 left-1.5 w-1 h-4 bg-black"></div>
          </div>
        </div>

        {/* Bottom Right Coral Square */}
        <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-[#fb7185] border-2 border-black flex items-center justify-center z-10">
          <div className="w-1.5 h-1.5 bg-black"></div>
        </div>
      </div>

      {/* Optional Text Blocks */}
      {showText && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="bg-[#fde047] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2">
            <h1 className="text-3xl font-black text-black tracking-widest uppercase">Chaitanya</h1>
          </div>
          <div className="bg-[#2dd4bf] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-1.5">
            <p className="text-[10px] font-bold text-black tracking-[0.2em] uppercase">
              Digital Mental Health + Psychological Support
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeoLogo;
