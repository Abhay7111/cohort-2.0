const express = require('express');
const NoteModel = require('./Models/Notes.Model');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(express.json())


app.use(cors())

app.use(express.static('./Public'));




// ==================API Health====================
app.get('/api/health', (req, res) => {res.send("Server Heath is Ok")})

// ==================Get API All Data==============
app.get('/api/notes', async (req, res) => {
    const Note = await NoteModel.find()
    res.status(200).json({
        message:"Notes fetched successfully",
        Note
    })
})

// ==================Add New API Data==============
app.post('/api/postnote', async (req, res) => {
    const {title, description} = req.body

    const Note = await NoteModel.create({title, description})

    res.status(201).json({
        "message" : "Note Created successfully",
        Note
    })
})

// ==================Delete API Data===============
app.delete('/api/note/:id', async (req, res) => {
    const id = req.params.id
    await NoteModel.findByIdAndDelete(id)
    console.log(id)
    res.status(200).json({
        "message" : "Note deleted successfully",
        id
    })
})

// ==================Update API Data===============
app.patch('/api/note/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await NoteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        "message":"Note Description updated successfully",
        description
    })
})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..",'/Public/index.html'))
})

// ==================Export app====================
module.exports = app