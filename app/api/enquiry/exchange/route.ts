import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, currentVehicle, currentVehicleYear, vehicleModel, kms, location } = data as {
      name: string
      email: string
      phone: string
      currentVehicle: string
      currentVehicleYear: string
      vehicleModel: string
      kms: string
      location: string
    }

    const lines = [
      `New Exchange Request from Adharvaa Suzuki website:`,
      '',
      `Name                    : ${name}`,
      `Email                   : ${email}`,
      `Phone                   : ${phone}`,
      `Current Vehicle         : ${currentVehicle}`,
      `Current Vehicle Year    : ${currentVehicleYear}`,
      `Kilometers Driven       : ${kms} km`,
      `Interested Vehicle Model: ${vehicleModel}`,
      `Location                : ${location}`,
      '',
      `---`,
      `This inquiry should be sent to: care.suzuki@adharvaa.in`,
    ]

    console.log(`EXCHANGE REQUEST TO: service.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling exchange request', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

