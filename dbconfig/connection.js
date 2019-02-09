const {MongoClient} = require("mongodb");
process.env.NODE_ENV === "production" ? null:require("dotenv").config() 
const connection = new MongoClient(process.env.MONGODB_URI);
    
module.exports = connection;