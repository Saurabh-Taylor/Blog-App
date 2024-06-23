import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import conf from './conf/conf'

function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_DB_PASSWORD);
  return (
    <div className="app">A Blog App</div>
    )
}

export default App
