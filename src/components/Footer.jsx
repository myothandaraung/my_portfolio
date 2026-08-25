import { Github, Linkedin } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <Motion.div
        className="section-wrap footer-inner"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a className="wordmark" href="#top"><span>MT</span><i /></a>
        <p>© {new Date().getFullYear()} {t("ui.copyright")}</p>
        <div>
          <a href="#"><Github size={18} /></a>
          <a href="#"><Linkedin size={18} /></a>
          <a href="#top">{t("ui.backToTop")}</a>
        </div>
      </Motion.div>
    </footer>
  );
}
