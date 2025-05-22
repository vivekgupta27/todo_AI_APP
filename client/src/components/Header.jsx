import React from 'react'
import { FaRegNoteSticky } from "react-icons/fa6";
const Header = () => {
  return (
    <div className='flex items-center gap-2'>
        <FaRegNoteSticky className='text-white text-2xl' />
        <h1 className='text-white text-2xl'>TODO</h1>
    </div>
  )
}

export default Header