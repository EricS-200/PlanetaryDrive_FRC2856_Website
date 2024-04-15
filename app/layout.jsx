import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Planetary Drive Robotics",
  description: "First Robotics Competition Team 2856 Official Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
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
