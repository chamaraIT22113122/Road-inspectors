"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Users,
  User,
  MessageSquare,
  FileText,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  CheckSquare,
  Square
} from "lucide-react";

interface LeadContact {
  id: string;
  name: string;
  studentId: string;
  module: string;
  moduleShort: string;
  role: string;
  email: string;
  image: string;
  accent: string;
  tagColor: string;
  borderColor: string;
  bgActive: string;
  topics: string[];
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const getAssetUrl = (path: string) => `${basePath}${path}`;

export default function ContactSection() {
  const leads: LeadContact[] = [
    {
      id: "amasha",
      name: "Amasha Nethmi",
      studentId: "IT22082756",
      module: "Module 01 Lead",
      moduleShort: "M1",
      role: "Perception AI & Defect Detection",
      email: "it22082756@my.sliit.lk",
      image: "/team/amasha-nethmi.jpeg",
      accent: "text-orange-400",
      tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      borderColor: "border-orange-500/40",
      bgActive: "bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.25)]",
      topics: ["Road Defect Detection", "ASTM Severity Vector"]
    },
    {
      id: "lakshitha",
      name: "Lakshitha Walallawita",
      studentId: "IT22252340",
      module: "Module 02 Lead",
      moduleShort: "M2",
      role: "Geometric AI & Depth Estimation",
      email: "it22252340@my.sliit.lk",
      image: "/team/lakshitha-walallawita.jpeg",
      accent: "text-emerald-400",
      tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      borderColor: "border-emerald-500/40",
      bgActive: "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
      topics: ["Suzuki-Abe Segmentation", "Metric 3D Depth & Volume"]
    },
    {
      id: "chamara",
      name: "Chamara Nuwan",
      studentId: "IT22113122",
      module: "Module 03 Lead",
      moduleShort: "M3",
      role: "Material & Heat BOQ Estimation",
      email: "it22113122@my.sliit.lk",
      image: "/team/chamara-nuwan.jpeg",
      accent: "text-sky-400",
      tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
      borderColor: "border-sky-500/40",
      bgActive: "bg-gradient-to-r from-sky-500/20 to-blue-500/10 border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      topics: ["HMA Thermal Decay", "MILP Resource BOQ"]
    },
    {
      id: "venuja",
      name: "Venuja Geenodh",
      studentId: "IT22207968",
      module: "Module 04 Lead",
      moduleShort: "M4",
      role: "Traffic & Repair Scheduling AI",
      email: "it22207968@my.sliit.lk",
      image: "/team/venuja-geenodh.jpeg",
      accent: "text-purple-400",
      tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      borderColor: "border-purple-500/40",
      bgActive: "bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
      topics: ["NSGA-II Repair Scheduling", "OSRM Dynamic Detour"]
    }
  ];

  // Multi-selection state: 1 or more leads, or all 4
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>(["chamara"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentTimestamp, setSentTimestamp] = useState<string>("");

  const selectedLeads = leads.filter((l) => selectedLeadIds.includes(l.id));
  const isAllSelected = selectedLeadIds.length === leads.length;

  const targetEmail = selectedLeads.map((l) => l.email).join(", ");
  const targetName = isAllSelected
    ? "All 4 Research Leads"
    : selectedLeads.map((l) => l.name).join(", ");

  const toggleLeadSelection = (id: string) => {
    setSelectedLeadIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least 1 lead selected
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectAllLeads = () => {
    if (isAllSelected) {
      setSelectedLeadIds(["chamara"]);
    } else {
      setSelectedLeadIds(leads.map((l) => l.id));
    }
  };

  const researchTopics = [
    { title: "Road Defect Detection", leadId: "amasha" },
    { title: "ASTM Severity Vector", leadId: "amasha" },
    { title: "Suzuki-Abe Segmentation", leadId: "lakshitha" },
    { title: "Metric 3D Depth & Volume", leadId: "lakshitha" },
    { title: "HMA Thermal Decay", leadId: "chamara" },
    { title: "MILP Resource BOQ", leadId: "chamara" },
    { title: "NSGA-II Repair Scheduling", leadId: "venuja" },
    { title: "OSRM Dynamic Detour", leadId: "venuja" }
  ];

  const handleTopicClick = (topic: { title: string; leadId: string }) => {
    setSelectedTopic(topic.title);
    // Add the lead if not already selected
    if (!selectedLeadIds.includes(topic.leadId)) {
      setSelectedLeadIds([topic.leadId]);
    }
    setFormData((prev) => ({
      ...prev,
      subject: `Inquiry regarding ${topic.title}`
    }));
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === "message") {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } else {
      setCopiedEmail(type);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          recipientEmail: targetEmail,
          recipientName: targetName,
          subject: formData.subject || `Academic Inquiry regarding Road Inspectors`,
          message: formData.message
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch email directly.");
      }

      setSentTimestamp(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Direct email dispatch error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to dispatch email directly. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/95 border-t border-slate-800/80">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300">Research Group</span>
          </h2>

          <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            Inquire about the Road Inspectors architecture, datasets, or academic collaboration. Choose 1 or more leads, or select All 4 to dispatch directly to their inbox.
          </p>
        </div>

        {/* Content Grid (Balanced 5 cols / 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Researchers & Institution Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* 1. Research Lead Contacts with Multi-Select and All 4 Option */}
            <div className="rounded-3xl border border-sky-500/25 bg-[#0b1324]/90 backdrop-blur-xl p-6 shadow-2xl shadow-sky-950/30 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Select Research Leads</h3>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Select 1 or more leads (or All 4)
                      </p>
                    </div>
                  </div>

                  {/* All 4 Leads Toggle Button */}
                  <button
                    type="button"
                    onClick={selectAllLeads}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isAllSelected
                        ? "bg-sky-500/25 border-sky-400 text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-sky-500/40 hover:text-sky-300"
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isAllSelected ? "text-sky-300" : "opacity-40"}`} />
                    <span>All 4 Leads</span>
                  </button>
                </div>

                {/* 4 Leads List with Toggle Checkbox & Thumbnails */}
                <div className="space-y-2.5">
                  {leads.map((lead) => {
                    const isSelected = selectedLeadIds.includes(lead.id);
                    return (
                      <div
                        key={lead.id}
                        onClick={() => toggleLeadSelection(lead.id)}
                        className={`group p-3 rounded-2xl border transition-all duration-300 cursor-pointer text-left flex items-center justify-between gap-3 relative overflow-hidden ${
                          isSelected
                            ? lead.bgActive
                            : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50 opacity-75 hover:opacity-100"
                        }`}
                      >
                        {/* Member Thumbnail & Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Selection Checkbox Pill */}
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                              : "border-slate-700 bg-slate-900 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>

                          <div className={`relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                            isSelected ? "border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]" : "border-slate-800"
                          }`}>
                            <Image
                              src={getAssetUrl(lead.image)}
                              alt={lead.name}
                              fill
                              sizes="44px"
                              className="object-cover object-top"
                            />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${lead.accent}`}>
                                {lead.module}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">· {lead.studentId}</span>
                            </div>
                            <div className="text-sm font-semibold text-slate-100 truncate flex items-center gap-1.5">
                              <span>{lead.name}</span>
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                  Selected
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">{lead.role}</p>
                          </div>
                        </div>

                        {/* Copy Email Button */}
                        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleCopy(lead.email, lead.id)}
                            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 text-slate-400 hover:text-sky-300 transition-colors"
                            title={`Copy ${lead.email}`}
                          >
                            {copiedEmail === lead.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Updated Academic Supervisors Info */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 text-[11px] font-mono space-y-2">
                <div className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  Academic Supervisors
                </div>

                {/* Supervisor: S.M.Budika Harshanath */}
                <div className="flex items-center justify-between text-slate-300 gap-2">
                  <span className="truncate font-sans font-medium">S.M.Budika Harshanath</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-sky-400 text-xs">harshanath.s@sliit.lk</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("harshanath.s@sliit.lk", "sup")}
                      className="text-slate-500 hover:text-sky-300 p-0.5 transition-colors"
                      title="Copy Email"
                    >
                      {copiedEmail === "sup" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Co-Supervisor: Samantha Rajapaksha */}
                <div className="flex items-center justify-between text-slate-300 gap-2">
                  <span className="truncate font-sans font-medium">Samantha Rajapaksha</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-sky-400 text-xs">samantha.r@sliit.lk</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("samantha.r@sliit.lk", "cosup")}
                      className="text-slate-500 hover:text-sky-300 p-0.5 transition-colors"
                      title="Copy Email"
                    >
                      {copiedEmail === "cosup" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Institution Address (Compact & Clean) */}
            <div className="rounded-3xl border border-sky-500/25 bg-[#0b1324]/90 backdrop-blur-xl p-5 shadow-2xl shadow-sky-950/20 hover:border-sky-500/40 transition-all duration-300">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-sm font-bold text-slate-100 truncate">SLIIT Faculty of Computing</h3>
                  <p className="text-xs text-slate-300 truncate font-sans">
                    Department of Information Technology · Malabe, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send an Academic Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="rounded-3xl border border-sky-500/25 bg-[#0b1324]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-sky-950/30 flex-1 flex flex-col justify-between relative overflow-hidden">
              {/* Card Header & Selected Lead Chip */}
              <div>
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                      <span>Send an Academic Inquiry</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Direct automated delivery to the selected lead inboxes
                    </p>
                  </div>

                  {/* Active Recipient Pill */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/60 border border-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      To:{" "}
                      <span className="text-sky-300">
                        {isAllSelected
                          ? "All 4 Leads"
                          : selectedLeads.length > 1
                          ? `${selectedLeads.length} Leads (${selectedLeads.map((l) => l.name.split(" ")[0]).join(", ")})`
                          : `${selectedLeads[0].name.split(" ")[0]} (${selectedLeads[0].moduleShort})`}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Interactive Research Topics (Compact Auto-fill pills) */}
                <div className="mb-5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                    <span className="uppercase tracking-wider font-semibold text-slate-300">
                      ⚡ Quick Topics (Click to Auto-fill)
                    </span>
                    <span className="text-slate-500">Auto-routes to module lead</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {researchTopics.map((item) => {
                      const isSelected = selectedTopic === item.title;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => handleTopicClick(item)}
                          className={`text-xs px-2.5 py-1 rounded-lg transition-all duration-200 font-sans border text-left cursor-pointer ${
                            isSelected
                              ? "bg-sky-500/25 border-sky-400 text-sky-200 font-semibold shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-sky-500/40 hover:text-sky-200"
                          }`}
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {submitted ? (
                /* Sleek Transmission Success Receipt */
                <div className="py-8 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 my-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-slate-100">Inquiry Delivered Directly!</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your message was successfully transmitted via Resend to{" "}
                      <span className="font-semibold text-sky-300">{targetName}</span>.
                    </p>
                  </div>

                  {/* Boarding-pass style Transmission Receipt */}
                  <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-left text-xs font-mono space-y-2.5 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                        Transmission Receipt
                      </span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified &amp; Delivered
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-500">Recipients:</span>
                      <span className="col-span-2 text-slate-200 truncate font-semibold">{targetName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-500">Inboxes:</span>
                      <span className="col-span-2 text-sky-400 truncate">{targetEmail}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-500">Sender:</span>
                      <span className="col-span-2 text-slate-200 truncate">{formData.name} &lt;{formData.email}&gt;</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-500">Subject:</span>
                      <span className="col-span-2 text-slate-300 truncate">{formData.subject || "General Inquiry"}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-slate-500">Time:</span>
                      <span className="col-span-2 text-slate-400 truncate">{sentTimestamp} · Resend Engine</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                        setSelectedTopic(null);
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `To: ${targetEmail}\nSubject: ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`,
                          "message"
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-200 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Receipt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Your Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-sky-400" />
                        <span>Your Name</span>
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Kasun Perera"
                        className="w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border border-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-100 placeholder-slate-500 text-sm transition-all shadow-inner"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        <span>Email Address</span>
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@institution.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border border-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-100 placeholder-slate-500 text-sm transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Subject / Topic */}
                  <div className="space-y-1.5">
                    <label htmlFor="inquiry-subject" className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-sky-400" />
                      <span>Subject / Research Topic</span>
                    </label>
                    <input
                      id="inquiry-subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Road Distress Dataset / Research Collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border border-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-100 placeholder-slate-500 text-sm transition-all shadow-inner"
                    />
                  </div>

                  {/* Message Content */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                        <span>Message Content</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="inquiry-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry regarding Road Defect Detection, Severity Assessment, Material & Thermal BOQ, or Academic Collaboration..."
                      className="w-full px-4 py-3 rounded-xl bg-[#070b14]/90 border border-slate-800 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-100 placeholder-slate-500 text-sm transition-all resize-y min-h-[120px] shadow-inner"
                    />
                  </div>

                  {/* Dispatch Target Indicator */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-400">Dispatching to:</span>
                      <span className="text-sky-300 font-semibold truncate">
                        {targetName}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 font-sans">
                      Verified Delivery
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 px-6 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] transition-all duration-300 shadow-xl shadow-sky-600/35 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2.5">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to {isAllSelected ? "All 4 Leads" : `${selectedLeads.length} Lead(s)`}...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>
                          Send Inquiry to{" "}
                          {isAllSelected
                            ? "All 4 Leads"
                            : selectedLeads.length > 1
                            ? `${selectedLeads.length} Leads`
                            : selectedLeads[0].name.split(" ")[0]}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
