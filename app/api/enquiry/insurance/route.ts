import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, vehicle, registrationNumber, insuranceType, currentPolicyExpiry, location, message } = data as {
      name: string
      email: string
      phone: string
      vehicle: string
      registrationNumber: string
      insuranceType: string
      currentPolicyExpiry?: string
      location: string
      message?: string
    }

    const lines = [
      `New Insurance Inquiry from Adharvaa Suzuki website:`,
      '',
      `Name                    : ${name}`,
      `Email                   : ${email}`,
      `Phone                   : ${phone}`,
      `Vehicle Model           : ${vehicle}`,
      `Registration Number     : ${registrationNumber}`,
      `Insurance Type          : ${insuranceType}`,
      `Current Policy Expiry   : ${currentPolicyExpiry || 'N/A'}`,
      `Location                : ${location}`,
      '',
      `Message:`,
      message || 'No message provided',
      '',
      `---`,
      `This inquiry should be sent to: care.suzuki@adharvaa.in`,
    ]

    console.log(`INSURANCE INQUIRY TO: service.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling insurance inquiry', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

