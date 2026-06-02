import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import ConnectMetaButton from "@/components/connect-meta-button"
import { Plug, CheckCircle2 } from "lucide-react"

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>
}) {
  const session = await getServerSession(authOptions)
  const params = await searchParams

  const accounts = await prisma.adAccount.findMany({
    where: { agencyId: session!.user.id },
    orderBy: { createdAt: "desc" },
  })

  const errorMessages: Record<string, string> = {
    meta_denied: "Você negou o acesso ao Meta Ads.",
    token_failed: "Não foi possível obter o token de acesso.",
    no_accounts: "Nenhuma conta de anúncios encontrada nesse perfil.",
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">Contas de anúncios</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Conecte as contas Meta Ads dos seus clientes.</p>
      </div>

      {params.success === "connected" && (
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 text-sm mb-6">
          <CheckCircle2 className="w-4 h-4" />
          Conta conectada com sucesso!
        </div>
      )}

      {params.error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
          {errorMessages[params.error] ?? "Erro ao conectar conta."}
        </div>
      )}

      <ConnectMetaButton />

      {accounts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Contas conectadas</h2>
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Plug className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{account.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">ID: {account.metaAccountId}</p>
                  </div>
                </div>
                <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium px-2.5 py-1 rounded-full">
                  Conectada
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
