// src/components/Footer.jsx
import React from "react";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const socialLinks = [
    { icon: <FaLinkedinIn />, link: "#" },
    { icon: <FaGithub />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
  ];

  return (
    <footer className="w-full relative bg-gradient-to-t text-gray-400 py-12 px-6 text-center overflow-hidden">
      {/* Top Neon Line */}

      <p className="text-gray-400 mb-4 text-sm md:text-base">
        &copy; {t("footer.text", { year: new Date().getFullYear() })}
      </p>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            className="relative group w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#64ffda] transition-all duration-300"
          >
            {/* Animated glow background */}
            <span className="absolute w-full h-full rounded-full bg-[#64ffda]/30 opacity-0 group-hover:opacity-50 blur-lg animate-pulseSlow"></span>
            <span className="relative text-2xl">{social.icon}</span>
          </a>
        ))}
      </div>

      <p className="text-gray-500 text-xs md:text-sm">
        {t("footer.builtWith")}
      </p>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }

        @keyframes slideGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-pulseSlow { animation: pulseSlow 3s ease-in-out infinite; }
        .animate-slideGradient {
          animation: slideGradient 4s linear infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
