"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Eye,
  Download,
  Copy,
  Check,
  Quote,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DocItem {
  id: string;
  title: string;
  subtitle: string;
  file: string;
  badge: string;
  category: "papers" | "presentations" | "reports";
  isPaper?: boolean;
  isImage?: boolean;
  images?: string[];
}

interface DocumentSectionProps {
  getAssetUrl: (path: string) => string;
}

export default function DocumentSection({ getAssetUrl }: DocumentSectionProps) {
  const [docFilter, setDocFilter] = useState<"all" | "papers" | "presentations" | "reports">("all");
  const [docSearchQuery, setDocSearchQuery] = useState<string>("");
  const [citationModalOpen, setCitationModalOpen] = useState<boolean>(false);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const allDocs: DocItem[] = [
    {
      id: "taf",
      title: "TAF Report",
      subtitle: "Topic Assessment Form (R26-IT-023)",
      file: getAssetUrl("/docs/taf-report.pdf"),
      badge: "OFFICIAL TAF",
      category: "reports"
    },
    {
      id: "proposal",
      title: "Proposal Document: AI Road Defect Detection & Repair Estimation",
      subtitle: "Comprehensive 4-Module Research Proposal",
      file: getAssetUrl("/docs/proposal-document.pdf"),
      badge: "PROPOSAL DOC",
      category: "reports"
    },
    {
      id: "ieee",
      title: "IEEE 6-Page Conference Research Paper",
      subtitle: "Peer-Review Academic Conference Manuscript",
      file: getAssetUrl("/docs/ieee-research-paper.pdf"),
      badge: "IEEE PAPER",
      category: "papers",
      isPaper: true
    },
    {
      id: "pp1",
      title: "Progress Presentation 01",
      subtitle: "PP1 Mid-Term Milestone Defense Slides",
      file: getAssetUrl("/docs/progress-presentation-01.pdf"),
      badge: "PRESENTATION 01",
      category: "presentations"
    },
    {
      id: "pp2",
      title: "Progress Presentation 02",
      subtitle: "PP2 Final Implementation & Model Defense",
      file: getAssetUrl("/docs/progress-presentation-02.pdf"),
      badge: "PRESENTATION 02",
      category: "presentations"
    },
    {
      id: "expert",
      title: "Expert Consultation & Validation Report (2 Pages)",
      subtitle: "Industry & Academic Civil Engineering Verification",
      file: getAssetUrl("/gallery/expert-validation-pg1.jpeg"),
      isImage: true,
      images: [
        getAssetUrl("/gallery/expert-validation-pg1.jpeg"),
        getAssetUrl("/gallery/expert-validation-pg2.jpeg")
      ],
      badge: "VALIDATION",
      category: "reports"
    },
    {
      id: "poster",
      title: "Road Inspector Official Research Poster",
      subtitle: "High-Resolution Academic Symposium Poster",
      file: getAssetUrl("/gallery/research-poster.png"),
      isImage: true,
      badge: "RESEARCH POSTER",
      category: "presentations"
    }
  ];

  const filteredDocs = allDocs.filter((doc) => {
    const matchesFilter = docFilter === "all" || doc.category === docFilter;
    const matchesSearch =
      docSearchQuery.trim() === "" ||
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.badge.toLowerCase().includes(docSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const bibtexCitation = `@inproceedings{roadinspector2026,
  author    = {Nethmi, Amasha and Walallawita, Lakshitha and Nuwan, Chamara and Geenodh, Venuja},
  title     = {Intelligent Decision Support System for Road Defect Inspection, Semantic Area Estimation, Material Thermodynamics, and Traffic-Aware Scheduling},
  booktitle = {IEEE International Conference on Advances in ICT for Emerging Regions (ICTer)},
  year      = {2026},
  pages     = {1--6},
  publisher = {IEEE},
  address   = {Colombo, Sri Lanka},
  keywords  = {Deep Learning, YOLOv8, Semantic Segmentation, Newton's Law of Cooling, NSGA-II, CIDA SCA/5}
}`;

  const copyCitation = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2500);
  };

  // Keyboard accessibility: Escape to close modals, Arrow keys for slide navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedDoc) setSelectedDoc(null);
        if (citationModalOpen) setCitationModalOpen(false);
      } else if (e.key === "ArrowLeft" && selectedDoc?.images && selectedDoc.images.length > 1) {
        setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : selectedDoc.images!.length - 1));
      } else if (e.key === "ArrowRight" && selectedDoc?.images && selectedDoc.images.length > 1) {
        setActiveSlideIndex((prev) => (prev < selectedDoc.images!.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDoc, citationModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedDoc || citationModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedDoc, citationModalOpen]);

  return (
    <section id="documents" className="py-24 relative bg-slate-950 border-t border-slate-800/80">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-orange-500/20">
            <span>Research Documentation &amp; Publications</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Project <span className="text-orange-500">Documents</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-6" />
          <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            Download or view our research documentation, publications, engineering validation reports, and presentations.
          </p>
        </div>

        {/* Search Bar & Category Filter Chips */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {[
                { id: "all", label: "All Items", count: allDocs.length },
                { id: "papers", label: "Papers", count: allDocs.filter((d) => d.category === "papers").length },
                {
                  id: "presentations",
                  label: "Presentations",
                  count: allDocs.filter((d) => d.category === "presentations").length
                },
                { id: "reports", label: "Reports", count: allDocs.filter((d) => d.category === "reports").length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDocFilter(tab.id as "all" | "papers" | "presentations" | "reports")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                    docFilter === tab.id
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-500/20"
                      : "glass text-slate-400 border-slate-800 hover:text-slate-200 hover:border-orange-500/30"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search publications..."
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              {docSearchQuery && (
                <button
                  type="button"
                  onClick={() => setDocSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Documents Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl p-6 border border-orange-500/20 bg-orange-950/10 hover:border-orange-500/50 hover:bg-orange-950/20 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-orange-950/10 glass-panel"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-orange-400 border border-orange-500/20">
                    {doc.badge}
                  </span>
                  {doc.isPaper && (
                    <button
                      type="button"
                      onClick={() => setCitationModalOpen(true)}
                      className="text-[11px] font-mono text-slate-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
                      title="Cite this paper"
                    >
                      <Quote className="w-3 h-3 text-orange-400" />
                      <span>Cite</span>
                    </button>
                  )}
                </div>

                {/* Document Icon */}
                <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-5 text-orange-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>

                {/* Document Title & Subtitle */}
                <h3 className="text-center font-bold text-slate-100 text-sm leading-snug mb-2 min-h-[40px] flex items-center justify-center">
                  {doc.title}
                </h3>
                <p className="text-center text-[11px] text-slate-400 mb-6 font-mono">{doc.subtitle}</p>
              </div>

              {/* Action Buttons Row */}
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

        {filteredDocs.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl border border-slate-800">
            <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 font-mono text-sm">No research documents matched &quot;{docSearchQuery}&quot;</p>
            <button
              type="button"
              onClick={() => {
                setDocSearchQuery("");
                setDocFilter("all");
              }}
              className="mt-3 text-xs font-mono text-orange-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* CITATION MODAL (BibTeX) */}
      {citationModalOpen && (
        <div
          onClick={() => setCitationModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-slate-900 border border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl glass-panel space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">Cite IEEE Research Paper</h3>
                  <p className="text-xs font-mono text-slate-400">BibTeX Format for LaTeX &amp; Academic Journals</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCitationModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
              {bibtexCitation}
            </pre>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={copyCitation}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-mono font-semibold text-xs flex items-center gap-2 hover:from-orange-500 hover:to-amber-500 transition-all shadow-md shadow-orange-500/20"
              >
                {citationCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDoc && (
        <div
          onClick={() => setSelectedDoc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
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
                  <h3 className="font-bold text-slate-100 text-sm md:text-base leading-tight">{selectedDoc.title}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedDoc.subtitle}</p>
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
    </section>
  );
}
