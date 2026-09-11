const app = require('./src/app')
const cors = require('cors')
const mongoose = require('mongoose')

const PORT = 3000

app.use(cors())

function ConnectToDB() {
    mongoose.connect('mongodb+srv://gaamagaming_db_user:xA3lqlcDcnRNNGhN@clustercohort2.ptv6vlu.mongodb.net/Cohort2P0DB')
    .then(()=>{
        console.log('Connected to Database')
    })
}


app.listen(PORT, ()=>{
    ConnectToDB()
    console.log(`server is running on port no. ${PORT}`)
})