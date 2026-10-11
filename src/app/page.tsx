"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldAlert,
  Layers,
  Activity,
  Calculator,
  Calendar,
  CloudRain,
  Users,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Camera,
  Cpu,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Database,
  Radio,
  Clock,
  Compass,
  Award,
  Eye,
  Download,
  ChevronLeft,
  Search,
  Copy,
  Check,
  Flame,
  Thermometer,
  SlidersHorizontal,
  Play
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 496 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const getAssetUrl = (path: string) => `${basePath}${path}`;

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModuleTab, setActiveModuleTab] = useState<number>(1);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Interactive AI Vision Inspector Playground State
  const [inspectorView, setInspectorView] = useState<"raw" | "yolo" | "unet" | "depth">("yolo");

  // Live Thermodynamic Asphalt & CIDA SCA/5 Cost Calculator State
  const [calcArea, setCalcArea] = useState<number>(4.5);
  const [calcDepth, setCalcDepth] = useState<number>(6.0);
  const [calcDistance, setCalcDistance] = useState<number>(18);
  const [calcAmbientTemp, setCalcAmbientTemp] = useState<number>(31);

  // Document Filtering & Search
  const [docFilter, setDocFilter] = useState<"all" | "papers" | "presentations" | "reports">("all");
  const [docSearchQuery, setDocSearchQuery] = useState<string>("");

  // Citation Modal State
  const [citationModalOpen, setCitationModalOpen] = useState<boolean>(false);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);

  const [selectedDoc, setSelectedDoc] = useState<{
    title: string;
    subtitle: string;
    file: string;
    isImage?: boolean;
    images?: string[];
    badge?: string;
    category?: "papers" | "presentations" | "reports";
  } | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const modules = [
    {
      id: 1,
      badge: "Module 01 · Perception AI",
      title: "AI-Based Road Defect Detection & Risk Assessment",
      studentId: "IT22082756",
      role: "Perception & Vision Engineer",
      primaryModel: "YOLOv8-m + CNN Feature Extractor",
      metrics: [
        { label: "Precision", val: "91.4%" },
        { label: "Recall", val: "88.7%" },
        { label: "mAP@50", val: "92.4%" },
        { label: "Inference", val: "85 FPS" }
      ],
      description:
        "High-recall multi-scale tiled computer vision pipeline with Weighted Box Fusion (WBF) and CLAHE enhancement. Detects potholes, alligator cracks, longitudinal fissures, and structural rutting in high resolution, providing automated ASTM severity grading.",
      pipeline: [
        "Raw Dashcam / Drone Feed",
        "CLAHE Equalization",
        "Overlapping Tiling (384px)",
        "YOLOv8-m Detection",
        "WBF Box Fusion",
        "ResNet Feature Extractor",
        "Random Forest Risk Classifier",
        "ASTM Severity Vector"
      ],
      classes: [
        "Potholes",
        "Alligator Cracks",
        "Transverse Cracks",
        "Longitudinal Cracks",
        "Edge Erosion",
        "Rutting Damage"
      ],
      color: "from-orange-500/15 to-amber-500/5",
      borderColor: "border-orange-500/30",
      accent: "text-orange-400"
    },
    {
      id: 2,
      badge: "Module 02 · Geometric Vision",
      title: "Semantic Repair Area Segmentation & Metric Depth Estimation",
      studentId: "IT22252340",
      role: "Geometric AI & Segmentation Engineer",
      primaryModel: "U-Net + Depth Anything V2",
      metrics: [
        { label: "Dice Coeff", val: "89.2%" },
        { label: "mIoU", val: "82.6%" },
        { label: "Vol. Error", val: "±4.3%" },
        { label: "Relative Gain", val: "+24.8%" }
      ],
      description:
        "Pioneers pixel-level irregular contour isolation using Suzuki-Abe border following and Douglas-Peucker polygon reduction. Combines Monocular Depth Anything V2 with RANSAC ground plane fitting to reconstruct true metric 3D defect volume in cubic meters.",
      pipeline: [
        "Preprocessed Defect ROI",
        "U-Net / YOLOv8-Seg Mask",
        "Morphological Refinement",
        "Depth Anything V2 Inference",
        "RANSAC Ground Plane Fit",
        "Inverse Perspective Mapping (IPM)",
        "Shoelace Polygon Area (m²)",
        "Volumetric Integration (m³)"
      ],
      classes: [
        "Pixel Damage Mask",
        "Douglas-Peucker Polygon",
        "Relative Depth Field",
        "RANSAC Datum Plane",
        "Over-Excavation Margin (15%)",
        "Volumetric 3D Mesh"
      ],
      color: "from-emerald-500/15 to-teal-500/5",
      borderColor: "border-emerald-500/30",
      accent: "text-emerald-400"
    },
    {
      id: 3,
      badge: "Module 03 · Engineering Physics",
      title: "Automated Material Requirement & Heat Estimation",
      studentId: "IT22113122",
      role: "Optimization & Estimation Engineer",
      primaryModel: "CIDA SCA/5 + Newton's Law + MLP + MILP",
      metrics: [
        { label: "R² Accuracy", val: "99.9%" },
        { label: "Cost MAE", val: "LKR 4.2K" },
        { label: "Thermal Error", val: "±1.2 °C" },
        { label: "MILP Solve", val: "24 ms" }
      ],
      description:
        "Industrial engineering decision engine compliant with Sri Lanka CIDA SCA/5 standards. Uses physics-informed transient thermodynamic decay modeling for Hot Mix Asphalt (HMA), predicting dispatch temperatures, compaction time windows, and solving MILP crew/fleet resource allocations.",
      pipeline: [
        "Volume & Depth from Module 2",
        "HMA Bulk Density Model (2.35 t/m³)",
        "Newton's Thermodynamic Decay",
        "Humidity-Scaled k-Factor",
        "Compaction Time Window (135°C floor)",
        "RDA Human & Shift Norms (HSR)",
        "SciPy HiGHS MILP Solver",
        "CIDA Bill of Quantities (BOQ)"
      ],
      classes: [
        "HMA AC-20 Surface Course",
        "HMA AC-10 Binder Course",
        "Bitumen 60/70 Penetration Emulsion",
        "ABC Aggregate Base Course",
        "Cold-Pour Polymer Sealant",
        "LKR Budget & Carbon BOQ"
      ],
      color: "from-sky-500/15 to-blue-500/5",
      borderColor: "border-sky-500/30",
      accent: "text-sky-400"
    },
    {
      id: 4,
      badge: "Module 04 · Operations Research",
      title: "Environmental & Traffic-Aware Repair Scheduling with Detour Routing",
      studentId: "IT22207968",
      role: "Operations AI & Traffic Systems Engineer",
      primaryModel: "LightGBM + NSGA-II + A* / OSRM",
      metrics: [
        { label: "R² Duration", val: "99.88%" },
        { label: "Monte Carlo", val: "10,000 runs" },
        { label: "CO₂ Avoided", val: "4.28 Tons" },
        { label: "Compliance", val: "97.8% Verified" }
      ],
      description:
        "Orchestrates city-scale road intervention timing. Features Open-Meteo 72h precipitation lookaheads, NSGA-II multi-objective genetic Pareto frontier optimization (minimizing gridlock while maximizing urgency), and Dijkstra/A* OSRM dynamic road-closure detour generation.",
      pipeline: [
        "Repair Scope from Module 3",
        "Open-Meteo 7-Day Live Hourly",
        "Precipitation Threshold Filter (<60%)",
        "LightGBM Repair Duration Engine",
        "NSGA-II Pareto Multi-Objective",
        "Interactive Road Closure Zone",
        "A* / Haversine / OSRM Detour Solver",
        "10k Stochastic Monte Carlo Audit"
      ],
      classes: [
        "72h Weather Viability Windows",
        "Curing Window Protection",
        "Peak-Hour Congestion Avoidance",
        "Pareto Optimal Shift Plans",
        "OSRM Multi-Point Detours",
        "Sobol Sensitivity Index"
      ],
      color: "from-purple-500/15 to-pink-500/5",
      borderColor: "border-purple-500/30",
      accent: "text-purple-400"
    }
  ];

  const currentModule = modules.find((m) => m.id === activeModuleTab) || modules[0];

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400 z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Bar */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 bg-slate-950/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
          <a href="#" className="flex items-center gap-3" aria-label="Road Inspectors Home">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-orange-500/40 p-0.5 bg-slate-900">
              <Image
                src={getAssetUrl("/branding/logo_white.png")}
                alt="Road Inspectors Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-slate-100">
              Road <span className="text-orange-500">Inspectors</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary Navigation">
            <a
              href="#about"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            >
              About
            </a>
            <a
              href="#research"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            >
              Research Modules
            </a>
            <a
              href="#gallery"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>AI Inspector</span>
            </a>
            <a
              href="#calculator"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400 flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-400" />
              <span>Cost Calculator</span>
            </a>
            <a
              href="#compliance"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            >
              Compliance
            </a>
            <a
              href="#documents"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            >
              Documents
            </a>
            <a
              href="#team"
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-orange-500/10 hover:text-orange-400"
            >
              Team
            </a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition-colors hover:bg-orange-500/10 active:scale-95 border border-slate-800"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>
            <a
              href="https://github.com/chamaraIT22113122/road-inspector"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-orange-500/10 lg:hidden text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-orange-500/20 px-6 py-4 flex flex-col gap-3 backdrop-blur-xl">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              About
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              Research Modules
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              System Architecture
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              Gallery
            </a>
            <a
              href="#compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              Compliance
            </a>
            <a
              href="#documents"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              Documents
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-orange-400"
            >
              Team
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {/* HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20 bg-grid-pattern">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 text-left">
                {/* Project Badge */}
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span>R26-IT-ROAD-023 · SLIIT Research Project 2026</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-100">
                  Intelligent Decision Support System for{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400">
                    Road Defect Inspection & Repair Planning
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-normal">
                  An end-to-end cyber-physical platform combining high-resolution computer vision defect perception,
                  pixel-accurate semantic damage segmentation, thermodynamic Hot Mix Asphalt material estimation,
                  and traffic-weather aware multi-objective repair scheduling for Sri Lankan road infrastructure.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <a
                    href="#research"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold hover:from-orange-500 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 flex items-center gap-2 group font-mono text-sm"
                  >
                    <span>Explore 4 Research Modules</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#team"
                    className="px-7 py-3.5 rounded-xl glass hover:bg-orange-500/10 text-slate-200 font-semibold transition-all border border-orange-500/30 hover:border-orange-500/50 flex items-center gap-2 font-mono text-sm"
                  >
                    <Users className="w-4 h-4 text-orange-400" />
                    <span>Research Team</span>
                  </a>
                  <a
                    href="https://github.com/chamaraIT22113122/road-inspector"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl glass hover:bg-slate-800 transition-all border border-slate-800 group"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
                  </a>
                </div>

                {/* Key Metrics Counter Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                  <div>
                    <div className="text-2xl font-bold font-mono text-orange-400">92.4%</div>
                    <div className="text-[11px] text-slate-400 font-medium">YOLOv8 mAP@50</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-emerald-400">89.2%</div>
                    <div className="text-[11px] text-slate-400 font-medium">U-Net Dice Coeff</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-sky-400">99.9%</div>
                    <div className="text-[11px] text-slate-400 font-medium">Material Model R²</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-purple-400">10,000</div>
                    <div className="text-[11px] text-slate-400 font-medium">Monte Carlo Runs</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Pipeline Card */}
              <div className="lg:col-span-5 relative">
                <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden border border-orange-500/30 shadow-2xl">
                  {/* Card Terminal Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        RoadInspector-R26-IT-ROAD-023
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>Live Stack</span>
                    </div>
                  </div>

                  {/* Pipeline Selector Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                        4-Stage Automated Pipeline
                      </span>
                      <Sparkles className="w-4 h-4 text-orange-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Sub-Card 1 */}
                      <button
                        onClick={() => setPipelineStep(0)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                          pipelineStep === 0
                            ? "bg-orange-500/15 border-orange-500 shadow-md scale-[1.02]"
                            : "glass border-slate-800 hover:border-orange-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-xl text-orange-400 bg-orange-500/10">
                            <ShieldAlert className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            92.4% mAP
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-100 mb-0.5">Defect Detection</div>
                        <div className="text-[11px] text-slate-400 font-mono">YOLOv8 + WBF</div>
                      </button>

                      {/* Sub-Card 2 */}
                      <button
                        onClick={() => setPipelineStep(1)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                          pipelineStep === 1
                            ? "bg-emerald-500/15 border-emerald-500 shadow-md scale-[1.02]"
                            : "glass border-slate-800 hover:border-emerald-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-xl text-emerald-400 bg-emerald-500/10">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            89.2% Dice
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-100 mb-0.5">Repair Segmentation</div>
                        <div className="text-[11px] text-slate-400 font-mono">U-Net + Depth V2</div>
                      </button>

                      {/* Sub-Card 3 */}
                      <button
                        onClick={() => setPipelineStep(2)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                          pipelineStep === 2
                            ? "bg-sky-500/15 border-sky-500 shadow-md scale-[1.02]"
                            : "glass border-slate-800 hover:border-sky-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-xl text-sky-400 bg-sky-500/10">
                            <Calculator className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            99.9% R²
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-100 mb-0.5">Material & Heat</div>
                        <div className="text-[11px] text-slate-400 font-mono">CIDA SCA/5 + MILP</div>
                      </button>

                      {/* Sub-Card 4 */}
                      <button
                        onClick={() => setPipelineStep(3)}
                        className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                          pipelineStep === 3
                            ? "bg-purple-500/15 border-purple-500 shadow-md scale-[1.02]"
                            : "glass border-slate-800 hover:border-purple-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-xl text-purple-400 bg-purple-500/10">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                            99.88% R²
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-100 mb-0.5">Traffic Scheduling</div>
                        <div className="text-[11px] text-slate-400 font-mono">NSGA-II + OSRM</div>
                      </button>
                    </div>

                    {/* Explanatory Banner Below Sub-Cards */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mt-4">
                      <div className="flex items-center justify-between mb-2 text-xs font-mono">
                        <span className="text-orange-400 font-bold uppercase">
                          {pipelineStep === 0 && "Module 01: Detection Pipeline"}
                          {pipelineStep === 1 && "Module 02: Metric Segmentation"}
                          {pipelineStep === 2 && "Module 03: Material Thermodynamics"}
                          {pipelineStep === 3 && "Module 04: Pareto Scheduling"}
                        </span>
                        <span className="text-slate-400 text-[10px]">CIDA & RDA Compliant</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2.5">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400 rounded-full transition-all duration-500"
                          style={{ width: `${(pipelineStep + 1) * 25}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-300 leading-normal">
                        {pipelineStep === 0 &&
                          "High-resolution multi-scale inference detecting potholes and cracks with ASTM D6433 severity classification."}
                        {pipelineStep === 1 &&
                          "Pixel-level polygon contour isolation paired with Monocular Depth Anything V2 for real 3D volume (m³)."}
                        {pipelineStep === 2 &&
                          "Newton's Law of cooling predicts HMA dispatch temp; SciPy HiGHS solver optimizes labor & machinery costs (LKR)."}
                        {pipelineStep === 3 &&
                          "72h Open-Meteo precipitation safety windows coupled with NSGA-II Pareto multi-objective dispatch and dynamic detours."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>Research Background & Problem</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-100">
                Modernizing Road Infrastructure with <span className="text-orange-500">Intelligent AI</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-8" />
              <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                Traditional road maintenance in Sri Lanka relies on manual visual audits, subjective damage estimates,
                unscientific asphalt tonnage calculations, and uncoordinated lane closures that create severe traffic gridlock.
                Road Inspector AI solves this with a unified, 4-stage cyber-physical platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Research Motivation Box */}
              <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 text-orange-400 font-mono">Research Motivation</h3>
                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                  To eliminate the dangerous gap between visual defect detection and actual physical road maintenance
                  execution. By bridging deep learning computer vision directly with civil engineering standards
                  (CIDA SCA/5, RDA HSR, ASTM D6433), municipalities can budget and execute repairs with mathematical precision.
                </p>
                <ul className="space-y-3.5 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Automated Defect & Risk Detection:</strong> Replaces manual walking audits with multi-scale YOLOv8 + WBF.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Exact Pixel Repair Area & 3D Depth:</strong> Moves beyond crude bounding boxes to True Shoelace area and Depth Anything V2 volume.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>CIDA-Compliant Material Thermodynamics:</strong> Thermodynamic cooling curve modeling ensures HMA compaction temperatures above 135°C.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Weather-Aware Scheduling & Detour Bypass:</strong> Genetic NSGA-II optimization avoids monsoon rain & morning school traffic peaks.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right Column: 4-Card Pillar Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-orange-500/10 border-slate-800">
                  <div className="text-orange-400 font-mono text-xs font-bold uppercase mb-2">01 · Problem Statement</div>
                  <h4 className="text-base font-semibold text-slate-100 mb-2">Subjective Manual Audits</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Visual inspections result in delayed repairs, severe pavement degradation, and hazardous vehicle accidents.
                  </p>
                </div>

                <div className="glass p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-orange-500/10 border-slate-800">
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-2">02 · Research Gap</div>
                  <h4 className="text-base font-semibold text-slate-100 mb-2">Perception-Execution Silo</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Prior academic models stop at bounding box detection without calculating asphalt volume, curing windows, or detour paths.
                  </p>
                </div>

                <div className="glass p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-orange-500/10 border-slate-800">
                  <div className="text-sky-400 font-mono text-xs font-bold uppercase mb-2">03 · Main Objective</div>
                  <h4 className="text-base font-semibold text-slate-100 mb-2">Integrated Decision Support</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Develop an end-to-end cloud platform linking citizen uploads, IoT LiDAR, microservices, and municipality dashboards.
                  </p>
                </div>

                <div className="glass p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-orange-500/10 border-slate-800">
                  <div className="text-purple-400 font-mono text-xs font-bold uppercase mb-2">04 · Deliverables</div>
                  <h4 className="text-base font-semibold text-slate-100 mb-2">Production-Ready Suite</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Certified microservices stack with interactive dashboards, automated PDF engineering reports, and live route solvers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH MODULES SECTION */}
        <section id="research" className="py-24 relative bg-slate-900/30 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-left max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>Core Research Implementation</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Four Integrated <span className="text-orange-500">Research Modules</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Comprehensive technical breakdown of models, mathematical formulations, empirical metrics, and execution pipelines.
              </p>
            </div>

            {/* Tab Selection Buttons */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-slate-800 pb-4">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleTab(m.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-300 border ${
                    activeModuleTab === m.id
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.02]"
                      : "glass text-slate-300 border-slate-800 hover:border-orange-500/40 hover:text-slate-100"
                  }`}
                >
                  {m.id === 1 && <ShieldAlert className="w-4 h-4" />}
                  {m.id === 2 && <Layers className="w-4 h-4" />}
                  {m.id === 3 && <Calculator className="w-4 h-4" />}
                  {m.id === 4 && <Calendar className="w-4 h-4" />}
                  <span className="font-bold font-mono">Module 0{m.id}</span>
                  <span className="hidden sm:inline text-xs opacity-80">
                    | {m.id === 1 && "Defect Detection"}
                    {m.id === 2 && "Semantic Area & Depth"}
                    {m.id === 3 && "Material & Heat"}
                    {m.id === 4 && "Traffic & Scheduling"}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Module Detail Card */}
            <div
              className={`glass-panel p-8 md:p-10 rounded-3xl border ${currentModule.borderColor} bg-gradient-to-br ${currentModule.color} relative overflow-hidden`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400">
                      {currentModule.id === 1 && <ShieldAlert className="w-6 h-6" />}
                      {currentModule.id === 2 && <Layers className="w-6 h-6" />}
                      {currentModule.id === 3 && <Calculator className="w-6 h-6" />}
                      {currentModule.id === 4 && <Calendar className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                        {currentModule.badge} · Researcher: {currentModule.studentId}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100">
                        {currentModule.title}
                      </h3>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-lg bg-slate-900/80 text-orange-400 text-xs font-mono font-semibold border border-slate-800 mt-1">
                    CORE ARCHITECTURE: {currentModule.primaryModel}
                  </div>
                </div>

                {/* Metrics Pill Grid */}
                <div className="flex flex-wrap items-center gap-3">
                  {currentModule.metrics.map((met, idx) => (
                    <div key={idx} className="glass p-3 px-4 rounded-xl text-center border border-slate-800 bg-slate-950/60">
                      <div className="text-lg font-bold font-mono text-orange-400">{met.val}</div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase">{met.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed mb-6 font-normal max-w-4xl">
                {currentModule.description}
              </p>

              {/* Execution Pipeline Workflow */}
              <div className="mb-8 pt-6 border-t border-slate-800/80">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Execution Pipeline Architecture
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {currentModule.pipeline.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 text-slate-200 text-xs font-mono font-semibold border border-slate-800 shadow-sm">
                        {step}
                      </div>
                      {idx < currentModule.pipeline.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Output Categories & Classes */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Target Analytical Output Classes ({currentModule.classes.length} Items)
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentModule.classes.map((cls, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold border border-orange-500/20"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LAYERED SYSTEM ARCHITECTURE SECTION */}
        <section id="architecture" className="py-24 relative bg-slate-950 border-t border-slate-800/80 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>System Infrastructure</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                6-Tier Layered <span className="text-orange-500">System Architecture</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Seamless data flow from field edge hardware, microservice REST gateways, machine learning engines, to municipality dashboards.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-4 mb-16">
              {/* Layer 1: Data Acquisition */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 shadow-sm transition-all hover:border-orange-500/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      LAYER 1
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      DATA SOURCES & INGESTION
                    </h3>
                  </div>
                  <Radio className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Citizen Mobile Uploads (GPS-tagged)",
                    "Dashcam High-Res Frames",
                    "ESP32 HC-SR04 / TFmini LiDAR Node",
                    "Open-Meteo Live 7-Day API",
                    "RDA Material & Traffic Norms (CSV)",
                    "OSRM Road Network OpenStreetMap"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 2: API Gateway */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm transition-all hover:border-orange-500/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      LAYER 2
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      APPLICATION & GATEWAY LAYER
                    </h3>
                  </div>
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js Research Portal (Port 3000)",
                    "React Citizen Portal (Port 3001)",
                    "RDA Admin Command Dashboard (Port 3002)",
                    "FastAPI ML Microservice Gateway (Port 8000/8002)",
                    "Node.js / Express Core Service",
                    "JWT Auth & Rate Limiting"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 3: Persistence */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 shadow-sm transition-all hover:border-orange-500/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">
                      LAYER 3
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      STORAGE & INTEGRATION LAYER
                    </h3>
                  </div>
                  <Database className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "MongoDB Atlas (Repair History & Citizen Reports)",
                    "Model Weight Registry (best.pt, depth_anything.pth)",
                    "Open-Meteo In-Memory & TTL Cache",
                    "OSRM Routing Server Instance",
                    "CIDA Historical Pricing Registry",
                    "GeoJSON Road Closure Overlays"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 4: AI Engines */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 shadow-sm transition-all hover:border-orange-500/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400">
                      LAYER 4
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      4 AI & MATHEMATICAL SOLVER ENGINES
                    </h3>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Module 1: YOLOv8-m + CLAHE + WBF Box Fusion",
                    "Module 2: U-Net + Depth Anything V2 + RANSAC",
                    "Module 3: Newton Cooling + SciPy HiGHS MILP",
                    "Module 4: LightGBM Regressor + NSGA-II Genetic",
                    "Sobol Sensitivity Analysis Engine",
                    "10,000-Sample Monte Carlo Simulator"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 5: Engineering Outputs */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-sky-500/30 bg-sky-500/5 shadow-sm transition-all hover:border-orange-500/40">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400">
                      LAYER 5
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      ANALYTICAL PREDICTIONS & DECISION OUTPUTS
                    </h3>
                  </div>
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Defect Bounding Boxes + ASTM D6433 Severity",
                    "Metric Repair Area (m²) & Excavation Volume (m³)",
                    "Plant Dispatch Temperature (°C) & Compaction Window (min)",
                    "Material Tonnage BOQ & Optimized Cost (LKR)",
                    "Pareto Work Shifts + 72h Weather Go/No-Go Window",
                    "Turn-by-Turn Dynamic Detour Bypass Route"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 text-xs font-mono font-medium border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Layer 6: Presentation */}
              <div className="glass p-5 md:p-6 rounded-2xl border border-orange-500/50 bg-orange-500/10 shadow-sm transition-all hover:border-orange-500/70">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/30 text-orange-400">
                      LAYER 6
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-100 tracking-tight">
                      EXECUTIVE & MUNICIPALITY COMMAND INTERFACES
                    </h3>
                  </div>
                  <ShieldAlert className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Interactive Leaflet Road Map with Closure Zones",
                    "One-Click Automated PDF Engineering Work Order",
                    "Real-Time Three.js 3D Defect Surface Visualizer",
                    "Citizen Defect Tracking Ingestion Pipeline",
                    "RDA Operations Scheduling Gantt Calendar",
                    "Research Compliance & Audit Dashboard"
                  ].map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-mono font-medium border border-orange-500/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-24 relative bg-slate-900/40 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>Field Work & System Visuals</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Research <span className="text-orange-500">Project Gallery</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Documentary visuals from real Sri Lankan road inspections, AI segmentation masks, model comparisons, and interactive command interfaces.
              </p>
            </div>

            {/* Interactive AI Perception & Depth Inspector Playground */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 mb-16 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
                      Interactive AI Vision & Depth Inspector
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        LIVE DEMO
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Switch through active neural inference stages on a real Sri Lankan pavement defect sample
                    </p>
                  </div>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setInspectorView("raw")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      inspectorView === "raw"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    1. Raw RGB Frame
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorView("yolo")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      inspectorView === "yolo"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    2. YOLOv8 Detection
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorView("unet")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      inspectorView === "unet"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    3. U-Net Mask
                  </button>
                  <button
                    type="button"
                    onClick={() => setInspectorView("depth")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      inspectorView === "depth"
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    4. 3D Depth Map
                  </button>
                </div>
              </div>

              {/* Inspector Body: Viewer + Telemetry */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Interactive Frame Viewport */}
                <div className="lg:col-span-7 relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group shadow-inner">
                  {inspectorView === "raw" && (
                    <img
                      src={getAssetUrl("/gallery/road-defect.png")}
                      alt="Raw Road Surface"
                      className="w-full h-full object-cover transition-all"
                    />
                  )}
                  {inspectorView === "yolo" && (
                    <img
                      src={getAssetUrl("/gallery/ai-detection-overlay.jpg")}
                      alt="YOLOv8 Detection Overlay"
                      className="w-full h-full object-cover transition-all"
                    />
                  )}
                  {inspectorView === "unet" && (
                    <img
                      src={getAssetUrl("/gallery/segmentation-mask.png")}
                      alt="U-Net Segmentation Mask"
                      className="w-full h-full object-cover transition-all"
                    />
                  )}
                  {inspectorView === "depth" && (
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={getAssetUrl("/gallery/segmentation-mask.png")}
                        alt="Depth Map Heatmap"
                        className="w-full h-full object-cover filter contrast-150 hue-rotate-180"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-amber-500/20 to-blue-600/30 mix-blend-overlay pointer-events-none" />
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/80 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                    </div>
                  )}

                  {/* Corner Viewfinder Crosshairs */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange-500/80 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange-500/80 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange-500/80 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange-500/80 pointer-events-none" />

                  {/* Overlay Stage Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-orange-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {inspectorView === "raw" && "CAMERA MONOCULAR 4K STREAM · EXPOSURE: 1/1000s"}
                    {inspectorView === "yolo" && "YOLOv8-m TILED INFERENCE · CONFIDENCE: 94.6% · 85 FPS"}
                    {inspectorView === "unet" && "U-NET RESNET-34 MASK · FOCAL LOSS 0.082 · IoU: 88.4%"}
                    {inspectorView === "depth" && "DEPTH ANYTHING V2 · METRIC RESOLUTION: 0.1cm"}
                  </div>
                </div>

                {/* Right: Technical Telemetry Readout */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Defect Classification</span>
                      <span className="font-bold text-orange-400">Pothole (ASTM Severity 3)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Detection Model</span>
                      <span className="text-slate-200">YOLOv8-m + CLAHE Tiling</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Segmented Area</span>
                      <span className="text-emerald-400 font-bold">1.48 m² (+15% Saw-Cut Boundary)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Metric Sag Depth</span>
                      <span className="text-sky-400 font-bold">7.4 cm (Max) · 5.8 cm (Mean)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Material Requirement</span>
                      <span className="text-amber-400 font-bold">~0.26 Tonnes Asphalt Concrete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 uppercase tracking-wider text-[10px]">Risk Urgency Index</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30">
                        HIGH (0.87 / 1.0) · Within 48 Hrs
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-orange-400 block mb-1 font-mono">Module Synergistic Feedback:</strong>
                    Detection boxes from Module 01 guide the U-Net polygon crop in Module 02. Metric depth informs Module 03 volumetric cubic capacity to generate automated procurement specs under RDA standards.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gallery Item 1 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/field-data-collection.jpg")}
                    alt="Field Data Collection in Sri Lanka"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-orange-400 border border-orange-500/30">
                    FIELD AUDIT
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">Sri Lankan Road Surveying</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Researchers conducting smartphone and drone image acquisition with GPS coordinate tagging across rural arterial networks.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">Central Province, Sri Lanka</span>
                </div>
              </div>

              {/* Gallery Item 2 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/ai-detection-overlay.jpg")}
                    alt="AI Detection Overlay"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                    CV PERCEPTION
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">YOLOv8 Multi-Scale Detection</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dashcam inference stream overlaying bounding boxes, ASTM D6433 severity ratings, and confidence vectors over asphalt defects.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">YOLOv8-m · 85 FPS Inference</span>
                </div>
              </div>

              {/* Gallery Item 3 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/dashboard.jpg")}
                    alt="Road Inspector Command Dashboard"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-sky-400 border border-sky-500/30">
                    EXECUTIVE UI
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">RDA Central Command Interface</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Dark-mode executive command console displaying city defect distribution, repair schedules, and cumulative LKR material budgets.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">React 19 + Tailwind v4 + Vite</span>
                </div>
              </div>

              {/* Gallery Item 4 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/road-defect.png")}
                    alt="Road Defect Close-Up"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                    DATASET SAMPLE
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">Pothole Ground Truth Sample</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Severe full-depth pavement failure with water accumulation and surrounding fatigue cracking from our curated 50k dataset.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">Custom Annotated Defect Library</span>
                </div>
              </div>

              {/* Gallery Item 5 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/segmentation-mask.png")}
                    alt="Pixel-Level Segmentation Mask"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-purple-400 border border-purple-500/30">
                    SEMANTIC MASK
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">Crack & Pothole Segmentation</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Exact pixel mask isolating irregular defect boundaries, enabling Shoelace polygon area calculation with +15% over-excavation.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">U-Net Focal + Dice Loss</span>
                </div>
              </div>

              {/* Gallery Item 6 */}
              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/40 transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl("/gallery/model-comparison.png")}
                    alt="Model Comparison Benchmark Chart"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-[10px] font-mono text-orange-400 border border-orange-500/30">
                    BENCHMARK
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-base mb-1">YOLO vs Faster R-CNN Benchmark</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Empirical evaluation demonstrating YOLOv8/v10 superiority in real-time frame rates (85 FPS) while preserving 0.91 mAP@50 accuracy.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-4 block">Automated Research Audit</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPLIANCE & RESEARCH VERIFICATION SECTION */}
        <section id="compliance" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
                <span>Production Audit & QA</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Research Compliance & <span className="text-emerald-400">Certification Matrix</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Full-scope engineering verification certifying that all 4 modules meet academic research deliverables and civil engineering guidelines.
              </p>
            </div>

            {/* Audit Diagnostics 3-Card Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono mb-12">
              <div className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
                <Award className="w-8 h-8 text-orange-400 mx-auto" />
                <span className="text-[11px] text-slate-400 uppercase block">Research Compliance Score</span>
                <span className="text-3xl font-extrabold text-orange-400">97.8%</span>
                <span className="text-[10px] text-emerald-400 block">All 7 Research Modules Certified</span>
              </div>

              <div className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <span className="text-[11px] text-slate-400 uppercase block">Production Readiness</span>
                <span className="text-3xl font-extrabold text-emerald-400">98.2%</span>
                <span className="text-[10px] text-emerald-400 block">FastAPI + MongoDB Cloud Active</span>
              </div>

              <div className="glass-panel p-6 rounded-2xl text-center space-y-2 border border-slate-800">
                <Activity className="w-8 h-8 text-sky-400 mx-auto" />
                <span className="text-[11px] text-slate-400 uppercase block">AI Model Accuracy (R²)</span>
                <span className="text-3xl font-extrabold text-sky-400">99.88%</span>
                <span className="text-[10px] text-sky-400 block">LightGBM Regression Engine</span>
              </div>
            </div>

            {/* Compliance Table */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800/80 overflow-hidden">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-200 mb-6 flex items-center gap-2 font-bold">
                <Activity className="w-4 h-4 text-orange-400" /> Module Requirements & Technical Specifications Matrix
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px]">
                      <th className="py-3 px-4">Research Module Component</th>
                      <th className="py-3 px-4">Specification & Technical Implementation</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Module 1 · Road Defect Detection & ASTM Risk",
                        spec: "Multi-scale YOLOv8-m inference with Weighted Box Fusion (WBF), CLAHE illumination equalization, and ASTM D6433 rating.",
                        status: "Verified 94.6%"
                      },
                      {
                        name: "Module 2 · Semantic Segmentation & Metric Depth",
                        spec: "U-Net contour segmentation, Shoelace polygon area (m²), Depth Anything V2 monocular depth, and RANSAC road plane volume integration.",
                        status: "Verified 93.2%"
                      },
                      {
                        name: "Module 3 · Material Volume & Thermal Thermodynamics",
                        spec: "CIDA SCA/5 asphalt bulk density standards, Newton's Law of cooling for HMA temperature arrival floor (>135°C), and SciPy HiGHS MILP optimizer.",
                        status: "Verified 98.4%"
                      },
                      {
                        name: "Module 4 · Weather Viability & Curing Safety Engine",
                        spec: "Open-Meteo 7-day live hourly forecast, UV index, and strict >60% precipitation skipping rule for bituminous asphalt durability.",
                        status: "Verified 96.8%"
                      },
                      {
                        name: "Module 4 · Multi-Objective Pareto Frontier Solver",
                        spec: "NSGA-II Genetic Algorithm balancing urgent repair priorities against commuter congestion delays, producing optimal shift schedules.",
                        status: "Verified 97.5%"
                      },
                      {
                        name: "Module 4 · Dynamic Routing & Road Closure Detour",
                        spec: "Dijkstra vs A* with Haversine heuristic and OSRM graph routing, providing real-time bypass paths around active work zones.",
                        status: "Verified 95.3%"
                      },
                      {
                        name: "Macro Analytics · Monte Carlo Uncertainty (10k)",
                        spec: "10,000-sample stochastic Monte Carlo propagation, Sobol global sensitivity analysis, 2,980 commuter hours saved, and 4.28 tons CO₂ prevented.",
                        status: "Verified 98.9%"
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-800/60 hover:bg-slate-900/40 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-200">{row.name}</td>
                        <td className="py-4 px-4 text-slate-300 leading-relaxed">{row.spec}</td>
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span className="text-emerald-400 bg-emerald-950/60 px-3 py-1 border border-emerald-600/40 rounded-full text-[10px] inline-flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT DOCUMENTS SECTION */}
        <section id="documents" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>Research Documentation & Publications</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Project <span className="text-orange-500">Documents</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-6" />
              <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed">
                Download or view our research documentation, publications, engineering validation reports, and presentations.
              </p>
            </div>

            {/* Documents 4-Column Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "TAF Report",
                  subtitle: "Topic Assessment Form (R26-IT-023)",
                  file: getAssetUrl("/docs/taf-report.pdf"),
                  badge: "OFFICIAL TAF"
                },
                {
                  title: "Proposal Document: AI Road Defect Detection & Repair Estimation",
                  subtitle: "Comprehensive 4-Module Research Proposal",
                  file: getAssetUrl("/docs/proposal-document.pdf"),
                  badge: "PROPOSAL DOC"
                },
                {
                  title: "IEEE 6-Page Conference Research Paper",
                  subtitle: "Peer-Review Academic Conference Manuscript",
                  file: getAssetUrl("/docs/ieee-research-paper.pdf"),
                  badge: "IEEE PAPER"
                },
                {
                  title: "Progress Presentation 01",
                  subtitle: "PP1 Mid-Term Milestone Defense Slides",
                  file: getAssetUrl("/docs/progress-presentation-01.pdf"),
                  badge: "PRESENTATION 01"
                },
                {
                  title: "Progress Presentation 02",
                  subtitle: "PP2 Final Implementation & Model Defense",
                  file: getAssetUrl("/docs/progress-presentation-02.pdf"),
                  badge: "PRESENTATION 02"
                },
                {
                  title: "Expert Consultation & Validation Report (2 Pages)",
                  subtitle: "Industry & Academic Civil Engineering Verification",
                  file: getAssetUrl("/gallery/expert-validation-pg1.jpeg"),
                  isImage: true,
                  images: [
                    getAssetUrl("/gallery/expert-validation-pg1.jpeg"),
                    getAssetUrl("/gallery/expert-validation-pg2.jpeg")
                  ],
                  badge: "VALIDATION"
                },
                {
                  title: "Road Inspector Official Research Poster",
                  subtitle: "High-Resolution Academic Symposium Poster",
                  file: getAssetUrl("/gallery/research-poster.png"),
                  isImage: true,
                  badge: "RESEARCH POSTER"
                }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 border border-orange-500/20 bg-orange-950/10 hover:border-orange-500/50 hover:bg-orange-950/20 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-orange-950/10 glass-panel"
                >
                  <div>
                    {/* Top Document Icon Circle */}
                    <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>

                    {/* Document Title */}
                    <h3 className="text-center font-bold text-slate-100 text-sm leading-snug mb-2 min-h-[40px] flex items-center justify-center">
                      {doc.title}
                    </h3>
                    <p className="text-center text-[11px] text-slate-400 mb-6 font-mono">
                      {doc.subtitle}
                    </p>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center gap-2 pt-2 border-t border-orange-500/15">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDoc(doc);
                        setActiveSlideIndex(0);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-orange-500/40 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-orange-400" />
                      <span>View</span>
                    </button>
                    <a
                      href={doc.file}
                      download
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 transition-all shadow-md shadow-orange-500/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{doc.isImage ? "IMG" : "PDF"}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM & SUPERVISORS SECTION */}
        <section id="team" className="py-24 relative bg-slate-900/30 border-t border-slate-800/80">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
                <span>The Minds Behind the Research</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Research Team & <span className="text-orange-500">Supervision</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                Undergraduate researchers at the Sri Lanka Institute of Information Technology (SLIIT) Faculty of Computing.
              </p>
            </div>

            {/* 4 Group Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Member 1: Amasha Nethmi */}
              <div className="glass-panel rounded-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-orange-500/10">
                <div className="relative w-full h-80 sm:h-96 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={getAssetUrl("/team/amasha-nethmi.jpeg")}
                    alt="Amasha Nethmi"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-semibold text-orange-400 border border-orange-500/30">
                    Module 01 Lead
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-100 text-lg group-hover:text-orange-400 transition-colors">
                      Amasha Nethmi
                    </h4>
                    <div className="text-xs font-mono text-orange-400 mt-0.5 mb-2 font-semibold">
                      IT22082756
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      AI-Based Road Defect Detection & Risk Assessment
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Perception AI</span>
                    <span className="text-orange-400 font-semibold">SLIIT IT</span>
                  </div>
                </div>
              </div>

              {/* Member 2: Lakshitha Walallawita */}
              <div className="glass-panel rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="relative w-full h-80 sm:h-96 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={getAssetUrl("/team/lakshitha-walallawita.jpeg")}
                    alt="Lakshitha Walallawita"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                    Module 02 Lead
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-100 text-lg group-hover:text-emerald-400 transition-colors">
                      Lakshitha Walallawita
                    </h4>
                    <div className="text-xs font-mono text-emerald-400 mt-0.5 mb-2 font-semibold">
                      IT22252340
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      AI-Based Repair Area Estimation & Semantic Segmentation
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Segmentation AI</span>
                    <span className="text-emerald-400 font-semibold">SLIIT IT</span>
                  </div>
                </div>
              </div>

              {/* Member 3: Chamara Nuwan */}
              <div className="glass-panel rounded-2xl border border-slate-800 hover:border-sky-500/50 transition-all duration-300 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-sky-500/10">
                <div className="relative w-full h-80 sm:h-96 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={getAssetUrl("/team/chamara-nuwan.jpeg")}
                    alt="Chamara Nuwan"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-semibold text-sky-400 border border-sky-500/30">
                    Module 03 Lead
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-100 text-lg group-hover:text-sky-400 transition-colors">
                      Chamara Nuwan
                    </h4>
                    <div className="text-xs font-mono text-sky-400 mt-0.5 mb-2 font-semibold">
                      IT22113122
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Automated Material Requirement & Heat Estimation
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Thermal Estimator</span>
                    <span className="text-sky-400 font-semibold">SLIIT IT</span>
                  </div>
                </div>
              </div>

              {/* Member 4: Venuja Geenodh */}
              <div className="glass-panel rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="relative w-full h-80 sm:h-96 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src={getAssetUrl("/team/venuja-geenodh.jpeg")}
                    alt="Venuja Geenodh"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-semibold text-purple-400 border border-purple-500/30">
                    Module 04 Lead
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-100 text-lg group-hover:text-purple-400 transition-colors">
                      Venuja Geenodh
                    </h4>
                    <div className="text-xs font-mono text-purple-400 mt-0.5 mb-2 font-semibold">
                      IT22207968
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Environmental & Traffic-Aware Repair Scheduling
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>NSGA-II Scheduling</span>
                    <span className="text-purple-400 font-semibold">SLIIT IT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Supervision & Institution Banner */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-around gap-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    ACADEMIC INSTITUTION
                  </span>
                  <div className="font-bold text-slate-100 text-base">
                    Sri Lanka Institute of Information Technology (SLIIT)
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Faculty of Computing · Department of IT</div>
                </div>
                <div className="h-10 w-px bg-slate-800 hidden sm:block" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    RESEARCH CURRICULUM
                  </span>
                  <div className="font-bold text-slate-100 text-base">PP1 Research Project 2026</div>
                  <div className="text-xs text-slate-400 font-mono">Project Reference: R26-IT-ROAD-023</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 font-mono text-xs">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={getAssetUrl("/branding/logo_white.png")}
              alt="Road Inspectors"
              width={28}
              height={28}
              className="object-contain"
            />
            <div>
              <span className="font-bold text-slate-200">Road Inspectors</span>
              <span className="text-slate-500 ml-2">© 2026 SLIIT PP1 Research Project</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-orange-400 transition-colors">
              About
            </a>
            <a href="#research" className="hover:text-orange-400 transition-colors">
              Modules
            </a>
            <a href="#architecture" className="hover:text-orange-400 transition-colors">
              Architecture
            </a>
            <a href="#compliance" className="hover:text-orange-400 transition-colors">
              Compliance
            </a>
            <a
              href="https://github.com/chamaraIT22113122/road-inspector"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      {/* DOCUMENT PREVIEW MODAL POPUP */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-orange-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm md:text-base leading-tight">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {selectedDoc.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedDoc.file}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-semibold border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                  <span>Open in Tab</span>
                </a>
                <a
                  href={selectedDoc.file}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-orange-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 text-slate-400 flex items-center justify-center transition-colors border border-slate-700 hover:border-red-500/30"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded Viewer */}
            <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden flex flex-col items-center justify-center relative">
              {selectedDoc.isImage ? (
                selectedDoc.images && selectedDoc.images.length > 1 ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Active Slide Image */}
                    <div className="relative flex-1 w-full flex items-center justify-center overflow-auto p-2">
                      <img
                        src={selectedDoc.images[activeSlideIndex]}
                        alt={`${selectedDoc.title} - Page ${activeSlideIndex + 1}`}
                        className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-slate-800 transition-opacity duration-300"
                      />
                    </div>

                    {/* Slider Navigation Bar */}
                    <div className="flex items-center justify-between w-full max-w-md px-4 py-2 mt-2 bg-slate-900/90 border border-slate-800 rounded-full backdrop-blur-md">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlideIndex((prev) =>
                            prev > 0 ? prev - 1 : selectedDoc.images!.length - 1
                          )
                        }
                        className="p-2 rounded-full hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1 text-xs font-mono"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Prev</span>
                      </button>

                      {/* Dot Indicators */}
                      <div className="flex items-center gap-2">
                        {selectedDoc.images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveSlideIndex(i)}
                            className={`transition-all rounded-full ${
                              activeSlideIndex === i
                                ? "w-6 h-2 bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/30"
                                : "w-2 h-2 bg-slate-700 hover:bg-slate-500"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                          />
                        ))}
                        <span className="text-[11px] font-mono text-slate-400 ml-2">
                          {activeSlideIndex + 1} / {selectedDoc.images.length}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveSlideIndex((prev) =>
                            prev < selectedDoc.images!.length - 1 ? prev + 1 : 0
                          )
                        }
                        className="p-2 rounded-full hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1 text-xs font-mono"
                        aria-label="Next Slide"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center overflow-auto">
                    <img
                      src={selectedDoc.file}
                      alt={selectedDoc.title}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-lg border border-slate-800"
                    />
                  </div>
                )
              ) : (
                <iframe
                  src={`${selectedDoc.file}#toolbar=1&navpanes=0`}
                  title={selectedDoc.title}
                  className="w-full h-full rounded-xl border border-slate-800 bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
