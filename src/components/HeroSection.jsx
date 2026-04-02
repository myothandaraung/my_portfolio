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
      <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-7/12 lg:w-2/3 space-y-6">
        {/* Greeting with AI Icon */}
        <div className="flex items-center space-x-3 text-lg md:text-xl text-gray-300 tracking-wide animate-slideInLeft delay-100">
          <div className="flex space-x-2">
            {aiIcons.map((Icon, idx) => (
              <Icon 
                key={idx} 
                className="text-[#64ffda] animate-popScale"
                style={{ animationDelay: `${idx * 0.2}s` }}
              />
            ))}
          </div>
          <p>
            {t("hero.hello")}{" "}
            <span className={`font-bold text-2xl md:text-3xl ${textGlitch ? 'animate-glitch' : 'animate-gradientSlide'}`}>
              Myo Thandar Aung
            </span>
          </p>
        </div>

        {/* Main Title with Enhanced Effects */}
        <h1 className="relative text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-xl animate-slideInUp delay-300">
          <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] via-purple-500 to-[#64ffda] bg-clip-text text-transparent opacity-30 blur-sm animate-pulseSlow"></div>
          <span className="relative wave">
            {t("hero.title")
              .split("")
              .map((char, idx) => (
                <span 
                  key={idx} 
                  className="inline-block hover:text-[#64ffda] transition-colors duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
          </span>
        </h1>

        {/* Tagline with AI Enhancement */}
        <div className="relative group w-full max-w-lg">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
          <p
            className="relative text-lg md:text-xl font-light italic 
                      text-gray-300 leading-relaxed 
                      border-l-4 border-[#64ffda] pl-4 
                      text-left 
                      animate-fadeIn delay-800 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4"
          >
            <span className="text-[#64ffda] font-mono">// </span>
            {t("hero.tagline")}
          </p>
        </div>

        {/* Description with Typewriter Effect */}
        <div className="relative max-w-full md:max-w-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 blur-xl"></div>
          <p
            className="relative text-gray-300 text-base md:text-lg lg:text-xl 
               leading-relaxed tracking-wide font-light
               opacity-0 translate-y-4 
               animate-[fadeSlideUp_1s_ease-out_forwards_0.6s]
               bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 border border-[#64ffda]/20"
          >
            <span className="text-[#64ffda] animate-pulse">▍</span>
            {" "}
            {t("hero.description")}
          </p>
        </div>

        {/* Enhanced Contact Button */}
        <div className="relative group mt-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulseSlow"></div>
          <button
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative px-10 py-3 text-lg rounded-full font-medium border border-[#64ffda] text-[#64ffda] bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:bg-[#64ffda] hover:text-[#0a192f] shadow-lg hover:shadow-[#64ffda]/50 hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <FaCode className="animate-spin-slow" />
              <span>{t("hero.contactButton")}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Right Content (Profile Image & Social Icons inside bounds) */}
      <div className="relative mt-12 md:mt-0 flex justify-center items-center w-full md:w-5/12 lg:w-1/3 z-10">
        
        {/* Floating Code Elements */}
        <div className="absolute top-[-20px] left-[-20px] animate-float-slow">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-[#64ffda]/30">
            <code className="text-[#64ffda] text-xs font-mono">&lt;/AI&gt;</code>
          </div>
        </div>
        <div className="absolute bottom-[-20px] right-[20px] animate-float-slow" style={{ animationDelay: '1s' }}>
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 border border-purple-500/30">
            <code className="text-purple-400 text-xs font-mono">{`{}`}</code>
          </div>
        </div>

        {/* Profile Image with Advanced Effects */}
        <div className="relative group">
          {/* Holographic Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#64ffda] via-purple-500 to-[#64ffda] p-[2px] animate-rotate-slow">
            <div className="w-full h-full rounded-full bg-gray-900"></div>
          </div>
          
          {/* Glowing Border and Mask */}
          <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full p-[6px] bg-gradient-to-tr from-[#64ffda] to-gray-400 shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
              <img
                src={profileImage}
                alt="Myo Thandar Aung"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/340?text=Profile+Image'; }} 
              />
            </div>
          </div>
          
          {/* AI Particles Around Image */}
          {isHovered && [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#64ffda] rounded-full animate-popScale"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateX(180px)`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Enhanced Social Icons pinned tightly inside the section bounds */}
        <div className="absolute -right-4 md:right-[-30px] top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
          {[
            { icon: <FaFacebookF />, link: "#", label: "Facebook" },
            { icon: <FaTwitter />, link: "#", label: "Twitter" },
            { icon: <FaLinkedinIn />, link: "#", label: "LinkedIn" },
            { icon: <FaWhatsapp />, link: "#", label: "WhatsApp" },
          ].map((social, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
              <a
                href={social.link}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-[#64ffda] hover:text-[#0a192f] transition-all duration-300 border border-[#64ffda]/30 hover:border-[#64ffda] group-hover:scale-110"
                title={social.label}
              >
                {social.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;