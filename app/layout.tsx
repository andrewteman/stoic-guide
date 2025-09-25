import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stoic Guide",
  description: "Simple Stoic guidance for everyday situations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Stoic Guide</h1>
            <p className="text-sm opacity-80">Practical Stoic perspective—fast.</p>
          </header>
          {children}
          <footer className="mt-12 text-xs opacity-70">
            <p>
              Quotes are from public‑domain Stoic sources (e.g., Marcus Aurelius, Seneca, Epictetus).
              This app provides philosophical perspective, not medical or legal advice.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
