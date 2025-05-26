import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext,useState } from 'react';
import { TodoContext } from '../context/TodoContext';

const BtnSummary = () => {
  const { BASE_URL } = useContext(TodoContext);
    const [summary,setSummary]=useState('')
  const handleClick = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/summarize`, {});
      if (response.status === 200) {
         
        setSummary(response.data.summary);
         setShow(prev=>!prev)
        toast.success("Message sent to Slack successfully");
       
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  const[show,setShow]=useState(false)

  return (
    
    <>
       <button
      onClick={handleClick}
      className='w-full sm:w-auto hover:bg-purple-600 duration-300 ease-in-out text-white cursor-pointer py-2 sm:py-3 px-4 sm:px-6 flex justify-center items-center rounded-lg text-base sm:text-lg font-semibold border border-amber-300'
    >
      Get Summary
    </button>
    <div className={`${show ? 'scale-100 opacity-100' : 'opacity-0 scale-0'}  w-[800px] h-[500px] z-40 backdrop-blur-sm   text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 border-15 border-[#1234586a] p-4 transition-all duration-300 ease-initial rounded }`}>
      <div className='flex justify-between items-center border-b-2 p-1'>
        <h1 className='text-white font-bold text-xl'>Summary</h1>
        <button onClick={()=>setShow(prev=>!prev)} className='py-2 px-4 text-white font-semibold cursor-pointer bg-purple-400 rounded'>close</button>
      </div>
       <p className="text-justify leading-loose">{summary}</p>
    </div>
    </>
  );
};

export default BtnSummary;
