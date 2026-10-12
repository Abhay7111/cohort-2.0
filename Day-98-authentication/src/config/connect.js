const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DataBase is connected successfully')
    })
}

module.exports = connectToDB