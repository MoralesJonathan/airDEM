const mongodbConnection = require("../dbconfig/connection.js"),
    schedule = require("node-schedule"),
    emailer = require("../services/mailerService"),
    campaigns = {
        test: cb => {
            mongodbConnection.connect(error => {
                if (!error) {
                    cb(200);
                } else {
                    cb(500,error);
                }
            });
        },
        createCampaign: (data, cb) => {
            mongodbConnection.connect(error => {
                if (!error) {
                    const collection = mongodbConnection.db().collection("campaigns");
                    let {selected, ...obj} = data;
                    collection.insertOne(obj, function(err, result) {
                        if(!err) {
                            const date = new Date(Date.now() + 10000),
                                {name} = obj,
                                scheduledEmail = schedule.scheduleJob(date, () => {
                                    emailer.sendCampaign(name);
                                });
                            cb(200,{result,scheduledEmail})
                        } else {
                            cb(500,err);
                        } 
                    });
                } else {
                    cb(500,error);
                }
            });
        },
        getCampaign: (name,cb) => {
            mongodbConnection.connect(error => {
                if (!error) {
                    console.log(name);
                    const collection = mongodbConnection.db().collection("campaigns");
                    collection.findOne({"name":name},(err, result) => {
                        !err?cb(200,result): cb(500,err);
                    });
                } else {
                    cb(500,error);
                }
            });
        },
        getAllCampaigns: cb => {
            mongodbConnection.connect(error => {
                if (!error) {
                    const collection = mongodbConnection.db().collection("campaigns");
                    collection.find({}).toArray((err, result) => {
                        if(!err){
                            result = result.map(a => a.name);
                            cb(200,result)
                         }
                         else {
                            cb(500,err);
                         }
                    });
                } else {
                    cb(500,error);
                }
            });
        },
        deleteCampaign: (name,cb) => {
            mongodbConnection.connect(error => {
                if (!error) {
                    const collection = mongodbConnection.db().collection("campaigns");
                    collection.deleteOne({campaignName:name}, function(err, result) {
                        !err?cb(200,result): cb(500,err);
                    });
                } else {
                    cb(500,error);
                }
            });
        }
    };

module.exports = campaigns;