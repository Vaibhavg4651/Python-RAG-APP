import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'

function App() {
  let isuploaded = localStorage.getItem('isUploaded')
  console.log(isuploaded)

  return (
    <>
      <Navbar />
      <div className='Text-input'>
        <div className='input-bar'>
          {isuploaded=== 'false' ? <input type="text" id="myDisabledInput" placeholder='Send a message...' disabled/> : <input type="text" id="myInput" placeholder='Send a message...'/>}
        </div>
      </div>
    </>
  )
}

export default App
