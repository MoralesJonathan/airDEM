const mongodbConnection = require("../dbconfig/connection.js"),
    airlines = {
        test: cb => {
            mongodbConnection.db().stats(result => {
                cb(200)
            })
        },
        addTracking: (data, cb) => {
            const collection = mongodbConnection.db().collection("tracking");
            collection.insertOne(data, function (err, result) {
                if (!err) {
                    cb(200, result )
                } else {
                    console.log(err);
                    cb(500, err);
                }
            });
        },
        getTracking: (iatacode, cb) => {
            const collection = mongodbConnection.db().collection("tracking");
            collection.find({ iataCode: iatacode }).toArray((err, results) => {
                if(!err){
                    let chartArray = [];
                    results.forEach(result => {
                        let {campaign, dates} = result;
                        let chartData = {
                            labels : [],
                            datasets: [{
                                label: campaign,
                                fillColor: "rgba(220,220,220,0.5)",
                                strokeColor: "rgba(220,220,220,0.8)",
                                highlightFill: "rgba(220,220,220,0.75)",
                                highlightStroke: "rgba(220,220,220,1)",
                                data: []
                            }]
                        }
                        dates.forEach(trackingDay => {
                            chartData.labels.push(Object.keys(trackingDay)[0])
                            chartData.datasets[0].data.push(Object.values(trackingDay)[0])
                        })
                        chartArray.push(chartData)
                    })
                    cb(200, chartArray)
                } else  cb(500, err)
            });
        },
        getAllTracking: cb => {
            const collection = mongodbConnection.db().collection("tracking");
            collection.find({}).toArray((err, result) => {
                if (!err) {
                    cb(200, {})
                }
                else {
                    cb(500, err);
                }
            });
        }
    };

module.exports = airlines;