import transporter from "../config/transporter.config.js";
import ENV from "../config/enviroment.config.js";
import welcomeTokenHTML from "./email.templates/welcomeTokenHTML.js";
import resetPasswordTokenHTML from "./email.templates/resetPasswordTokenHTML.js";

class Email {
    constructor(userName, userEmail, url) {
        this.to = userEmail;
        this.firstName = userName.split(" ")[0];
        this.url = url;
        this.from = `Maxim Degtiarev <${ENV.GMAIL_USER}>`;
    }

    async sendVerificationToken() {
        try {
            const options = {
                to: this.to,
                subject: `Hi ${this.firstName}, Welcome to Bancax!`,
                html: welcomeTokenHTML(this.url, this.firstName),
                from: this.from,
            };

            let response = await transporter.sendMail(options);
            return response;
        } catch (error) {
            console.error("Error al enviar mail:", error);
            throw error;
        }
    }

    async sendResetPasswordToken() {
        try {
            const options = {
                to: this.to,
                subject: `Here is your reset password request ${this.firstName}, from Bancax.`,
                html: resetPasswordTokenHTML(this.url, this.firstName),
                from: this.from,
            };

            let response = await transporter.sendMail(options);

            return response;
        } catch (error) {
            console.error("Error al enviar mail:", error);
            throw error;
        }
    }
}

export default Email;
