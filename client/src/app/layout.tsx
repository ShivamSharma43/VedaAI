import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
=======
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
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
      <body className={`${bricolage.variable} antialiased`}>
        {children}
<<<<<<< HEAD
        <Toaster position="top-center" />
=======
>>>>>>> cb2ecc69bf17e798e640729b974b3c787b11865f
      </body>
    </html>
  );
}

