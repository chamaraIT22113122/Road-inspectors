"use client";

import React, { useState, useRef, useCallback } from "react";
import { Camera, SlidersHorizontal, Layers, ShieldAlert, Cpu } from "lucide-react";

interface VisionInspectorProps {
  getAssetUrl: (path: string) => string;
}

export default function VisionInspector({ getAssetUrl }: VisionInspectorProps) {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [activeModel, setActiveModel] = useState<"yolo" | "unet" | "depth">("yolo");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 mb-16 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 flex items-center gap-2">
              Interactive AI Vision &amp; Depth Inspector
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                DRAG SLIDER TO REVEAL
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Drag the split divider horizontally to compare raw 4K road footage against neural inference overlays
            </p>
          </div>
        </div>

        {/* Model Layer Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveModel("yolo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeModel === "yolo"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>YOLOv8 Detection</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModel("unet")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeModel === "unet"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>U-Net Mask (Area)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModel("depth")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeModel === "depth"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3D Depth Map</span>
          </button>
        </div>
      </div>

      {/* Main Split-View Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left 7 Cols: Draggable Viewport */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onClick={handleContainerClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 select-none cursor-ew-resize group shadow-2xl"
          >
            {/* UNDER LAYER: Raw RGB Road Frame */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={getAssetUrl("/gallery/road-defect.png")}
                alt="Raw Road Surface"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-slate-800">
                RAW MONOCULAR FEED
              </div>
            </div>

            {/* OVER LAYER: AI Inference with clip-path matching slider */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
              }}
            >
              {activeModel === "yolo" && (
                <img
                  src={getAssetUrl("/gallery/ai-detection-overlay.jpg")}
                  alt="YOLOv8 Detection Overlay"
                  className="w-full h-full object-cover"
                />
              )}
              {activeModel === "unet" && (
                <img
                  src={getAssetUrl("/gallery/segmentation-mask.png")}
                  alt="U-Net Segmentation Mask"
                  className="w-full h-full object-cover"
                />
              )}
              {activeModel === "depth" && (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={getAssetUrl("/gallery/segmentation-mask.png")}
                    alt="Depth Heatmap"
                    className="w-full h-full object-cover filter contrast-150 hue-rotate-180"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-amber-500/20 to-blue-600/30 mix-blend-overlay" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400/80 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                </div>
              )}

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-orange-500/80 backdrop-blur-md text-[10px] font-mono text-white font-bold border border-orange-400/50">
                {activeModel === "yolo" && "YOLOv8-m (85 FPS)"}
                {activeModel === "unet" && "U-NET RESNET-34"}
                {activeModel === "depth" && "DEPTH ANYTHING V2"}
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-amber-300 to-sky-400 shadow-[0_0_10px_#f97316] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                onMouseDown={handleMouseDown}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-orange-400 shadow-lg shadow-orange-500/40 flex items-center justify-center text-orange-400 cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Corner Viewfinder Crosshairs */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-orange-500/80 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-orange-500/80 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-orange-500/80 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-orange-500/80 pointer-events-none" />

            {/* Bottom Telemetry Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[10px] font-mono text-slate-300 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                SPLIT RATIO: {Math.round(sliderPos)}% / {100 - Math.round(sliderPos)}%
              </span>
              <span className="text-orange-400">DRAG OR CLICK TO INSPECT</span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Technical Telemetry & Output */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Defect Classification</span>
              <span className="font-bold text-orange-400">Pothole (ASTM Severity 3)</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Detection Model</span>
              <span className="text-slate-200">YOLOv8-m + CLAHE Equalization</span>
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
  );
}
