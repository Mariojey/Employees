const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "FirstName is required"],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        require: [true, "LastName is required"],
        trim: true,
        lowercase: true
    },
    title: {
        type: String,
        require: [true, "Title can't be blank"],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: [true, 'Email is already saved in our database']
    },
    salary: {
        type: Number,

    },
    phone: {
        type: String,
        required: [true, 'User phone number is required'],
        min: [9, "Too Few. Not valid number"],
        max: [9, "Too long. Not valid number"],
    }
})

module.exports = mongoose.model("Employee", EmployeeSchema)