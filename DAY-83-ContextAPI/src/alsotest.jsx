import React, { useContext } from 'react'
import { ThemeContextData } from './context/Theme.context'

const alsotest = () => {
    const [theme,setTheme] = useContext(ThemeContextData)
  return (
    <div>
      {theme}
    </div>
  )
}

export default alsotest
