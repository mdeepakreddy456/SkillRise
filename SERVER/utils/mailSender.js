const nodemailer = require("nodemailer");

const mailSender = async (email , title , body) => {
    try {
        const mailPass = (process.env.MAIL_PASS || "").replace(/\s+/g, "");
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: mailPass,
          },
        });

        let info = await transporter.sendMail({
            from: `SkillRise - Edutech Platform <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log("Mail response:", info.response);
        return info;

    } catch(error){
        console.error("Mail sender error:", error.message);
        return error.message;
    }
}

module.exports = mailSender;