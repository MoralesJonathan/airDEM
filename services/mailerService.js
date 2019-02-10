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
    sendCampaign: (campaignId, airline, collection) => {
        let campaignPromise = new Promise((resolve, reject) => {
            collection.findOne({ campaignName: campaignId }, (err, campaignInfo) => {
                if (!err) {
                    resolve(campaignInfo)
                } else {
                    reject("Error finding campaign. Cannot send emails")
                }
            });
        });
        let airlinePromise = new Promise((resolve, reject) => {
            collection.findOne({ airlineName: airline }, (err, airlineInfo) => {
                if (!err) {
                    resolve(airlineInfo)
                } else {
                    reject("Error finding airline. Cannot send emails")
                }
            });
        });
        let recipientsPromise = new Promise((resolve, reject) => {
            collection.find({ airline: airline }).toArray((err, recipients) => {
                if (!err) {
                    resolve(recipients)
                } else {
                    reject("Error finding recipients. Cannot send emails")
                }
            });
        });
        Promise.all([campaignPromise,airlinePromise,recipientsPromise], results => {
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
        })

    }
}

module.exports = mailerService;