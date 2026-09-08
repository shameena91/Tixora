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

}