const { Router } = require('express')
const router = Router()
const userRouter = require('./user')

// user router
router.use('/user', userRouter)


// main router
router.get('/', (req, res) => {
    // req validation

    return res.json({
        msg: 'nothing to show here!'
    })
})

module.exports = router