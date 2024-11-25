'use server'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function sendEmail(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid form data' }
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
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { error: 'Failed to send email' }
  }
}

