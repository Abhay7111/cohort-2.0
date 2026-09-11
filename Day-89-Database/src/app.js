const express = require('express');
const app = express();

app.use(express.json())

const arr = [{
    title:'',
    description:''
}]

app.get('/', (req, res)=>{
    res.send(arr)
})

app.post('/post', (req , res)=>{
    arr.push(req.body)
    console.log(req.body)
    res.send(arr)
})

app.delete('/delete/:id', (req, res)=>{
    delete arr[req.params.id]
})

app.patch('/update/:index', (req , res)=>{
    arr[req.params.index].title = (req.body.title)
    res.send('title updated successfully')
})

module.exports = app