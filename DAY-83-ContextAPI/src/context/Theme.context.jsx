import { createContext, useState} from 'react'

export const ThemeContextData = createContext();
const Theme_context = (props) => {

    const [theme, setTheme] = useState('dark');

    const data = 'Abhay7111';

  return (
    <div>
        <ThemeContextData.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContextData.Provider>
    </div>
  )
}

export default Theme_context
