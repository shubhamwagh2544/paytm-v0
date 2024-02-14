const { Router } = require('express')
const router = Router()
const userRouter = require('./user')
const accountRouter = require('./account')


// user router
router.use('/user', userRouter)
// account router
router.use('/account', accountRouter)


// main router
router.get('/', (req, res) => {
    // req validation

    return res.json({
        msg: 'nothing to show here!'
    })
})

module.exports = router