const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DataBase connected successfully')
    })
}

module.exports = connectToDB