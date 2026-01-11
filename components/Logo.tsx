import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ${className}`}>
      {/* Abstract representation of Dog/Cat Hug using FontAwesome as placeholder for the complex SVG */}
      <div className="relative z-10">
        <i className="fa-solid fa-dog text-[50%] absolute -left-1 bottom-1 transform -scale-x-100"></i>
        <i className="fa-solid fa-cat text-[40%] absolute -right-1 bottom-0"></i>
        <i className="fa-solid fa-heart text-[25%] absolute top-0 text-emerald-100"></i>
      </div>
      {/* Ring effect */}
      <div className="absolute inset-0 border-2 border-emerald-500 rounded-full opacity-50"></div>
    </div>
  );
};

export default Logo;
