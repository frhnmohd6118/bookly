import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BooklyShell } from "@/components/bookly-shell";
import { BooklyProvider } from "@/lib/bookly-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookly — A little more bookish",
  description:
    "Discover your next favorite book through notes and recommendations from fellow readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BooklyProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <BooklyShell>{children}</BooklyShell>
        </BooklyProvider>
      </body>
    </html>
  );
}
