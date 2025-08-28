import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategorySlider from "./components/CategorySlider";
import WhoAmISection from "./components/WhoAmISection";
import MySkillsSection from "./components/MySkillsSection";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { FaArrowUp } from "react-icons/fa";
import "./App.css";

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white font-sans relative">
      <div className="container mx-auto px-4 py-6 md:px-8 lg:px-30">
        <Header/>
        <HeroSection />
        <CategorySlider />
        <div className="px-4 md:px-8 lg:px-12">
          <WhoAmISection />
          <MySkillsSection />
          <Skills />
          <Projects />
          <ContactSection />
        </div>
        <Footer />

        {/* Back-to-Top Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#64ffda] text-[#0a192f] p-3 rounded-full shadow-lg hover:bg-[#64ffda]/80 hover:scale-110 transition-all duration-300 z-50"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
