'use server'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export async function sendEmail(formData: z.infer<typeof formSchema>) {
  const validatedFields = formSchema.safeParse(formData)

  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.issues.map(issue => issue.message).join(', ')
    }
  }

  const { name, email, message } = validatedFields.data

  const apiKey = process.env.SENDIT_API_KEY
  if (!apiKey) {
    console.error('SendIt API key is not set')
    return { error: 'Configuration error' }
  }

  try {
    const response = await fetch('https://api.sendit.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: 'contact@barkprotocol.com',
        from: 'noreply@barkprotocol.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || 'Failed to send email')
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: error instanceof Error ? error.message : 'Failed to send email' }
  }
}

