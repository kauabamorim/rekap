"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = new FormData(e.currentTarget)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      setLoading(false)
    } else {
      router.push("/login")
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
        <div className="space-y-6">
          {[
            { icon: "⚡", text: "Conecte Meta Ads e Google Ads em 1 clique" },
            { icon: "📊", text: "Relatorios gerados automaticamente todo mes" },
            { icon: "🔗", text: "Link compartilhavel para cada cliente" },
            { icon: "🎨", text: "Relatorios com a identidade da sua agencia" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-gray-300 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs">Junte-se a centenas de agencias que ja usam o Rekap</p>
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

          <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Criar sua conta</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Gratis para comecar. Sem cartao de credito.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nome da agencia</label>
              <input
                name="name" type="text" required placeholder="Minha Agencia"
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>
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
                name="password" type="password" required minLength={8} placeholder="Minimo 8 caracteres"
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
              {loading ? "Criando conta..." : "Criar conta gratis"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-6 leading-relaxed">
            Ao criar sua conta voce concorda com os{" "}
            <span className="text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Termos de Uso</span>
            {" "}e{" "}
            <span className="text-gray-600 dark:text-gray-400 hover:underline cursor-pointer">Politica de Privacidade</span>
          </p>

          <p className="text-sm text-center text-gray-400 dark:text-gray-500 mt-4">
            Ja tem conta?{" "}
            <Link href="/login" className="text-gray-900 dark:text-white font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
