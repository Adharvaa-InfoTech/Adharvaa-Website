import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, vehicle, variant, color, location, message } = data as {
      name: string
      email: string
      phone: string
      vehicle: string
      variant: string
      color: string
      location: string
      message?: string
    }

    const lines = [
      `New Quote Request from Adharvaa Suzuki website:`,
      '',
      `Name            : ${name}`,
      `Email           : ${email}`,
      `Phone           : ${phone}`,
      `Vehicle Model   : ${vehicle}`,
      `Variant         : ${variant}`,
      `Color           : ${color}`,
      `Location        : ${location}`,
      '',
      `Message:`,
      message || 'No message provided',
      '',
      `---`,
      `This inquiry should be sent to: care.suzuki@adharvaa.in`,
    ]

    // In a real deployment, integrate with an email service (SendGrid, SMTP, etc.)
    console.log(`QUOTE REQUEST TO: service.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling quote request', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

