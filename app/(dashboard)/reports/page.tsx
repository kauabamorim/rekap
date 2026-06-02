import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plug, ExternalLink, Copy } from "lucide-react"
import ReportForm from "@/components/report-form"
import CopyLinkButton from "@/components/copy-link-button"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  const [accounts, reports] = await Promise.all([
    prisma.adAccount.findMany({
      where: { agencyId: session!.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.report.findMany({
      where: { agencyId: session!.user.id },
      include: { adAccount: true },
      orderBy: { createdAt: "desc" },
    }),
  ])

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Relatórios</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Gere e compartilhe relatórios profissionais com seus clientes.
        </p>
      </div>

      {accounts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plug className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Nenhuma conta conectada</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Conecte uma conta Meta Ads antes de gerar relatórios.
          </p>
          <Link
            href="/accounts"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conectar conta <Plug className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <ReportForm accounts={accounts} />
      )}

      {reports.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Relatórios gerados</h2>
          <div className="space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{report.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {formatDate(report.dateFrom)} — {formatDate(report.dateTo)}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <CopyLinkButton url={`${baseUrl}/r/${report.slug}`} />
                  <Link
                    href={`/r/${report.slug}`}
                    target="_blank"
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Ver relatório"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
