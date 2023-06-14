const user = require('../Models/userModel')
const serviceID = process.env.TWILIO_SERVICE_ID
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSID, authToken)
let newUser;
module.exports.register = async (req, res) => {
    const { username, phonenumber, email, password, cpassword } = req.body
    try {
        const phoneExist = await user.findOne({ phonenumber:phonenumber })
        if (phoneExist) {
            res.json({ message: 'This phonenumber already exist', status: false })
        } else {
            const emailExist = await user.findOne({ email:email })
            if (emailExist) {
                res.json({ message: 'This email already exist', status: false })
            } else {
                newUser = req.body
                client.verify.v2.services(serviceID)
                .verifications.create({ to: `+91${phonenumber}`, channel: "sms" })
                 res.json({status:true})
            }
        }
    }catch(error){

    }
}