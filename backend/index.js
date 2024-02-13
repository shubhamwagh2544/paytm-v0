const express = require("express");
const bodyParser = require('body-parser')
const app = express()

const apiRouter = require('./routes/router')

// Middleware for parsing request bodies
app.use(bodyParser.json())
app.use('/api/v1', apiRouter)

//server start
const port = 3000
app.listen(port, () => console.log(`server started on port ${port}`))