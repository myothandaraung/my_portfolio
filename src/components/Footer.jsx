import { Github, Linkedin } from "lucide-react";
import { motion as Motion } from "framer-motion";

export default function Footer() {
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
        <p>© {new Date().getFullYear()} Myo Thandar Aung. Designed with care.</p>
        <div>
          <a href="#"><Github size={18} /></a>
          <a href="#"><Linkedin size={18} /></a>
          <a href="#top">Back to top ↑</a>
        </div>
      </Motion.div>
    </footer>
  );
}
