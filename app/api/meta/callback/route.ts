import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const agencyId = searchParams.get("state")
  const error = searchParams.get("error")

  if (error || !code || !agencyId) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/accounts?error=meta_denied`
    )
  }

  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: process.env.META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        redirect_uri: process.env.META_REDIRECT_URI!,
        code,
      })
  )
  const tokenData = await tokenRes.json()

  if (!tokenData.access_token) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/accounts?error=token_failed`
    )
  }

  const longTokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: process.env.META_APP_ID!,
        client_secret: process.env.META_APP_SECRET!,
        fb_exchange_token: tokenData.access_token,
      })
  )
  const longTokenData = await longTokenRes.json()
  const accessToken = longTokenData.access_token ?? tokenData.access_token

  const accountsRes = await fetch(
    `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name,account_id&access_token=${accessToken}`
  )
  const accountsData = await accountsRes.json()

  if (!accountsData.data?.length) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/accounts?error=no_accounts`
    )
  }

  for (const account of accountsData.data) {
    const existing = await prisma.adAccount.findFirst({
      where: { metaAccountId: account.account_id, agencyId },
    })

    if (existing) {
      await prisma.adAccount.update({
        where: { id: existing.id },
        data: { accessToken, name: account.name },
      })
    } else {
      await prisma.adAccount.create({
        data: {
          metaAccountId: account.account_id,
          name: account.name,
          accessToken,
          agencyId,
        },
      })
    }
  }

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/accounts?success=connected`)
}
