import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Head from "next/head";
import { ContactFormContextProvider } from "@/contexts/ContactFormContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: {
    default: "Planetary Drive Robotics - FRC Team 2856",
    template: "%s | Planetary Drive Robotics",
  },
  description:
    "FRC Team 2856 Planetary Drive Robotics Official Website. We are a high school robotics team based in Lexington, Kentucky participating in the yearly FIRST Robotics Competition. ",
  metadataBase: new URL("https://www.teamplanetarydrive.com"),
  canonical: "/",
  openGraph: {
    title: "Planetary Drive Robotics - FRC Team 2856",
    description:
      "FRC Team 2856 Planetary Drive Robotics Official Website. We are a high school robotics team based in Lexington, Kentucky participating in the yearly FIRST Robotics Competition. ",
    url: "https://www.teamplanetarydrive.com",
    siteName: "Planetary Drive Robotics - FRC Team 2856",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <meta
          name="google-site-verification"
          content="1k0kd9k30wNoi2sM_bQy1cpmSY85Ol_P5RnZKvAQjsU"
        />
      </head>
      <ContactFormContextProvider>
        <body className={roboto.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ContactFormContextProvider>
    </html>
  );
}
