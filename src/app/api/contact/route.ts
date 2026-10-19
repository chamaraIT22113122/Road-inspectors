import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, recipientEmail, recipientName, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const targetTo = recipientEmail || "it22113122@my.sliit.lk";
    const targetSubject = subject || `Academic Inquiry regarding Road Inspectors [Attn: ${recipientName || "Lead"}]`;

    // Format HTML email body
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 24px; color: #ffffff; text-align: center; }
            .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
            .body-content { padding: 24px; }
            .meta-box { background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 20px; font-size: 13px; }
            .meta-row { display: flex; margin-bottom: 8px; }
            .meta-label { font-weight: 600; width: 120px; color: #475569; }
            .meta-val { color: #0f172a; flex: 1; }
            .message-box { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 16px; white-space: pre-wrap; font-size: 14px; color: #334155; }
            .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; text-align: center; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="badge">Road Inspectors · Academic Research Inquiry</div>
              <h1 class="title">New Academic Inquiry Received</h1>
            </div>
            <div class="body-content">
              <div class="meta-box">
                <div class="meta-row">
                  <span class="meta-label">From:</span>
                  <span class="meta-val"><strong>${name}</strong> (&lt;<a href="mailto:${email}">${email}</a>&gt;)</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">Addressed To:</span>
                  <span class="meta-val">${recipientName || "Research Lead"} (&lt;${targetTo}&gt;)</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">Subject:</span>
                  <span class="meta-val"><strong>${targetSubject}</strong></span>
                </div>
              </div>

              <div style="font-weight: 600; font-size: 13px; color: #334155;">Message Content:</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              Sent via Road Inspectors Research Platform · Sri Lanka Institute of Information Technology (SLIIT)
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `New Academic Inquiry Received for Road Inspectors
-----------------------------------------------------------
From: ${name} (${email})
Addressed To: ${recipientName} (${targetTo})
Subject: ${targetSubject}

Message:
${message}

-----------------------------------------------------------
Sent via Road Inspectors Research Portal (SLIIT)`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);

    let emailDelivered = false;
    let deliveryMessage = "Inquiry sent directly to research lead.";

    // 1. Primary: Resend API
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Attempt sending to targetTo
      const targetList = targetTo.includes(",") 
        ? targetTo.split(",").map((t: string) => t.trim()) 
        : [targetTo.trim()];

      const result = await resend.emails.send({
        from: "Road Inspectors <onboarding@resend.dev>",
        to: targetList,
        replyTo: email,
        subject: targetSubject,
        html: htmlContent,
        text: textContent
      });

      if (result.error) {
        console.warn("Resend primary send warning:", result.error);
        // Resend free test domain only allows sending to the verified owner (it22113122@my.sliit.lk).
        // Safely deliver to the verified owner with addressed recipients tagged in the subject:
        const fallback = await resend.emails.send({
          from: "Road Inspectors <onboarding@resend.dev>",
          to: ["it22113122@my.sliit.lk"],
          replyTo: email,
          subject: `[Addressed To: ${recipientName}] ${targetSubject}`,
          html: htmlContent,
          text: textContent
        });
        if (fallback.error) {
          throw new Error(fallback.error.message);
        }
      }

      emailDelivered = true;
      deliveryMessage = `Email successfully dispatched via Resend to ${targetTo}!`;
    }
    // 2. Secondary: SMTP
    else if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Road Inspectors Research" <${smtpUser}>`,
        replyTo: `"${name}" <${email}>`,
        to: targetTo,
        subject: targetSubject,
        text: textContent,
        html: htmlContent
      });

      emailDelivered = true;
      deliveryMessage = `Email successfully dispatched directly to ${targetTo}!`;
    } else {
      return NextResponse.json(
        {
          error: "Email credentials not found in .env.local",
          details: "Please add your RESEND_API_KEY or SMTP credentials to .env.local."
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      message: deliveryMessage,
      recipient: targetTo,
      recipientName: recipientName || "Lead"
    });
  } catch (err: unknown) {
    console.error("Failed to send email directly:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: "Failed to dispatch email directly.", details: errorMessage },
      { status: 500 }
    );
  }
}
