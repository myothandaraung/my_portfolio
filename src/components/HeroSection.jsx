import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
    <motion.section
      id="hero-section"
      className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-20 min-h-[85vh] md:min-h-[95vh] bg-gradient-to-br from-[#0a0e27] via-[#0d1c3a] to-[#1a1f3a] overflow-hidden"
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* AI Neural Network Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity }}
      >
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
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#64ffda] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px #64ffda'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          ></motion.div>
        ))}
        
        {/* Dynamic Gradient Orbs */}
        <motion.div 
          className="absolute -top-32 -left-32 w-80 h-80 bg-[#64ffda] rounded-full mix-blend-screen filter blur-3xl opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`
          }}
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </motion.div>

      {/* Left Content (Text and CTA) */}
      <motion.div 
        className="relative z-10 w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Elegant Pre-title */}
        <motion.div className="overflow-hidden mb-4">
          <motion.p 
            className="text-[#64ffda] uppercase tracking-[0.4em] text-xs md:text-sm font-medium"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t("hero.hello")}
          </motion.p>
        </motion.div>

        {/* Main Name/Title */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Myo Thandar <span className="font-serif italic text-[#64ffda]">Aung</span>
        </motion.h1>

        {/* Refined Divider */}
        <motion.div 
          className="w-24 h-[1px] bg-gradient-to-r from-[#64ffda] to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Elegant Tagline */}
        <motion.p 
          className="text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10 tracking-wide"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {t("hero.description")}
        </motion.p>

        {/* Sophisticated CTA */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-12 py-4 overflow-hidden bg-transparent border border-[#64ffda]/30 transition-all duration-500 hover:border-[#64ffda]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Hover Fill Effect */}
            <motion.div 
              className="absolute inset-0 bg-[#64ffda]"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative text-[#64ffda] group-hover:text-[#0a0e27] uppercase tracking-[0.2em] text-sm font-semibold transition-colors duration-500">
              {t("hero.contactButton")}
            </span>
          </motion.button>
          
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[<FaFacebookF />, <FaLinkedinIn />, <FaWhatsapp />].map((icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="text-gray-500 hover:text-[#64ffda] transition-colors duration-300 text-lg"
                whileHover={{ scale: 1.2, color: "#64ffda" }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Content - The "Art Piece" Profile */}
      <motion.div 
        className="relative mt-16 md:mt-0 w-full md:w-2/5 flex justify-center items-center"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Minimalist Framing */}
        <motion.div 
          className="relative p-4 md:p-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Rotating Border */}
          <motion.div 
            className="absolute inset-0 border-[1px] border-[#64ffda]/20 rounded-full scale-110"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Main Image Container */}
          <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-[#0a0e27] rounded-full overflow-hidden border border-white/5 shadow-2xl">
              <motion.img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 2 }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
              />
            </div>
            
            {/* Artistic Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#64ffda]/40"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#64ffda]/40"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;