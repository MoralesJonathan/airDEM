const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    schedule = require("node-schedule"),
    emailer = require("../services/mailerService"),
    campaigns = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        createCampaign: (data, cb) => {
            const collection = mongodbConnection.db().collection("campaigns");
            const trackingCollection = mongodbConnection.db().collection("tracking");
            let { selected, ...obj } = data;
            trackingCollection.insertOne({"campaign": obj.name, "iataCode": obj.iataCode, "events": [{"date": new Date(obj.date).toLocaleDateString(),"clicks":0,"views":0}]}, function (err, result) {
                if (!err) {
                    collection.insertOne(obj, function (err, result) {
                        if (!err) {
                            const date = new Date(Date.now() + 10000),
                                { name, iataCode} = obj,
                                scheduledEmail = schedule.scheduleJob(date, () => {
                                    emailer.sendCampaign(name, iataCode, mongodbConnection.db());
                                });
                            cb(200, { result, scheduledEmail })
                        } else {
                            console.log(err);
                            cb(500, err);
                        }
                    });
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getCampaign: (name, cb) => {
            const collection = mongodbConnection.db().collection("campaigns");
            collection.findOne({ name: name }, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllCampaigns: cb => {
            const collection = mongodbConnection.db().collection("campaigns");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    result = result.map(a => a.name);
                    cb(200, result)
                }
                else {
                    cb(500, err);
                }
            });
        },
        deleteCampaign: (name, cb) => {
            const collection = mongodbConnection.db().collection("campaigns");
            collection.deleteOne({ campaignName: name }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateCampaign: (data, cb) => {
            const { _id, ...rest } = data
            const collection = mongodbConnection.db().collection("campaigns");
            collection.updateOne({ _id: new ObjectId(data._id) }, { $set: rest }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = campaigns;