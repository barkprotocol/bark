import { NextRequest, NextResponse } from 'next/server'
import { createBlink, fetchBlinks, updateBlink, deleteBlink } from '@/lib/blinks/api'
import { Blink } from '@/lib/blinks/types'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const blinkData: Partial<Blink> = await request.json()
    const newBlink = await createBlink(blinkData)
    return NextResponse.json({ success: true, data: newBlink })
  } catch (error) {
    console.error('Error creating Blink:', error)
    return NextResponse.json({ 
      error: 'Failed to create Blink', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const blinks = await fetchBlinks(owner || undefined)
    return NextResponse.json({ success: true, data: blinks })
  } catch (error) {
    console.error('Error fetching Blinks:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch Blinks', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, updates }: { id: string; updates: Partial<Blink> } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Blink ID is required' }, { status: 400 })
    }
    const updatedBlink = await updateBlink(id, updates)
    return NextResponse.json({ success: true, data: updatedBlink })
  } catch (error) {
    console.error('Error updating Blink:', error)
    return NextResponse.json({ 
      error: 'Failed to update Blink', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Blink ID is required' }, { status: 400 })
    }
    await deleteBlink(id)
    return NextResponse.json({ success: true, message: 'Blink deleted successfully' })
  } catch (error) {
    console.error('Error deleting Blink:', error)
    return NextResponse.json({ 
      error: 'Failed to delete Blink', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}