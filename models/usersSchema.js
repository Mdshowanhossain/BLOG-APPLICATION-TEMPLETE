const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        min: 2,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate(value) {

        }
    },
    password: {
        type: String,
        require: true,
        min: 4,
    },
    cPassword: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        min: 3,
        require: true,
    },
    mobilenumber: {
        type: Number,
        min: 10,
        require: true,
    },
    subject: {
        type: String,
        min: 3,
        require: true,
    },
    age: {
        type: Number,
        require: true,
        min: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

UserSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.cPassword = undefined
    next();
})
const userSchema = new mongoose.model("user", UserSchema);
module.exports = userSchema;