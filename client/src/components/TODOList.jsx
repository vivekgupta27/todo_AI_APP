import { toast } from 'react-toastify';
import { MdModeEdit, MdPhoneCallback } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useContext, useEffect, useState } from 'react';
import {TodoContext} from '../context/TodoContext.jsx'
const TODOList = () => {
          const{todos,setTodos,fetchTodos,BASE_URL}=useContext(TodoContext);
          const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/delete-todo/${id}`, {
    method: 'DELETE',
  });
  const text = await res.text();

  if (res.ok) {
    toast.success(text);
    fetchTodos();
  } else {
    console.error(text);
  }
              };
              const editTodo=async(id)=>{
                let newTodo=todos.map((item)=>{
                  if(item.id===id){
                    let change=prompt("Enter the changes you want:",item.title)
                    return {...item,title:change}
                  }
                  return item
                 
                })
                setTodos(newTodo)
                        const updatedItem = newTodo.find(item => item.id === id);

    try {
      const res = await fetch(`${BASE_URL}/update-todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedItem.title }),
      })

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      toast.success('Todo updated successfully')
    } catch (error) {
      console.error('Failed to update todo:', error.message);
      toast.error("Failed to update status");

          }
              }
          const handleClick = (type, id) => {
    if (type === "delete"){
           deleteTodo(id);
    } 
    if(type==="edit"){
      editTodo(id);
    }
             }
          const handleDone=async(id)=>{
            const newTodo=todos.map((item)=>{
              if(id===item.id&&item.completed===false){
                 let{completed}=item
                 completed=true;
                 return {...item,completed}
              }
              else if(id===item.id&&item.completed===true){
                return {...item,completed:!item.completed}
              }
              return item

            })
            setTodos(newTodo)
            const updatedItem = newTodo.find(item => item.id === id);

    try {
      const res = await fetch(`${BASE_URL}/update-todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedItem.completed }),
      })

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      toast.success('Todo updated successfully')
    } catch (error) {
      console.error('Failed to update todo:', error.message);
      toast.error("Failed to update status");

          }
        }        
  return (
    <ol className='text-white overflow-auto h-64'>
        
        {
            todos.length>0?(todos.map((item,i)=>{
            return(   
            <li key={item.id}  className='flex gap-3 border-1 border-amber-300 w-[35vw] mb-3 justify-between items-center p-3' >
                       <input type="checkbox" checked={item.completed} onChange={(e)=>{handleDone(item.id)}}  className={`w-6 h-6 appearance-none bg-white border border-gray-300 rounded-full checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer`}/>
                       <p className={`${item.completed?"line-through":""}`}>{item.title}</p>
                      <div className='flex text-2xl gap-0.5 '>
                          <button onClick={() => handleClick("edit", item.id)}><MdModeEdit  className='cursor-pointer'/></button>
                           <button onClick={() => handleClick("delete", item.id)} ><MdOutlineDelete className='cursor-pointer'/></button>
                      </div>
           </li>)
            })):<p className='text-lg'>Seems lonely in here,what are you up to?</p>
        }
        
    </ol>
  )
}

export default TODOList