import React from "react";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });
    

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#112240]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-tr from-[#0d1c3a] to-[#112240] border border-[#64ffda]/20"
            >
              {/* Project Image */}
              <div className="w-full h-64 md:h-72 lg:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#64ffda] mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">
                  {project.company} {project.company && "|"} {project.dates}
                </p>
                <p className="text-gray-300 mb-3 text-sm">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#64ffda] to-[#2dd9c6] text-[#0a192f] hover:from-[#52e0c4] hover:to-[#64ffda] transition-all duration-300 cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
