const express = require('express');
const app = express();
const userModel = require('./models/user.model');
const cors = require('cors');
const authRouter = require('./Routes/auth.routes');
const dataRouter = require('./Routes/data.routes');
const postRouter = require('./Routes/post.routes');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api', dataRouter)

app.get('/', (req, res) => {
    res.json({
        message: "server is runnig"
    })
})
 
app.post('/register', async (req, res) => {
    const {email, password} = req.body

    const existEmail = await userModel.findOne({ email });

    const user = await userModel.create({ email, password })

    if(!existEmail){
        return res.status(409).json({
            message: "Email allready exist",
            user
        })
    }

    res.status(201).json({
        message:"User registered successfully"
    })
})

module.exports = app