import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Canvas & Soul - Artistic Portfolio and Blog",
  description: "Where colors meet emotions and brushstrokes tell stories. Explore paintings, poetry, and creative expressions by Sarah.",
  keywords: ["art", "painting", "portfolio", "artist", "creativity", "paintings", "artwork", "blog"],
  authors: [{ name: "Sarah" }],
  creator: "Sarah",
  openGraph: {
    title: "Canvas & Soul - Artistic Portfolio",
    description: "Where colors meet emotions and brushstrokes tell stories.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Canvas & Soul - Artistic Portfolio",
    description: "Where colors meet emotions and brushstrokes tell stories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${crimsonText.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
