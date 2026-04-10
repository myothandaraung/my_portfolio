import React from "react";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PremiumSkillsBar() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a192f] to-[#112240] overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/5 via-transparent to-purple-500/5" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500">
            My Skills
          </h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest uppercase">
            Technical Expertise
          </p>
        </div>

        {/* Skills */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {skills.map((skill, i) => (
            <motion.div key={i} variants={item} className="group">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300 font-medium tracking-wide">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-400">
                  {skill.level}%
                </span>
              </div>

              {/* Bar */}
              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden backdrop-blur-md border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-gradient-to-r from-[#64ffda] via-[#2dd9c6] to-[#52e0c4] relative"
                >
                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shine_1.5s]"></div>
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 bg-white/10 blur-sm opacity-50"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <Stat label="Total" value={skills.length} />
          <Stat label="Expert" value={skills.filter(s => s.level >= 90).length} />
          <Stat label="Advanced" value={skills.filter(s => s.level >= 75).length} />
          <Stat
            label="Average"
            value={`${Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}%`}
          />
        </motion.div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-white mb-1">
        {value}
      </div>
      <div className="text-xs text-gray-400 tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}
