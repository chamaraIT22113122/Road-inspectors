"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Minimize2,
  Filter,
  Eye,
  SlidersHorizontal,
  Search,
  Sparkles,
  CheckCircle2,
  Download,
  Copy,
  Grid,
  Columns,
  List,
  ShieldAlert,
  ArrowUpDown
} from "lucide-react";

export interface SiteVisitPhoto {
  id: number;
  filename: string;
  title: string;
  category: "pothole" | "crack" | "surface" | "survey";
  categoryLabel: string;
  severity: "Critical" | "High" | "Moderate" | "Low";
  location: string;
  aspect: "landscape" | "portrait";
  astmDistress: string;
  cidaSpec: string;
  targetModule: "Module 01: Perception AI" | "Module 02: Metric Segmentation" | "Module 03: Material Thermodynamics" | "Module 04: Detour & Scheduling";
  estimatedArea: string;
  estimatedDepth: string;
  notes: string;
  tags: string[];
}

export const SITE_VISIT_PHOTOS: SiteVisitPhoto[] = [
  {
    id: 1,
    filename: "site-visit-01.jpg",
    title: "Arterial Road Corridor Survey",
    category: "survey",
    categoryLabel: "Corridor Survey",
    severity: "Moderate",
    location: "A1 Colombo - Kandy Inter-District Highway (km 42.5)",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - Corrugated Alignment & Edge Deterioration",
    cidaSpec: "CIDA SCA/5 Sec 4.1: Edge Saw-Cutting & Aggregate Shoulder Leveling",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "18.4 m²",
    estimatedDepth: "3.2 cm",
    notes: "Panoramic roadway capture documenting pavement edge disintegration, drainage curb alignment, and high-speed transit lane wear across multi-axle freight trajectories.",
    tags: ["Road Alignment", "Corridor Survey", "Baseline"]
  },
  {
    id: 2,
    filename: "site-visit-02.jpg",
    title: "Longitudinal Shoulder Boundary Separation",
    category: "crack",
    categoryLabel: "Cracks & Fissures",
    severity: "High",
    location: "Rural Arterial Shoulder Edge, Kegalle District",
    aspect: "portrait",
    astmDistress: "ASTM D6433 - 10: Longitudinal Cracking (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 5.2: Rubberized Emulsion Joint Crack Sealing",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "3.8 m²",
    estimatedDepth: "4.5 cm",
    notes: "Severe longitudinal crack propagating along the wheelpath-shoulder interface caused by sub-base moisture intrusion and lateral embankment shifting under monsoon runoff.",
    tags: ["Longitudinal Crack", "Shoulder Separation", "Fissure"]
  },
  {
    id: 3,
    filename: "site-visit-03.jpg",
    title: "Subgrade Failure & Core Pavement Depression",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Provincial Highway Section km 14.2, Ambepussa",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: High-Severity Pothole (Structural Void)",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Full Depth 50mm HMA Patching + 15% Perimeter Cut",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "1.65 m²",
    estimatedDepth: "8.4 cm",
    notes: "Full-depth pavement breakdown exposing lower aggregate foundation. Classified as critical ASTM D6433 hazard requiring urgent CIDA SCA/5 patching and saw-cut perimeter removal.",
    tags: ["Pothole", "Base Failure", "High Risk"]
  },
  {
    id: 4,
    filename: "site-visit-04.jpg",
    title: "Deep Pavement Void & Asphalt Stripping",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Inner Commercial Traffic Lane Approach, Kurunegala",
    aspect: "portrait",
    astmDistress: "ASTM D6433 - 13: High-Severity Pothole",
    cidaSpec: "CIDA SCA/5 Sec 4.3: Cold Milling + Rapid Tack Coat Emulsion",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "1.12 m²",
    estimatedDepth: "9.1 cm",
    notes: "Vertical distress profile with severe bitumen stripping and aggregate dislodgement under repetitive monsoon water stagnation and heavy braking action.",
    tags: ["Deep Cavity", "Asphalt Stripping", "Water Ingress"]
  },
  {
    id: 5,
    filename: "site-visit-05.jpg",
    title: "Pothole Cluster with Alligator Fatigue Mesh",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "High",
    location: "Commercial Transit Junction, Gampaha District",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 01: Alligator Cracking + Coalescing Cavities",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Box Excavation & Dual-Course Asphalt Compaction",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "2.40 m²",
    estimatedDepth: "6.2 cm",
    notes: "Dense fatigue cracking pattern coalescing into multiple active potholes. Demands 15% perimeter over-excavation during cold milling to prevent recurrent edge debonding.",
    tags: ["Cluster", "Alligator Cracking", "Excavation Zone"]
  },
  {
    id: 6,
    filename: "site-visit-06.jpg",
    title: "Severe Pothole with Loose Base Aggregates",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Central Province Feeder Route, Kandy",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: Pothole & Sub-base Exposure",
    cidaSpec: "CIDA SCA/5 Sec 3.4: ABC Re-compaction + Prime Coat + HMA",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "1.85 m²",
    estimatedDepth: "8.7 cm",
    notes: "Structural punch-through exhibiting loose granular sub-base. High risk for low-clearance passenger vehicles, three-wheelers, and commercial bus steering axles.",
    tags: ["Structural Failure", "Loose Granular", "Safety Hazard"]
  },
  {
    id: 7,
    filename: "site-visit-07.jpg",
    title: "Extensive Pavement Surface Ravelling",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "Moderate",
    location: "Heavy Commercial Truck Route, Biyagama Industrial Zone",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 19: Weathering & Ravelling (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 6.1: Micro-surfacing / Dense Slurry Seal Coat",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "14.2 m²",
    estimatedDepth: "2.0 cm",
    notes: "Loss of surface binder resulting in coarse aggregate exposure and surface micro-roughness degradation across a 12-meter stretch under industrial truck axle shear.",
    tags: ["Ravelling", "Binder Loss", "Roughness Index"]
  },
  {
    id: 8,
    filename: "site-visit-08.jpg",
    title: "Transverse Thermal Stress Fissures",
    category: "crack",
    categoryLabel: "Cracks & Fissures",
    severity: "High",
    location: "High Elevation Mountain Highway, Nuwara Eliya Access Rd",
    aspect: "portrait",
    astmDistress: "ASTM D6433 - 20: Transverse Cracking (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 5.2: Polymer-Modified Bitumen Routing & Sealing",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "2.10 m²",
    estimatedDepth: "3.8 cm",
    notes: "Perpendicular pavement fracture created by tropical diurnal thermal expansion and contraction cycles in high-altitude asphalt wearing courses.",
    tags: ["Transverse Crack", "Thermal Stress", "Fissure"]
  },
  {
    id: 9,
    filename: "site-visit-09.jpg",
    title: "Plastic Deformation & Wheelpath Rutting",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "Moderate",
    location: "Bus Stop Deceleration Zone, Kadawatha",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 15: Rutting (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 4.4: 40mm Cold Planing + High-Modulus Asphalt Inlay",
    targetModule: "Module 04: Detour & Scheduling",
    estimatedArea: "8.60 m²",
    estimatedDepth: "4.2 cm",
    notes: "Permanent pavement depression along heavy braking trajectories, causing longitudinal channelization and rainwater ponding during the southwest monsoon.",
    tags: ["Rutting", "Deformation", "Channelization"]
  },
  {
    id: 10,
    filename: "site-visit-10.jpg",
    title: "Submerged Pothole with Hydroplaning Hazard",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Low-Gradient Valley Section, Kelani River Floodplain",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: Flooded Cavity Hazard (Severity 3)",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Dewatering, Base Excavation & Hot-Mix Patching",
    targetModule: "Module 04: Detour & Scheduling",
    estimatedArea: "1.90 m²",
    estimatedDepth: "9.5 cm",
    notes: "Water-filled cavity concealing severe depth from motorists. Directly referenced in Module 4 dynamic detour and hazard advisories for wet weather navigation.",
    tags: ["Waterlogged", "Hydroplaning", "Hidden Depth"]
  },
  {
    id: 11,
    filename: "site-visit-11.jpg",
    title: "Alligator Pattern Fatigue Fracture",
    category: "crack",
    categoryLabel: "Cracks & Fissures",
    severity: "High",
    location: "Heavy Axle Outer Lane, Peliyagoda Freight Junction",
    aspect: "portrait",
    astmDistress: "ASTM D6433 - 01: Alligator Fatigue Cracking (Severity 3)",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Full-Depth Reconstruction with Geogrid Interlayer",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "4.50 m²",
    estimatedDepth: "5.5 cm",
    notes: "Interconnected multi-sided cracking network indicating structural exhaustion of the asphalt concrete layer under repeated wheel loading and inadequate sub-base stiffness.",
    tags: ["Fatigue Cracking", "Structural Exhaustion", "High Load"]
  },
  {
    id: 12,
    filename: "site-visit-12.jpg",
    title: "Unsealed Shoulder Erosion & Edge Drop-off",
    category: "survey",
    categoryLabel: "Corridor Survey",
    severity: "Moderate",
    location: "Rural Semi-Arid Link Road, Puttalam Corridor",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 07: Edge Cracking & Shoulder Drop-off",
    cidaSpec: "CIDA SCA/5 Sec 2.8: Gravel Shoulder Grading & Paved Verge Extension",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "22.0 m²",
    estimatedDepth: "8.5 cm Drop",
    notes: "Shoulder scour resulting in an 85mm drop-off from the paved surface, representing a major rollover hazard for two-wheelers and trishaws.",
    tags: ["Edge Drop-off", "Shoulder Scour", "Two-Wheeler Risk"]
  },
  {
    id: 13,
    filename: "site-visit-13.jpg",
    title: "Bitumen Bleeding & Surface Flushing",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "Moderate",
    location: "Steep Climbing Gradient, Kadugannawa Pass",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 03: Bleeding (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 6.3: Heated Coarse Sand Blotting / Water Jetting",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "9.40 m²",
    estimatedDepth: "Surface film",
    notes: "Excess asphalt binder forced to the pavement surface in high ambient heat, creating a mirror-like slick film with dangerously low wet skid resistance.",
    tags: ["Bitumen Bleeding", "Friction Loss", "Heat Effect"]
  },
  {
    id: 14,
    filename: "site-visit-14.jpg",
    title: "Culvert Approach Pavement Subsidence",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "High",
    location: "Bridge & Box Culvert Transition Point km 18.5",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 05: Bump & Differential Settlement",
    cidaSpec: "CIDA SCA/5 Sec 4.6: Transition Slab Leveling & Polymer Asphalt Inlay",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "6.20 m²",
    estimatedDepth: "5.8 cm",
    notes: "Differential settlement at rigid concrete culvert interfaces, producing an abrupt bump, dynamic axle shock, and adjoining pavement cracking.",
    tags: ["Subsidence", "Structure Approach", "Differential Settling"]
  },
  {
    id: 15,
    filename: "site-visit-15.jpg",
    title: "Large Diameter High-Impact Pothole",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Arterial Freight Corridor km 28, Negombo Highway",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: Large Crater Pothole (Severity 3)",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Saw Cut, Tack Coat, Hot HMA Compaction (8-ton Roller)",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "1.95 m²",
    estimatedDepth: "10.2 cm",
    notes: "Broad crater measuring over 900mm in diameter with sharp vertical shearing edges. High probability of rim and suspension failure at expressway approach speeds.",
    tags: ["Large Crater", "Rim Damage Hazard", "Urgent Scope"]
  },
  {
    id: 16,
    filename: "site-visit-16.jpg",
    title: "Advanced Surface Stripping & Shoving",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "High",
    location: "Heavy Container Terminal Intersection Turning Radius",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 17: Shoving & Shear Dislocation (Severity 3)",
    cidaSpec: "CIDA SCA/5 Sec 4.4: Milling Rutted Crests & High-Stability Asphalt Re-paving",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "5.80 m²",
    estimatedDepth: "6.0 cm",
    notes: "Crescent-shaped pavement displacement and surface shoving caused by heavy torque from turning multi-axle freight carriers and low shear-strength asphalt mix.",
    tags: ["Surface Shoving", "Shear Failure", "Turning Zone"]
  },
  {
    id: 17,
    filename: "site-visit-17.jpg",
    title: "Continuous Multi-Pothole Degradation Belt",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Secondary Industrial Connector, Sapugaskanda",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: Multi-Pothole Chain Degradation",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Continuous Linear Milling + 50mm HMA Binder Course",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "7.80 m²",
    estimatedDepth: "8.0 cm",
    notes: "Contiguous chain of five potholes along the primary lane trajectory. Scheduled for full-width milling and 50mm HMA binder course overlay under CIDA standards.",
    tags: ["Multiple Potholes", "Chain Failure", "Full Milling"]
  },
  {
    id: 18,
    filename: "site-visit-18.jpg",
    title: "Cold-Patch Patching Failure & Edge Ripping",
    category: "surface",
    categoryLabel: "Surface & Rutting",
    severity: "High",
    location: "Urban Local Government Route, Maharagama",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 14: Patch Deterioration (Severity 3)",
    cidaSpec: "CIDA SCA/5 Sec 4.2: Full Removal of Failed Cold Mix & Hot HMA Inlay",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "1.75 m²",
    estimatedDepth: "5.2 cm",
    notes: "Prior emergency cold patch debonded due to inadequate tack coat emulsion and compaction under high ambient humidity, illustrating the necessity of hot-mix quality assurance.",
    tags: ["Patch Failure", "Tack Coat Debond", "RDA Standard"]
  },
  {
    id: 19,
    filename: "site-visit-19.jpg",
    title: "Drainage Ingress & Embankment Undermining",
    category: "survey",
    categoryLabel: "Corridor Survey",
    severity: "High",
    location: "Stormwater Channel Boundary, Hill Country Link",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 07: Shoulder Scour & Subgrade Erosion",
    cidaSpec: "CIDA SCA/5 Sec 2.5: Concrete Lined Drain Construction & Rip-rap Toe",
    targetModule: "Module 04: Detour & Scheduling",
    estimatedArea: "16.5 m²",
    estimatedDepth: "12.0 cm",
    notes: "Blocked side drain overflowing onto the pavement shoulder, accelerating aggregate wash-off and progressive edge unraveling towards the roadway center.",
    tags: ["Drainage Failure", "Shoulder Erosion", "Base Washout"]
  },
  {
    id: 20,
    filename: "site-visit-20.jpg",
    title: "Severe Pothole with Crushed Aggregate Base Course (ABC)",
    category: "pothole",
    categoryLabel: "Potholes & Cavities",
    severity: "Critical",
    location: "Main Commercial Thoroughfare, Kandy City Corridor",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 13: Base-Exposing Pothole",
    cidaSpec: "CIDA SCA/5 Sec 3.4 & 4.2: Subgrade Compaction, Prime Coat, 60mm HMA",
    targetModule: "Module 03: Material Thermodynamics",
    estimatedArea: "2.35 m²",
    estimatedDepth: "11.5 cm",
    notes: "Deep cavitation revealing subgrade layers. Serves as ground truth for Module 3 Shoelace polygon excavation and HMA asphalt tonnage estimation algorithms.",
    tags: ["Exposed ABC", "Volume Estimation", "Critical Depth"]
  },
  {
    id: 21,
    filename: "site-visit-21.jpg",
    title: "Extensive Polished Aggregate Texture",
    category: "survey",
    categoryLabel: "Corridor Survey",
    severity: "Low",
    location: "Rural Feeder Section km 08, Anuradhapura",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 16: Polished Aggregate",
    cidaSpec: "CIDA SCA/5 Sec 6.2: High-Friction Surface Treatment (HFST) / Chip Seal",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "35.0 m²",
    estimatedDepth: "Surface wear",
    notes: "Smoothed asphalt surface under repetitive passenger vehicle friction, requiring British Pendulum Skid Resistance verification before seasonal monsoon rains.",
    tags: ["Polished Aggregate", "Skid Resistance", "Surface Survey"]
  },
  {
    id: 22,
    filename: "site-visit-22.jpg",
    title: "Dual Wheelpath Longitudinal Cracking",
    category: "crack",
    categoryLabel: "Cracks & Fissures",
    severity: "High",
    location: "Provincial Agricultural Route, Polonnaruwa",
    aspect: "landscape",
    astmDistress: "ASTM D6433 - 10: Dual Longitudinal Cracks (Severity 2)",
    cidaSpec: "CIDA SCA/5 Sec 5.2: Mechanical Routing, Compressed Air Cleaning, Hot Seal",
    targetModule: "Module 02: Metric Segmentation",
    estimatedArea: "6.50 m²",
    estimatedDepth: "4.2 cm",
    notes: "Parallel longitudinal fissures matching heavy tractor and lorry axle widths, propagating outward along the pavement centerline under structural fatigue.",
    tags: ["Dual Wheelpath", "Centerline Fissure", "Tractor Route"]
  },
  {
    id: 23,
    filename: "site-visit-23.jpg",
    title: "Comprehensive Multi-Distress Field Inspection",
    category: "survey",
    categoryLabel: "Corridor Survey",
    severity: "Moderate",
    location: "Station 23 Audit Benchmark, Western Province",
    aspect: "landscape",
    astmDistress: "ASTM D6433: Comprehensive Road Condition Benchmark",
    cidaSpec: "CIDA SCA/5 Sec 4.0: Integrated Milling, Patching & Surface Dressing Plan",
    targetModule: "Module 01: Perception AI",
    estimatedArea: "45.0 m²",
    estimatedDepth: "Variable (2-9 cm)",
    notes: "Full corridor overview capturing coexistence of potholes, edge ravelling, and fatigue cracking. Used as benchmark field validation data across all four research modules.",
    tags: ["Multi-Distress", "Benchmark Site", "Comprehensive Audit"]
  }
];

interface SiteVisitGalleryProps {
  getAssetUrl: (path: string) => string;
}

export default function SiteVisitGallery({ getAssetUrl }: SiteVisitGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"id" | "severity" | "title">("id");
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "table">("grid");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const INITIAL_DISPLAY_COUNT = 10;

  // Filtered and sorted photos
  const filteredPhotos = useMemo(() => {
    return SITE_VISIT_PHOTOS.filter((photo) => {
      const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory;
      const matchesSeverity = selectedSeverity === "all" || photo.severity === selectedSeverity;
      const matchesModule =
        selectedModule === "all" || photo.targetModule.toLowerCase().includes(selectedModule.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        photo.title.toLowerCase().includes(query) ||
        photo.location.toLowerCase().includes(query) ||
        photo.astmDistress.toLowerCase().includes(query) ||
        photo.cidaSpec.toLowerCase().includes(query) ||
        photo.notes.toLowerCase().includes(query) ||
        photo.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSeverity && matchesModule && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "severity") {
        const order = { Critical: 4, High: 3, Moderate: 2, Low: 1 };
        return order[b.severity] - order[a.severity];
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });
  }, [selectedCategory, selectedSeverity, selectedModule, searchQuery, sortBy]);

  // Display only first 10 cards unless expanded
  const displayedPhotos = useMemo(() => {
    if (isExpanded || filteredPhotos.length <= INITIAL_DISPLAY_COUNT) {
      return filteredPhotos;
    }
    return filteredPhotos.slice(0, INITIAL_DISPLAY_COUNT);
  }, [filteredPhotos, isExpanded]);

  const activePhoto = activePhotoIndex !== null ? SITE_VISIT_PHOTOS[activePhotoIndex] : null;

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
        setZoomLevel(1);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : SITE_VISIT_PHOTOS.length - 1));
        setZoomLevel(1);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev !== null && prev < SITE_VISIT_PHOTOS.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      }
    },
    [activePhotoIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, activePhotoIndex]);

  const severityBadgeClass = (severity: SiteVisitPhoto["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "Moderate":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "Low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
    }
  };

  const copyPhotoDetails = (photo: SiteVisitPhoto) => {
    const text = `Road Inspector Field Audit #${String(photo.id).padStart(2, "0")}: ${photo.title}
Location: ${photo.location}
Severity: ${photo.severity} | Category: ${photo.categoryLabel}
ASTM: ${photo.astmDistress}
CIDA Spec: ${photo.cidaSpec}
Estimated Area: ${photo.estimatedArea} | Depth: ${photo.estimatedDepth}
Module: ${photo.targetModule}
Notes: ${photo.notes}`;
    navigator.clipboard.writeText(text);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSeverity("all");
    setSelectedModule("all");
    setSearchQuery("");
    setSortBy("id");
    setIsExpanded(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSeverity !== "all" ||
    selectedModule !== "all" ||
    searchQuery.trim() !== "" ||
    sortBy !== "id";

  return (
    <div className="w-full">
      {/* SECTION HEADER PANEL */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 mb-8 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Field Audit Ground Truth Corpus
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  • 23 High-Resolution Observations
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight mt-1">
                Site Visits &amp; Road Inspection Gallery
              </h3>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Total Audits:</span>
              <span className="text-slate-100 font-bold">23 Photos</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400">Critical Hazards:</span>
              <span className="text-rose-400 font-bold">
                {SITE_VISIT_PHOTOS.filter((p) => p.severity === "Critical").length}
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-slate-400">Network:</span>
              <span className="text-slate-100 font-bold">Sri Lanka Roads</span>
            </div>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed mt-4 max-w-4xl">
          Visual documentary corpus captured during on-site inspections across Sri Lankan arterial highways, provincial networks, and feeder corridors. These photographic observations form the primary ground truth for training our YOLOv8 defect detectors, U-Net area segmentors, and CIDA SCA/5 material estimation algorithms.
        </p>

        {/* CONTROLS & FILTER BAR */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-4">
          {/* Top Row: Categories + View Switcher */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Visits", count: SITE_VISIT_PHOTOS.length },
                { id: "pothole", label: "Potholes & Cavities", count: SITE_VISIT_PHOTOS.filter((p) => p.category === "pothole").length },
                { id: "crack", label: "Cracks & Fissures", count: SITE_VISIT_PHOTOS.filter((p) => p.category === "crack").length },
                { id: "surface", label: "Surface & Rutting", count: SITE_VISIT_PHOTOS.filter((p) => p.category === "surface").length },
                { id: "survey", label: "Corridor Surveys", count: SITE_VISIT_PHOTOS.filter((p) => p.category === "survey").length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border ${
                    selectedCategory === tab.id
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.02]"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === tab.id ? "bg-black/30 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewMode === "grid"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("masonry")}
                title="Masonry Natural View"
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewMode === "masonry"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Natural</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                title="Engineering Audit Table"
                className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors ${
                  viewMode === "table"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Audit Table</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Severity Filter, Module Filter, Sort, Search */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
            <div className="flex flex-wrap items-center gap-2">
              {/* Severity Quick Filter */}
              <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Severity:</span>
              </div>
              {["all", "Critical", "High", "Moderate", "Low"].map((sev) => (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                    selectedSeverity === sev
                      ? "bg-slate-800 text-orange-400 border-orange-500/40 font-bold"
                      : "bg-slate-950 text-slate-400 hover:text-slate-300 border-slate-800"
                  }`}
                >
                  {sev === "all" ? "All Severities" : sev}
                </button>
              ))}

              {/* Module Filter Select */}
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-orange-500/60"
              >
                <option value="all">All Modules</option>
                <option value="Module 01">Module 01: Perception</option>
                <option value="Module 02">Module 02: Segmentation</option>
                <option value="Module 03">Module 03: Materials</option>
                <option value="Module 04">Module 04: Detour</option>
              </select>

              {/* Sort By Select */}
              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                <ArrowUpDown className="w-3 h-3 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "id" | "severity" | "title")}
                  className="bg-transparent text-[11px] font-mono text-slate-300 focus:outline-none"
                >
                  <option value="id" className="bg-slate-900">Sort by ID</option>
                  <option value="severity" className="bg-slate-900">Sort by Severity</option>
                  <option value="title" className="bg-slate-900">Sort by Title</option>
                </select>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[240px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search distress, ASTM, location..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Status & Reset */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
            <span>
              Showing <strong className="text-orange-400">{displayedPhotos.length}</strong> of {filteredPhotos.length} observations
              {filteredPhotos.length > INITIAL_DISPLAY_COUNT && !isExpanded && (
                <span className="text-slate-500 ml-1.5">(First 10 shown)</span>
              )}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-orange-400 hover:text-orange-300 underline font-mono flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* GALLERY PRESENTATION MODES */}
      {filteredPhotos.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800">
          <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-300">No site visit photos match your criteria</h4>
          <p className="text-xs text-slate-500 font-mono mt-1">Try clearing your search query or selecting another filter.</p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-mono font-semibold hover:bg-orange-500/20"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* 1. GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedPhotos.map((photo) => {
            const originalIndex = SITE_VISIT_PHOTOS.findIndex((p) => p.id === photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(originalIndex)}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col cursor-pointer bg-slate-950/60"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={getAssetUrl(`/site-visits/${photo.filename}`)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/90 text-[10px] font-mono font-bold text-orange-400 border border-orange-500/30 shadow-md">
                      #{String(photo.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border shadow-md ${severityBadgeClass(
                        photo.severity
                      )}`}
                    >
                      {photo.severity}
                    </span>
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[11px] font-mono font-semibold flex items-center gap-1 shadow-lg shadow-orange-500/40">
                      <Eye className="w-3 h-3" />
                      <span>Inspect 4K</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                      <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>

                    <h4 className="font-bold text-slate-100 text-sm mb-1.5 group-hover:text-orange-400 transition-colors line-clamp-1">
                      {photo.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {photo.notes}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-orange-400 font-semibold">{photo.estimatedArea}</span>
                    <span className="text-slate-400">{photo.categoryLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === "masonry" ? (
        /* 2. MASONRY / NATURAL ASPECT VIEW */
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {displayedPhotos.map((photo) => {
            const originalIndex = SITE_VISIT_PHOTOS.findIndex((p) => p.id === photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(originalIndex)}
                className="break-inside-avoid glass-panel rounded-2xl overflow-hidden border border-slate-800 group hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col cursor-pointer bg-slate-950/60"
              >
                {/* Photo Thumbnail preserving aspect */}
                <div
                  className={`relative w-full overflow-hidden bg-slate-950 ${
                    photo.aspect === "portrait" ? "aspect-[9/16]" : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={getAssetUrl(`/site-visits/${photo.filename}`)}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/90 text-[10px] font-mono font-bold text-orange-400 border border-orange-500/30">
                      #{String(photo.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${severityBadgeClass(
                        photo.severity
                      )}`}
                    >
                      {photo.severity}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[11px] font-mono font-semibold flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-sm mb-1 group-hover:text-orange-400 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {photo.notes}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-orange-400 font-semibold">{photo.estimatedArea} · {photo.estimatedDepth}</span>
                    <span className="text-slate-500">{photo.astmDistress.split(":")[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3. ENGINEERING AUDIT TABLE VIEW */
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-[11px] text-slate-400">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Observation &amp; Location</th>
                <th className="py-3 px-4">ASTM D6433 Code</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Area / Depth</th>
                <th className="py-3 px-4">CIDA SCA/5 Treatment</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {displayedPhotos.map((photo) => {
                const originalIndex = SITE_VISIT_PHOTOS.findIndex((p) => p.id === photo.id);
                return (
                  <tr
                    key={photo.id}
                    onClick={() => setActivePhotoIndex(originalIndex)}
                    className="hover:bg-slate-900/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-orange-400">
                      #{String(photo.id).padStart(2, "0")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shrink-0">
                        <Image
                          src={getAssetUrl(`/site-visits/${photo.filename}`)}
                          alt={photo.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-200 text-xs mb-0.5 line-clamp-1">{photo.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                        <span>{photo.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-[11px] max-w-[200px] truncate">
                      {photo.astmDistress}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${severityBadgeClass(photo.severity)}`}>
                        {photo.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      <div>{photo.estimatedArea}</div>
                      <div className="text-[10px] text-slate-500">{photo.estimatedDepth}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                      {photo.cidaSpec}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIndex(originalIndex);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 text-[10px] font-semibold transition-all inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SEE MORE / SEE LESS CONTROLS (EXPAND AFTER 10 CARDS) */}
      {filteredPhotos.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          {!isExpanded ? (
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="group px-7 py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs font-bold transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 flex items-center gap-2.5 border border-orange-400/40 cursor-pointer"
              >
                <span>See More Observations</span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/35 text-[11px] font-mono text-orange-200 border border-orange-400/20">
                  +{filteredPhotos.length - INITIAL_DISPLAY_COUNT} More
                </span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <span className="text-[11px] font-mono text-slate-400">
                Displaying 10 of {filteredPhotos.length} field observations
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  const galleryEl = document.getElementById("site-visits");
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="group px-7 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all border border-slate-700 hover:border-orange-500/50 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>See Less</span>
                <span className="text-[11px] font-mono text-slate-400">
                  (Collapse to 10)
                </span>
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-orange-400" />
              </button>
              <span className="text-[11px] font-mono text-slate-500">
                Showing all {filteredPhotos.length} field observations
              </span>
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX & CIVIL AUDIT MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl transition-all duration-300 animate-in fade-in"
          onClick={() => {
            setActivePhotoIndex(null);
            setZoomLevel(1);
          }}
        >
          {/* Main Modal Container */}
          <div
            className="relative w-full h-full max-w-7xl max-h-screen flex flex-col justify-between p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800 text-slate-200">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold">
                  OBSERVATION #{String(activePhoto.id).padStart(2, "0")}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${severityBadgeClass(
                    activePhoto.severity
                  )}`}
                >
                  {activePhoto.severity} Severity
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {activePhotoIndex! + 1} of {SITE_VISIT_PHOTOS.length}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Copy Details */}
                <button
                  type="button"
                  onClick={() => copyPhotoDetails(activePhoto)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Copy Engineering Observation Details"
                >
                  {copiedId === activePhoto.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline">Copy Spec</span>
                    </>
                  )}
                </button>

                {/* Direct Download */}
                <a
                  href={getAssetUrl(`/site-visits/${activePhoto.filename}`)}
                  download={`road-inspector-obs-${activePhoto.id}.jpg`}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Download High-Resolution Image"
                >
                  <Download className="w-3.5 h-3.5 text-orange-400" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Zoom Toggle */}
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  title="Cycle Zoom Levels (100% -> 150% -> 200%)"
                >
                  {zoomLevel > 1 ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{Math.round(zoomLevel * 100)}%</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActivePhotoIndex(null);
                    setZoomLevel(1);
                  }}
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 flex items-center justify-center transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Viewing Stage */}
            <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden select-none">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => {
                  setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : SITE_VISIT_PHOTOS.length - 1));
                  setZoomLevel(1);
                }}
                className="absolute left-2 md:left-4 z-10 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-orange-500 text-slate-200 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image with Zoom Controls */}
              <div
                className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ${
                  zoomLevel > 1 ? "overflow-auto cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setZoomLevel((prev) => (prev > 1 ? 1 : 1.5))}
              >
                <div
                  className="relative transition-transform duration-300"
                  style={{
                    width: zoomLevel > 1 ? `${zoomLevel * 100}%` : "100%",
                    height: zoomLevel > 1 ? `${zoomLevel * 100}%` : "100%",
                    maxHeight: zoomLevel === 1 ? "68vh" : "none"
                  }}
                >
                  <Image
                    src={getAssetUrl(`/site-visits/${activePhoto.filename}`)}
                    alt={activePhoto.title}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => {
                  setActivePhotoIndex((prev) => (prev !== null && prev < SITE_VISIT_PHOTOS.length - 1 ? prev + 1 : 0));
                  setZoomLevel(1);
                }}
                className="absolute right-2 md:right-4 z-10 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-orange-500 text-slate-200 hover:text-white border border-slate-700/80 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Panel: Civil Engineering Diagnostics & Strip */}
            <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-mono">
                {/* Col 1: Title, Location & Notes */}
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      {activePhoto.title}
                    </h4>
                    <span className="text-[11px] text-orange-400 font-normal">
                      ({activePhoto.categoryLabel})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                      {activePhoto.targetModule}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{activePhoto.location}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activePhoto.notes}
                  </p>
                </div>

                {/* Col 2: ASTM & CIDA Specifications */}
                <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                      ASTM D6433 Classification:
                    </span>
                    <span className="text-slate-200 text-[11px] font-semibold">{activePhoto.astmDistress}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                      CIDA SCA/5 Treatment Spec:
                    </span>
                    <span className="text-amber-400 text-[11px]">{activePhoto.cidaSpec}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400">Estimated Area: <strong className="text-emerald-400">{activePhoto.estimatedArea}</strong></span>
                    <span className="text-slate-400">Sag Depth: <strong className="text-sky-400">{activePhoto.estimatedDepth}</strong></span>
                  </div>
                </div>
              </div>

              {/* Horizontal Thumbnails Bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {SITE_VISIT_PHOTOS.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => {
                      setActivePhotoIndex(idx);
                      setZoomLevel(1);
                    }}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activePhotoIndex
                        ? "border-orange-500 scale-105 shadow-md shadow-orange-500/30"
                        : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                    }`}
                  >
                    <Image
                      src={getAssetUrl(`/site-visits/${thumb.filename}`)}
                      alt={thumb.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-bold text-white drop-shadow">
                      {thumb.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
