import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plug, FileText, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const [accountsCount, reportsCount] = await Promise.all([
    prisma.adAccount.count({ where: { agencyId: session!.user.id } }),
    prisma.report.count({ where: { agencyId: session!.user.id } }),
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Olá, {session!.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Aqui está o resumo da sua conta.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10 max-w-lg">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Contas conectadas</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{accountsCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Relatórios gerados</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{reportsCount}</p>
        </div>
      </div>

      {accountsCount === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-lg text-center">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plug className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Nenhuma conta conectada</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Conecte uma conta Meta Ads para começar a gerar relatórios.
          </p>
          <Link
            href="/accounts"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Conectar conta <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-lg text-center">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Gere seu primeiro relatório</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Você tem {accountsCount} conta{accountsCount > 1 ? "s" : ""} conectada{accountsCount > 1 ? "s" : ""}. Pronto para gerar relatórios.
          </p>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Gerar relatório <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
