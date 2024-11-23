import { NextResponse } from 'next/server'
import { getBlink } from '@/lib/blinks/utils'
import { Blink } from '@/lib/blinks/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const blinkId = searchParams.get('id')

    if (!blinkId) {
      return NextResponse.json({ error: 'Blink ID is required' }, { status: 400 })
    }

    const blink: Blink | undefined = await getBlink(blinkId)

    if (!blink) {
      return NextResponse.json({ error: 'Blink not found' }, { status: 404 })
    }

    // Remove sensitive information before sending the response
    const { fromPubkey, toPubkey, ...safeBlinkData } = blink

    return NextResponse.json({
      ...safeBlinkData,
      fromPubkey: fromPubkey.slice(0, 4) + '...' + fromPubkey.slice(-4),
      toPubkey: toPubkey.slice(0, 4) + '...' + toPubkey.slice(-4)
    })
  } catch (error) {
    console.error('Error fetching Blink:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: 'An unexpected error occurred while fetching the Blink' }, { status: 500 })
  }
}

