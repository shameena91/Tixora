import nodemailer from "nodemailer";
import { env } from "../../../../config/env";
import {  IEmailService } from "../../application/ports/IEmailService";
export class EmailNodemailerService implements IEmailService{

    private transporter;
    constructor(){
   
        this.transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:env.emailUser,
                pass:env.emailPswd
            }
        })
    }

    async sendOtp(email:string,otp:string):Promise<void>{
        await this.transporter.sendMail({
            from:env.emailUser,
            to:email,
            subject:"Your OTP",
            text:`Your Otp is${otp}`
        })
    }

    
async sendInvitation(
  email: string,
  invitationLink: string,
): Promise<void> {
  await this.transporter.sendMail({
    from: env.emailUser,
    to: email,
    subject: "You're invited to join Tixora",
    html: `
      <h2>Welcome to Tixora!</h2>

      <p>Your company has invited you to join Tixora.</p>

      <p>Click the button below to create your password.</p>

      <a
        href="${invitationLink}"
        style="
          display: inline-block;
          padding: 12px 20px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        "
      >
        Accept Invitation
      </a>

      <p>This invitation link expires in 24 hours.</p>

      <p>If you did not expect this invitation, you can ignore this email.</p>
    `,
  });
}


}