const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: [true, 'Email is already save in our database']
    },
    password: {
        type: String,
        require: [true, 'Password i required'],
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    permission: {
        type: String,
        default: 'USER'
    }
})

module.exports = mongoose.model("Users", UserSchema)