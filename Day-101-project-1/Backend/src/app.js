const express = require('express');
const app = express();
const userModel = require('./models/user.model');
const cors = require('cors');
const authRouter = require('./Routes/auth.routes')

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)

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