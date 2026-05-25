import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

// Used by the generated question paper (PaperView) for a neutral document look.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VedaAI – AI Assessment Creator",
  description:
    "AI-powered assignment and assessment platform for educators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${inter.variable} antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

