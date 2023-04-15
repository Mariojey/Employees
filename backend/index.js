require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require('./config/db');
const bodyParser = require("body-parser");
const logger = require('./logger')

//routes
const employeeRoute = require('./routes/employeeRoute')
const userRoute = require('./routes/userRouter')
const authRouter = require('./routes/authRouter');


const app = express();
const PORT = process.env.PORT || 8888;

connection();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

app.use((err, req, res, next) => {
    consol.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: `Ups! Something went wrong 🥺`
    });
});

app.use('/api/employee', employeeRoute)
app.use('/api/user', userRoute)
app.use('/api/auth', authRouter)
    // 
    // logger.error("error")
    // logger.warn("warn")
    // logger.info("info")
    // logger.verbose("verbose")
    // logger.debug("debug")
    // logger.silly("silly")
    // 
app.listen(PORT, () => {
    logger.info(`App is running`)

})