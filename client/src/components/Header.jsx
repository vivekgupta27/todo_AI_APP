import React from 'react';
import { FaRegNoteSticky } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4 md:gap-4 md:p-5">
      <FaRegNoteSticky className="text-white text-xl sm:text-2xl md:text-3xl" />
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">TODO</h1>
    </div>
  );
};

export default Header;
