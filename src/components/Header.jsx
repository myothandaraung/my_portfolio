import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
const links = [["About", "about"], ["Skills", "skills"], ["Work", "projects"], ["Contact", "contact"]];
export default function Header() {
  const { i18n } = useTranslation(); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}><div className="nav-wrap"><a className="wordmark" href="#top" aria-label="Home"><span>MT</span><i /></a><nav className={`nav-links ${open ? "nav-links--open" : ""}`}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav><div className="nav-actions"><button className="language-switch" onClick={() => i18n.changeLanguage(i18n.language.startsWith("ja") ? "en" : "ja")}>{i18n.language.startsWith("ja") ? "EN" : "JP"}</button><a className="nav-cta" href="#contact">Let's talk</a><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div></div></header>;
}
