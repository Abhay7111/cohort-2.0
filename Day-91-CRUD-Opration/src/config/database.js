const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect('mongodb+srv://gaamagaming_db_user:xA3lqlcDcnRNNGhN@clustercohort2.ptv6vlu.mongodb.net/Cohort-CRUD')
    .then(() => {
        console.log('DataBase connected successfully')
    })
}

module.exports = connectToDB