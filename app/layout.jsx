import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://www.teamplanetarydrive.com"),
  title: {
    default: "Planetary Drive Robotics — FRC Team 2856",
    template: "%s — Planetary Drive Robotics",
  },
  description:
    "Planetary Drive Robotics is FIRST Robotics Competition Team 2856, a student-led high-school robotics team in Lexington, Kentucky.",
  applicationName: "Planetary Drive Robotics",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  keywords: [
    "Planetary Drive Robotics",
    "FRC Team 2856",
    "FIRST Robotics Lexington Kentucky",
    "high school robotics",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Planetary Drive Robotics",
    title: "Planetary Drive Robotics — FRC Team 2856",
    description:
      "A student-led team designing, building, and programming competition robots in Lexington, Kentucky.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Planetary Drive Robotics FRC Team 2856 and its 2026 robot CAD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planetary Drive Robotics — FRC Team 2856",
    description:
      "A student-led team designing, building, and programming competition robots in Lexington, Kentucky.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport = {
  themeColor: "#070a10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="1k0kd9k30wNoi2sM_bQy1cpmSY85Ol_P5RnZKvAQjsU"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
