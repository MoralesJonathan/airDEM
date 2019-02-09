const {MongoClient} = require("mongodb");
process.env.NODE_ENV === "development" ?require("dotenv").config() : null;
const connection =  new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
    
module.exports = connection;