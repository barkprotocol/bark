import { NextRequest, NextResponse } from 'next/server'
import { completeBlink, cancelBlink } from '@/lib/blinks/actions'
import { getBlink } from '@/lib/blinks/utils'
import { BlinkTransferAction, Blink } from '@/lib/blinks/types'
import { BLINK_STATUS } from '@/lib/blinks/constants'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body: { action: BlinkTransferAction } = await request.json()

    // Validate the Blink exists
    const blink: Blink | undefined = await getBlink(id)
    if (!blink) {
      return NextResponse.json({ error: 'Blink not found' }, { status: 404 })
    }

    // Validate the action
    if (!['complete', 'cancel'].includes(body.action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Validate the current status
    if (blink.status !== BLINK_STATUS.PENDING) {
      return NextResponse.json({ error: 'Can only transfer pending Blinks' }, { status: 400 })
    }

    let result
    switch (body.action) {
      case 'complete':
        result = await completeBlink(id)
        break
      case 'cancel':
        result = await cancelBlink(id)
        break
    }

    // Remove sensitive information before sending the response
    const { fromPubkey, toPubkey, ...safeBlinkData } = result

    return NextResponse.json({
      ...safeBlinkData,
      fromPubkey: fromPubkey.slice(0, 4) + '...' + fromPubkey.slice(-4),
      toPubkey: toPubkey.slice(0, 4) + '...' + toPubkey.slice(-4)
    }, { status: 200 })
  } catch (error) {
    console.error('Error processing Blink transfer:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unexpected error occurred while processing the Blink transfer' }, { status: 500 })
  }
}