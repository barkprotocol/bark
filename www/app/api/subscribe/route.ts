import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    })

    return NextResponse.json(
      { message: 'Subscription successful', subscriber },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscription error:', error)

    // Handle known Prisma errors (e.g., unique constraint violations)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}