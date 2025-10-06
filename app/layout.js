import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "🧠 AI News Hub",
  description: "Top headlines with AI-powered summaries. Fast, responsive, modern UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: `
            try {
              const saved = localStorage.getItem('darkMode');
              const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const shouldDark = saved !== null ? JSON.parse(saved) : prefers;
              if (shouldDark) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch {}
          `}}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <ProgressBar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
