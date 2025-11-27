import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "../../../lib/prisma"

export async function GET(req: Request) {
  const user = await auth()

  if (!user.userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get("page") || "1")
  const pageSize = 10
  const skip = (page - 1) * pageSize

  try {
    const agencies = await prisma.agency.findMany({
      skip,
      take: pageSize,
      orderBy: {
        created_at: "desc",
      },
    })

    const total = await prisma.agency.count()

    return NextResponse.json({
      agencies,
      total,
      page,
      pageSize,
      hasMore: skip + pageSize < total,
    })
  } catch (error) {
    console.error("Failed to fetch agencies:", error)
    return NextResponse.json({ error: "Failed to fetch agencies" }, { status: 500 })
  }
}