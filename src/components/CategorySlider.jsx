import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";

export default function CategorySlider() {
  const { t } = useTranslation();
  const categories = t("categories", { returnObjects: true }) || [];
  
  return (
    <Motion.div 
      className="expertise-strip" 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.5 }}
    >
      <div className="expertise-track">
        {[...categories, ...categories].map((item, index) => (
          <span key={`${item}-${index}`}>{item}<i>+</i></span>
        ))}
      </div>
    </Motion.div>
  );
}
