import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TodoContext } from '../context/TodoContext';

const BtnSummary = () => {
  const { BASE_URL } = useContext(TodoContext);
  const [summary, setSummary] = useState('');
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  const handleClick = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/summarize`, {});
      if (response.status === 200) {
        setSummary(response.data.summary);
        setShow(true);
        toast.success("Summary generated successfully!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShow(false);
    };
    document.addEventListener('keydown', handleEsc);
  
  }, []);

  // Click outside to close
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleClick}
        className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 duration-300 ease-in-out text-white py-2 sm:py-3 px-4 sm:px-6 flex justify-center items-center rounded-lg text-base sm:text-lg font-semibold border border-amber-300"
      >
        Get Summary
      </button>

      {/* Modal Overlay */}
      {show && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 p-4"
        >
          <div
            ref={modalRef}
            className="bg-black/80 text-gray-200 border border-purple-700 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform scale-100 opacity-100 animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
              <h1 className="text-white font-bold text-xl">Summary</h1>
              <button
                onClick={() => setShow(false)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-1 px-3 rounded"
              >
                Close
              </button>
            </div>

            {/* Modal Content */}
            <p className="text-justify leading-relaxed text-sm sm:text-base">
              {summary}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BtnSummary;
