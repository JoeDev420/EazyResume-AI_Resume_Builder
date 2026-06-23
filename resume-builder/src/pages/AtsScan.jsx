import { useState } from "react";
import {
  CheckCircle2, AlertCircle, ChevronDown, ChevronUp,
  Tag, FileText, AlignLeft, ClipboardList, Lightbulb,
  Sparkles, RotateCcw
} from "lucide-react";
import API from "../components/AxiosConfig";
import { toast } from "react-toastify";

const CATEGORY_CONFIG = {
  Keywords:     { icon: Tag,           text: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700"   },
  Content:      { icon: FileText,      text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
  Formatting:   { icon: AlignLeft,     text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
  Completeness: { icon: ClipboardList, text: "text-teal-600",   bg: "bg-teal-50",   border: "border-teal-200",   badge: "bg-teal-100 text-teal-700"   },
};

const FALLBACK_CONFIG = {
  icon: AlertCircle,
  text: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", badge: "bg-gray-100 text-gray-700"
};

const ScoreRing = ({ score }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = circ * (score / 100);
  const color  = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";
  const track  = score >= 80 ? "#dcfce7"  : score >= 60 ? "#fef3c7"  : "#fee2e2";
  const label  = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";

  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke={track} strokeWidth="11" />
        <circle
          cx="60" cy="60" r={r}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums" style={{ color }}>{score}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest mt-0.5" style={{ color }}>{label}</span>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  const cfg = CATEGORY_CONFIG[category.name] ?? FALLBACK_CONFIG;
  const Icon = cfg.icon;
  const hasIssues = (category.issues?.length ?? 0) > 0;
  const [open, setOpen] = useState(hasIssues);

  return (
    <div className={`border rounded-xl overflow-hidden ${cfg.border}`}>
      <button
        onClick={() => hasIssues && setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 ${cfg.bg} ${hasIssues ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`size-4 ${cfg.text}`} />
          <span className={`text-sm font-semibold ${cfg.text}`}>{category.name}</span>
          {hasIssues ? (
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
              {category.issues.length} issue{category.issues.length > 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
              Passed
            </span>
          )}
        </div>
        {hasIssues && (open
          ? <ChevronUp className="size-4 text-gray-400" />
          : <ChevronDown className="size-4 text-gray-400" />
        )}
      </button>

      {hasIssues && open && (
        <div className="divide-y divide-gray-100 bg-white">
          {category.issues?.map((issue, i) => (
            <div key={i} className="px-4 py-3 space-y-1.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="size-3.5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[13px] text-gray-700 leading-snug">{issue.problem}</p>
              </div>
              <div className="flex items-start gap-2 pl-0.5">
                <Lightbulb className="size-3.5 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[12px] text-gray-500 leading-relaxed">{issue.fix}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!hasIssues && (
        <div className="px-4 py-3 bg-white flex items-center gap-2">
          <CheckCircle2 className="size-4 text-green-500" />
          <span className="text-[13px] text-gray-500">No issues detected.</span>
        </div>
      )}
    </div>
  );
};

const AtsScan = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAtsScan = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await API.post("/ai/ats-scan", { formData });
      setResult(res.data);
    } catch {
      toast.error("ATS scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalIssues = result?.categories?.reduce((sum, c) => sum + c.issues.length, 0) ?? 0;
  const affectedCategories = result?.categories?.filter(c => c.issues.length > 0).length ?? 0;

  const scoreSummary = !result ? "" :
    result.score >= 80 ? "Your resume is well-optimized for ATS systems." :
    result.score >= 60 ? "Your resume needs some improvements to pass ATS filters." :
    "Your resume needs significant work to pass ATS screening.";

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-6 space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">ATS Resume Scan</h2>
          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed max-w-xs">
            Detect keyword gaps, content issues, and formatting problems before recruiters see your resume.
          </p>
        </div>
        <button
          onClick={handleAtsScan}
          disabled={loading}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
        >
          {result
            ? <RotateCcw className="size-3.5" />
            : <Sparkles className="size-3.5" />}
          {loading ? "Scanning…" : result ? "Re-scan" : "Run Scan"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50/60">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Analyzing your resume…</p>
            <p className="text-xs text-gray-400 mt-0.5">This may take a few seconds</p>
          </div>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-4">

          {/* Score card */}
          <div className="flex items-center gap-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <ScoreRing score={result.score} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">ATS Score</p>
              <p className="text-sm text-gray-700 leading-relaxed">{scoreSummary}</p>
              <p className="text-xs text-gray-400 mt-2">
                {totalIssues === 0
                  ? "No issues found — great work!"
                  : `${totalIssues} issue${totalIssues > 1 ? "s" : ""} across ${affectedCategories} categor${affectedCategories > 1 ? "ies" : "y"}`}
              </p>
            </div>
          </div>

          {/* Category cards */}
          <div className="space-y-2.5">
            {result.categories?.map((cat, i) => (
              <CategoryCard key={i} category={cat} />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default AtsScan;
