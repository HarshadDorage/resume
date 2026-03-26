import React from 'react';

interface SurfaceCardProps {
  className?: string;
  children: React.ReactNode;
}

const SurfaceCard: React.FC<SurfaceCardProps> = ({ className = '', children }) => {
  return <div className={`glass-panel rounded-[30px] ${className}`}>{children}</div>;
};

export default SurfaceCard;
