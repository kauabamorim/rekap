import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const params = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    scope: "ads_read,ads_management",
    response_type: "code",
    state: session.user.id,
  })

  return NextResponse.redirect(
    `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
  )
}
