require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;

module.exports = () => {
    const connection = mongoose.connect(process.env.MONGODB_URI)
        .then((result) => {
            console.log(`======================================`);
            console.log(`||       E M P L O Y E E S          ||`);
            console.log(`||🦫 Server running on PORT ${PORT}    ||`);
            console.log(`||       Made by MarioJey           ||`);
            console.log(`=====================================`);
            console.log(`🥭 Connected to database`)
        })
        .catch((err) => console.log(`Could not connect to db ${err}`))
}