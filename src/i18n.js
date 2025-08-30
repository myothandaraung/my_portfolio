import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./locale/translations.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      ja: { translation: translations.ja }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n
