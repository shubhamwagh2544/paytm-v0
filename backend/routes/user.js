const { Router } = require('express')
const router = Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User } = require('../db/db')
const { JWT_SECRET } = require('../config')


const userSignUpSchema = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

const userSignInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password } = req.body

    const { success } = userSignUpSchema.safeParse(user)
    if (!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const user = await User.findOne({
        username
    })
    if (user._id) {
        return res.status(411).json({
            message: 'email already taken'
        })
    }

    // new user
    const savedUser = await User.create({
        username,
        firstname,
        lastname,
        password
    })
    const token = jwt.sign({
        userId: savedUser._id
    }, JWT_SECRET)

    return res.status(200).json({
        message: 'user created successfully ',
        token
    })

})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body

    const { success } = userSignInSchema.safeParse(user)
    if (!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const user = await User.findOne({
        username,
        password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        return res.status(200).json({
            token
        })
    }
    else {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
})

module.exports = router