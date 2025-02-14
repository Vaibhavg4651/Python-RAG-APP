import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { Loader2, Upload, Check, FileText } from 'lucide-react'
import Logo from "./assets/Logo.svg"
import API_ENDPOINT from './config'

const Navbar = () => {
  const [isUploaded, setIsUploaded] = useState(false);
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
      const res = await axios.post(`${API_ENDPOINT}/add-documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(res.status !== 200) {
        throw new Error('Failed to upload file.');
      }
      else{
        setIsUploaded(true);
        localStorage.setItem('isUploaded', 'true');
      }
      
    } catch (err) {
      console.error('File upload error:', err);
      setError('Failed to upload file. Please try again.');
      setIsUploaded(false);
      localStorage.setItem('isUploaded', 'false');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Modal Component with Framer Motion
  const LoadingModal = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center"
      >
        <Loader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
        <p className="text-gray-700">Processing your file...</p>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingModal />}
      </AnimatePresence>
      
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center p-4 bg-white shadow-md"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-blue-600">DocChat</h1>
        </motion.div>

        <div className="flex items-center space-x-4">
          {selectedFile && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-green-600"
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm">{selectedFile.name}</span>
            </motion.div>
          )}

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <input 
              type="file" 
              id="fileInput" 
              className="hidden" 
              onChange={handleFileChange}
            />
            <label 
              htmlFor="fileInput" 
              className="cursor-pointer flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isUploaded ? (
                <Check className="w-5 h-5 bg-transparent" />
              ) : (
                <Upload className="w-5 h-5 bg-transparent" />
              )}
              <span className='bg-transparent'>{isUploaded ? 'Uploaded' : 'Upload File'}</span>
            </label>
          </motion.div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar