import React, { useContext } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { TodoContext } from '../context/TodoContext';
const Form = () => {
  const {fetchTodos,BASE_URL}=useContext(TodoContext)
  const handleSubmit = async (e) => {
  e.preventDefault();
  const title = e.target.title.value;

  const res = await fetch(`${BASE_URL}/add-todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const text = await res.text();

  if (res.ok) {
    toast.success(text);
    e.target.reset();
    fetchTodos();
  } else {
    
    toast.error(text);
  }
};



  return (
   <form className="flex gap-3  justify-between items-center"   onSubmit={handleSubmit}>
      
     
        <input className='bg-[#1234586a] text-gray-400 px-2 py-1 rounded-md  lg:w-[41vw] '
          type="text"
          name="title"
          id="todo"
          placeholder="Write your next task"
        />
      <button className='cursor-pointer text-3xl'>
           <FaCirclePlus className='text-green-700' />
      </button>
    </form>
  )
}

export default Form