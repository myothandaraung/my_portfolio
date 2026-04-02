import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer, FaTerminal, FaGithub, FaExternalLinkAlt, FaChartLine, FaDatabase, FaLayerGroup, FaCube, FaProjectDiagram, FaGitAlt } from 'react-icons/fa';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });
  const [aiMode, setAiMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projectNodes, setProjectNodes] = useState([]);
  const [dataFlow, setDataFlow] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaTerminal, FaChartLine, FaDatabase, FaLayerGroup, FaCube, FaProjectDiagram, FaGitAlt];
  const techSymbols = ['{ }', '< />', '[ ]', '( )', '||', '&&', '++', '--', '=>', '<=', '!=', '==='];
  
  useEffect(() => {
    const generateMatrixRain = () => {
      const rain = [];
      for (let i = 0; i < 25; i++) {
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
    const interval = setInterval(generateMatrixRain, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const generateProjectNodes = () => {
      const nodes = [];
      for (let i = 0; i < 20; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 6,
          connections: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => Math.floor(Math.random() * 20)),
          pulseSpeed: 0.5 + Math.random() * 2,
          color: Math.random() > 0.5 ? '#64ffda' : '#a855f7'
        });
      }
      setProjectNodes(nodes);
    };
    generateProjectNodes();
    const interval = setInterval(generateProjectNodes, 7000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const generateDataFlow = () => {
      const flow = [];
      for (let i = 0; i < 12; i++) {
        flow.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 3,
          trail: Array.from({ length: 5 }, () => ({ x: 0, y: 0 }))
        });
      }
      setDataFlow(flow);
    };
    generateDataFlow();
    const interval = setInterval(() => {
      setDataFlow(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        
        if (newX < 0 || newX > 100) particle.vx *= -1;
        if (newY < 0 || newY > 100) particle.vy *= -1;
        
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));
        
        const newTrail = [{ x: particle.x, y: particle.y }, ...particle.trail.slice(0, 4)];
        
        return { ...particle, x: newX, y: newY, trail: newTrail };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (aiMode && projects.length > 0) {
      const projectInterval = setInterval(() => {
        setActiveProject(prev => {
          const nextIndex = prev === null ? 0 : (projects.findIndex(p => p.title === prev) + 1) % projects.length;
          return projects[nextIndex].title;
        });
      }, 4000);
      return () => clearInterval(projectInterval);
    }
  }, [aiMode, projects]);
    

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-b from-[#0a192f] to-[#112240] overflow-hidden">
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
          
          {/* Project Nodes Network */}
          <svg className="absolute inset-0 w-full h-full">
            {projectNodes.map((node) => 
              node.connections.map((targetIdx, connIdx) => {
                const target = projectNodes[targetIdx];
                if (!target) return null;
                return (
                  <line
                    key={`${node.id}-${targetIdx}-${connIdx}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={node.color}
                    strokeWidth="0.5"
                    strokeDasharray="2, 4"
                    opacity="0.3"
                    className="animate-pulse"
                    style={{ animationDelay: `${node.id * 0.1}s` }}
                  />
                );
              })
            )}
            {projectNodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.size}
                  fill={node.color}
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: `${node.id * 0.15}s`, animationDuration: `${node.pulseSpeed}s` }}
                >
                  <animate
                    attributeName="r"
                    values={`${node.size};${node.size * 1.5};${node.size}`}
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${node.id * 0.2}s`}
                  />
                </circle>
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.size * 0.3}
                  fill="#ffffff"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDelay: `${node.id * 0.15}s`, animationDuration: `${node.pulseSpeed}s` }}
                />
              </g>
            ))}
          </svg>
          
          {/* Data Flow Particles */}
          <svg className="absolute inset-0 w-full h-full">
            {dataFlow.map((particle) => (
              <g key={particle.id}>
                {/* Particle Trail */}
                {particle.trail.map((point, idx) => (
                  <circle
                    key={idx}
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    r={particle.size * (1 - idx * 0.15)}
                    fill="#64ffda"
                    opacity={0.6 * (1 - idx * 0.2)}
                    className="animate-pulse"
                    style={{ animationDelay: `${particle.id * 0.05}s` }}
                  />
                ))}
                {/* Main Particle */}
                <circle
                  cx={`${particle.x}%`}
                  cy={`${particle.y}%`}
                  r={particle.size}
                  fill="#64ffda"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{ animationDelay: `${particle.id * 0.05}s` }}
                >
                  <animate
                    attributeName="r"
                    values={`${particle.size};${particle.size * 1.3};${particle.size}`}
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${particle.id * 0.1}s`}
                  />
                </circle>
              </g>
            ))}
          </svg>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(45deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px),
                linear-gradient(135deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px, 150px 150px'
            }}></div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4">
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
        <div className="relative mb-16 text-center">
          <div className="relative inline-block">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 animate-gradientSlide">
              My Projects
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

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-500 ${
                activeProject === project.title ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Enhanced Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-2xl blur-md transition-opacity duration-300 ${
                hoveredProject === project.title || activeProject === project.title ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* AI Status Indicator */}
              {aiMode && (
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-75"></div>
              )}
              
              {/* Enhanced Project Card */}
              <div className={`relative bg-gradient-to-tr from-[#0d1c3a] to-[#112240] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-[#64ffda]/20 hover:border-[#64ffda]/40 ${
                activeProject === project.title ? 'shadow-xl shadow-[#64ffda]/40' : ''
              }`}>
                {/* Tech Symbol */}
                {aiMode && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-xs text-purple-400 font-mono animate-pulse">
                      {techSymbols[index % techSymbols.length]}
                    </span>
                  </div>
                )}
                
                {/* Responsive Project Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
                  {/* Image Overlay */}
                  {(hoveredProject === project.title || activeProject === project.title) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 animate-pulse"></div>
                  )}
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Enhanced AI Particles on Hover */}
                  {aiMode && (hoveredProject === project.title || activeProject === project.title) && [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-[#64ffda] rounded-full animate-popScale"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                  
                  {/* Data Flow Lines */}
                  {aiMode && activeProject === project.title && (
                    <svg className="absolute inset-0 w-full h-full">
                      {[...Array(3)].map((_, i) => (
                        <line
                          key={i}
                          x1={`${20 + i * 30}%`}
                          y1="0"
                          x2={`${30 + i * 25}%`}
                          y2="100%"
                          stroke="#64ffda"
                          strokeWidth="0.5"
                          strokeDasharray="4, 8"
                          opacity="0.3"
                          className="animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </svg>
                  )}
                </div>

                {/* Enhanced Project Info */}
                <div className="relative p-3 sm:p-4 md:p-6 bg-gray-800/40 backdrop-blur-md">
                  {/* Responsive Project Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-1 transition-colors duration-300 ${
                        hoveredProject === project.title || activeProject === project.title
                          ? 'text-purple-400' 
                          : 'text-[#64ffda]'
                      }`}>
                        {project.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm text-gray-400">
                        <span>{project.company}</span>
                        {project.company && <span className="text-[#64ffda] hidden sm:inline">|</span>}
                        <span>{project.dates}</span>
                        {aiMode && (
                          <div className="flex space-x-1 sm:ml-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-75"></div>
                            {activeProject === project.title && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Enhanced AI Icon */}
                    <div className="relative">
                      {React.createElement(aiIcons[index % aiIcons.length], {
                        className: `text-lg sm:text-xl text-purple-400 animate-popScale ${
                          activeProject === project.title ? 'animate-spin-slow' : ''
                        }`,
                        style: { animationDelay: `${index * 0.1}s` }
                      })}
                      {activeProject === project.title && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Responsive Description */}
                  <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{project.description}</p>

                  {/* Enhanced Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.slice(0, window.innerWidth < 640 ? 3 : project.technologies.length).map((tech, i) => (
                      <div key={i} className="relative group/tech">
                        <span
                          className="relative px-2 py-1 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#64ffda] to-purple-500 text-[#0a192f] hover:from-purple-500 hover:to-pink-500 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover/tech:translate-x-full transition-transform duration-700"></div>
                          
                          <span className="relative z-10">{tech}</span>
                        </span>
                        
                        {/* Tech Symbol */}
                        {aiMode && (hoveredProject === project.title || activeProject === project.title) && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs text-purple-400 font-mono animate-pulse">
                            {techSymbols[i % techSymbols.length]}
                          </span>
                        )}
                      </div>
                    ))}
                    {window.innerWidth < 640 && project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                  
                  {/* Responsive Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-[#64ffda] to-purple-500 text-[#0a192f] hover:from-purple-500 hover:to-pink-500 transition-all duration-300 overflow-hidden group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <FaGithub className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Code</span>
                      </span>
                    </button>
                    
                    <button className="relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda] hover:text-[#0a192f] transition-all duration-300 overflow-hidden group/live">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64ffda]/20 to-transparent -skew-x-12 group/live:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Live</span>
                      </span>
                    </button>
                  </div>
                  
                  {/* Active Indicator */}
                  {(hoveredProject === project.title || activeProject === project.title) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full animate-pulse"></div>
                  )}
                </div>
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
      </div>
    </section>
  );
};

export default Projects;
