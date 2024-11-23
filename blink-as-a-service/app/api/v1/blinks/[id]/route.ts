import { NextRequest, NextResponse } from 'next/server'
import { getBlink, updateBlinkStatus } from '@/lib/blinks/utils'
import { completeBlink, cancelBlink } from '@/lib/blinks/actions'
import { Blink, BlinkTransferAction } from '@/lib/blinks/types'
import { BLINK_STATUS } from '@/lib/blinks/constants'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const blink: Blink | undefined = await getBlink(id)

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
    return NextResponse.json({ error: 'Failed to fetch Blink' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body: { action: BlinkTransferAction } = await request.json()

    let result
    switch (body.action) {
      case 'complete':
        result = await completeBlink(id)
        break
      case 'cancel':
        result = await cancelBlink(id)
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating Blink:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update Blink' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const blink = await getBlink(id)
    if (!blink) {
      return NextResponse.json({ error: 'Blink not found' }, { status: 404 })
    }

    if (blink.status !== BLINK_STATUS.PENDING) {
      return NextResponse.json({ error: 'Cannot delete a non-pending Blink' }, { status: 400 })
    }

    // In a real-world scenario, you would delete the Blink from your database here
    // For this example, we'll just mark it as cancelled
    const updatedBlink = await updateBlinkStatus(id, BLINK_STATUS.CANCELLED)

    return NextResponse.json({ message: 'Blink deleted successfully', blink: updatedBlink })
  } catch (error) {
    console.error('Error deleting Blink:', error)
    return NextResponse.json({ error: 'Failed to delete Blink' }, { status: 500 })
  }
}