import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, vehicle, preferredDate, preferredTime, location } = data as {
      name: string
      email: string
      phone: string
      vehicle: string
      preferredDate: string
      preferredTime: string
      location: string
    }

    const lines = [
      `New Test Drive Booking from Adharvaa Suzuki website:`,
      '',
      `Name            : ${name}`,
      `Email           : ${email}`,
      `Phone           : ${phone}`,
      `Vehicle Model   : ${vehicle}`,
      `Preferred Date  : ${preferredDate}`,
      `Preferred Time  : ${preferredTime}`,
      `Location        : ${location}`,
      '',
      `---`,
      `This inquiry should be sent to: sales.suzuki@adharvaa.in`,
    ]

    console.log(`TEST DRIVE BOOKING TO: sales.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling test drive booking', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

