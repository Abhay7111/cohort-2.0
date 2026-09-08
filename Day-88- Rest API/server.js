const app = require('./src/app')
const cors = require('cors')


app.use(cors())


app.get('/',(req, res) => {
    res.send('This is Home page of this server')
})

app.listen(3000, ()=>{
    console.log('server is running on poart : 3000')
})