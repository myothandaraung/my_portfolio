import { useState } from "react";
import emailjs from "emailjs-com";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";
export default function ContactSection() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
    const submit = async e => { e.preventDefault(); setLoading(true); setStatus(""); try { await emailjs.send("service_f2n4xyl", "template_acs0vrf", form, "A1j4naTbjz_1lfwaa"); setStatus(t("ui.sentStatus")); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); } catch { setStatus(t("ui.errorStatus")); } finally { setLoading(false); } };
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <section id="contact" className="contact section-space">
      <Motion.div
        className="section-wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label section-label--light">
          <span>04</span> {t("ui.contactLabel")}
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <h2>
              {t("ui.contactTitle")} <em>{t("ui.contactTitleEm")}</em>
            </h2>
            <p>
              {t("ui.contactIntro")}
            </p>
            <a href="mailto:myothandaraung713@gmail.com">
              <Mail size={18} /> hello@myothandaraung.com
            </a>
          </div>
          <form onSubmit={submit}>
            <div className="form-row">
              <label>
                <span>{t("ui.nameLabel")}</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={change}
                  placeholder={t("contact.name")}
                />
              </label>
              <label>
                <span>{t("ui.emailLabel")}</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={change}
                  placeholder={t("contact.email")}
                />
              </label>
            </div>
            <label>
              <span>{t("ui.subjectLabel")}</span>
              <input
                required
                name="subject"
                value={form.subject}
                onChange={change}
                placeholder={t("contact.subject")}
              />
            </label>
            <label>
              <span>{t("ui.messageLabel")}</span>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={change}
                rows="5"
                placeholder={t("contact.message")}
              />
            </label>
            {status && <p className="form-status">{status}</p>}
            <button className="button button--light" disabled={loading}>
              {loading ? t("ui.sending") : t("ui.sendButton")}
              <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </Motion.div>
    </section>
  );
}
