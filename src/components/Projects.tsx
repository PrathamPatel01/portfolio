import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaExternalLinkAlt, FaBrain, FaChartLine, FaComments, FaEye, FaVirus, FaStar, FaLeaf } from "react-icons/fa";

const projects = [
  {
    title: "Customer Intelligence System",
    description:
      "Machine learning platform for churn prediction, customer value scoring, and automated business segmentation with actionable retention recommendations.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    gradient: "from-[#1a3a6b] via-[#162047] to-[#0d1117]",
    accent: "#4F8EF7",
    icon: <FaBrain />,
    stat: "4 Customer Segments",
    github: "https://github.com/PrathamPatel01/Customer-intelligence-system",
    demo: "https://customer-intelligence-system-pnp.streamlit.app/"
  },

  {
    title: "PDFLens AI",
    description:
      "Local-first RAG application for analyzing and comparing PDFs using semantic search, vector embeddings, and Llama 3.2. Supports document Q&A, summarization, timeline extraction, and intelligent document comparison.",
    tags: ["Python", "RAG", "ChromaDB", "Llama 3.2"],
    gradient: "from-[#0f4a3e] via-[#0a2e28] to-[#0d1117]",
    accent: "#06b6d4",
    icon: <FaComments />,
    stat: "200-Page PDFs",
    github: "https://github.com/PrathamPatel01/RagBasedDocumentComparer",
    demo: "/under-construction"
  },
   {
  title: "Plant Disease Intelligence",
    description:
      "Deep learning dashboard for plant disease classification using the PlantVillage dataset and MobileNetV2 transfer learning. Includes dataset insights, class imbalance analysis, model performance tracking, and an enterprise-style Streamlit UI.",
    tags: ["Python", "TensorFlow", "MobileNetV2", "Streamlit"],
    gradient: "from-[#14532d] via-[#064e3b] to-[#0d1117]",
    accent: "#10b981",
    icon: <FaLeaf />,
    stat: "91.66% Test Accuracy",
    github: "https://github.com/PrathamPatel01/plant_diseases_project",
    demo: "YOUR_STREAMLIT_DEPLOYED_LINK"
  },
  {
    title: "Global Cancer Data Analysis & Severity Prediction",
    description:
      "Comprehensive healthcare analytics project exploring global cancer trends, risk factors, treatment costs, and survival outcomes. Built a Random Forest model to predict cancer severity and identify key drivers of patient outcomes.",
    tags: ["Python", "Pandas", "Scikit-Learn", "Healthcare AI"],
    gradient: "from-[#7a1f1f] via-[#4d1414] to-[#0d1117]",
    accent: "#ef4444",
    icon: <FaChartLine />,
    stat: "R² Prediction",
    github: "https://github.com/PrathamPatel01/Comprehensive-Eda---Inferential-Analysis",
    demo: "/under-construction"
  },
  {
    title: "HospitalDB Migration Manager",
    description:
      "Database migration and schema management system for healthcare applications. Built to handle version-controlled database changes, schema evolution, and reliable deployment workflows across development and production environments.",
    tags: ["Node.js", "MySQL", "Database Design", "Migrations"],
    gradient: "from-[#3b1f6b] via-[#251349] to-[#0d1117]",
    accent: "#7C6FF7",
    icon: <FaComments />,
    stat: "Schema Versioning",
    github: "https://github.com/PrathamPatel01/hospitalDb_DbMigrations",
    demo: "/under-construction"
  },
  // {
  //   title: "Image Classifier with CNN",
  //   description: "Deep CNN trained on CIFAR-10 achieving 89% test accuracy with data augmentation and dropout regularization.",
  //   tags: ["Python", "TensorFlow", "Keras", "NumPy"],
  //   gradient: "from-[#5c2a0a] via-[#3a1a08] to-[#0d1117]",
  //   accent: "#f97316",
  //   icon: <FaEye />,
  //   stat: "89% Test Acc",
  // },
  // {
  //   title: "COVID-19 EDA",
  //   description: "Comprehensive exploratory analysis of global COVID-19 data with trend visualization, correlation maps, and animated charts.",
  //   tags: ["Python", "Pandas", "Seaborn", "Matplotlib"],
  //   gradient: "from-[#0a3d5c] via-[#062538] to-[#0d1117]",
  //   accent: "#06b6d4",
  //   icon: <FaVirus />,
  //   stat: "180+ Countries",
  // },
  // {
  //   title: "Recommendation Engine",
  //   description: "Collaborative filtering system for movie recommendations using matrix factorization. Achieves 0.82 RMSE on MovieLens.",
  //   tags: ["Python", "Scikit-learn", "Pandas", "Surprise"],
  //   gradient: "from-[#5c0a3a] via-[#3a0825] to-[#0d1117]",
  //   accent: "#ec4899",
  //   icon: <FaStar />,
  //   stat: "0.82 RMSE",
  // },
];

export function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 bg-[#090e18] overflow-hidden">
      {/* Parallax blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/6 blur-[70px] pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-20 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[70px] pointer-events-none" />

      {/* Subtle dots pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #4F8EF7 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">What I've Built</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#4F8EF7] to-[#7C6FF7] mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">Real projects, real data, real impact — each one taught me something new.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-[#0d1117] border border-white/5 rounded-2xl overflow-hidden cursor-default"
              style={{ boxShadow: "0 0 0 0 transparent", transition: "box-shadow 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 35px ${project.accent}22, 0 0 1px ${project.accent}44`;
                (e.currentTarget as HTMLElement).style.borderColor = `${project.accent}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
              data-testid={`project-card-${i}`}
            >
              {/* Banner */}
              <div className={`relative h-36 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {/* Animated mesh in banner */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `radial-gradient(circle at 30% 50%, ${project.accent}30 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${project.accent}20 0%, transparent 50%)`
                }} />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d1117] to-transparent" />
                {/* Icon */}
                <div
                  className="absolute top-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40`, color: project.accent }}
                >
                  {project.icon}
                </div>
                {/* Stat badge */}
                <div
                  className="absolute top-5 right-5 text-xs font-mono px-2.5 py-1 rounded-lg"
                  style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30`, color: project.accent }}
                >
                  {project.stat}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full border"
                      style={{ background: `${project.accent}12`, color: project.accent, borderColor: `${project.accent}30` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors text-sm"
                    data-testid={`project-github-${i}`}
                  >
                    <SiGithub className="text-lg" />
                    <span>Source</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                    style={{ color: project.accent }}
                    data-testid={`project-demo-${i}`}
                  >
                    <span>Live Demo</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
