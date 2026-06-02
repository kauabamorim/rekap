import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

function formatDateBR(dateStr: string) {
  const [year, month, day] = dateStr.split("-")
  return `${day}/${month}/${year}`
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  const { adAccountId, dateFrom, dateTo } = await req.json()

  if (!adAccountId || !dateFrom || !dateTo) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
  }

  const account = await prisma.adAccount.findFirst({
    where: { id: adAccountId, agencyId: session.user.id },
  })
  if (!account) return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 })

  const timeRange = JSON.stringify({ since: dateFrom, until: dateTo })

  const campaignsRes = await fetch(
    `https://graph.facebook.com/v19.0/act_${account.metaAccountId}/insights?` +
      new URLSearchParams({
        fields: "campaign_id,campaign_name,spend,impressions,clicks,ctr,cpc,actions",
        level: "campaign",
        time_range: timeRange,
        access_token: account.accessToken,
        limit: "50",
      })
  )
  const campaignsData = await campaignsRes.json()

  if (campaignsData.error) {
    const msg = campaignsData.error.message ?? "Erro ao buscar dados do Meta Ads"
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const dailyRes = await fetch(
    `https://graph.facebook.com/v19.0/act_${account.metaAccountId}/insights?` +
      new URLSearchParams({
        fields: "date_start,spend,impressions,clicks",
        time_increment: "1",
        time_range: timeRange,
        access_token: account.accessToken,
        limit: "90",
      })
  )
  const dailyData = await dailyRes.json()

  const CONVERSION_TYPES = new Set([
    "purchase",
    "offsite_conversion.fb_pixel_purchase",
    "lead",
    "offsite_conversion.fb_pixel_lead",
    "complete_registration",
  ])

  const campaigns = (campaignsData.data ?? []).map((c: Record<string, unknown>) => {
    const actions = (c.actions as Array<{ action_type: string; value: string }>) ?? []
    const conversions = actions
      .filter((a) => CONVERSION_TYPES.has(a.action_type))
      .reduce((sum, a) => sum + parseInt(a.value ?? "0", 10), 0)
    return {
      id: c.campaign_id as string,
      name: c.campaign_name as string,
      spend: parseFloat((c.spend as string) ?? "0"),
      impressions: parseInt((c.impressions as string) ?? "0", 10),
      clicks: parseInt((c.clicks as string) ?? "0", 10),
      ctr: parseFloat((c.ctr as string) ?? "0"),
      cpc: parseFloat((c.cpc as string) ?? "0"),
      conversions,
    }
  })

  const daily = (dailyData.data ?? []).map((d: Record<string, unknown>) => ({
    date: d.date_start as string,
    spend: parseFloat((d.spend as string) ?? "0"),
    impressions: parseInt((d.impressions as string) ?? "0", 10),
    clicks: parseInt((d.clicks as string) ?? "0", 10),
  }))

  const totalSpend = campaigns.reduce((s: number, c: { spend: number }) => s + c.spend, 0)
  const totalImpressions = campaigns.reduce((s: number, c: { impressions: number }) => s + c.impressions, 0)
  const totalClicks = campaigns.reduce((s: number, c: { clicks: number }) => s + c.clicks, 0)
  const totalConversions = campaigns.reduce((s: number, c: { conversions: number }) => s + c.conversions, 0)

  const summary = {
    spend: totalSpend,
    impressions: totalImpressions,
    clicks: totalClicks,
    ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
    cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
    conversions: totalConversions,
    cpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
  }

  const reportData = {
    accountName: account.name,
    dateFrom,
    dateTo,
    summary,
    campaigns,
    daily,
  }

  const slug = randomBytes(5).toString("hex")
  const title = `${account.name} — ${formatDateBR(dateFrom)} a ${formatDateBR(dateTo)}`

  const report = await prisma.report.create({
    data: {
      slug,
      title,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      data: reportData,
      agencyId: session.user.id,
      adAccountId: account.id,
    },
  })

  return NextResponse.json({ slug: report.slug })
}
