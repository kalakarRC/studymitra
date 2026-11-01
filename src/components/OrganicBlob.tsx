import React from 'react';

export const OrganicBlob: React.FC<{ color?: string; className?: string }> = ({ 
  color = 'currentColor', 
  className = 'w-24 h-24 text-slate-400/15' 
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute bottom-0 right-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C86.9,14.5,81.2,29,72.6,41.2C64.1,53.4,52.6,63.2,39.6,70.5C26.5,77.8,11.9,82.5,-3.1,87.9C-18.1,93.2,-33.5,99.2,-46.8,94.2C-60,89.2,-71.2,73.2,-78.9,57.7C-86.6,42.2,-90.7,27.1,-90.6,12.3C-90.4,-2.5,-86,-17.1,-78.7,-29.9C-71.3,-42.6,-61.1,-53.6,-49,-61.5C-36.9,-69.4,-23,-74.2,-8.1,-79.8C6.9,-85.4,21.9,-91.8,35.8,-88.2C40.6,-84.9,43.4,-80.6,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
};

export const ScallopedCookieIcon: React.FC<{ 
  children: React.ReactNode; 
  bg?: string; 
  size?: string;
  className?: string;
}> = ({
  children,
  bg = 'bg-amber-400 text-slate-950',
  size = 'w-9 h-9',
  className = ''
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center font-bold shadow-sm scalloped-badge ${size} ${bg} ${className}`}
    >
      {children}
    </div>
  );
};
