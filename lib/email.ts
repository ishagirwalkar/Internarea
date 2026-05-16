import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import EmailLog from './models/emailLog';
import { connectToDatabase } from '../internarea_api/lib/mongodb';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export type ApplicationEmailDetails = {
  applicantName: string;
  applicantEmail: string;
  listingType: 'job' | 'internship';
  company: string;
  category: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeFileName: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.EMAIL_HOST?.trim();
  const port = Number(process.env.EMAIL_PORT ?? 587);
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  const from = process.env.EMAIL_FROM?.trim() || user;

  if (!host || !user || !pass || !from) {
    throw new Error(
      'Email configuration is incomplete. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, and optionally EMAIL_FROM.',
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.EMAIL_SECURE === 'true' || port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

function buildNotificationEmail(application: ApplicationEmailDetails) {
  const listingTypeLabel = application.listingType === 'job' ? 'Job' : 'Internship';
  const statusLabel = application.status === 'approved' ? 'approved' : 'rejected';
  const subject = `Your ${listingTypeLabel} application has been ${statusLabel}`;
  const text = `Hello ${application.applicantName},

` +
    `Your ${listingTypeLabel.toLowerCase()} application for ${application.company} - ${application.category} submitted on ${application.appliedDate} has been ${statusLabel}.

` +
    `Resume: ${application.resumeFileName}
` +
    `If you have questions, please reply to this email or contact our support team.

` +
    `Thank you for applying,
` +
    `InternArea Team`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1f2937;line-height:1.6;">
      <p>Hello ${application.applicantName},</p>
      <p>
        Your <strong>${listingTypeLabel.toLowerCase()}</strong> application for
        <strong>${application.company}</strong> — <em>${application.category}</em> submitted on
        <strong>${application.appliedDate}</strong> has been <strong>${statusLabel}</strong>.
      </p>
      <p><strong>Resume file:</strong> ${application.resumeFileName}</p>
      <p>If you have questions, please reply to this email or contact our support team.</p>
      <p>Thank you for applying,<br />InternArea Team</p>
    </div>
  `;

  return {
    subject,
    text,
    html,
  };
}

export async function sendApplicationStatusEmail(application: ApplicationEmailDetails) {
  await connectToDatabase(); // Ensure DB connection

  const transport = getTransporter();
  const mail = buildNotificationEmail(application);

  const message: SendMailOptions = {
    from: process.env.EMAIL_FROM?.trim() || process.env.EMAIL_USER?.trim(),
    to: application.applicantEmail,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  try {
    await transport.sendMail(message);
    await EmailLog.create({
      to: message.to,
      subject: message.subject,
      body: message.text,
      status: 'sent',
    });
  } catch (error) {
    await EmailLog.create({
      to: message.to,
      subject: message.subject,
      body: message.text,
      status: 'failed',
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}
