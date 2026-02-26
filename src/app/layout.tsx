import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Weave Editor",
  description: "Natural language web editor and compiler built with Next.js, TypeScript, and shadcn/ui.",
  keywords: ["Weave", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React"],
  authors: [{ name: "Rohan R" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Weave Editor",
    description: "Natural language web editor and compiler",
    siteName: "Weave",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weave Editor",
    description: "Natural language web editor and compiler",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
