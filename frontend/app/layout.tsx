import type { Metadata } from "next"
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "SustainAudit AI - Greenwashing Detection",
  description:
    "AI-powered sustainability auditing dashboard that detects greenwashing in product marketing claims",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
        min-h-screen antialiased
        bg-gradient-to-br
        from-gray-50 via-white to-emerald-50
        dark:from-gray-900 dark:via-gray-950 dark:to-black
      "
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3500}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}