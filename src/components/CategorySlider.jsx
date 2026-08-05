import { useTranslation } from "react-i18next";
export default function CategorySlider() { const { t } = useTranslation(); const categories = t("categories", { returnObjects: true }) || []; return <div className="expertise-strip"><div className="expertise-track">{[...categories, ...categories].map((item, index) => <span key={`${item}-${index}`}>{item}<i>+</i></span>)}</div></div>; }
