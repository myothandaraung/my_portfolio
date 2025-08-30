import React, { useEffect, useState } from "react";
import '../App.css'

const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "ReactJS", level: 80 },
  { name: "VueJS", level: 75 },
  { name: "PHP", level: 85 },
  { name: "Laravel", level: 80 },
  { name: "MySQL", level: 75 },
  { name: "Tailwind CSS", level: 90 },
];

const Skills = () => {
  const [progress, setProgress] = useState(skills.map(() => 0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(skills.map(skill => skill.level));
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-[#0a192f] to-[#112240]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          My Skills
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-medium">{skill.name}</span>
                <span className="text-gray-400">{progress[idx]}%</span>
              </div>
              <div className="w-full h-6 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                <div
                  className="h-6 rounded-full bg-gradient-to-r from-[#64ffda] via-[#2dd9c6] to-[#52e0c4] relative"
                  style={{
                    width: `${progress[idx]}%`,
                    transition: "width 1.5s ease-in-out",
                  }}
                >
                  {/* Glow and shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 animate-glow"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes glow {
          0% { transform: translateX(-100%); opacity: 0.2; }
          50% { transform: translateX(50%); opacity: 0.6; }
          100% { transform: translateX(100%); opacity: 0.2; }
        }
        .animate-glow {
          animation: glow 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
