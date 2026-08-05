import React from "react";
import { motion as Motion } from "framer-motion";
import { Code2, Database, Layers3, Wrench } from "lucide-react";
const groups = [
  { icon: Code2, title: "Frontend", text: "React, Vue, JavaScript, HTML, CSS, Tailwind CSS, SCSS" },
  { icon: Database, title: "Backend", text: "PHP, Laravel, Node.js, MySQL, PostgreSQL, REST APIs" },
  { icon: Layers3, title: "Product", text: "Responsive interfaces, dashboards, design systems, prototyping" },
  { icon: Wrench, title: "Workflow", text: "Git, Docker, browser testing, performance, team delivery" },
];
export default function Skills() { return <section id="skills" className="skills section-space"><div className="section-wrap"><div className="section-label"><span>02</span> Expertise</div><div className="skills-heading"><h2>A practical toolkit for building <em>end-to-end.</em></h2><p>I work comfortably across the stack, with a focus on maintainable systems, polished interfaces, and reliable delivery.</p></div><div className="skill-grid">{groups.map(({ icon: Icon, title, text }, i) => <Motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }} viewport={{ once: true }}><span className="skill-number">0{i + 1}</span>{React.createElement(Icon, { size: 25, strokeWidth: 1.5 })}<h3>{title}</h3><p>{text}</p></Motion.article>)}</div></div></section>; }



