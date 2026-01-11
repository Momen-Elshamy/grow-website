import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, company, phone, propertySize, aiIntegration, message } =
    req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !company ||
    !phone ||
    !propertySize ||
    !aiIntegration ||
    !message
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create transporter (using Gmail as example)
  // You can also use other services like SendGrid, Mailgun, etc.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
    },
  });

  // Format property size for display
  const propertySizeLabels = {
    small: "Small (0-5 hectares)",
    medium: "Medium (5-20 hectares)",
    large: "Large (20-50 hectares)",
    xlarge: "Extra Large (50+ hectares)",
  };

  // Format AI integration for display
  const aiIntegrationLabels = {
    basic: "Basic AI Integration",
    advanced: "Advanced AI Solutions",
    custom: "Custom AI Development",
    consultation: "AI Consultation",
  };

  // Email content
  const mailOptions = {
    from: `"${name}" <${email}>`, // Send from the form user's email
    replyTo: email, // Replies will go to the form user's email
    to: "ot486061@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #107634; border-bottom: 2px solid #107634; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">Company:</strong> ${company}</p>
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">Phone:</strong> ${phone}</p>
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">Property Size:</strong> ${
            propertySizeLabels[propertySize] || propertySize
          }</p>
          <p style="margin: 10px 0;"><strong style="color: #083b1a;">AI Integration:</strong> ${
            aiIntegrationLabels[aiIntegration] || aiIntegration
          }</p>
        </div>
        <div style="margin-top: 20px;">
          <h3 style="color: #083b1a;">Message:</h3>
          <p style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #107634; white-space: pre-wrap;">
            ${message}
          </p>
        </div>
      </div>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Company: ${company}
      Phone: ${phone}
      Property Size: ${propertySizeLabels[propertySize] || propertySize}
      AI Integration: ${aiIntegrationLabels[aiIntegration] || aiIntegration}
      
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to send email",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
