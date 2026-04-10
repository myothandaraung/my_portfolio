import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaCode,
  FaRobot,
  FaBrain,
  FaNetworkWired,
} from "react-icons/fa";
import profileImage from "../assets/profile.png";

function HeroSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  const aiIcons = [FaCode, FaRobot, FaBrain, FaNetworkWired];

  return (
    <section
      id="hero-section"
      className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-20 min-h-[85vh] md:min-h-[95vh] bg-gradient-to-br from-[#0a0e27] via-[#0d1c3a] to-[#1a1f3a] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}></div>
        </div>
        
        {/* Floating AI Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#64ffda] rounded-full animate-pulseSlow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: '0 0 10px #64ffda'
            }}
          ></div>
        ))}
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute -top-32 -left-32 w-80 h-80 bg-[#64ffda] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulseSlow"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulseSlow"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulseSlow"
          style={{
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        ></div>
      </div>

      {/* Left Content (Text and CTA) */}
      <div className="relative z-10 w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
        
        {/* Elegant Pre-title */}
        <div className="overflow-hidden mb-4">
          <p className="text-[#64ffda] uppercase tracking-[0.4em] text-xs md:text-sm font-medium animate-revealUp">
            {t("hero.hello")}
          </p>
        </div>

        {/* Main Name/Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
          Myo Thandar <span className="font-serif italic text-[#64ffda]">Aung</span>
        </h1>

        {/* Refined Divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-[#64ffda] to-transparent mb-8" />

        {/* Elegant Tagline */}
        <p className="text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10 tracking-wide">
          {t("hero.description")}
        </p>

        {/* Sophisticated CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-12 py-4 overflow-hidden bg-transparent border border-[#64ffda]/30 transition-all duration-500 hover:border-[#64ffda]"
          >
            {/* Hover Fill Effect */}
            <div className="absolute inset-0 w-0 bg-[#64ffda] transition-all duration-500 ease-out group-hover:w-full" />
            <span className="relative text-[#64ffda] group-hover:text-[#0a0e27] uppercase tracking-[0.2em] text-sm font-semibold transition-colors duration-500">
              {t("hero.contactButton")}
            </span>
          </button>
          
          <div className="flex space-x-6">
            {[<FaFacebookF />, <FaLinkedinIn />, <FaWhatsapp />].map((icon, i) => (
              <a key={i} href="#" className="text-gray-500 hover:text-[#64ffda] transition-colors duration-300 text-lg">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content - The "Art Piece" Profile */}
      <div className="relative mt-16 md:mt-0 w-full md:w-2/5 flex justify-center items-center">
        
        {/* Minimalist Framing */}
        <div className="relative p-4 md:p-8">
          {/* Subtle Rotating Border */}
          <div className="absolute inset-0 border-[1px] border-[#64ffda]/20 rounded-full scale-110" />
          
          {/* Main Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <div className="absolute inset-0 bg-[#0a0e27] rounded-full overflow-hidden border border-white/5 shadow-2xl">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
              />
            </div>
            
            {/* Artistic Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#64ffda]/40" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#64ffda]/40" />
          </div>
        </div>
      </div>

      {/* Right Content (Profile Image & Social Icons inside bounds) */}
      
    </section>
  );
}

export default HeroSection;