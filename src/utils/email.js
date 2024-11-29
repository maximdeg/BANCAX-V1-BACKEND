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
      console.log({ response });
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
    } catch (error) {
      console.error("Error al enviar mail:", error);
      throw error;
    }
  }
}

export default Email;

// async sendVerificationToken() {
//   try {
//     const options = {
//       to: this.to,
//       subject: `Hi ${this.firstName}, Welcome to Bancax!`,
//       html: `
//         <h1>Email verification</h1>
//         <p>Please click on the link to verify your email</p>
//         <button style='background-color: 'black'; color: 'white'; padding: 5px; border-radius: 5px;'>
//           <a
//             style='text-decoration: none; color: 'white';'
//             href="${this.url}"
//           >Click aqui</a>
//         </button>
//         `,
//       from: this.from,
//     };

//     let response = await transporter.sendMail(options);
//     console.log({ response });
//   } catch (error) {
//     console.error("Error al enviar mail:", error);
//     throw error;
//   }
// }
// }
//   newTransport() {
//     if (process.env.NODE_ENV === "production") {
//       // sendgrid
//       return nodemailer.createTransport({
//         service: "SendGrid",
//         auth: {
//           user: process.env.SENDGRID_USERNAME,
//           pass: process.env.SENDGRID_PASSWORD,
//         },
//       });
//     }
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       // activate in gmail. 'less secure app' option
//     });
//   }

//   // Send the actual email
//   async send(template, subject) {
//     // Render HTML based on a pug template
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       firstName: this.firstName,
//       url: this.url,
//       subject,
//     });

//     // Define the email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: convert(html),
//     };

//     // Create a transport and send email
//     this.newTransport();
//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send("welcome", "Welcome to the Natourex Family");
//   }

//   async sendPasswordReset() {
//     await this.send(
//       "passwordReset",
//       "Your password reser token (VALID FOR ONLY 10 MIN)"
//     );
//   }
