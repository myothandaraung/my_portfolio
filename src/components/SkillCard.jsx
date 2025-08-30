// src/components/SkillCard.js
import React from 'react';

function SkillCard({ name, icon, highlighted = false }) {
  const cardClasses = `
    flex flex-col items-center justify-center
    p-6 md:p-8
    rounded-2xl
    w-full max-w-xs h-48 md:h-56
    text-center
    transition-all duration-300 ease-in-out
    ${highlighted
      ? 'bg-[#ffd700] text-[#2d2d30] shadow-lg transform scale-105' // Highlighted state
      : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:shadow-md' // Default state
    }
  `;

  const iconClasses = `
    mb-4
    ${highlighted ? 'text-[#2d2d30]' : 'text-gray-300'} // Adjust icon color based on highlight
  `;

  const nameClasses = `
    text-xl md:text-2xl font-semibold
    ${highlighted ? 'text-[#2d2d30]' : 'text-gray-200'} // Adjust text color based on highlight
  `;

  return (
    <div className={cardClasses}>
      <div className={iconClasses}>
        {icon}
      </div>
      <p className={nameClasses}>{name}</p>
    </div>
  );
}

export default SkillCard;