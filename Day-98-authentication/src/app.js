const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message:"Server is runnig"
    })
})

module.exports = app