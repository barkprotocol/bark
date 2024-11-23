import { NextResponse } from 'next/server'
import { getBlinkHistory } from '@/lib/blinks/actions'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userPubkey = searchParams.get('userPubkey')

  if (!userPubkey) {
    return NextResponse.json({ error: 'User public key is required' }, { status: 400 })
  }

  try {
    const history = await getBlinkHistory(userPubkey)
    return NextResponse.json(history)
  } catch (error) {
    console.error('Error fetching Blink history:', error)
    return NextResponse.json({ error: 'Failed to fetch Blink history' }, { status: 500 })
  }

