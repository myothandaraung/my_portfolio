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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#0a192f]/90 shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)] backdrop-blur-md py-3"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* LEFT: Elegant Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="relative flex items-center group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Thin Geometric Frame - Replaces the thick gradient ring */}
                <div className="absolute inset-0 border border-[#64ffda]/30 rotate-45 group-hover:rotate-90 transition-transform duration-1000 ease-in-out"></div>
                <img src={myLogo} alt="Logo" className="w-6 h-6 object-contain relative z-10" />
              </div>
            </a>
          </div>

          {/* CENTER: Editorial Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="group relative text-[11px] uppercase tracking-[0.3em] font-medium text-gray-300 hover:text-[#64ffda] transition-colors duration-500"
              >
                <span className="relative z-10">{item}</span>
                {/* Ultra-thin animated underline */}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#64ffda] transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* RIGHT: Controls */}
          <div className="flex items-center space-x-8">
            
            {/* Minimalist Search - Bottom Border only */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`bg-transparent border-b border-white/10 py-1 text-[10px] tracking-[0.2em] transition-all duration-700 outline-none text-white focus:border-[#64ffda] ${
                  isSearchFocused ? "w-48" : "w-16 opacity-60"
                }`}
              />
              <FaSearch className={`ml-2 text-[10px] transition-colors ${isSearchFocused ? "text-[#64ffda]" : "text-gray-400"}`} />
            </form>

            {/* AI Toggle - Sophisticated Button */}
            <button
              onClick={() => setAiMode(!aiMode)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
                aiMode 
                  ? "border-[#64ffda] text-[#64ffda] shadow-[0_0_15px_rgba(100,255,218,0.2)]" 
                  : "border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              <FaBrain className={`w-3.5 h-3.5 ${aiMode ? "animate-pulse" : ""}`} />
            </button>

            {/* Language Switcher - Vertical Separator */}
            <div className="hidden sm:flex items-center space-x-3 text-[10px] tracking-widest font-bold">
              {['en', 'ja'].map((lang, i) => (
                <React.Fragment key={lang}>
                  <button
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`transition-all duration-300 ${
                      i18n.language === lang ? "text-[#64ffda]" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                  {i === 0 && <span className="text-white/10 h-3 w-[1px] bg-white/10"></span>}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Toggle - Minimalist Bars */}
            <button
              className="lg:hidden flex flex-col space-y-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block h-[1px] bg-[#64ffda] transition-all duration-500 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`}></span>
              <span className={`block h-[1px] bg-[#64ffda] transition-all duration-500 ${isMobileMenuOpen ? "opacity-0" : "w-4 ml-auto"}`}></span>
              <span className={`block h-[1px] bg-[#64ffda] transition-all duration-500 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Full Screen Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a192f] z-[-1] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-10 text-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="text-2xl uppercase tracking-[0.4em] font-light text-gray-300 hover:text-[#64ffda] transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex justify-center space-x-8 pt-12 border-t border-white/5">
             <button onClick={() => i18n.changeLanguage('en')} className={`text-[10px] tracking-[0.2em] ${i18n.language === 'en' ? 'text-[#64ffda]' : 'text-gray-500'}`}>ENGLISH</button>
             <button onClick={() => i18n.changeLanguage('ja')} className={`text-[10px] tracking-[0.2em] ${i18n.language === 'ja' ? 'text-[#64ffda]' : 'text-gray-500'}`}>JAPANESE</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;