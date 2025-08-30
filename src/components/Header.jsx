import React, { useState, useEffect,useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import myLogo from "../../public/images/logo1.svg";
import "../App.css";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const matchesRef = useRef([]);
  const currentIndexRef = useRef(-1);

  const navItems = t("nav", { returnObjects: true }) || ["About", "Skills", "Projects", "Portfolio", "Contact"];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      // remove all highlights
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      // reset matches and current index
      matchesRef.current = [];
      currentIndexRef.current = -1;
    }
  }, [searchQuery]);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // remove all highlights
      document.querySelectorAll("mark.search-highlight").forEach((mark) => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
      
      // clear active highlights as well
      matchesRef.current = [];
      currentIndexRef.current = -1;
    }
  }, [searchQuery]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a192f]/95 shadow-lg backdrop-blur-lg"
          : "bg-[#0a192f]/50 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto text-white">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img
            src={myLogo}
            alt="Logo"
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] drop-shadow-[0_0_10px_rgba(100,255,218,0.7)] hover:scale-110 hover:rotate-3 transition-transform duration-500"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 text-lg font-medium relative">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="relative group transition-colors duration-300 hover:text-[#64ffda]"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#64ffda] transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Search + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden sm:block"
          >
            <input
              type="text"
              placeholder="Search section..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearchSubmit(e.target.value); // call search on each change
              }}
              className="bg-white/10 border border-gray-600 rounded-full py-1.5 pl-4 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] focus:border-[#64ffda] transition-all duration-300"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#64ffda]">
              <FaSearch />
            </button>
          </form>
          <div className="flex space-x-3 ml-4">
            <button
              className={`px-4 py-1.5 rounded-full border transition-all duration-300 
                ${
                  i18n.language === "en"
                    ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                    : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
                }`}
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`px-4 py-1.5 rounded-full border transition-all duration-300 
                ${
                  i18n.language === "ja"
                    ? "bg-[#64ffda] text-[#0a192f] border-[#64ffda] shadow-md shadow-[#64ffda]/40"
                    : "bg-transparent text-gray-300 border-gray-600 hover:border-[#64ffda] hover:text-[#64ffda]"
                }`}
              onClick={() => i18n.changeLanguage("ja")}
            >
              JA
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6 text-[#64ffda] transition-transform duration-300 rotate-0" />
            ) : (
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a192f]/95 backdrop-blur-lg text-white shadow-xl transform transition-all duration-500 origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-6 text-lg font-medium">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="w-full text-center py-2 hover:text-[#64ffda] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
