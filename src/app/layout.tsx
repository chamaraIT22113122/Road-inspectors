import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Road Inspector AI | Intelligent Infrastructure Decision Support System",
  description: "An AI, Computer Vision and IoT-powered platform for road defect detection, semantic repair area segmentation, material estimation, and traffic-aware scheduling for Sri Lankan road networks.",
  keywords: [
    "Road Inspector AI",
    "Pothole Detection",
    "Road Defect AI",
    "Semantic Segmentation",
    "Civil Engineering AI",
    "CIDA SCA/5",
    "SLIIT Research Project",
    "Sri Lanka Road Development Authority"
  ],
  icons: {
    icon: "/branding/logo_white.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased selection:bg-orange-500/30">
        {children}
      </body>
    </html>
  );
}
