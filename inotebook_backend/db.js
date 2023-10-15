// file for connect to database mongodb

const mongoose = require("mongoose");
require("dotenv").config();

const mongooseURI = process.env.MONGO_URI;
const databaseName = process.env.DB_NAME;

const connectTomongoos = () => {
  mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  });
};

module.exports = connectTomongoos;
