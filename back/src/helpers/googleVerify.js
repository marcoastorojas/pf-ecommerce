const { OAuth2Client } = require("google-auth-library")



const googleVerify = async (idToken) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    return {
        email: payload.email,
        name: payload.given_name,
        google: true,
        lastname: payload.family_name,
        image: payload.picture,
    }

}
module.exports = {
    googleVerify
}