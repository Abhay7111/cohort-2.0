const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/auth/", authRouter)
app.use(cookieParser())

app.get('/', (req, res)=> {
    res.send('Hello world')
})

module.exports = app