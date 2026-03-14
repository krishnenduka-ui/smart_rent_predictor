import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useSelector } from 'react-redux'

const Footer = () => {
  const social = useSelector((state) => state.social.social)

  return (
    <div className=' bg-emerald-900 flex flex-row justify-between gap-5 w-full p-8 '>

      <div>+91 8589812355</div>

      <div className="flex gap-4">

        <a 
          href={social.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full hover:bg-blue-600"
        >
          <FaFacebookF />
        </a>

        <a 
          href={social.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full hover:bg-sky-500"
        >
          <FaTwitter />
        </a>

        <a 
          href={social.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full hover:bg-pink-500"
        >
          <FaInstagram />
        </a>

        <a 
          href={social.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 rounded-full hover:bg-blue-700"
        >
          <FaLinkedin />
        </a>

      </div>

      <div>Terms and Conditions</div>
      <div>Privacy policy</div>

    </div>
  )
}

export default Footer