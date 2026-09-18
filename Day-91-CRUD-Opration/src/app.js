const express = require('express');
const cors = require('cors');
const NoteModel = require('./models/notes.model');

const app = express();

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/post', async (req, res) => {
    const {title, description} = req.body;
    const note = await NoteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })

})

module.exports = app