import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReportView, { type ReportData } from "@/components/report-view"

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const report = await prisma.report.findUnique({
    where: { slug },
    include: { agency: { select: { name: true } } },
  })

  if (!report) notFound()

  return (
    <ReportView
      title={report.title}
      agencyName={report.agency.name}
      data={report.data as unknown as ReportData}
      slug={report.slug}
    />
  )
}
