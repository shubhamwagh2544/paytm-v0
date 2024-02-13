const jwt = require('jsonwebtoken')
import { JWT_SECRET } from "../config"

const authMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.authorization

    // check token is valid
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'forbidden: not authorized'
        })
    }

    const token = tokenHeader.split(' ')[1]

    try {
        //verify jwt token with secret-key
        const res = jwt.verify(token, JWT_SECRET)
        req.userId = res.userId
        next()
    }
    catch (err) {
        return res.status(403).json({
            message: 'forbidden: not authorized'
        })
    }
}

module.exports = {
    authMiddleware
}