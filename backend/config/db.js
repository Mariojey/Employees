require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
    const connection = mongoose.connect(process.env.MONGODB_URI)
        .then((result) => console.log(`🥭 Connected to database`))
        .catch((err) => console.log(`Could not connect to db ${err}`))
}