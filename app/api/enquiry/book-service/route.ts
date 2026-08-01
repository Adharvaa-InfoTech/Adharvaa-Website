import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, vehicleNumber, vehicleModel, serviceType, preferredDate, location } = data as {
      name: string
      email: string
      phone: string
      vehicleNumber: string
      vehicleModel: string
      serviceType: string
      preferredDate: string
      location: string
    }

    const lines = [
      `New Service Booking from Adharvaa Suzuki website:`,
      '',
      `Name                    : ${name}`,
      `Email                   : ${email}`,
      `Phone                   : ${phone}`,
      `Vehicle Registration No : ${vehicleNumber}`,
      `Vehicle Model           : ${vehicleModel}`,
      `Service Type            : ${serviceType}`,
      `Preferred Date          : ${preferredDate}`,
      `Location                : ${location}`,
      '',
      `---`,
      `This inquiry should be sent to: service.suzuki@adharvaa.in`,
    ]

    console.log(`SERVICE BOOKING TO: service.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling service booking', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

