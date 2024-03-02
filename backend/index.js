require('dotenv').config()
const express = require("express");
const cors = require('cors')
const app = express()

const rootRouter = require('./routes/router')


// Middleware for parsing request bodies
app.use(express.json())
app.use(cors({
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/api/v1', rootRouter)


//server start
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server started on port ${port}`))