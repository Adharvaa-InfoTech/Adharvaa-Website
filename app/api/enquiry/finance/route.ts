import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const { name, email, phone, vehicle, loanAmount, employmentType, monthlyIncome, location, message } = data as {
      name: string
      email: string
      phone: string
      vehicle: string
      loanAmount: string
      employmentType: string
      monthlyIncome: string
      location: string
      message?: string
    }

    const lines = [
      `New Finance Application from Adharvaa Suzuki website:`,
      '',
      `Name              : ${name}`,
      `Email             : ${email}`,
      `Phone             : ${phone}`,
      `Vehicle Model     : ${vehicle}`,
      `Loan Amount       : ₹${loanAmount}`,
      `Employment Type   : ${employmentType}`,
      `Monthly Income    : ₹${monthlyIncome}`,
      `Location          : ${location}`,
      '',
      `Message:`,
      message || 'No message provided',
      '',
      `---`,
      `This inquiry should be sent to: finance.suzuki@adharvaa.in`,
    ]

    console.log(`FINANCE APPLICATION TO: finance.suzuki@adharvaa.in\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling finance application', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

