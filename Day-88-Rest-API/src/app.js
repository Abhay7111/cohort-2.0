const express = require('express');
const app = express();

app.use(express.json())

const arr = [{
    title:'',
    description:''
}]

// ===================HEALTH==================

app.get('/health', (req, res)=>{
    res.send('Server health is ok')
})

// ===================GETDATA=================

app.get('/getdata', (req, res)=>{
    res.send(arr)
})

// ===================POSTDATA================

app.post('/postdata', (req, res)=>{
    console.log(req.body)
    arr.push(req.body)
    res.send(arr)
})

// ===================DELETEDATA==============

app.delete('/deletedata/:index', (req, res)=>{
    console.log(req.params.index)
    delete arr[req.params.index]
    res.send('Done')
})

// ===================UPDATEDATA==============

app.patch('/updatedata/:index', (req, res)=>{
    arr[req.params.index].description = (req.body.description)

    res.send('description updated successfully')
})

module.exports= app