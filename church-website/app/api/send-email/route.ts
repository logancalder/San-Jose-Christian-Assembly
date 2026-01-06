import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use App Password for Gmail
  },
})

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

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "lcalder2022@gmail.com", // For now, using dummy@gmail.com as requested
      subject: `New Connect Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
            `,
            html: `
        <h2>New Connect Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>${message}</p>
            `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
} 