"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { BarChart3, Plug, FileText, LogOut } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const links = [
  { href: "/dashboard", label: "Visão geral", icon: BarChart3 },
  { href: "/accounts", label: "Contas", icon: Plug },
  { href: "/reports", label: "Relatórios", icon: FileText },
]

export default function DashboardNav({ agencyName }: { agencyName: string }) {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tight dark:text-white">rekap</span>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-sm text-gray-500 dark:text-gray-400">{agencyName}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}
