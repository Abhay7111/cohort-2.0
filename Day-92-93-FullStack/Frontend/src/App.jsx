import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  
  const [notes, setNotes] = useState([])
  const [editData, setEditData] = useState(null)
  
  console.log("Hello")

// ==================Get data=============================
  function FetchNotes() {
  axios.get('http://localhost:3000/api/notes')
    .then((res) => {
      setNotes(res.data.Note)
    }) 
    .catch(error => {console.log("API error " , error)})
  }
  
  useEffect(() => {
    FetchNotes()
  }, [])

  // ================Create note==========================
  function handelSubmit(e) {
    e.preventDefault()

    const {title, description} = e.target

    axios.post('http://localhost:3000/api/postnote/', {
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data)
      FetchNotes()
    })
  }

  // ================Delete note===========================
  function handelDeleteNote(id) {
    axios.delete(`http://localhost:3000/api/note/${id}`)
    .then(res=>{
        console.log(res.data)
        FetchNotes()
    })
  }
  function handelUpdateNote(e) {
    e.preventDefault()

    if (!editData.description.trim()) {
      return
    }

    axios.patch(`http://localhost:3000/api/note/${editData.id}`, {
      description: editData.description
    })
      .then(() => {
        setEditData(null)
        FetchNotes()
      })
      .catch(error => console.log("Update API error ", error))
  }


  return (
    <div className="main">

      <form className="note-input" onSubmit={handelSubmit}>
        <input name="title" type="text" placeholder="Add title" />
        <input name="description" type="text" placeholder="Add description" />
        <button>Create note</button>
      </form>

      {editData && (
        <form className="note-input" onSubmit={handelUpdateNote}>
          <h2>Edit note</h2>
          <input type="text" value={editData.title} readOnly />
          <input
            name="description"
            value={editData.description}
            onChange={e => setEditData({ ...editData, description: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditData(null)}>Cancel</button>
        </form>
      )}

      {notes.map((items) => (
      <div key={items._id} className="cardOuter">
        <div className="cardCont">
          <h1>{items.title}</h1>
          <p>{items.description}</p>
          <button onClick={() => setEditData({
            id: items._id,
            title: items.title,
            description: items.description
          })}>Edit</button>
          <button onClick={() => handelDeleteNote(items._id)}>Delete</button>
        </div>
      </div>
      ))}

    </div>
  )
}

export default App
