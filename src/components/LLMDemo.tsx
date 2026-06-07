import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPlay, FaRobot, FaCode, FaChartBar, FaBrain } from "react-icons/fa";
import { SiOpenai, SiHuggingface } from "react-icons/si";

const demos = [
  {
    id: "sentiment",
    icon: <FaBrain />,
    label: "Sentiment Analysis",
    model: "BERT-base",
    prompt: `> Analyze customer reviews for sentiment patterns:\n\n"The product quality is outstanding and delivery was fast. Will definitely recommend to friends. However the packaging could be improved."\n\n"Terrible experience. Product broke after 2 days and customer support was completely unhelpful."`,
    response: `\`\`\`python
from transformers import pipeline

analyzer = pipeline("sentiment-analysis", 
                    model="nlptown/bert-base-multilingual-uncased-sentiment")

reviews = [review_1, review_2]
results = analyzer(reviews)
\`\`\`

✓ Analysis Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Review 1  →  POSITIVE  (confidence: 94.2%)
  • Sentiment drivers: "outstanding", "fast", "recommend"
  • Mild negative signal: "packaging could be improved"
  • Overall score: 4.2 / 5.0

Review 2  →  NEGATIVE  (confidence: 98.7%)
  • Sentiment drivers: "terrible", "broke", "unhelpful"
  • No positive signals detected
  • Overall score: 1.0 / 5.0

📊 Batch Summary
  Positive: 50%  |  Negative: 50%  |  Neutral: 0%
  Avg confidence: 96.45%
  Processing time: 0.34s  |  Tokens processed: 87`,
  },
  {
    id: "codegen",
    icon: <FaCode />,
    label: "Code Generation",
    model: "GPT-4o",
    prompt: `> Build a feature engineering pipeline for tabular churn prediction.\n  Input: DataFrame with customer usage metrics\n  Output: Engineered features + model-ready matrix`,
    response: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Feature engineering pipeline for churn prediction.
    Generates 14 derived features from raw usage metrics.
    """
    # Temporal engagement ratio
    df['engagement_ratio'] = (
        df['active_days'] / df['tenure_days']
    ).clip(0, 1)
    
    # Usage velocity (last 30d vs avg)
    df['usage_velocity'] = (
        df['usage_last_30d'] / (df['avg_monthly_usage'] + 1e-8)
    )
    
    # Support interaction flag (high = churn risk)
    df['high_support_risk'] = (df['support_tickets'] > 3).astype(int)
    
    # Recency-weighted spend
    df['recency_weighted_spend'] = (
        df['total_spend'] * df['engagement_ratio']
    )
    
    # Log-transform skewed features
    skewed = ['total_spend', 'data_used_mb', 'call_minutes']
    for col in skewed:
        df[f'log_{col}'] = np.log1p(df[col])
    
    return df

# ✓ Generated 14 features in 0.002s
# ✓ Zero null values in output
# ✓ Ready for model training
\`\`\`
🎯 Feature importance preview: engagement_ratio (0.31) > log_total_spend (0.24) > usage_velocity (0.19)`,
  },
  {
    id: "insights",
    icon: <FaChartBar />,
    label: "Data Insights",
    model: "Llama-3-70B",
    prompt: `> Analyze this dataset summary and surface key ML opportunities:\n\n  Dataset: E-commerce transactions (120k rows, 28 features)\n  Target: purchase_conversion (binary, 12% positive rate)\n  Missing data: 3 columns >15% null\n  Correlation heatmap: 6 features >0.7 correlated`,
    response: `📋 Dataset Intelligence Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Class Imbalance Detected
  Positive rate: 12% — apply SMOTE or class_weight='balanced'
  Recommended: StratifiedKFold for cross-validation

🔍  Feature Engineering Opportunities
  1. High correlation cluster (6 features) → PCA or drop 4
  2. Missing data columns → median imputation + missingness flag
  3. Temporal features likely → extract hour, day_of_week, recency

🧠  Model Recommendations (ranked)
  1. XGBoost / LightGBM   — best for tabular, handles imbalance
  2. Logistic Regression   — fast baseline, interpretable
  3. Random Forest         — robust to outliers, no scaling needed

📈  Expected Performance Ceiling
  F1 Score: ~0.71–0.78  |  AUC-ROC: ~0.85–0.91
  Baseline (random): F1=0.21

✅  Action Plan
  Step 1: Impute + engineer features  (~2h)
  Step 2: Train XGBoost baseline      (~30min)
  Step 3: Tune with Optuna            (~2h)
  Step 4: SHAP explainability         (~1h)`,
  },
];

function TerminalStream({ text, running }: { text: string; running: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!running) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
    }, 8);
    return () => clearInterval(interval);
  }, [running, text]);

  return (
    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-emerald-300/90 break-words">
      {displayed}
      {running && !done && (
        <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
      )}
    </pre>
  );
}

export function LLMDemo() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [thinking, setThinking] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const currentDemo = demos[active];

  function handleRun() {
    if (running) return;
    setHasRun(false);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setRunning(true);
      setHasRun(true);
    }, 1200);
    setTimeout(() => setRunning(false), 1200 + currentDemo.response.length * 8 + 500);
  }

  function handleSelect(i: number) {
    setActive(i);
    setRunning(false);
    setHasRun(false);
    setThinking(false);
  }

  return (
    <section id="demo" ref={sectionRef} className="relative py-32 overflow-hidden bg-[#080d12]">
      {/* Animated background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(79,142,247,0.07),transparent)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(79,142,247,0.03) 39px,rgba(79,142,247,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(79,142,247,0.03) 39px,rgba(79,142,247,0.03) 40px)"
        }} />
      </motion.div>

      {/* Parallax blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-violet-500/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
            <FaRobot className="text-xs" />
            Live Demo — LLM & ML Magic
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Watch the AI Work
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real ML pipelines, real LLM integrations — pick a scenario and watch the magic unfold.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Demo selector tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {demos.map((d, i) => (
              <button
                key={d.id}
                onClick={() => handleSelect(i)}
                data-testid={`demo-tab-${d.id}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  active === i
                    ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(79,142,247,0.4)]"
                    : "bg-white/5 text-muted-foreground border-white/10 hover:border-accent/40 hover:text-white"
                }`}
              >
                <span className="text-base">{d.icon}</span>
                {d.label}
              </button>
            ))}
          </div>

          {/* Terminal window */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(79,142,247,0.1)] bg-[#0d1117]">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-md">
                  {currentDemo.model === "GPT-4o" ? (
                    <SiOpenai className="text-xs text-white/60" />
                  ) : (
                    <SiHuggingface className="text-xs text-yellow-400/80" />
                  )}
                  <span className="text-xs text-white/60 font-mono">{currentDemo.model}</span>
                </div>
                <span className="text-xs text-white/30 font-mono">pratham_ml_demo.py</span>
              </div>
              <button
                onClick={handleRun}
                disabled={running || thinking}
                data-testid="btn-run-demo"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  running || thinking
                    ? "bg-accent/30 text-accent/50 cursor-not-allowed"
                    : "bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_12px_rgba(79,142,247,0.5)]"
                }`}
              >
                <FaPlay className="text-[10px]" />
                {thinking ? "Thinking..." : running ? "Running..." : "Run"}
              </button>
            </div>

            {/* Prompt pane */}
            <div className="px-6 py-5 border-b border-white/5 bg-[#0d1117]">
              <pre className="whitespace-pre-wrap font-mono text-sm text-blue-300/80 leading-relaxed">
                {currentDemo.prompt}
              </pre>
            </div>

            {/* Response pane */}
            <div className="px-6 py-5 min-h-[300px] bg-[#090e14]">
              {thinking && (
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span>Model is processing...</span>
                </div>
              )}
              {!thinking && hasRun && (
                <TerminalStream text={currentDemo.response} running={running} />
              )}
              {!thinking && !hasRun && (
                <p className="text-muted-foreground/50 text-sm font-mono">
                  // Press Run to execute the pipeline
                </p>
              )}
            </div>
          </div>

          {/* Model badges */}
          <div className="flex flex-wrap items-center gap-3 mt-6 justify-center">
            <span className="text-xs text-muted-foreground/60">Works with:</span>
            {["GPT-4o", "Claude 3", "Llama 3", "Mistral", "HuggingFace"].map((m) => (
              <span key={m} className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
