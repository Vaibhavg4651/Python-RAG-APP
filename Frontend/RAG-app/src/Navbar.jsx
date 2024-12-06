import React, { useState } from 'react'
import Logo from "./assets/Logo.svg"
import upload from "./assets/upload.svg"
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const Navbar = () => {
  const [isUploaded, setIsUploaded] = useState(localStorage.getItem('isUploaded') === 'true');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:8000/add-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Successful upload
      setIsUploaded(true);
      localStorage.setItem('isUploaded', 'true');
      
    } catch (err) {
      console.error('File upload error:', err);
      setError('Failed to upload file. Please try again.');
      setIsUploaded(false);
      localStorage.setItem('isUploaded', 'false');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Modal Component
  const LoadingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
        <p className="text-gray-700">Processing your file...</p>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className='navbar'>
        <section className='logo'>
          <div>
            <img src={Logo} alt="Logo" />
          </div>
        </section>
        <section>
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className='upload-div'>
            <input 
              type="file" 
              id="fileInput" 
              className="file-input" 
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="custom-file-input">
              <img src={upload} alt="Upload Icon" className="upload-icon"/>
              Upload File
            </label>
          </div>
        </section>
      </div>
    </>
  )
}

export default Navbar