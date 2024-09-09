import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Leaf of Life Clinic - Traditional Herbal Medicine",
  description: "Reviving endangered traditional, holistic, herbal, and prophetic medicine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="herbal medicine, traditional healing, Leaf of Life Clinic, Ha. Kelaa"
        />
      </Head>
      <body className={cn("bg-background min-h-screen font-sans antialiased", inter.variable)}>
        {children}
      </body>
    </html>
  );
}
