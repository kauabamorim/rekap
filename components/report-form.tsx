"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface Account {
  id: string
  name: string
  metaAccountId: string
}

function getDefaultDates() {
  const today = new Date()
  const from = new Date(today)
  from.setDate(today.getDate() - 30)
  return {
    to: today.toISOString().split("T")[0],
    from: from.toISOString().split("T")[0],
  }
}

export default function ReportForm({ accounts }: { accounts: Account[] }) {
  const router = useRouter()
  const defaults = getDefaultDates()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = new FormData(e.currentTarget)

    const res = await fetch("/api/reports/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adAccountId: form.get("adAccountId"),
        dateFrom: form.get("dateFrom"),
        dateTo: form.get("dateTo"),
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? "Erro ao gerar relatório.")
      setLoading(false)
    } else {
      router.push(`/r/${data.slug}`)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 mb-10">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Novo relatório</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Conta de anúncios
          </label>
          <select
            name="adAccountId"
            required
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Data inicial
            </label>
            <input
              type="date"
              name="dateFrom"
              required
              defaultValue={defaults.from}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Data final
            </label>
            <input
              type="date"
              name="dateTo"
              required
              defaultValue={defaults.to}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <motion.div
          initial={false}
          animate={error ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg px-3 py-2">{error}</p>
        </motion.div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando dados...
            </>
          ) : (
            "Gerar relatório"
          )}
        </button>
      </form>
    </div>
  )
}
