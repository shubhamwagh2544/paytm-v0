const mongoose = require('mongoose')

// connect to mongo
mongoose.connect('mongodb+srv://shubhamwagh2544:tv4WAk8LE7DiRBYF@cluster0.dwuqqia.mongodb.net/user')

// define schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 10
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 10
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}