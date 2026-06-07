import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Button } from "./ui/button";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <section id="contact" className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-muted-foreground text-lg">Open to internships, collaborations, and research opportunities.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-background rounded-3xl p-8 border border-white/5 shadow-xl mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                placeholder="How can we work together?"
                required
              ></textarea>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent glow-accent-hover h-12 text-lg rounded-xl"
              data-testid="btn-submit-contact"
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center items-center gap-8"
        >
          <a href="https://github.com/PrathamPatel01" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all" data-testid="social-github">
            <FaGithub className="text-3xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-[#0A66C2] hover:scale-110 transition-all" data-testid="social-linkedin">
            <FaLinkedin className="text-3xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all" data-testid="social-twitter">
            <FaTwitter className="text-3xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-accent hover:scale-110 transition-all" data-testid="social-email">
            <FaEnvelope className="text-3xl" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
