import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Planetary Drive",
  description: "First Robotics Team 2856",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Navbar/> 
      {children}</body>
    </html>
  );
}
