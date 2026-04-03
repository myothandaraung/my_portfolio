import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer } from "react-icons/fa";
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

  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite];

  const navItems = t("nav", { returnObjects: true }) || ["About", "Skills", "Projects", "Portfolio", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Neural & Matrix effects logic remains the same (removed for brevity, keep your original useEffects here)
  useEffect(() => { /* Your Neural Activity Logic */ }, []);
  useEffect(() => { /* Your Matrix Rain Logic */ }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Clear previous highlights
    clearHighlights();

    // Search in specific sections
    const sections = [
      'hero-section',
      'who-am-i-section', 
      'my-skills-section',
      'skills',
      'projects',
      'contact'
    ];

    let found = false;
    let firstMatch = null;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const textContent = section.textContent || section.innerText;
        const regex = new RegExp(searchQuery, 'gi');
        
        if (regex.test(textContent)) {
          found = true;
          if (!firstMatch) {
            firstMatch = sectionId;
          }
          
          // Highlight matches
          highlightText(section, searchQuery);
        }
      }
    });

    if (found && firstMatch) {
      // Scroll to first match
      const element = document.getElementById(firstMatch);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const highlightText = (element, query) => {
    if (!element || !query) return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip script and style elements
          const parent = node.parentElement;
          if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }

    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      const regex = new RegExp(`(${query})`, 'gi');
      
      if (regex.test(text)) {
        const span = document.createElement('span');
        span.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        textNode.parentNode.replaceChild(span, textNode);
      }
    });
  };

  const clearHighlights = () => {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
  };

  // Clear highlights when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      clearHighlights();
    }
  }, [searchQuery]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a192f]/95 shadow-2xl backdrop-blur-lg py-1"
          : "bg-transparent py-3 md:py-5"
      }`}
    >
      {/* AI Background Layer - Set to pointer-events-none so it doesn't block clicks */}
      {aiMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute inset-0 opacity-10">
            {matrixRain.map((drop, i) => (
              <div key={i} className="absolute text-[#64ffda] font-mono text-[10px] animate-fall"
                style={{ left: `${drop.x}%`, top: `-10%`, animationDuration: `${drop.speed}s` }}>
                {drop.char}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          
          {/* LEFT: Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="relative group flex items-center">
              <div className="relative w-10 h-10 md:w-14 md:h-14">
                {/* Quantum Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda] via-purple-500 to-pink-500 p-[1px] animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-[#0a192f]"></div>
                </div>
                {/* Logo Image */}
                <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-[#0a192f] group-hover:scale-105 transition-transform">
                  <img src={myLogo} alt="Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                </div>
              </div>
            </a>
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 text-sm xl:text-base font-medium">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="group relative text-gray-300 hover:text-[#64ffda] transition-colors py-2"
                onMouseEnter={() => setHoveredNavItem(item)}
                onMouseLeave={() => setHoveredNavItem(null)}
              >
                <div className="flex items-center space-x-2">
                  {aiMode && React.createElement(aiIcons[idx % aiIcons.length], { className: "text-xs opacity-70 group-hover:opacity-100" })}
                  <span>{item}</span>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#64ffda] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* RIGHT: Controls (Search, AI Toggle, Lang, Mobile Menu) */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-5">
            
            {/* Search Bar - Responsive width */}
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                type="text"
                placeholder={isSearchFocused ? "Neural Search..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`bg-white/5 border border-white/10 rounded-full py-1.5 px-4 text-xs transition-all duration-500 focus:w-40 md:focus:w-64 focus:bg-white/10 focus:border-[#64ffda] outline-none text-white ${
                  isSearchFocused ? "w-32 md:w-64" : "w-20 md:w-40"
                }`}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] sm:text-xs pointer-events-none" />
            </form>

            {/* AI Toggle */}
            <button
              onClick={() => setAiMode(!aiMode)}
              className={`p-2 rounded-full transition-all border ${
                aiMode ? "bg-[#64ffda]/20 border-[#64ffda] text-[#64ffda]" : "border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <FaBrain className={`w-3 h-3 md:w-4 md:h-4 ${aiMode ? "animate-pulse" : ""}`} />
            </button>

            {/* Language Switcher - Desktop Only */}
            <div className="hidden sm:flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              {['en', 'ja'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all ${
                    i18n.language === lang ? "bg-[#64ffda] text-[#0a192f]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-[#64ffda] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : (
                <div className="space-y-1.5">
                  <span className="block w-6 h-0.5 bg-current"></span>
                  <span className="block w-4 h-0.5 bg-current ml-auto"></span>
                  <span className="block w-6 h-0.5 bg-current"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0a192f] border-t border-white/5 transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-gray-300 hover:text-[#64ffda]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          {/* Mobile Language Switcher (Inside Menu) */}
          <div className="flex sm:hidden space-x-4 border-t border-white/10 pt-6 w-full justify-center">
             <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'text-[#64ffda]' : 'text-gray-400'}>EN</button>
             <span className="text-white/20">|</span>
             <button onClick={() => i18n.changeLanguage('ja')} className={i18n.language === 'ja' ? 'text-[#64ffda]' : 'text-gray-400'}>JA</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;