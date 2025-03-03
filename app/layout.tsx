import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jens Laur - Tech Lead / DevOps Engineer",
  creator: "Jens Laur",
  description:
    "Jens Laur, a Senior DevOps Engineer specializing in cloud infrastructure, automation, and CI/CD pipelines.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  )
}



import './globals.css'