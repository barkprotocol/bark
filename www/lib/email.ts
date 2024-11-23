import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<boolean> {
  try {
    const fromEmail = process.env['FROM_EMAIL']
    if (!fromEmail) {
      throw new Error('FROM_EMAIL environment variable is not set')
    }

    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      text,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    console.log(`Email sent successfully to ${to}`)
    return true
  } catch (error) {
    console.error('Error sending email:', error instanceof Error ? error.message : String(error))
    return false
  }
}

export async function sendVerificationEmail(to: string, verificationLink: string): Promise<boolean> {
  const subject = 'Verify Your Email - BARK Protocol'
  const text = `Welcome to BARK Protocol! Please verify your email by clicking on the following link: ${verificationLink}`
  const html = `
    <h1>Welcome to BARK Protocol!</h1>
    <p>Please verify your email by clicking on the button below:</p>
    <a href="${verificationLink}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Email</a>
    <p>If the button doesn't work, you can also click on this link: <a href="${verificationLink}">${verificationLink}</a></p>
    <p>If you didn't sign up for BARK Protocol, please ignore this email.</p>
  `

  return sendEmail({ to, subject, text, html })
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<boolean> {
  const subject = 'Reset Your Password - BARK Protocol'
  const text = `You have requested to reset your password. Please click on the following link to set a new password: ${resetLink}`
  const html = `
    <h1>Reset Your Password</h1>
    <p>You have requested to reset your password for your BARK Protocol account.</p>
    <p>Please click on the button below to set a new password:</p>
    <a href="${resetLink}" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Reset Password</a>
    <p>If the button doesn't work, you can also click on this link: <a href="${resetLink}">${resetLink}</a></p>
    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
  `

  return sendEmail({ to, subject, text, html })
}

export async function sendWelcomeEmail(to: string): Promise<boolean> {
  const subject = 'Welcome to BARK Protocol!'
  const text = "Thank you for joining BARK Protocol. We're excited to have you on board!"
  const html = `
    <h1>Welcome to BARK Protocol!</h1>
    <p>Thank you for joining BARK Protocol. We're excited to have you on board!</p>
    <p>Here are some things you can do to get started:</p>
    <ul>
      <li>Complete your profile</li>
      <li>Explore our features</li>
      <li>Connect with other users</li>
    </ul>
    <p>If you have any questions, feel free to reach out to our support team.</p>
  `

  return sendEmail({ to, subject, text, html })
}

export async function sendNotificationEmail(to: string, message: string): Promise<boolean> {
  const subject = 'New Notification from BARK Protocol'
  const text = `You have a new notification: ${message}`
  const html = `
    <h1>New Notification</h1>
    <p>You have a new notification from BARK Protocol:</p>
    <p style="background-color: #f2f2f2; padding: 15px; border-left: 5px solid #008CBA;">${message}</p>
    <p>Log in to your account to see more details and take any necessary actions.</p>
  `

  return sendEmail({ to, subject, text, html })
}