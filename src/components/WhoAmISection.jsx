// src/components/AboutSection.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer, FaTerminal } from "react-icons/fa";
function WhoAmISection() {
  const { t } = useTranslation();
  const [aiMode, setAiMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [neuralNodes, setNeuralNodes] = useState([]);
  const [activeParagraph, setActiveParagraph] = useState(0);
  
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaTerminal];
  const techSymbols = ['{ }', '< />', '[ ]', '( )', '||', '&&', '++', '--'];
  
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
    const generateNeuralNodes = () => {
      const nodes = [];
      for (let i = 0; i < 12; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 6,
          connections: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => Math.floor(Math.random() * 12))
        });
      }
      setNeuralNodes(nodes);
    };
    generateNeuralNodes();
    const interval = setInterval(generateNeuralNodes, 5000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const paragraphInterval = setInterval(() => {
      setActiveParagraph(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(paragraphInterval);
  }, []);
  return (
    <section id="about" className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#0a192f] to-[#112240] text-white overflow-hidden">
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
          
          {/* Neural Network */}
          <svg className="absolute inset-0 w-full h-full">
            {neuralNodes.map((node) => 
              node.connections.map((targetIdx, connIdx) => {
                const target = neuralNodes[targetIdx];
                if (!target) return null;
                return (
                  <line
                    key={`${node.id}-${targetIdx}-${connIdx}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="#64ffda"
                    strokeWidth="0.5"
                    strokeDasharray="2, 4"
                    opacity="0.2"
                    className="animate-pulse"
                    style={{ animationDelay: `${node.id * 0.1}s` }}
                  />
                );
              })
            )}
            {neuralNodes.map((node) => (
              <circle
                key={node.id}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill="#64ffda"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${node.id * 0.15}s` }}
              >
                <animate
                  attributeName="r"
                  values={`${node.size};${node.size * 1.5};${node.size}`}
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${node.id * 0.2}s`}
                />
              </circle>
            ))}
          </svg>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(45deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px'
            }}></div>
          </div>
        </div>
      )}
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#64ffda]/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

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
      <div className="mb-12 text-center md:text-left relative z-10">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 animate-gradientSlide">
            {t("about.title")}
          </h2>
          <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 blur-lg animate-pulseSlow"></div>
        </div>
        
        <div className="flex items-center space-x-4">
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

      {/* AI Enhanced About Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12 max-w-4xl mx-auto">
        {/* Quantum Icon */}
        <div className="flex-shrink-0 relative">
          <div className="relative group">
            {/* Rotating Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda] via-purple-500 to-pink-500 p-[2px] animate-rotate-slow">
              <div className="w-full h-full rounded-full bg-gray-900"></div>
            </div>
            
            {/* Main Icon */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#64ffda] to-purple-500 flex items-center justify-center text-[#0a192f] font-bold text-lg shadow-lg animate-pulseSlow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">?</span>
            </div>
            
            {/* AI Particles */}
            {aiMode && [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#64ffda] rounded-full animate-popScale"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateX(25px)`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Status Indicator */}
          {aiMode && (
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Enhanced Text Content */}
        <div className="flex-1">
          <div className="space-y-6">
            {[
              { content: t("about.intro"), icon: FaServer },
              { content: t("about.details"), icon: FaBrain },
              { content: t("about.experience"), icon: FaCode }
            ].map((section, idx) => (
              <div 
                key={idx} 
                className={`relative group transition-all duration-500 ${
                  activeParagraph === idx ? 'scale-105' : 'scale-100'
                }`}
                onMouseEnter={() => setActiveParagraph(idx)}
              >
                {/* Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#64ffda]/10 to-purple-500/10 rounded-lg blur-md transition-opacity duration-300 ${
                  activeParagraph === idx ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
                  {/* Paragraph Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    {React.createElement(section.icon, {
                      className: `text-lg text-purple-400 ${activeParagraph === idx ? 'animate-pulse' : ''}`
                    })}
                    <div className="flex space-x-1">
                      {techSymbols.slice(idx * 2, (idx + 1) * 2).map((symbol, symbolIdx) => (
                        <span key={symbolIdx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${symbolIdx * 0.2}s` }}>
                          {symbol}
                        </span>
                      ))}
                    </div>
                    {aiMode && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-75"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div 
                    className="text-gray-300 text-lg md:text-xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `<p>${section.content}</p>` }}
                  />
                  
                  {/* Active Indicator */}
                  {activeParagraph === idx && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Tech Line */}
          {aiMode && (
            <div className="flex space-x-2 mt-8 pt-4 border-t border-gray-700">
              {techSymbols.map((symbol, idx) => (
                <span key={idx} className="text-xs text-purple-400 font-mono animate-pulse opacity-50" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {symbol}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WhoAmISection;
