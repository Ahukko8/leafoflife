import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Leaf of Life Clinic",
  description: "Reviving endangered traditional, holistic, herbal, and prophetic medicine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="herbal medicine, traditional healing, Leaf of Life Clinic, Ha. Kelaa"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        {children}
        <GoogleTagManager gtmId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}