import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  
  const [notes, setNotes] = useState([])
  
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

  // ================Post data from form===================
  function handelSubmit(e) {
    e.preventDefault()

    const {title, description} = e.target
    console.log(title.value,description.value)

    axios.post('http://localhost:3000/api/postnote/', {
      title: title.value,
      description: description.value
    })
    .then(res=>{
      console.log(res.data)
      FetchNotes()
    })
  }

  return (
    <div className="main">

      <form className="note-input" onSubmit={handelSubmit}>
        <input name="title" type="text" placeholder="Add title" />
        <input name="description" type="text" placeholder="Add description" />
        <button>Create note</button>
      </form>

      {notes.map((items, index) => (
      <div key={index} className="cardOuter">
        <div className="cardCont">
          <h1>{items.title}</h1>
          <p>{items.description}</p>
        </div>
      </div>
      ))}

    </div>
  )
}

export default App
