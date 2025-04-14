"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Validate form data
    const validatedFields = formSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, message } = validatedFields.data

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // In a real application, these would be environment variables
        user: "your-email@gmail.com", // Replace with your actual email for sending
        pass: "your-app-password", // Replace with your app password
      },
    })

    // Email content
    const mailOptions = {
      from: "your-email@gmail.com", // Replace with your actual email
      to: "pidaparthimeghana@gmail.com",
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // For demo purposes, we'll just log the email content and return success
    // In a real application, you would uncomment the line below to actually send the email
    // await transporter.sendMail(mailOptions)

    console.log("Email would be sent with:", mailOptions)

    return {
      success: true,
      message: "Message sent successfully!",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
