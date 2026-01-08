import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check for required environment variable
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email
    const { data, error } = await resend.emails.send({
      from: "SJCA Contact Form <onboarding@resend.dev>", // Resend default domain for testing
      to: "sjcamessenger@gmail.com",
      replyTo: email,
      subject: `New Connect Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
Time: ${new Date().toLocaleString()}
      `,
      html: `
<h2>New Connect Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      )
    }

    console.log("Email sent successfully:", data?.id)

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    
    // Get more specific error message
    let errorMessage = "Failed to send email"
    if (error instanceof Error) {
      errorMessage = error.message
      console.error("Error details:", error.message)
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 