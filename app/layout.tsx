import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SekiroKost Chat Studio - Multi-LLM Interface",
  description: "Interface web pour gérer vos sessions Claude, Ollama et autres LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
