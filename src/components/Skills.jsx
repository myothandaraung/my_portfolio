import React from "react";
import { motion as Motion } from "framer-motion";
import { Code2, Database, Layers3, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

const groups = (t) => [
  { icon: Code2, title: t("ui.skillFrontendTitle"), text: t("ui.skillFrontendText") },
  { icon: Database, title: t("ui.skillBackendTitle"), text: t("ui.skillBackendText") },
  { icon: Layers3, title: t("ui.skillProductTitle"), text: t("ui.skillProductText") },
  { icon: Wrench, title: t("ui.skillWorkflowTitle"), text: t("ui.skillWorkflowText") },
];
export default function Skills() {
  const { t } = useTranslation();
  return <section id="skills" className="skills section-space"><div className="section-wrap"><Motion.div className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}><span>02</span> {t("ui.skillsLabel")}</Motion.div><Motion.div className="skills-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}><h2>{t("ui.skillsTitle")} <em>{t("ui.skillsTitleEm")}</em></h2><p>{t("ui.skillsIntro")}</p></Motion.div><div className="skill-grid">{groups(t).map(({ icon: Icon, title, text }, i) => <Motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }} viewport={{ once: true }}><span className="skill-number">0{i + 1}</span>{React.createElement(Icon, { size: 25, strokeWidth: 1.5 })}<h3>{title}</h3><p>{text}</p></Motion.article>)}</div></div></section>;
}
