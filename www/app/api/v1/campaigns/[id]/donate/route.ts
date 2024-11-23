import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { amount } = await request.json()
    const updatedCampaign = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        raised: {
          increment: amount,
        },
      },
    })
    return NextResponse.json(updatedCampaign)
  } catch (error) {
    console.error('Error updating campaign:', error)
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 })
  }
}

