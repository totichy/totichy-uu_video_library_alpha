const Mongoose = require("mongoose");
const dotenv = require("dotenv");
class DBConnect {
    connect() {
        dotenv.config();
        Mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, (err) => {
            if (err) throw new Error("Unable to connect MongoDB")
            console.log("MongoDB database successfully connected!")
        })
    }
}

module.exports = new DBConnect;