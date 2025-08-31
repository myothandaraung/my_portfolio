import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_f2n4xyl",   // 👈 from EmailJS
        "template_acs0vrf",  // 👈 from EmailJS
        formData,
        "A1j4naTbjz_1lfwaa"    // 👈 from EmailJS
      )
      .then(
        (result) => {
          alert("✅ Email sent successfully!");
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
          setLoading(false);
        },
        (error) => {
          alert("❌ Failed to send email. Please try again.");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#0a192f] to-[#112240] py-20 px-8 text-white"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#2dd9c6]">
          {t("contact.title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.email")}
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              required
            />
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder={t("contact.phone")}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
            />
            <input
              type="text"
              name="subject"
              placeholder={t("contact.subject")}
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="6"
            placeholder={t("contact.message")}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] resize-y transition-all"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative px-12 py-4 rounded-full font-semibold text-[#0a192f] bg-gradient-to-r from-[#64ffda] to-[#2dd9c6] overflow-hidden group shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/20 to-[#2dd9c6]/20 scale-0 group-hover:scale-100 origin-bottom-left transition-transform duration-300"></span>
            <span className="relative z-10">{t("contact.sendButton")}</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
