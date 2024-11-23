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

    // Initiate the Blink transfer
    const result = await initiateBlink(body)

    // Return the result
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating Blink transfer:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: 'An unexpected error occurred while creating the Blink transfer' }, { status: 500 })
  }
}