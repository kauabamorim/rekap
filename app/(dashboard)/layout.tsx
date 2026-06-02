import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardNav from "@/components/dashboard-nav"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardNav agencyName={session.user.name ?? ""} />
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  )
}
