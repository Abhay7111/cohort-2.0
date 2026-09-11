const express = require('express');
const app = express();

app.use(express.json())

const arr = []

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

app.patch('/updateTitle/:index', (req , res)=>{
    arr[req.params.index].title = (req.body.title)
    res.send('title updated successfully')
})

app.patch('/updateDescription/:index', (req, res)=>{
    arr[req.params.index].description = (req.body.description)
    res.send('Description is updated successfully')
    res.status(200).json({
        message:"description updated"
    })
})

module.exports = app