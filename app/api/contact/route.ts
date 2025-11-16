import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/lib/sendEmail';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, message, phone } = await request.json();

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email to admin/company
    const adminEmailSubject = `New Contact Form Submission from ${fullName}`;
    const adminEmailText = `
New contact form submission:

Name: ${fullName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Message: ${message}

---
This email was sent from the contact form on your website.
    `;
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This email was sent from the contact form on your website.
        </p>
      </div>
    `;

    // Thank you email to user
    const thankYouSubject = 'Thank You for Contacting Us';
    const thankYouText = `
Dear ${fullName},

Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.

${phone ? `Phone: ${phone}\n` : ''}
Your message:
${message}

We appreciate your interest and look forward to assisting you.

Best regards,
The Team
    `;
    const thankYouHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Dear <strong>${fullName}</strong>,
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.
          </p>
        </div>

        <div style="background-color: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Your message:</p>
          <p style="margin: 0; color: #666; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </p>
          ${phone ? `<p style="margin: 15px 0 0 0; color: #666; line-height: 1.6;"><strong>Phone:</strong> ${phone}</p>` : ''}
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          We appreciate your interest and look forward to assisting you.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            Best regards,<br>
            <strong>The Team</strong>
          </p>
        </div>
      </div>
    `;

    // Get admin email from environment variable or use GMAIL_USER as fallback
    const adminEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
    
    if (!adminEmail) {
      console.error('No admin email configured. Set CONTACT_EMAIL or GMAIL_USER in environment variables.');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Send email to admin
    await sendEmail(
      adminEmail,
      adminEmailSubject,
      adminEmailText,
      adminEmailHtml
    );

    // Send thank you email to user
    await sendEmail(
      email,
      thankYouSubject,
      thankYouText,
      thankYouHtml
    );

    return NextResponse.json(
      { message: 'Contact form submitted successfully. Thank you for reaching out!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send contact form' },
      { status: 500 }
    );
  }
}



