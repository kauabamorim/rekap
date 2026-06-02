import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rekap",
  description: "Relatórios automáticos para agências de marketing",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${geist.className} min-h-full bg-gray-50 dark:bg-gray-950`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
