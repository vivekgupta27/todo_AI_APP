import React from 'react'
import { useContext } from 'react'
import {TodoContext} from '../context/TodoContext'
import { useState } from 'react'

const TODOHero = () => {
  const{todos}=useContext(TodoContext)
  const completedTodos = todos.filter((item) =>{
    if(item.completed===true){
      return item;
    }
  });
  return (
    <div className='lg:w-[50%] flex items-center justify-between gap-5 border-1 rounded-md border-amber-300 p-3'>
        <div className='text-white'>
            <h4 className='text-xl'>Task Done</h4>
            <p className=''>Keep it up</p>
        </div>
        <div className='h-24 w-24 rounded-full bg-green-700 text-black flex items-center justify-center  text-3xl'>
              {completedTodos.length}/{todos.length}
        </div>
    </div>
  )
}

export default TODOHero