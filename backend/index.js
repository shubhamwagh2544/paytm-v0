const express = require("express");
const cors = require('cors')
require('dotenv').config()
const app = express()
const rootRouter = require('./routes/router')

app.use(express.json())
app.use(cors())

app.use('/api/v1', rootRouter)

app.all("*", (req, res) => {
    res.status(200).json({
        message: "This might not be the page you're looking for",
    });
});


const port = 3000
app.listen(port, () => console.log(`server started on port ${port}`))