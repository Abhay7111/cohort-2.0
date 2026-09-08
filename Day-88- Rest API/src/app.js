const express = require('express');
const app = express();

app.use(express.json())

const arr = [{
    title:'',
    description:''
}]

app.get('/health', (req, res)=>{
    res.send('Server health is ok')
})

app.get('/data', (req, res)=>{
    res.send(arr)
})

app.post('/data', (req, res)=>{
    console.log(req.body)
    arr.push(req.body)
    res.send(arr)
})

module.exports= app