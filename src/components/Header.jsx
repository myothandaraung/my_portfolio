import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaTerminal, FaServer } from "react-icons/fa";
import myLogo from "../../public/images/logo1.svg";
import "../App.css";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [neuralActivity, setNeuralActivity] = useState([]);
  const [matrixRain, setMatrixRain] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const matchesRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const [isTablet, setIsTablet] = useState(false);
  
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite];
  const techSymbols = ['{ }', '< />', '[ ]', '( )', '||', '&&', '++', '--'];
  
  // Responsive detection
  useEffect(() => {
    const checkDevice = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const navItems = t("nav", { returnObjects: true }) || ["About", "Skills", "Projects", "Portfolio", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      matchesRef.current = [];
      currentIndexRef.current = -1;
    }
  }, [searchQuery]);

  useEffect(() => {
    const generateNeuralActivity = () => {
      const activity = [];
      for (let i = 0; i < 15; i++) {
        activity.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 4,
          speed: 1 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.7
        });
      }
      setNeuralActivity(activity);
    };
    generateNeuralActivity();
    const interval = setInterval(generateNeuralActivity, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateMatrixRain = () => {
      const rain = [];
      for (let i = 0; i < 20; i++) {
        rain.push({
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;
  
    // If query changed, reset matches
    if (matchesRef.current.query !== query) {
      // remove old highlights
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
  
      matchesRef.current = [];
      currentIndexRef.current = -1;
  
      const allElements = document.querySelectorAll(
        "#skills *:not(script):not(style), \
         #projects *:not(script):not(style), \
         #portfolio *:not(script):not(style), \
         #contact *:not(script):not(style), \
         #about *:not(script):not(style), \
         #hero-section *:not(script):not(style), \
         #footer *:not(script):not(style)"
      );
  
      const regex = new RegExp(`(${query})`, "gi");
  
      for (let el of allElements) {
        for (let node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.toLowerCase().includes(query)) {
              const span = document.createElement("span");
              span.innerHTML = node.textContent.replace(
                regex,
                `<mark class="search-highlight">$1</mark>`
              );
              el.replaceChild(span, node);
            }
          }
        }
      }
  
      // collect all <mark>
      matchesRef.current = Array.from(
        document.querySelectorAll("mark.search-highlight")
      );
      matchesRef.current.query = query;
    }
  
    if (matchesRef.current.length > 0) {
      // move to next
      currentIndexRef.current =
        (currentIndexRef.current + 1) % matchesRef.current.length;
  
      const active = matchesRef.current[currentIndexRef.current];
  
      // remove "active" style from others
      matchesRef.current.forEach((m) => m.classList.remove("active-highlight"));
      active.classList.add("active-highlight");
  
      // scroll into view
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      alert(`No results found for "${searchQuery}".`);
    }
  };
  

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 relative overflow-hidden ${
        scrolled
          ? "bg-[#0a192f]/95 shadow-lg backdrop-blur-lg"
          : "bg-[#0a192f]/50 backdrop-blur-md"
      }`}
    >
      {/* AI Neural Network Background */}
      {aiMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Matrix Rain */}
          <div className="absolute inset-0 opacity-10">
            {matrixRain.map((drop, i) => (
              <div
                key={i}
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
          
          {/* Neural Activity */}
          {neuralActivity.map((node) => (
            <div
              key={node.id}
              className="absolute bg-[#64ffda] rounded-full animate-pulse"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                opacity: node.opacity,
                animation: `pulse ${node.speed}s ease-in-out infinite`,
                boxShadow: '0 0 10px #64ffda'
              }}
            ></div>
          ))}
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 max-w-7xl mx-auto text-white">
        {/* AI Enhanced Logo */}
        <a href="#" className="flex items-center space-x-2 sm:space-x-3 group">
          <div className="relative">
            {/* Quantum Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda] via-purple-500 to-pink-500 p-[1px] animate-rotate-slow">
              <div className="w-full h-full rounded-full bg-gray-900"></div>
            </div>
            
            {/* Logo Container */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px] rounded-full p-[2px] bg-gradient-to-tr from-[#64ffda] to-gray-400 overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <img
                  src={myLogo}
                  alt="Logo"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-[40px] md:h-[40px] object-contain grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            {/* AI Particles */}
            {aiMode && [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#64ffda] rounded-full animate-popScale"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 60}deg) translateX(${isTablet ? '25px' : '35px'})`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Tech Symbols - Responsive */}
          {/* <div className="hidden lg:flex flex-col space-y-1">
            <div className="flex space-x-1">
              {techSymbols.slice(0, 3).map((symbol, idx) => (
                <span key={idx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                  {symbol}
                </span>
              ))}
            </div>
            <div className="flex space-x-1">
              {techSymbols.slice(3, 6).map((symbol, idx) => (
                <span key={idx} className="text-xs text-purple-400 font-mono animate-pulse" style={{ animationDelay: `${idx * 0.3}s` }}>
                  {symbol}
                </span>
              ))}
            </div>
          </div> */}
          
          {/* Mobile Tech Symbols */}
          <div className="flex lg:hidden items-center space-x-2 ml-2">
            {techSymbols.slice(0, 2).map((symbol, idx) => (
              <span key={idx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                {symbol}
              </span>
            ))}
          </div>
        </a>

        {/* Responsive Navigation */}
        <nav className="hidden lg:flex space-x-4 sm:space-x-6 md:space-x-8 text-sm sm:text-base md:text-lg font-medium relative">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative group">
              <a
                href={`#${item.toLowerCase()}`}
                className="relative transition-all duration-300 hover:text-[#64ffda] flex items-center space-x-1 sm:space-x-2"
                onMouseEnter={() => setHoveredNavItem(item)}
                onMouseLeave={() => setHoveredNavItem(null)}
              >
                {/* AI Icon - Responsive */}
                {aiMode && (
                  <div className="relative">
                    {React.createElement(aiIcons[idx % aiIcons.length], {
                      className: `text-xs sm:text-sm animate-popScale ${
                        hoveredNavItem === item ? 'scale-125' : ''
                      }`,
                      style: { animationDelay: `${idx * 0.1}s` }
                    })}
                    {hoveredNavItem === item && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-full blur-sm animate-pulse"></div>
                    )}
                  </div>
                )}
                <span className="relative z-10">{item}</span>
              </a>
              
              {/* Enhanced Underline - Responsive */}
              <div className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#64ffda] to-purple-500 transition-all duration-500 group-hover:w-full"></div>
              
              {/* Glow Effect - Responsive */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              {/* Data Points - Responsive */}
              {aiMode && (
                <div className="absolute -top-2 -right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse opacity-75"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Responsive Search & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* AI Mode Toggle - Responsive */}
          <button
            onClick={() => setAiMode(!aiMode)}
            className={`relative p-1.5 sm:p-2 rounded-full transition-all duration-300 ${
              aiMode 
                ? 'bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/50' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-[#64ffda]'
            }`}
            title="Toggle AI Mode"
          >
            <FaBrain className={`w-3 h-3 sm:w-4 sm:h-4 ${aiMode ? 'animate-pulse' : ''}`} />
            {aiMode && (
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </button>
          
          {/* Responsive Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative block sm:block"
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-full blur-md opacity-0 transition-opacity duration-300 ${
                isSearchFocused ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <input
                type="text"
                placeholder={isTablet ? "AI Search..." : isSearchFocused ? "AI Search..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="relative bg-white/10 border border-gray-600 rounded-full py-1.5 sm:py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] focus:border-[#64ffda] transition-all duration-300 w-24 sm:w-32 md:w-40 lg:w-48"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {aiMode && (
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                )}
                <button
                  type="submit"
                  className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300"
                >
                  <FaSearch className={`w-3 h-3 sm:w-4 sm:h-4 ${isSearchFocused ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>
          </form>
          
          {/* Responsive Language Switcher */}
          <div className="hidden sm:flex space-x-2 ml-2 sm:ml-4">
            <button
              className={`relative px-2 sm:px-3 py-1.5 rounded-full border transition-all duration-300 text-xs sm:text-sm font-medium ${
                i18n.language === "en"
                  ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
              }`}
              onClick={() => i18n.changeLanguage("en")}
            >
              <span className="relative z-10">EN</span>
              {i18n.language === "en" && aiMode && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
              )}
            </button>
            <button
              className={`relative px-2 sm:px-3 py-1.5 rounded-full border transition-all duration-300 text-xs sm:text-sm font-medium ${
                i18n.language === "ja"
                  ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
              }`}
              onClick={() => i18n.changeLanguage("ja")}
            >
              <span className="relative z-10">JA</span>
              {i18n.language === "ja" && aiMode && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
              )}
            </button>
          </div>
          
          {/* Mobile Language Switcher */}
          <div className="flex sm:hidden space-x-1">
            <button
              className={`relative px-2 py-1 rounded-full border transition-all duration-300 text-xs font-medium ${
                i18n.language === "en"
                  ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
              }`}
              onClick={() => i18n.changeLanguage("en")}
            >
              <span className="relative z-10">EN</span>
            </button>
            <button
              className={`relative px-2 py-1 rounded-full border transition-all duration-300 text-xs font-medium ${
                i18n.language === "ja"
                  ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
              }`}
              onClick={() => i18n.changeLanguage("ja")}
            >
              <span className="relative z-10">JA</span>
            </button>
          </div>

          {/* Responsive Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative">
              {isMobileMenuOpen ? (
                <div className="relative">
                  <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 text-[#64ffda] transition-transform duration-300" />
                  {aiMode && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="flex flex-col space-y-1">
                    <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 group-hover:bg-[#64ffda]"></div>
                    <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 group-hover:bg-[#64ffda]"></div>
                    <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 group-hover:bg-[#64ffda]"></div>
                  </div>
                  {aiMode && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Responsive AI Enhanced Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur-lg text-white shadow-xl transform transition-all duration-500 origin-top relative overflow-hidden ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {/* AI Background for Mobile Menu */}
        {aiMode && isMobileMenuOpen && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#64ffda] rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center py-4 sm:py-6 space-y-3 sm:space-y-4 text-base sm:text-lg font-medium">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative group w-full text-center">
              <a
                href={`#${item.toLowerCase()}`}
                className="w-full py-2 sm:py-3 hover:text-[#64ffda] transition-all duration-300 flex items-center justify-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* Mobile AI Icon */}
                {aiMode && (
                  <div className="relative">
                    {React.createElement(aiIcons[idx % aiIcons.length], {
                      className: "text-sm animate-popScale"
                    })}
                    {hoveredNavItem === item && (
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 rounded-full blur-sm animate-pulse"></div>
                    )}
                  </div>
                )}
                <span>{item}</span>
              </a>
              
              {/* Mobile Menu Underline */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#64ffda] to-purple-500 transition-all duration-300 group-hover:w-1/2"></div>
              
              {/* Mobile Status Indicator */}
              {aiMode && (
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-75"></div>
              )}
            </div>
          ))}
          
          {/* Mobile Tech Symbols */}
          {aiMode && (
            <div className="flex flex-wrap justify-center space-x-2 pt-4 border-t border-gray-700">
              {techSymbols.map((symbol, idx) => (
                <span key={idx} className="text-xs text-purple-400 font-mono animate-pulse opacity-50" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {symbol}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
