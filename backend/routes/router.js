const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    // req validation

    return res.json({
        msg: 'response'
    })
})

module.exports = router