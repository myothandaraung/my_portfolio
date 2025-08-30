// src/components/SkillsSection.js
import React from 'react';
import SkillCard from './SkillCard';
import { FaLaravel,FaReact,FaVuejs,FaAngular,FaNode,FaBootstrap,FaCss3Alt,FaJs,FaHtml5,FaPhp,FaGitAlt,FaBitbucket} from 'react-icons/fa';
import { SiFlutter, SiMysql } from 'react-icons/si';

function MySkillsSection() {
  const skills = [
    {
      name: 'Laravel',
      icon: <FaLaravel className="text-7xl text-blue-500" />,
    },
    {
      name: 'React',
      icon: <FaReact className="text-7xl text-blue-400" />,
    },
    {
      name: 'VueJS',
      icon: <FaVuejs className="text-7xl text-blue-400" />,
    },
    {
      name: 'Angular',
      icon: <FaAngular className="text-7xl text-blue-400" />,
    },
    {
      name: 'NodeJS',
      icon: <FaNode className="text-7xl text-blue-400" />,
    },
    {
      name: 'Bootstrap',
      icon: <FaBootstrap className="text-7xl text-blue-400" />,
    },
    {
      name: 'Html & CSS',
      icon: (
        <div className="flex items-center space-x-2">
          <FaHtml5 className="text-6xl text-orange-600" />
          <FaCss3Alt className="text-6xl text-blue-600" />
        </div>
      ),
    },
    {
      name: 'JavaScript',
      icon: <FaJs className="text-7xl text-yellow-400" />,
    },
    {
      name: 'PHP',
      icon: <FaPhp className="text-7xl text-blue-400" />,
    },
    {
      name: 'Git Source Control',
      icon: <FaGitAlt className="text-7xl text-orange-500" />,
    },
    {
      name: 'Bitbucket',
      icon: <FaBitbucket className="text-7xl text-orange-500" />,
    },
    {
      name: 'MySQL',
      icon: <SiMysql className="text-7xl text-blue-400" />,
    },
    // Add more skills as needed
    // { name: 'React', icon: <FaReact className="text-7xl text-blue-400" /> },
    // { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-7xl text-teal-400" /> },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            icon={skill.icon}
            // No 'highlighted' prop means it defaults to false in SkillCard, which is what we want.
          />
        ))}
      </div>
    </section>
  );
}

export default MySkillsSection;