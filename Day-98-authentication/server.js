require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/connect');


connectToDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT : ${process.env.PORT}`)
})