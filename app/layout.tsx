import type { Metadata, Viewport } from "next";
import "./globals.css";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Align Media — Create something that matters.",
  description:
    "Creative Agency & Media Academy in Mannarkkad. Graphic design, branding and video editing. Learn. Create. Grow.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Align Media | Creative Agency & Media Academy",
    description:
      "Good ideas deserve great design. Let’s create, learn and grow together in Mannarkkad.",
    images: ["/social-card.png"],
  },
  icons: { icon: "/icon-512.png", apple: "/apple-icon.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f4ef",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
