import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import { FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaServer, FaTerminal, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ContactSection = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState([]);
  const [neuralConnections, setNeuralConnections] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  
  const aiIcons = [FaServer, FaBrain, FaNetworkWired, FaRobot, FaCode, FaMicrochip, FaSatellite, FaTerminal];
  const techSymbols = ['{ }', '< />', '[ ]', '( )', '||', '&&', '++', '--', '=>', '<='];
  
  useEffect(() => {
    const generateMatrixRain = () => {
      const rain = [];
      for (let i = 0; i < 30; i++) {
        rain.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.5 + Math.random() * 2,
          char: String.fromCharCode(33 + Math.floor(Math.random() * 94)),
          opacity: Math.random()
        });
      }
      setMatrixRain(rain);
    };
    generateMatrixRain();
    const interval = setInterval(generateMatrixRain, 3000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const generateNeuralConnections = () => {
      const connections = [];
      for (let i = 0; i < 12; i++) {
        connections.push({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 100,
          endX: Math.random() * 100,
          endY: Math.random() * 100,
          progress: 0,
          speed: 0.3 + Math.random() * 1.2
        });
      }
      setNeuralConnections(connections);
    };
    generateNeuralConnections();
    const interval = setInterval(() => {
      setNeuralConnections(prev => prev.map(conn => ({
        ...conn,
        progress: (conn.progress + conn.speed) % 100
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const generateDataStreams = () => {
      const streams = [];
      for (let i = 0; i < 8; i++) {
        streams.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 4
        });
      }
      setDataStreams(streams);
    };
    generateDataStreams();
    const interval = setInterval(() => {
      setDataStreams(prev => prev.map(stream => {
        let newX = stream.x + stream.vx;
        let newY = stream.y + stream.vy;
        
        if (newX < 0 || newX > 100) stream.vx *= -1;
        if (newY < 0 || newY > 100) stream.vy *= -1;
        
        return { ...stream, x: newX, y: newY };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
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
  };
  
  useEffect(() => {
    const calculateProgress = () => {
      const fields = ['name', 'email', 'phone', 'subject', 'message'];
      const filledFields = fields.filter(field => formData[field]?.trim());
      setFormProgress((filledFields.length / fields.length) * 100);
    };
    calculateProgress();
  }, [formData]);

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-8 text-white overflow-hidden"
    >
      {/* AI Background Effects */}
      {aiMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Matrix Rain */}
          <div className="absolute inset-0 opacity-10">
            {matrixRain.map((drop) => (
              <div
                key={drop.id}
                className="absolute text-[#64ffda] font-mono text-xs animate-pulse"
                style={{
                  left: `${drop.x}%`,
                  top: `${drop.y}%`,
                  opacity: drop.opacity,
                  animation: `fall ${drop.speed}s linear infinite`,
                  textShadow: '0 0 5px #64ffda'
                }}
              >
                {drop.char}
              </div>
            ))}
          </div>
          
          {/* Neural Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {neuralConnections.map((conn) => (
              <line
                key={conn.id}
                x1={`${conn.startX}%`}
                y1={`${conn.startY}%`}
                x2={`${conn.startX + (conn.endX - conn.startX) * (conn.progress / 100)}%`}
                y2={`${conn.startY + (conn.endY - conn.startY) * (conn.progress / 100)}%`}
                stroke="#64ffda"
                strokeWidth="0.5"
                strokeDasharray="2, 4"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${conn.id * 0.1}s` }}
              />
            ))}
          </svg>
          
          {/* Data Streams */}
          <div className="absolute inset-0 opacity-20">
            {dataStreams.map((stream) => (
              <div
                key={stream.id}
                className="absolute bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full animate-pulse"
                style={{
                  left: `${stream.x}%`,
                  top: `${stream.y}%`,
                  width: `${stream.size}px`,
                  height: `${stream.size}px`,
                  animationDelay: `${stream.id * 0.15}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px),
                linear-gradient(45deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 120px 120px'
            }}></div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* AI Mode Toggle */}
        <button
          onClick={() => setAiMode(!aiMode)}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 z-20 ${
            aiMode 
              ? 'bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/50' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-[#64ffda]'
          }`}
          title="Toggle AI Mode"
        >
          <FaBrain className={`w-4 h-4 ${aiMode ? 'animate-pulse' : ''}`} />
          {aiMode && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </button>
        
        {/* Enhanced Heading */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 animate-gradientSlide">
              {t("contact.title")}
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-30 blur-lg animate-pulseSlow"></div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="w-32 h-[3px] bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full shadow-md"></div>
            {aiMode && (
              <div className="flex space-x-2">
                {aiIcons.slice(0, 4).map((Icon, idx) => (
                  <Icon key={idx} className="text-sm text-purple-400 animate-popScale" style={{ animationDelay: `${idx * 0.2}s` }} />
                ))}
              </div>
            )}
          </div>
          
          {/* Tech Symbols */}
          {aiMode && (
            <div className="flex space-x-3 mt-4">
              {techSymbols.slice(0, 4).map((symbol, idx) => (
                <span key={idx} className="text-xs text-[#64ffda] font-mono animate-pulse" style={{ animationDelay: `${idx * 0.3}s` }}>
                  {symbol}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Form Progress Indicator */}
        {aiMode && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Form Completion</span>
              <span className="text-sm text-[#64ffda]">{Math.round(formProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#64ffda] to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
              </div>
            </div>
          </div>
        )}{/* Enhanced Success & Error Alerts */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/20 text-green-400 border border-green-500/50 backdrop-blur-sm animate-pulse">
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="w-5 h-5 animate-pulse" />
              <span>{success}</span>
            </div>
          </div>
        )}
        {emailError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 text-red-400 border border-red-500/50 backdrop-blur-sm animate-pulse">
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle className="w-5 h-5 animate-pulse" />
              <span>{emailError}</span>
            </div>
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
