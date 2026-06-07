import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent/20 py-12">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2 mb-6">
          <span className="text-accent">&lt;</span>
          Pratham
          <span className="text-accent">/&gt;</span>
        </div>
        
        <div className="flex gap-6 mb-8">
          <a href="https://github.com/PrathamPatel01" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <FaGithub className="text-xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-[#0A66C2] transition-colors">
            <FaLinkedin className="text-xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
            <FaEnvelope className="text-xl" />
          </a>
        </div>

        <p className="text-muted-foreground text-sm text-center">
          Designed & Built by Pratham Patel &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
