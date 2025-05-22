import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const TODOHero = () => {
  const { todos } = useContext(TodoContext);

  const completedTodos = todos.filter((item) => item.completed);

  return (
    <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[50%] flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-300 rounded-md p-4 sm:p-5">
      <div className="text-white text-center sm:text-left">
        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">Task Done</h4>
        <p className="text-sm sm:text-base">Keep it up</p>
      </div>

      <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-green-700 text-black flex items-center justify-center text-2xl sm:text-3xl font-bold">
        {completedTodos.length}/{todos.length}
      </div>
    </div>
  );
};

export default TODOHero;
