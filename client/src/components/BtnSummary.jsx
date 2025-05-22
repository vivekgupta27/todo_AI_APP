import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const BtnSummary = () => {
      const{BASE_URL}=useContext(TodoContext)
  const handleClick = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/summarize`, {});
      if (response.status === 200) {
        toast.success("Message sent to Slack successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className='hover:bg-purple-600 duration-300 ease-in-out text-white cursor-pointer py-3 flex justify-center items-center rounded-lg px-2 text-lg font-semibold border-1 border-amber-300'
    >
      Get Summary
    </button>
  );
};

export default BtnSummary;
