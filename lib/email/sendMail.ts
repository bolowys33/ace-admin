import nodemailer from "nodemailer";
import { generateHtml } from "./generateHtml";

interface Admin {
    email: string;
    name: string;
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true, 
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

export async function sendMail(admin: Admin, token: string) {
    try {
        const user = { name: admin.name, email: admin.email };

        const html = generateHtml(user, token);
        console.log(html);

        const mailOption = {
            from: "Ace & Grit LP",
            to: admin.email,
            subject: "Reset your password",
            html,
        };

        const result = await transporter.sendMail(mailOption);
        console.log(result.response);
    } catch (error) {
        throw new Error("Error sending recovery email");
    }
}
