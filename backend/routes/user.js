const { Router } = require('express')
const router = Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User, Account } = require('../db/db')
const { JWT_SECRET } = require('../config/config')
const { authMiddleware } = require('../middlewares/middleware')
const { generateRandomBalance } = require('../util/random')


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

const userUpdateSchema = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
})

router.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password } = req.body

    const { success } = userSignUpSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const user = await User.findOne({
        username
    })

    if (user != null) {
        return res.status(411).json({
            message: 'email already taken'
        })
    }

    // create user
    const savedUser = User({
        username,
        firstname,
        lastname,
        password
    })
    // hash password for user
    const hashPassword = await savedUser.createHashPassword(password)
    savedUser.password = hashPassword

    // save user
    await savedUser.save()

    // create account for user
    let randomBalance = generateRandomBalance(10000, 1)
    await Account.create({
        userId: savedUser._id,
        balance: randomBalance
    })

    const token = jwt.sign({
        userId: savedUser._id
    }, JWT_SECRET)

    return res.status(200).json({
        message: 'user created successfully',
        token: `Bearer ${token}`
    })

})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body

    const { success } = userSignInSchema.safeParse({ username, password })
    if (!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const user = await User.findOne({
        username
    })

    if (user) {
        // since user is found, validate password with hashpassword in db
        const validPassword = await user.validateHashPassword(password, user.password)
        if (validPassword) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)

            return res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else {
            return res.status(411).json({
                message: "Error while logging in...Please check your password"
            })
        }
    }
    else {
        return res.status(411).json({
            message: "Error while logging in...Please signup before signin"
        })
    }
})

router.put('/', authMiddleware, async (req, res) => {
    const updateData = req.body

    const { success } = userUpdateSchema.safeParse(updateData)
    if (!success) {
        return res.status(411).json({
            message: 'Error while updating information'
        })
    }

    const userId = req.userId
    const response = await User.updateOne({
        _id: userId
    }, updateData)

    if (response) {
        return res.status(200).json({
            message: "Updated successfully"
        })
    }
    else {
        return res.status(411).json({
            message: 'Error while updating information'
        })
    }
})

router.get('/bulk', authMiddleware, async (req, res) => {
    const userId = req.userId
    const filter = req.query.filter || ""       // filter via name or if no filter passed, "" brings all users

    // const users = await User.find({
    //     $or: [
    //         {
    //             firstname: {
    //                 "$regex": filter
    //             }
    //         }, {
    //             lastname: {
    //                 "$regex": filter
    //             }
    //         }
    //     ]
    // })
    const users = await User.find({
        $and: [{
            _id: { $ne: userId }
        }, {
            $or: [
                { firstname: { "$regex": filter } },
                { lastname: { "$regex": filter } }
            ]
        }]
    })

    return res.status(200).json({
        users: users.map((user) => {
            return {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }
        })
    })

})

router.get('/name', authMiddleware, async (req, res) => {
    const userId = req.userId
    const user = await User.findOne({
        _id: userId
    })
    return res.status(200).json({
        firstname: user.firstname,
        lastname: user.lastname
    })
})

module.exports = router