import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SiPython, SiTensorflow, SiPytorch, SiPandas, SiGithub, SiScikitlearn, SiOpenai } from "react-icons/si";

function Counter({ end, label, suffix = "+" }: { end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.1 && count === 0) {
        let start = 0;
        const duration = 1800;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    });
    return unsub;
  }, [scrollYProgress, end, count]);

  return (
    <div ref={ref} className="relative text-center p-6 bg-[#0d1117] rounded-2xl border border-white/5 shadow-lg overflow-hidden group hover:border-accent/30 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4F8EF7] to-[#7C6FF7] mb-2 relative z-10">{count}{suffix}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-widest relative z-10">{label}</div>
    </div>
  );
}

const floatingIcons = [
  { icon: <SiPython className="text-[#3776AB]" />, label: "Python", angle: -45, radius: 130 },
  { icon: <SiTensorflow className="text-[#FF6F00]" />, label: "TensorFlow", angle: 30, radius: 130 },
  { icon: <SiPytorch className="text-[#EE4C2C]" />, label: "PyTorch", angle: 120, radius: 130 },
  { icon: <SiPandas className="text-[#8B7DE8]" />, label: "Pandas", angle: 210, radius: 130 },
  { icon: <SiScikitlearn className="text-[#F7931E]" />, label: "Sklearn", angle: 300, radius: 130 },
  { icon: <SiOpenai className="text-white/70" />, label: "LLMs", angle: -120, radius: 130 },
];

export function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-60, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const orbitAngle = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const leftXSpring = useSpring(leftX, { stiffness: 60, damping: 20 });
  const rightXSpring = useSpring(rightX, { stiffness: 60, damping: 20 });

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-[#0a0f18] overflow-hidden">
      {/* Parallax background blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[120px] pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[120px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 49px,#4F8EF7 49px,#4F8EF7 50px),repeating-linear-gradient(90deg,transparent,transparent 49px,#4F8EF7 49px,#4F8EF7 50px)"
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div style={{ opacity }} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C6FF7] mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-20 mb-24">
          {/* Left — avatar with orbiting icons */}
          <motion.div
            style={{ x: leftXSpring, opacity }}
            className="w-full lg:w-2/5 flex justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full border border-accent/15 animate-[spin_14s_linear_infinite]" />
              <div className="absolute inset-3 rounded-full border border-accent/25 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(79,142,247,0.2)]" />

              {/* Avatar */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1a2233] to-[#0d1117] border border-white/10 flex items-center justify-center z-10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/15 via-violet-500/10 to-transparent flex items-center justify-center">
                  <span className="text-6xl font-display text-transparent bg-clip-text bg-gradient-to-br from-[#4F8EF7] to-[#7C6FF7]">PP</span>
                </div>
              </div>

              {/* Orbiting icon badges */}
              {floatingIcons.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.cos(rad) * item.radius;
                const y = Math.sin(rad) * item.radius;
                return (
                  <motion.div
                    key={item.label}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ x, y }}
                    animate={{ y: [y - 6, y + 6, y - 6] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-11 h-11 bg-[#0d1117] rounded-xl border border-white/10 flex items-center justify-center shadow-lg text-xl hover:border-accent/40 transition-colors cursor-default group">
                      {item.icon}
                      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-muted-foreground whitespace-nowrap bg-[#0d1117] px-2 py-0.5 rounded border border-white/10">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div style={{ x: rightXSpring, opacity }} className="w-full lg:w-3/5">
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                I'm <span className="text-white font-medium">Pratham Patel</span>, a Machine Learning and Data Analytics student passionate about building intelligent systems that learn from data. I work with real-world datasets to uncover patterns, build predictive models, and turn insights into measurable impact.
              </p>
              <p>
                Whether it's training neural networks, integrating <span className="text-accent">large language models</span> into production pipelines, crafting interactive dashboards, or running deep exploratory analysis — I'm in my element when data tells a story.
              </p>
              <p>
                Lately I've been obsessed with making <span className="text-accent">LLMs actually useful</span> — wrapping them in clean APIs, fine-tuning on domain data, and building agents that do real work.
              </p>
            </div>

            {/* What I'm working on */}
            <div className="bg-[#0d1117] rounded-2xl border border-white/5 p-5 mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Currently building</p>
              <div className="flex flex-wrap gap-2">
                {["LLM-powered data analyst", "RAG pipeline on custom datasets", "ML model serving with FastAPI"].map((t) => (
                  <span key={t} className="text-sm px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            <a
              href="https://github.com/PrathamPatel01"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors group"
              data-testid="link-github-about"
            >
              <SiGithub className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium border-b border-white/20 group-hover:border-accent transition-colors">github.com/PrathamPatel01</span>
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          <Counter end={6} label="Projects Shipped" />
          <Counter end={2} label="Years of Learning" />
          <Counter end={10} label="Tools Mastered" />
          <Counter end={3} label="Domains Explored" />
        </motion.div>
      </div>
    </section>
  );
}
