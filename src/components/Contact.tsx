// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
// import { Button } from "./ui/button";

// export function Contact() {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted!");
//   };

//   return (
//     <section id="contact" className="py-24 bg-card/50 relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
//       <div className="container mx-auto px-6 max-w-3xl relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl font-display font-bold text-white mb-4">Let's Connect</h2>
//           <p className="text-muted-foreground text-lg">Open to internships, collaborations, and research opportunities.</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="bg-background rounded-3xl p-8 border border-white/5 shadow-xl mb-12"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
//                 <input 
//                   type="email" 
//                   id="email" 
//                   className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
//                   placeholder="john@example.com"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
//               <textarea 
//                 id="message" 
//                 rows={5}
//                 className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
//                 placeholder="How can we work together?"
//                 required
//               ></textarea>
//             </div>
//             <Button 
//               type="submit" 
//               className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent glow-accent-hover h-12 text-lg rounded-xl"
//               data-testid="btn-submit-contact"
//             >
//               Send Message
//             </Button>
//           </form>
//         </motion.div>

//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4 }}
//           className="flex justify-center items-center gap-8"
//         >
//           <a href="https://github.com/PrathamPatel01" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all" data-testid="social-github">
//             <FaGithub className="text-3xl" />
//           </a>
//           <a href="https://www.linkedin.com/in/pratham-kumar-patel-292541245" className="text-muted-foreground hover:text-[#0A66C2] hover:scale-110 transition-all" data-testid="social-linkedin">
//             <FaLinkedin className="text-3xl" />
//           </a>
//           <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all" data-testid="social-twitter">
//             <FaTwitter className="text-3xl" />
//           </a>
//           <a href="#" className="text-muted-foreground hover:text-accent hover:scale-110 transition-all" data-testid="social-email">
//             <FaEnvelope className="text-3xl" />
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Button } from "./ui/button";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (name.trim().length > 30) {
      newErrors.name = "Max 30 characters allowed";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Only letters and spaces allowed";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (message.trim().length > 300) {
      newErrors.message = "Max 300 characters allowed";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "https://contact-form-backend-nine.vercel.app/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // 👇 HANDLE 429 specifically
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a few minutes before trying again."
          );
        }

        throw new Error(data.error || "Failed to send message");
      }

      // SUCCESS
      setName("");
      setEmail("");
      setMessage("");
      setErrors({ name: "", email: "", message: "" });

      setSuccess("✅ Message sent successfully!");

      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-card/50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">

        {/* HEADER */}
        <motion.div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground">
            Open to internships, collaborations, and opportunities.
          </p>
        </motion.div>

        {/* SUCCESS / ERROR MESSAGES */}
        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 text-green-400 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 bg-card border rounded-lg text-white"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 bg-card border rounded-lg text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={5}
              className="w-full p-3 bg-card border rounded-lg text-white resize-none"
            />
            <div className="text-xs text-muted-foreground text-right">
              {message.length}/300
            </div>
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={
              loading ||
              !name ||
              !email ||
              !message ||
              name.length > 30 ||
              message.length > 300
            }
            className="w-full h-12"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* SOCIALS */}
        <div className="flex justify-center gap-6 mt-10">
          <a href="https://github.com/PrathamPatel01">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://linkedin.com">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href="#">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="mailto:your@email.com">
            <FaEnvelope className="text-2xl" />
          </a>
        </div>

      </div>
    </section>
  );
}