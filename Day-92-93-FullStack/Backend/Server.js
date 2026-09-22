require("dotenv").config();
const app = require('./src/app');
const ConnectToDB = require('./src/Config/Connect');


app.listen(process.env.PORT , () => {
    console.log(`Server start successfully on port : ${process.env.PORT}`);
    ConnectToDB()
});