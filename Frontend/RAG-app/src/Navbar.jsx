import React from 'react'
import Logo from "./assets/Logo.svg"
import { useState } from 'react'
import upload from "./assets/upload.svg"

const Navbar = () => {
  const [isUploaded, setIsUploaded] = useState(false)
  localStorage.setItem('isUploaded', isUploaded)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsUploaded(true)
  };

  return (
    <div>
        <div className='navbar'>
            <section className='logo'>
              <div>
                <img src={Logo} alt="Logo" />
              </div>
            </section>
            <section>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
              <div className='upload-div'>
                <input type="file" id="fileInput" class="file-input" onChange={handleFileChange}/>
                <label htmlFor="Upload file" className="custom-file-input">
                <img src={upload} alt="Upload Icon" class="upload-icon"/>
                  Upload File</label>
              </div>
            </section>
        </div>
    </div>
  )
}

export default Navbar