const {MongoClient} = require("mongodb"),
    dotenv = require("dotenv").config(),
    connection =  new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
    
module.exports = connection;