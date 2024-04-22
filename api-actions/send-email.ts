'use server';

import EmailTemplate from '../components/email-template/email-template';
import { render } from '@react-email/render';
const nodemailer = require('nodemailer');

export type SendEmailResponse = {
  data: { id: string } | null;
  error: {
    statusCode: number;
    message: string;
    name: string;
  };
};

export default async function sendEmail(
  name: string,
  email: string,
  subject: string,
  text: string
) {
  if (!name || !text || !email || !subject) {
    return {
      data: null,
      error: { message: 'all fields required' },
    } as SendEmailResponse;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port: process.env.ZOHO_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER,
      pass: process.env.ZOHO_SMTP_PASSWORD,
    },
  });

  const info = {
    from: 'info@innadinova.com',
    to: 'inna.dinova@gmail.com',
    subject: subject,
    text: '',
    html: render(EmailTemplate({ name, email, text })),
  };
  try {
    const result = await transporter.sendMail(info);
    return { error: null, data: { messageId: result.messageId } };
  } catch (error) {
    return {
      data: null,
      error: { message: `${error}` || 'unknown send email error' },
    } as SendEmailResponse;
  }
}
