import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Planetary Drive Robotics",
  description:
    "First Robotics Competition Team 2856 Official Website. We are a high school robotics team based in Lexington, Kentucky.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <Head>
        <meta
          name="google-site-verification"
          content="1k0kd9k30wNoi2sM_bQy1cpmSY85Ol_P5RnZKvAQjsU"
        />
      </Head>
      <body className={inter.className}>
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
