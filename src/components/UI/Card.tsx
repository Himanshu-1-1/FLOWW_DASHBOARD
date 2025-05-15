import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-800 rounded-lg shadow-md p-5 transition-colors duration-300 text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;