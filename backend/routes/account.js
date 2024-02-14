const { Router } = require('express')
const zod = require('zod')
const { authMiddleware } = require('../middlewares/middleware')
const { Account } = require('../db/db')
const { default: mongoose } = require('mongoose')
const router = Router()

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
})

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId

    const account = await Account.findOne({
        userId
    })

    if (account) {
        return res.status(200).json({
            balance: account.balance
        })
    }
    else {
        return res.status(411).json({
            message: 'error while getting balance'
        })
    }
})

// without transaction
router.post('/transfer/v1', authMiddleware, async (req, res) => {
    const { to, amount } = req.body
    const userId = req.userId

    const { success } = transferSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const userAccount = await Account.findOne({
        userId
    })
    if (!userAccount) {
        return res.status(400).json({
            message: 'invalid payer account'
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    })
    if (!toAccount) {
        return res.status(400).json({
            message: 'invalid payee account'
        })
    }

    // transfer amount
    if (amount > userAccount.balance) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    else {
        await Account.updateOne({
            userId
        }, {
            $inc: {
                balance: -amount
            }
        })
        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        })

        return res.status(200).json({
            message: "Transfer successful"
        })
    }
})

// with transaction
router.post('/transfer/v2', authMiddleware, async (req, res) => {
    // start the session
    const session = await mongoose.startSession()
    // start transaction
    await session.startTransaction()

    const { to, amount } = req.body
    const userId = req.userId

    const { success } = transferSchema.safeParse(req.body)
    if (!success) {
        // abort transaction
        await session.abortTransaction()
        return res.status(411).json({
            message: 'incorrect inputs'
        })
    }

    const userAccount = await Account.findOne({ userId }).session(session)
    if (!userAccount || userAccount.balance < amount) {
        // abort transaction
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)
    if (!toAccount) {
        // abort transaction
        await session.abortTransaction()
        return res.status(400).json({
            message: "invalid account"
        })
    }

    // transfer amount
    const userResponse = await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session)
    const toResponse = await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

    if (!userResponse || !toResponse) {
        // abort transaction
        await session.abortTransaction()
        return res.status(400).json({
            message: "oops..transfer failed"
        })
    }
    else {
        // commit transaction
        await session.commitTransaction()
        return res.status(200).json({
            message: "Transfer successful"
        })
    }

})

module.exports = router