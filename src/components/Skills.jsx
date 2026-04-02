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

        <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-4 md:space-y-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="group">
              {/* Responsive Skill Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">{skill.name}</span>
                  {/* Skill Level Badge */}
                  <div className="hidden sm:inline-flex">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      skill.level >= 75 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      skill.level >= 60 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {skill.level >= 90 ? 'Expert' :
                       skill.level >= 75 ? 'Advanced' :
                       skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm sm:text-base">{progress[idx]}%</span>
                  {/* Mobile Skill Level Badge */}
                  <div className="sm:hidden">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      skill.level >= 75 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      skill.level >= 60 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {skill.level >= 90 ? 'Expert' :
                       skill.level >= 75 ? 'Adv' :
                       skill.level >= 60 ? 'Int' : 'Beg'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Responsive Progress Bar */}
              <div className="relative w-full h-4 sm:h-6 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#64ffda] via-[#2dd9c6] to-[#52e0c4] relative transition-all duration-1500 ease-out"
                  style={{
                    width: `${progress[idx]}%`,
                  }}
                >
                  {/* Enhanced Glow and shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 animate-glow"></div>
                  
                  {/* Progress Marker */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-[#64ffda]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Animated Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
                        style={{
                          top: '50%',
                          left: `${20 + i * 25}%`,
                          transform: 'translateY(-50%)',
                          animationDelay: `${i * 0.3}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Progress Milestones */}
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                  {[25, 50, 75].map((milestone) => (
                    <div
                      key={milestone}
                      className="relative"
                      style={{ left: `${milestone}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-full bg-gray-700 opacity-50"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-600 rounded-full"></div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-500 hidden sm:block">
                        {milestone}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skill Description on Mobile */}
              <div className="sm:hidden mt-2 p-2 bg-gray-800/30 rounded-lg">
                <p className="text-xs text-gray-400">
                  {skill.level >= 90 ? 'Expert level proficiency with extensive experience' :
                   skill.level >= 75 ? 'Advanced level with strong practical skills' :
                   skill.level >= 60 ? 'Intermediate level with good understanding' : 
                   'Beginner level with basic knowledge'}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Responsive Stats Summary */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-[#64ffda] mb-4 text-center">Skills Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {skills.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Total Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
                {skills.filter(s => s.level >= 90).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Expert Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">
                {skills.filter(s => s.level >= 75).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Advanced+</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#64ffda] mb-1">
                {Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Average Level</div>
            </div>
          </div>
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
