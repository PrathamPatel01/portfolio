import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skillGroups = [
  {
    title: "Languages",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    hover: "hover:border-blue-400/50 hover:text-blue-300",
    skills: ["Python", "SQL","JavaScript"],
  },
  {
    title: "Tools & Platforms",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
    hover: "hover:border-violet-400/50 hover:text-violet-300",
    skills: ["Jupyter", "Google Colab", "VS Code", "Git", "GitHub","FastAPI", "Docker","Redis","MongoDB","PostgresSQL"],
  },
  {
    title: "Core Concepts",
    color: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/20",
    dot: "bg-cyan-400",
    hover: "hover:border-cyan-400/50 hover:text-cyan-300",
    skills: ["Machine Learning","RAG Pipelines", "EDA", "Feature Engineering", "Statistical Analysis"],
  },
];

// const skillGroups = [
//   {
//     title: "Programming",
//     color: "from-blue-500/20 to-cyan-500/20",
//     border: "border-blue-500/20",
//     dot: "bg-blue-400",
//     hover: "hover:border-blue-400/50 hover:text-blue-300",
//     skills: ["Python", "JavaScript", "TypeScript", "SQL"],
//   },
//   {
//     title: "Machine Learning & AI",
//     color: "from-violet-500/20 to-purple-500/20",
//     border: "border-violet-500/20",
//     dot: "bg-violet-400",
//     hover: "hover:border-violet-400/50 hover:text-violet-300",
//     skills: [
//       "Scikit-learn",
//       "TensorFlow",
//       "PyTorch",
//       "Feature Engineering",
//       "Model Evaluation",
//     ],
//   },
//   {
//     title: "Generative AI & LLMs",
//     color: "from-cyan-500/20 to-teal-500/20",
//     border: "border-cyan-500/20",
//     dot: "bg-cyan-400",
//     hover: "hover:border-cyan-400/50 hover:text-cyan-300",
//     skills: ["RAG Pipelines", "LangChain", "Ollama"],
//   },
//   {
//     title: "Data & Analytics",
//     color: "from-emerald-500/20 to-green-500/20",
//     border: "border-emerald-500/20",
//     dot: "bg-emerald-400",
//     hover: "hover:border-emerald-400/50 hover:text-emerald-300",
//     skills: ["Pandas", "NumPy", "EDA", "Statistical Analysis"],
//   },
//   {
//     title: "Data Engineering & Databases",
//     color: "from-orange-500/20 to-amber-500/20",
//     border: "border-orange-500/20",
//     dot: "bg-orange-400",
//     hover: "hover:border-orange-400/50 hover:text-orange-300",
//     skills: ["Data Pipelines", "MySQL", "MongoDB", "PySpark (basic)"],
//   },
//   {
//     title: "Tools & Platforms",
//     color: "from-pink-500/20 to-rose-500/20",
//     border: "border-pink-500/20",
//     dot: "bg-pink-400",
//     hover: "hover:border-pink-400/50 hover:text-pink-300",
//     skills: ["Git", "Docker", "Streamlit", "FastAPI", "VS Code"],
//   },
// ];
export function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["-10%", "35%"]);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 bg-[#070c14] overflow-hidden">
      {/* Parallax blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-10 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[130px] pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-violet-500/6 blur-[130px] pointer-events-none" />
      <motion.div style={{ y: blob3Y }} className="absolute bottom-20 left-1/3 w-[380px] h-[380px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">My Toolkit</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C6FF7] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
            >
              <div className={`relative rounded-2xl border ${group.border} bg-gradient-to-br ${group.color} p-6 h-full overflow-hidden`}>
                <div className="absolute inset-0 bg-[#0d1117]/70 rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-5">
                    <span className={`w-2.5 h-2.5 rounded-full ${group.dot}`} />
                    <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.04 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`px-3 py-1.5 text-sm bg-white/5 text-muted-foreground border border-white/10 rounded-full cursor-default transition-all duration-200 ${group.hover}`}
                        data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "Python / ML Pipelines", pct: 90, color: "#4F8EF7" },
            { label: "Deep Learning (TF / PyTorch)", pct: 78, color: "#7C6FF7" },
            { label: "LLM Integration & Prompting", pct: 82, color: "#06b6d4" },
            { label: "Data Analysis & Visualization", pct: 88, color: "#10b981" },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">{bar.label}</span>
                <span className="text-muted-foreground font-mono">{bar.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
