require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require('./config/db');
const bodyParser = require("body-parser");

//routes
const employeeRoute = require('./routes/employeeRoute')

const app = express();
const PORT = process.env.PORT || 8888;

connection();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: `Ups! Something went wrong 🥺`
    });
});

app.use('/api/employee', employeeRoute)

app.listen(PORT, () => {
    console.log(`======================================`);
    console.log(`||       E M P L O Y E E S          ||`);
    console.log(`||🦫 Server running on PORT ${PORT}     ||`);
    console.log(`||       Made by MarioJey           ||`);
    console.log(`=====================================`);
})