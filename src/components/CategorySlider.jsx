import React, { useRef, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaStarOfLife, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer, FaTerminal } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function CategorySlider() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [aiMode, setAiMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [neuralConnections, setNeuralConnections] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = t("categories", { returnObjects: true }) || [];
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite];

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // AI Effects
  useEffect(() => {
    const generateMatrixRain = () => {
      const rain = [];
      for (let i = 0; i < 15; i++) {
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
    const generateNeuralConnections = () => {
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
      setNeuralConnections(connections);
    };
    generateNeuralConnections();
    const interval = setInterval(() => {
      setNeuralConnections(prev => prev.map(conn => ({
        ...conn,
        progress: (conn.progress + conn.speed) % 100
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Start auto-scroll
  const startAutoScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  // Manual scroll
  const manualScroll = (offset) => {
    clearInterval(scrollIntervalRef.current);
    scrollContainerRef.current.scrollBy({
      left: offset,
      behavior: "smooth",
    });
    startAutoScroll();
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    clearInterval(scrollIntervalRef.current);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // drag speed
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    clearInterval(scrollIntervalRef.current);
    startXRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  return (
    <div className="relative bg-[#112240] py-6 px-6 overflow-hidden rounded-full my-8 group">
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
          
          {/* Neural Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {neuralConnections.map((conn) => (
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
      
      <div className="relative z-10 container mx-auto flex items-center justify-center">
        {/* AI Mode Toggle */}
        <button
          onClick={() => setAiMode(!aiMode)}
          className={`absolute -top-3 -right-3 p-2 rounded-full transition-all duration-300 z-20 ${
            aiMode 
              ? 'bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/50' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-[#64ffda]'
          }`}
          title="Toggle AI Mode"
        >
          <FaTerminal className={`w-3 h-3 ${aiMode ? 'animate-pulse' : ''}`} />
          {aiMode && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </button>
        
        {/* Enhanced Left Button */}
        <button
          onClick={() => manualScroll(-200)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#112240] to-[#0d1c3a] text-gray-400 p-3 rounded-full shadow-lg z-10 hover:text-[#64ffda] hover:scale-110 transition-all duration-300 border border-[#64ffda]/30 hover:border-[#64ffda] hidden md:block group-hover:shadow-[#64ffda]/20"
        >
          <div className="relative">
            <FaAngleLeft className="text-2xl" />
            {aiMode && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            )}
          </div>
        </button>

        {/* Quantum Scrollable Categories */}
        <div
          ref={scrollContainerRef}
          className={`flex items-center space-x-6 overflow-x-auto whitespace-nowrap scroll-smooth pb-2 pt-1 px-4 md:px-0 lg:px-0 hide-scrollbar relative ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Tripled list for infinite loop */}
          {[...categories, ...categories, ...categories].map(
            (category, index) => (
              <React.Fragment key={`${category}-${index}`}>
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Button */}
                  <button 
                    className="relative flex-shrink-0 text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-full hover:text-[#64ffda] transition-all duration-300 border border-transparent hover:border-[#64ffda]/50 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 overflow-hidden group"
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    {/* AI Icon */}
                    {aiMode && (
                      <div className="absolute -top-2 -right-2">
                        {React.createElement(aiIcons[index % aiIcons.length], {
                          className: "text-xs text-purple-400 animate-popScale"
                        })}
                      </div>
                    )}
                    
                    <span className="relative z-10">{category}</span>
                    
                  </button>
                  
                  {/* Status Indicator */}
                  {aiMode && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-75"></div>
                  )}
                </div>
                
                {/* Enhanced Separator */}
                {index < categories.length * 3 - 1 && (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64ffda]/50 to-transparent h-0.5 animate-pulse"></div>
                    <FaStarOfLife className="relative flex-shrink-0 text-[#64ffda] text-xs md:text-sm animate-spin-slow z-10" />
                    {aiMode && (
                      <div className="absolute inset-0 bg-[#64ffda] rounded-full blur-sm animate-pulse"></div>
                    )}
                  </div>
                )}
              </React.Fragment>
            )
          )}
        </div>

        {/* Enhanced Right Button */}
        <button
          onClick={() => manualScroll(200)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#112240] to-[#0d1c3a] text-gray-400 p-3 rounded-full shadow-lg z-10 hover:text-[#64ffda] hover:scale-110 transition-all duration-300 border border-[#64ffda]/30 hover:border-[#64ffda] hidden md:block group-hover:shadow-[#64ffda]/20"
        >
          <div className="relative">
            <FaAngleRight className="text-2xl" />
            {aiMode && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            )}
          </div>
        </button>
        
        {/* Floating Tech Symbols */}
      </div>

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CategorySlider;