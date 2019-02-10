const mongodbConnection = require("../dbconfig/connection.js"),
    ObjectId = require('mongodb').ObjectId,
    schedule = require("node-schedule"),
    emailer = require("../services/mailerService"),
    airlines = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        createAirline: (data, cb) => {
            const collection = mongodbConnection.db().collection("airlines");
            let { selected, ...obj } = data;
            collection.insertOne(obj, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getAirline: (name, cb) => {
            const collection = mongodbConnection.db().collection("airlines");
            collection.findOne({ name: name }, (err, result) => {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        getAllAirlines: cb => {
            const collection = mongodbConnection.db().collection("airlines");
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
        deleteAirline: (name, cb) => {
            const collection = mongodbConnection.db().collection("airlines");
            collection.deleteOne({ name: name }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        },
        updateAirline: (data, cb) => {
            const { _id, ...rest } = data
            const collection = mongodbConnection.db().collection("airlines");
            collection.updateOne({ _id: new ObjectId(data._id) }, { $set: rest }, function (err, result) {
                !err ? cb(200, result) : cb(500, err);
            });
        }
    };

module.exports = airlines;