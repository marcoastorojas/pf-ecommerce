
const { google } = require('googleapis');
const nodemailer = require("nodemailer");
const {
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_REFRESH_TOKEN,
    EMAIL_REDIRECT_URI } = process.env;


const oAuth2Client = new google.auth.OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN })
async function sendmail(emails, subject, text, html) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "majewka10@gmail.com",
                clientId: EMAIL_CLIENT_ID,
                clientSecret: EMAIL_CLIENT_SECRET,
                refreshToken: EMAIL_REFRESH_TOKEN,
                accessToken
            }
        })

        let result = await transporter.sendMail({
            from: '"Pf-ecommerce🌟" <loco@loco.com>', // sender address
            to: emails, // list of receivers
            subject, // Subject line
            text, // plain text body
            html // html body
        })
        return result

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendmail