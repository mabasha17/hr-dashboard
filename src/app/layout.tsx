import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "A modern HR dashboard for managing employees",
  keywords: ["HR", "Dashboard", "Employee Management", "HR Management"],
  authors: [{ name: "Your Company" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Navigation />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
