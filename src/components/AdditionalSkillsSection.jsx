import React from 'react';
// Import icons for additional skills - create these in src/assets/icons/
import BootstrapIcon from '../assets/bootstrap.svg';
import AxiosIcon from '../assets/axios.svg';
import FigmaIcon from '../assets/figma.svg';
import MongoDbIcon from '../assets/mongodb.svg';
import FirebaseIcon from '../assets/firebase.svg';
import WordpressIcon from '../assets/wordpress.svg';
import MuiIcon from '../assets/mui.svg'; // Material-UI
import TailwindIcon from '../assets/tailwindcss.svg'; // Tailwind CSS icon

const AdditionalSkillsSection = () => {
  const additionalSkills = [
    { name: 'Bootstrap', icon: BootstrapIcon, color: 'text-blue-500' },
    { name: 'Axios', icon: AxiosIcon, color: 'text-blue-500' },
    { name: 'Figma', icon: FigmaIcon, color: 'text-blue-500' },
    { name: 'MongoDB', icon: MongoDbIcon, color: 'text-blue-500' },
    { name: 'Firebase', icon: FirebaseIcon, color: 'text-blue-500' },
    { name: 'WordPress', icon: WordpressIcon, color: 'text-blue-500' },
    { name: 'Material-UI', icon: MuiIcon , color: '#007FFF' },
    { name: 'Tailwind CSS', icon: TailwindIcon , color: '#007FFF' }, // Add Tailwind CSS
  ];

  return (
    <section className="bg-dark-blue py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-12 text-accent-yellow">ADDITIONAL SKILLS</h2>
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-10">
        {additionalSkills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center text-light-gray-text hover:text-white transition-colors duration-200">
            <img src={skill.icon} alt={`${skill.name} icon`} className="w-12 h-12 mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" style={{ color: skill.color }}/>
            <p className="text-md font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdditionalSkillsSection;