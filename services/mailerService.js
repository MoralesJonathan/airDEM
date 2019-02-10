const nodemailer = require("nodemailer");
process.env.NODE_ENV === "production" ? null : require("dotenv").config()
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAILUSERNAME,
        pass: process.env.EMAILPASSWORD
    }
});
mailerService = {
    sendCampaign: (campaignId, airline, mongoDb) => {
        let campaignPromise = new Promise((resolve, reject) => {
            mongoDb.collection("campaigns").findOne({ name: campaignId }, (err, campaignInfo) => {
                if (!err && campaignInfo !== null) {
                    resolve(campaignInfo)
                } else {
                    reject("Error finding campaign. Cannot send emails")
                }
            });
        });
        let airlinePromise = new Promise((resolve, reject) => {
            mongoDb.collection("airlines").findOne({ aiataCode: airline }, (err, airlineInfo) => {
                if (!err && airlineInfo !== null) {
                    resolve(airlineInfo)
                } else {
                    reject("Error finding airline. Cannot send emails")
                }
            });
        });
        let recipientsPromise = new Promise((resolve, reject) => {
            mongoDb.collection("mailingList").find({ airline: airline }).toArray((err, recipients) => {
                if (!err && recipients !== null) {
                    resolve(recipients)
                } else {
                    reject("Error finding recipients. Cannot send emails")
                }
            });
        });
        Promise.all([campaignPromise,airlinePromise,recipientsPromise]).then(results => {
            let mailOptions = {
                from: `"${results[1].airlineName}" <${results[1].airlineEmail}>`,
                to: results[1].airlineEmail,
                bcc: results[2],
                subject: results[0].subject,
                text: results[0].markup,
                html: results[0].markup
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending mail');
                    console.log(error.message);
                }
                console.log(`Message sent successfully! ${JSON.stringify(info)}`);
            })
        }).catch(error => {
            console.log(`Could not send emails: ${error}`)
        });
    }
}

module.exports = mailerService;