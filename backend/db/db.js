require('dotenv').config()
const mongoose = require('mongoose')

// connect to mongo
mongoose.connect(process.env.MONGO_URL)

// define schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


// create models
const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)


// export models
module.exports = {
    User,
    Account
}