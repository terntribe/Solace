const mongoose = require("mongoose");
require("dotenv/config");
const  MONGO_URI = process.env.MONGO_URI


const connectDB = async () => {
    return mongoose
    .connect(MONGO_URI)
    .then(console.log("Connected to the database successfully"))
    .catch((error) =>console.log(`Unable to connect to the database ${error}`))

}

module.exports =  {connectDB};