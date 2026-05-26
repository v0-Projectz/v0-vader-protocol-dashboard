import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppShell } from "@/components/vader/app-shell"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vader Protocol v2.5.0-Engine",
  description: "MSC Media Engine Dashboard - Project Management & Client Operations",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-[#121212]">
      <body className={`${geist.className} antialiased bg-[#121212] text-white`}>
        <AppShell>{children}</AppShell>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
