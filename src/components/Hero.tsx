import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { Button } from "@/components/ui/button";

const TITLES = [
  "Machine Learning Engineer",
  "LLM Integration Specialist",
  "Data Analyst",
  "AI Builder",
  "AI Enthusiast",
];

function FloatingOrb({
  className,
  style,
}: {
  className: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={style}
    />
  );
}

export function Hero() {
  const [init, setInit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Parallax layers at different speeds
  const heroY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroYSpring = useSpring(heroY, { stiffness: 60, damping: 20 });

  const orb1Y = useTransform(scrollY, [0, 800], [0, 320]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, -180]);
  const orb3Y = useTransform(scrollY, [0, 800], [0, 250]);
  const orb4Y = useTransform(scrollY, [0, 800], [0, -120]);
  const orb5Y = useTransform(scrollY, [0, 800], [0, 400]);
  const gridY = useTransform(scrollY, [0, 800], [0, 60]);
  const particleY = useTransform(scrollY, [0, 800], [0, 100]);

  // Typewriter
  const [titleIndex, setTitleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const fullText = TITLES[titleIndex % TITLES.length];
    const timeout = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setTitleIndex((p) => p + 1);
      } else {
        setText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }
    }, isDeleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060a10]"
    >
      {/* ── PARALLAX LAYER 1: animated grid ── */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 59px,#4F8EF7 59px,#4F8EF7 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,#4F8EF7 59px,#4F8EF7 60px)",
          }}
        />
      </motion.div>

      {/* ── PARALLAX LAYER 2: deep-background radial ── */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(79,142,247,0.12),transparent_70%)]" />

      {/* ── PARALLAX LAYER 3: floating orbs (different speeds) ── */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[-120px] left-[-80px] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[10%] right-[-100px] w-[380px] h-[380px] rounded-full bg-violet-500/10 blur-[90px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[30%] left-[15%] w-[280px] h-[280px] rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: orb4Y }}
        className="absolute bottom-[5%] right-[20%] w-[320px] h-[320px] rounded-full bg-indigo-600/10 blur-[90px] pointer-events-none z-0"
      />
      <motion.div
        style={{ y: orb5Y }}
        className="absolute bottom-[-80px] left-[30%] w-[440px] h-[440px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none z-0"
      />

      {/* ── PARALLAX LAYER 4: tsParticles ── */}
      {init && (
        <motion.div style={{ y: particleY }} className="absolute inset-0 z-[1] pointer-events-none">
          <Particles
            id="tsparticles"
            className="w-full h-full opacity-50"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 120,
              particles: {
                color: { value: ["#4F8EF7", "#7C3AED", "#06b6d4"] },
                links: {
                  color: "#4F8EF7",
                  distance: 140,
                  enable: true,
                  opacity: 0.25,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.8,
                  direction: "none",
                  random: true,
                  straight: false,
                  outModes: "bounce",
                },
                number: {
                  density: { enable: true, width: 900 },
                  value: 70,
                },
                opacity: { value: { min: 0.3, max: 0.7 }, animation: { enable: true, speed: 0.5 } },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2.5 } },
              },
              detectRetina: true,
            }}
          />
        </motion.div>
      )}

      {/* ── PARALLAX LAYER 5: main content (slowest) ── */}
      <motion.div
        style={{ y: heroYSpring }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-sm font-medium px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Open to ML &amp; AI Roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-[1.05]"
        >
          Hi, I'm{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8EF7] via-[#7C6FF7] to-[#06b6d4]">
              Pratham Patel
            </span>
            {/* Underline glow */}
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4F8EF7] via-[#7C6FF7] to-[#06b6d4] opacity-60 blur-[1px]" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 md:h-16 mb-6 flex items-center justify-center"
        >
          <p className="text-2xl md:text-3xl text-muted-foreground font-medium font-mono">
            <span className="text-accent/80">{">"} </span>
            {text}
            <span className="animate-pulse text-accent">_</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground/70 max-w-2xl mx-auto mb-12"
        >
          Turning raw data into real-world decisions.{" "}
          <span className="text-accent/60">Building intelligent systems</span>{" "}
          that learn, adapt, and deliver.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-[#4F8EF7] to-[#7C6FF7] text-white text-lg h-14 px-10 rounded-full border-0 shadow-[0_0_30px_rgba(79,142,247,0.4)] hover:shadow-[0_0_45px_rgba(79,142,247,0.6)] transition-shadow"
            data-testid="btn-view-work"
          >
            <a href="#projects">View My Work</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/15 text-white hover:bg-white/8 hover:border-accent/40 text-lg h-14 px-10 rounded-full backdrop-blur-sm"
            data-testid="btn-download-resume"
          >
            <a href="#">Download Resume</a>
          </Button>
        </motion.div>

        {/* Tech stack mini-row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {["Python", "PyTorch", "LLMs", "Scikit-learn", "FastAPI", "HuggingFace"].map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground/80 font-mono backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-10">
        <div className="w-[28px] h-[46px] rounded-full border-2 border-white/25 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
