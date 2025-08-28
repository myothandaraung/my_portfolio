// src/components/AboutSection.js
import React from "react";
import { useTranslation } from "react-i18next";
function WhoAmISection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#0a192f] to-[#112240] text-white overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#64ffda]/20 rounded-full blur-3xl animate-pulseSlow"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-[#2dd9c6]/10 rounded-full blur-3xl animate-pulseSlow"></div>

      {/* Heading */}
      <div className="mb-12 text-center md:text-left relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#2dd9c6]">
          {t("about.title")}
        </h2>
        <div className="w-32 h-[3px] bg-gradient-to-r from-[#64ffda] to-[#2dd9c6] rounded-full mx-auto md:mx-0 shadow-md"></div>
      </div>

      {/* About Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12 max-w-4xl mx-auto">
        {/* Icon / accent */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#64ffda] to-[#2dd9c6] flex items-center justify-center text-[#0a192f] font-bold text-lg shadow-lg animate-pulseSlow">
            ?
          </div>
        </div>

        {/* Text */}
        <div
          className="text-gray-300 text-lg md:text-xl leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{
            __html: `
              <p>${t("about.intro")}</p>
              <p>${t("about.details")}</p>
              <p>${t("about.experience")}</p>
            `
          }}
        />
      </div>
    </section>
  );
}

export default WhoAmISection;
