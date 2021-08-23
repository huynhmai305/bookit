import nodemailer from "nodemailer";

interface Options {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: Options) => {
  const transport = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: Number(process.env.NEXT_PUBLIC_SMTP_POST),
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.NEXT_PUBLIC_SMTP_FROM_NAME} <${process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
};

export default sendEmail;
