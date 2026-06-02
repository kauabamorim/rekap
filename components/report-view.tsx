"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Check } from "lucide-react"

export interface Campaign {
  id: string
  name: string
  spend: number
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  conversions: number
}

export interface DailyData {
  date: string
  spend: number
  impressions: number
  clicks: number
}

export interface ReportData {
  accountName: string
  dateFrom: string
  dateTo: string
  summary: {
    spend: number
    impressions: number
    clicks: number
    ctr: number
    cpc: number
    conversions: number
    cpa: number
  }
  campaigns: Campaign[]
  daily: DailyData[]
}

interface ReportViewProps {
  title: string
  agencyName: string
  data: ReportData
  slug: string
}

const brl = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v)

const num = (v: number) => new Intl.NumberFormat("pt-BR").format(v)

const pct = (v: number) => v.toFixed(2) + "%"

function shortDate(iso: string) {
  const [, month, day] = iso.split("-")
  return `${day}/${month}`
}

function fullDate(iso: string) {
  const [year, month, day] = iso.split("-")
  return `${day}/${month}/${year}`
}

const metrics = (data: ReportData["summary"]) => [
  { label: "Gasto total", value: brl(data.spend), color: "text-blue-600 dark:text-blue-400" },
  { label: "Impressões", value: num(data.impressions), color: "text-gray-900 dark:text-white" },
  { label: "Cliques", value: num(data.clicks), color: "text-gray-900 dark:text-white" },
  { label: "CTR", value: pct(data.ctr), color: "text-green-600 dark:text-green-400" },
  { label: "CPC", value: brl(data.cpc), color: "text-gray-900 dark:text-white" },
  {
    label: data.conversions > 0 ? "Conversões" : "Conv.",
    value: data.conversions > 0 ? `${num(data.conversions)} (CPA: ${brl(data.cpa)})` : "—",
    color: "text-gray-900 dark:text-white",
  },
]

export default function ReportView({ title, agencyName, data, slug }: ReportViewProps) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const chartData = data.daily.map((d) => ({
    date: shortDate(d.date),
    Gasto: d.spend,
    Cliques: d.clicks,
  }))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-800 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">
              rekap
            </p>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {fullDate(data.dateFrom)} — {fullDate(data.dateTo)} · {data.accountName}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Gerado por {agencyName}
            </p>
          </div>
          <button
            onClick={copyLink}
            className="flex-shrink-0 flex items-center gap-2 border border-gray-200 dark:border-gray-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-gray-700 dark:text-gray-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copiado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Compartilhar
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Summary cards */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Resumo do período
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {metrics(data.summary).map((m) => (
              <div
                key={m.label}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
              >
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{m.label}</p>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily chart */}
        {chartData.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Gasto diário (R$)
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `R$${v}`}
                    width={60}
                  />
                  <Tooltip
                    formatter={(value) => [brl(Number(value)), "Gasto"]}
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="Gasto" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Campaigns table */}
        {data.campaigns.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Campanhas
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Campanha
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Gasto
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        Impressões
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Cliques
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider hidden md:table-cell">
                        CTR
                      </th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        CPC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {data.campaigns
                      .sort((a, b) => b.spend - a.spend)
                      .map((c) => (
                        <tr key={c.id} className="hover:bg-white dark:hover:bg-gray-800 transition-colors">
                          <td className="px-5 py-3 font-medium text-gray-900 dark:text-white max-w-[200px] truncate">
                            {c.name}
                          </td>
                          <td className="px-5 py-3 text-right text-blue-600 dark:text-blue-400 font-medium">
                            {brl(c.spend)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 hidden md:table-cell">
                            {num(c.impressions)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                            {num(c.clicks)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 hidden md:table-cell">
                            {pct(c.ctr)}
                          </td>
                          <td className="px-5 py-3 text-right text-gray-500 dark:text-gray-400">
                            {brl(c.cpc)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {data.campaigns.length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <p className="text-sm">Nenhuma campanha ativa no período selecionado.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-6 px-6 mt-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs font-bold tracking-tight text-gray-400 dark:text-gray-500">rekap</span>
          <p className="text-xs text-gray-300 dark:text-gray-700">Relatório gerado automaticamente</p>
        </div>
      </footer>
    </div>
  )
}
