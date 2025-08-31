import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const validate = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) newErrors.name = "Name is required";

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (7–15 digits)";
    }

    // Subject
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    // Message
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    setSuccess("");
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    emailjs
      .send(
        "service_f2n4xyl", // 👈 from EmailJS
        "template_acs0vrf", // 👈 from EmailJS
        formData,
        "A1j4naTbjz_1lfwaa" // 👈 from EmailJS
      )
      .then(
        () => {
          setSuccess("✅ Email sent successfully!");
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        },
        (err) => {
          setEmailError("❌ Failed to send email. Please try again.");
          console.error(err);
        }
      )
      .finally(() => setLoading(false));
      // .then(
      //   (result) => {
      //     alert("✅ Email sent successfully!");
      //     setFormData({
      //       name: "",
      //       email: "",
      //       phone: "",
      //       subject: "",
      //       message: "",
      //     });
      //     setLoading(false);
      //   },
      //   (error) => {
      //     alert("❌ Failed to send email. Please try again.");
      //     console.error(error);
      //     setLoading(false);
      //   }
      // );
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#0a192f] to-[#112240] py-20 px-8 text-white"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-[#2dd9c6]">
          {t("contact.title")}
        </h2>{/* Success & Error Alerts */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-500/20 text-green-400 border border-green-500">
            {success}
          </div>
        )}
        {emailError && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-400 border border-red-500">
            {emailError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder={t("contact.name")}
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              />
              {errors.name && (
                <p className="text-left text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder={t("contact.email")}
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              />
              {errors.email && (
                <p className="text-left text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="phone"
                placeholder={t("contact.phone")}
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              />
              {errors.phone && (
                <p className="text-left text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder={t("contact.subject")}
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition-all"
              />
              {errors.subject && (
                <p className="text-left text-red-400 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              rows="6"
              placeholder={t("contact.message")}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#0d1c3a] border border-[#64ffda]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] resize-y transition-all"
            />
            {errors.message && (
              <p className="text-left text-red-400 text-sm mt-1">{errors.message}</p>
            )}
          </div>

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
