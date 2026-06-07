import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'projects', 'demo', 'skills', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 160) current = section;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Projects', 'Demo', 'Skills', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060a10]/80 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-accent">&lt;</span>
          Pratham
          <span className="text-accent">/&gt;</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                data-testid={`link-${id}`}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {link}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          data-testid="btn-menu"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0d1117]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                data-testid={`mobile-link-${id}`}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  active === id ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {link}
              </a>
            );
          })}
        </motion.div>
      )}
    </motion.nav>
  );
}
