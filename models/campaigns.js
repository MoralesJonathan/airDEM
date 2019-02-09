const mongodbConnection = require("../dbconfig/connection.js"),
    campaigns = {
        test: cb => {
            mongodbConnection.connect(error => {
                if (!error) {
                    cb(200);
                    mongodbConnection.close();
                } else {
                    cb(500,error);
                    mongodbConnection.close();
                }
            });
        },
    };

module.exports = campaigns;