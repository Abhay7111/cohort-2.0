const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema ({
    "title" : String,
    "description" : String
})

const NoteModel = mongoose.model('notesCollection', NoteSchema)

module.exports = NoteModel