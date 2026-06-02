"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = new FormData(e.currentTarget)
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    })
    if (result?.error) {
      setError("Email ou senha incorretos")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-gray-950 dark:bg-black flex-col justify-between p-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl tracking-tight">rekap</Link>
          <ThemeToggle />
        </div>
        <div>
          <blockquote className="text-white text-2xl font-medium leading-snug mb-4">
            "Antes eu passava 3 horas por cliente montando relatorio. Hoje levo 30 segundos."
          </blockquote>
          <p className="text-gray-400 text-sm">Agencia de performance, Sao Paulo</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["R$ 2.4M gerenciados", "120+ agencias", "10h economizadas/mes"].map((s) => (
            <div key={s} className="border border-gray-800 rounded-xl p-4">
              <p className="text-white text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="absolute top-4 right-4 lg:hidden">
          <ThemeToggle />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="lg:hidden block text-xl font-bold tracking-tight dark:text-white mb-10">rekap</Link>

          <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Bem-vindo de volta</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Entre na sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                name="email" type="email" required placeholder="agencia@email.com"
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Senha</label>
              <input
                name="password" type="password" required placeholder="••••••••"
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            <motion.div
              initial={false}
              animate={error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-2">{error}</p>
            </motion.div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-40 transition-all mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 dark:text-gray-500 mt-6">
            Nao tem conta?{" "}
            <Link href="/register" className="text-gray-900 dark:text-white font-medium hover:underline">
              Criar conta gratis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
