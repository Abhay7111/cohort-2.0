const express = require('express');
const NoteModel = require('./Models/Notes.Model');

const app = express();

app.use(express.json())

app.get('/', async (req, res) => {
    const Note = await NoteModel.find()
    res.status(200).json({
        message:"Data got",
        Note
    })
})

app.post('/postnote', (req, res) => {
    const data = req.body.push()
})

module.exports = app