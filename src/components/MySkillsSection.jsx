// src/components/SkillsSection.js
import React, { useState, useEffect } from 'react';
import SkillCard from './SkillCard';
import { FaLaravel,FaReact,FaVuejs,FaAngular,FaNode,FaBootstrap,FaCss3Alt,FaJs,FaHtml5,FaPhp,FaGitAlt,FaBitbucket, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer, FaTerminal } from 'react-icons/fa';
import { SiFlutter, SiMysql } from 'react-icons/si';

function MySkillsSection() {
  const [aiMode, setAiMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [skillConnections, setSkillConnections] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaTerminal];
  const techSymbols = ['{ }', '< />', '[ ]', '( )', '||', '&&', '++', '--'];
  
  useEffect(() => {
    const generateMatrixRain = () => {
      const rain = [];
      for (let i = 0; i < 20; i++) {
        rain.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.5 + Math.random() * 2,
          char: String.fromCharCode(33 + Math.floor(Math.random() * 94)),
          opacity: Math.random()
        });
      }
      setMatrixRain(rain);
    };
    generateMatrixRain();
    const interval = setInterval(generateMatrixRain, 4000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const generateSkillConnections = () => {
      const connections = [];
      for (let i = 0; i < 8; i++) {
        connections.push({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 100,
          endX: Math.random() * 100,
          endY: Math.random() * 100,
          progress: 0,
          speed: 0.5 + Math.random() * 1.5
        });
      }
      setSkillConnections(connections);
    };
    generateSkillConnections();
    const interval = setInterval(() => {
      setSkillConnections(prev => prev.map(conn => ({
        ...conn,
        progress: (conn.progress + conn.speed) % 100
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);
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
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* AI Background Effects */}
      {aiMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Matrix Rain */}
          <div className="absolute inset-0 opacity-10">
            {matrixRain.map((drop) => (
              <div
                key={drop.id}
                className="absolute text-[#64ffda] font-mono text-xs animate-pulse"
                style={{
                  left: `${drop.x}%`,
                  top: `${drop.y}%`,
                  opacity: drop.opacity,
                  animation: `fall ${drop.speed}s linear infinite`,
                  textShadow: '0 0 5px #64ffda'
                }}
              >
                {drop.char}
              </div>
            ))}
          </div>
          
          {/* Skill Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {skillConnections.map((conn) => (
              <line
                key={conn.id}
                x1={`${conn.startX}%`}
                y1={`${conn.startY}%`}
                x2={`${conn.startX + (conn.endX - conn.startX) * (conn.progress / 100)}%`}
                y2={`${conn.startY + (conn.endY - conn.startY) * (conn.progress / 100)}%`}
                stroke="#64ffda"
                strokeWidth="0.5"
                strokeDasharray="2, 4"
                opacity="0.3"
                className="animate-pulse"
              />
            ))}
          </svg>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
      )}
      
      {/* AI Mode Toggle */}
      <button
        onClick={() => setAiMode(!aiMode)}
        className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 z-20 ${
          aiMode 
            ? 'bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/50' 
            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-[#64ffda]'
        }`}
        title="Toggle AI Mode"
      >
        <FaBrain className={`w-4 h-4 ${aiMode ? 'animate-pulse' : ''}`} />
        {aiMode && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </button>
      
      {/* Enhanced Heading */}
      <div className="relative z-10 mb-12 text-center">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 animate-gradientSlide">
            My Skills
          </h2>
          <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 blur-lg animate-pulseSlow"></div>
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="w-32 h-[3px] bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full shadow-md"></div>
          {aiMode && (
            <div className="flex space-x-2">
              {aiIcons.slice(0, 4).map((Icon, idx) => (
                <Icon key={idx} className="text-sm text-purple-400 animate-popScale" style={{ animationDelay: `${idx * 0.2}s` }} />
              ))}
            </div>
          )}
        </div>
        
        {/* Tech Symbols */}
        {aiMode && (
          <div className="flex space-x-3 mt-4">
            {techSymbols.slice(0, 4).map((symbol, idx) => (
              <span key={idx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${idx * 0.3}s` }}>
                {symbol}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Enhanced Skills Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="relative group"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* AI Status Indicator */}
            {aiMode && (
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-75"></div>
            )}
            
            {/* Skill Card */}
            <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300 transform hover:scale-105">
              {/* Tech Symbol */}
              {aiMode && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs text-purple-400 font-mono animate-pulse">
                    {techSymbols[index % techSymbols.length]}
                  </span>
                </div>
              )}
              
              {/* Icon Container */}
              <div className="relative mb-4 flex justify-center">
                <div className="relative group/icon">
                  {/* Rotating Ring for AI Mode */}
                  {aiMode && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda] via-purple-500 to-pink-500 p-[1px] animate-rotate-slow">
                      <div className="w-full h-full rounded-full bg-gray-900"></div>
                    </div>
                  )}
                  
                  <div className="relative transform transition-transform duration-300 group-hover/icon:scale-110">
                    {skill.icon}
                  </div>
                  
                  {/* AI Particles */}
                  {aiMode && hoveredSkill === skill.name && [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#64ffda] rounded-full animate-popScale"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translateX(30px)`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Skill Name */}
              <h3 className="text-center text-white font-semibold text-sm md:text-base group-hover:text-[#64ffda] transition-colors duration-300">
                {skill.name}
              </h3>
              
              {/* Hover Tech Symbols */}
              {aiMode && hoveredSkill === skill.name && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {techSymbols.slice(2, 5).map((symbol, idx) => (
                    <span key={idx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${idx * 0.1}s` }}>
                      {symbol}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Tech Line */}
      {aiMode && (
        <div className="flex space-x-2 mt-8 pt-4 border-t border-gray-700 justify-center">
          {techSymbols.map((symbol, idx) => (
            <span key={idx} className="text-xs text-purple-400 font-mono animate-pulse opacity-50" style={{ animationDelay: `${idx * 0.1}s` }}>
              {symbol}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default MySkillsSection;