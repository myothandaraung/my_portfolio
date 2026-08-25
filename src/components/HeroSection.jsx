import { ArrowDownRight, Github, Linkedin } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import profileImage from "../assets/profile.png";
export default function HeroSection() {
  const { t } = useTranslation();
  return <section id="top" className="hero section-wrap"><Motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><p className="eyebrow"><span /> {t("ui.heroAvailable")}</p><h1>{t("ui.heroTitle")} <em>{t("ui.heroTitleEm")}</em></h1><p className="hero-intro">{t("hero.description")}</p><div className="hero-actions"><a className="button button--solid" href="#projects">{t("ui.ctaWork")} <ArrowDownRight size={18} /></a><a className="text-link" href="#contact">{t("ui.ctaTalk")}</a></div><div className="hero-meta"><span>{t("ui.location")}</span><span>{t("ui.expYears")}</span><div><a href="#"><Github size={17} /></a><a href="#"><Linkedin size={17} /></a></div></div></Motion.div><Motion.div className="portrait-wrap" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}><div className="portrait-frame"><img src={profileImage} alt="Myo Thandar Aung" /></div><div className="portrait-note"><small>{t("ui.currentlyLabel")}</small><strong>{t("ui.buildingLine1")}<br />{t("ui.buildingLine2")}</strong></div><span className="portrait-index">01 / 05</span></Motion.div></section>;
}
