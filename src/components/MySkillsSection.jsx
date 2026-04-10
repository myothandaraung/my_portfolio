import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLaravel, FaReact, FaVuejs, FaAngular, FaNode, FaBootstrap, FaCss3Alt, FaJs, FaHtml5, FaPhp, FaGitAlt, FaBitbucket } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';

const skills = [
  { name: 'Laravel', icon: <FaLaravel className="text-6xl text-blue-500" /> },
  { name: 'React', icon: <FaReact className="text-6xl text-blue-400" /> },
  { name: 'VueJS', icon: <FaVuejs className="text-6xl text-blue-400" /> },
  { name: 'Angular', icon: <FaAngular className="text-6xl text-blue-400" /> },
  { name: 'NodeJS', icon: <FaNode className="text-6xl text-blue-400" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-6xl text-blue-400" /> },
  {
    name: 'HTML & CSS',
    icon: (
      <div className="flex gap-2">
        <FaHtml5 className="text-5xl text-orange-600" />
        <FaCss3Alt className="text-5xl text-blue-600" />
      </div>
    ),
  },
  { name: 'JavaScript', icon: <FaJs className="text-6xl text-yellow-400" /> },
  { name: 'PHP', icon: <FaPhp className="text-6xl text-blue-400" /> },
  { name: 'Git', icon: <FaGitAlt className="text-6xl text-orange-500" /> },
  { name: 'Bitbucket', icon: <FaBitbucket className="text-6xl text-blue-500" /> },
  { name: 'MySQL', icon: <SiMysql className="text-6xl text-blue-400" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function PremiumSkillsSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="relative py-24 overflow-hidden" id="skills">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/5 via-transparent to-purple-500/5" />

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500">
          My Skills
        </h2>
        <p className="text-gray-400 text-sm mt-4 tracking-widest uppercase">
          Technologies I Work With
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative group"
          >
            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(100,255,218,0.15)] overflow-hidden">

              {/* Hover Light Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shine_1.5s]"></div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Icon */}
              <motion.div
                animate={{
                  scale: hovered === index ? 1.15 : 1,
                  y: hovered === index ? -5 : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex justify-center mb-6"
              >
                {skill.icon}
              </motion.div>

              {/* Name */}
              <p className="text-center text-white text-sm font-medium tracking-wide group-hover:text-[#64ffda] transition-colors duration-300">
                {skill.name}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
