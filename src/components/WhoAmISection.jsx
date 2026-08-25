import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
export default function WhoAmISection() {
  const { t } = useTranslation();
  return <section id="about" className="about section-wrap section-space"><div className="section-label"><span>01</span> {t("ui.aboutLabel")}</div><Motion.div className="about-grid" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><h2>{t("ui.aboutTitle")} <em>{t("ui.aboutTitleEm")}</em></h2><div className="about-copy"><p>{t("about.intro")}</p><p>{t("about.experience")}</p><div className="about-facts"><div><strong>5+</strong><span dangerouslySetInnerHTML={{ __html: t("ui.factYears") }} /></div><div><strong>10+</strong><span dangerouslySetInnerHTML={{ __html: t("ui.factProjects") }} /></div><div><strong>2020</strong><span dangerouslySetInnerHTML={{ __html: t("ui.factEducation") }} /></div></div></div></Motion.div></section>;
}
