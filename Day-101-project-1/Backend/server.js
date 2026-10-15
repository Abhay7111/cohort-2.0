require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database.config')

connectToDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on poart ${process.env.PORT}`)
})