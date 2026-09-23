import { useState } from "react"
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([{
      title: "This is title 1",
      description: "this is description 3"
    },
    {
      title: "This is title 2",
      description: "This is description 2"
    },
    {
      title: "This is title 3",
      description: "this is description 1"
    },
    {
      title: "This is title 4",
      description: "this is description 4"
    }])
  axios.get('http://localhost:3000/api/note')
  .then((res) => {
    setNotes(res.data.Note)
  }) 

  return (
    <div className="main">

      {notes.map((items) => (
      <div className="cardOuter">
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
