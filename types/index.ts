export type MetaCampaignInsight = {
  campaign_id: string
  campaign_name: string
  spend: string
  impressions: string
  clicks: string
  ctr: string
  cpc: string
  actions?: { action_type: string; value: string }[]
  date_start: string
  date_stop: string
}

export type ReportData = {
  accountName: string
  dateFrom: string
  dateTo: string
  totalSpend: number
  totalImpressions: number
  totalClicks: number
  averageCtr: number
  averageCpc: number
  campaigns: MetaCampaignInsight[]
}
