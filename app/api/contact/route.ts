import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      name,
      mobileNumber,
      model,
      email,
      address,
      message,
      preferredBranch,
      branchEmail,
      branchName,
    } = data as {
      name: string
      mobileNumber: string
      model: string
      email: string
      address: string
      message: string
      preferredBranch: string
      branchEmail: string
      branchName: string
    }

    const lines = [
      `New contact inquiry received from Adharvaa Suzuki website:`,
      '',
      `Name            : ${name}`,
      `Mobile Number   : ${mobileNumber}`,
      `Email           : ${email}`,
      `Model           : ${model}`,
      `Preferred Branch: ${branchName}`,
      '',
      `Address:`,
      address,
      '',
      `Message:`,
      message,
      '',
      `---`,
      `This inquiry should be sent to: ${branchEmail}`,
    ]

    // In a real deployment, integrate with an email service (SendGrid, SMTP, etc.)
    // For now we just log the composed message so it can be wired to an email provider later.
    console.log(`CONTACT INQUIRY TO: ${branchEmail}\n\n` + lines.join('\n'))

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error handling contact inquiry', error)
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

