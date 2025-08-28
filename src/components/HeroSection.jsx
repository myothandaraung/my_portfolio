import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import profileImage from "../assets/profile.jpg";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section id="hero-section" className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-20 min-h-[85vh] md:min-h-[95vh] bg-gradient-to-br from-[#0a192f] via-[#0d1c3a] to-[#112240] overflow-hidden" >
      {/* Decorative Background Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#64ffda] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulseSlow"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#64ffda] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulseSlow"></div>

      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 md:w-3/5 lg:w-2/3 space-y-6">
        {/* Greeting */}
        <p className="text-lg md:text-xl text-gray-300 tracking-wide animate-slideInLeft delay-100">
          {t("hero.hello")}{" "}
          <span className="font-bold text-[#64ffda] text-2xl md:text-3xl animate-gradientSlide">
            Myo Thandar Aung
          </span>
        </p>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-xl animate-slideInUp delay-300 wave">
          {t("hero.title").split("").map((char, idx) => ( <span key={idx}>{char}</span> ))}
        </h1>

        {/* Tagline */}
        <p
          className="relative text-lg md:text-xl font-light italic 
                    text-gray-300 leading-relaxed 
                    border-l-4 border-[#64ffda] pl-4 
                    max-w-full md:max-w-lg text-center md:text-left 
                    animate-fadeIn delay-800"
        >
          {t("hero.tagline")}
        </p>

        {/* Description */}
        <p
  className="text-gray-300 text-base md:text-lg lg:text-xl 
             max-w-xs md:max-w-md lg:max-w-lg 
             leading-relaxed tracking-wide font-light
             opacity-0 translate-y-4 
             animate-[fadeSlideUp_1s_ease-out_forwards_0.6s]"
>
  {t("hero.description")}
</p>


        {/* Contact Button */}
        <button className="mt-4 px-10 py-3 text-lg rounded-full font-medium border border-[#64ffda] text-[#64ffda] transition-all duration-300 hover:bg-[#64ffda] hover:text-[#0a192f] shadow-lg">
          {t("hero.contactButton")}
        </button>
      </div>

      {/* Right Content */}
      <div className="relative mt-12 md:mt-0 flex justify-center md:justify-end md:w-1/2">
        {/* Profile Image */}
        <div className="relative rounded-full p-[6px] bg-gradient-to-tr from-[#64ffda] to-gray-400 shadow-xl hover:scale-105 transition-transform duration-500">
          <img
            src={profileImage}
            alt="Myo Thandar Aung"
            className="w-[260px] md:w-[320px] lg:w-[360px] h-[260px] md:h-[320px] lg:h-[360px] object-cover rounded-full grayscale hover:grayscale-0 transition duration-500"
          />
        </div>

        {/* Social Icons */}
        <div className="absolute right-[-70px] top-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
          {[
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaLinkedinIn />, link: "#" },
            { icon: <FaWhatsapp />, link: "#" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;