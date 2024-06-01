import React from 'react'
import Logo from "./assets/Logo.svg"

const Navbar = () => {
  return (
    <div>
        <div className='navbar'>
            <section className='logo'>
              <div>
                <img src={Logo} alt="Logo" />
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="Upload file"></label>
                <input name="pdf"  type="file" placeholder='Upload File'/>
              </div>
            </section>
        </div>
    </div>
  )
}

export default Navbar