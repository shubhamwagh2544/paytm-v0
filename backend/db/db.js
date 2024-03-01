require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// connect to mongo
mongoose.connect(process.env.MONGO_URL)

// define schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
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

//  password hashing
UserSchema.methods.createHashPassword = async (password) => {
    const saltRrounds = 10
    const salt = await bcrypt.genSalt(saltRrounds)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

UserSchema.methods.validateHashPassword = async (password, hashPassword) => {
    const validPassword = await bcrypt.compare(password, hashPassword)
    return validPassword
}

// create models
const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)


// export models
module.exports = {
    User,
    Account
}