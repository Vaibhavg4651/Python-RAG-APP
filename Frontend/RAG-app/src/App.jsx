import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='Text-input'>
        <div className='input-bar'>
          <input  type="text" placeholder='Send a message...'/>
          <img src="" alt="" />
        </div>
      </div>
    </>
  )
}

export default App
