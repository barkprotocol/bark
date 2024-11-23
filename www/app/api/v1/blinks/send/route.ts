import { NextResponse } from 'next/server'
import { initiateBlink } from '@/lib/blinks/actions'
import { BlinkTransferRequest } from '@/lib/blinks/types'
import { validateBlinkTransferRequest } from '@/lib/blinks/utils'

export async function POST(request: Request) {
  try {
    const body: BlinkTransferRequest = await request.json()
    
    // Validate the request
    const validationError = validateBlinkTransferRequest(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const result = await initiateBlink(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error initiating Blink transfer:', error)
    return NextResponse.json({ error: 'Failed to initiate Blink transfer' }, { status: 500 })
  }
}