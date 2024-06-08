import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://alphaai.vercel.app"),
  title: "alphaai",
  description: "",
};

// Check your code at layout.tsx:14 Error: Unsopported Server Component type:

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
