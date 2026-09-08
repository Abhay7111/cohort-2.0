import React, { useContext } from 'react'
import { ThemeContextData } from './context/Theme.context'
import Alsotest from './alsotest'

const App = () => {
  const [theme, setTheme] = useContext(ThemeContextData)
  return (
    <div>
      {theme}
      <button onClick={() => setTheme('Light')}>
        click to change
      </button>

      <Alsotest/>
    </div>
  )
}

export default App
