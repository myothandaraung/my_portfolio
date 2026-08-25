import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CategorySlider from "./components/CategorySlider";
import WhoAmISection from "./components/WhoAmISection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./App.css";
export default function App() {
  const { i18n } = useTranslation();
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { document.documentElement.lang = i18n.language.startsWith("ja") ? "ja" : "en"; }, [i18n.language]);
  return <div className="site-shell"><Header /><main><HeroSection /><CategorySlider /><WhoAmISection /><Skills /><Projects /><ContactSection /></main><Footer /><button className={`back-to-top ${showTop ? "is-visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"><ArrowUp size={18} /></button></div>;
}
