import { toast } from 'react-toastify';
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext.jsx';

const TODOList = () => {
  const { todos, setTodos, fetchTodos, BASE_URL } = useContext(TodoContext);

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

  const editTodo = async (id) => {
    let newTodo = todos.map((item) => {
      if (item.id === id) {
        let change = prompt("Enter the changes you want:", item.title);
        return { ...item, title: change };
      }
      return item;
    });

    setTodos(newTodo);
    const updatedItem = newTodo.find(item => item.id === id);

    try {
      const res = await fetch(`${BASE_URL}/update-todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedItem.title }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Failed to update todo:', error.message);
      toast.error("Failed to update status");
    }
  };

  const handleClick = (type, id) => {
    if (type === "delete") deleteTodo(id);
    if (type === "edit") editTodo(id);
  };

  const handleDone = async (id) => {
    const newTodo = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodos(newTodo);
    const updatedItem = newTodo.find(item => item.id === id);

    try {
      const res = await fetch(`${BASE_URL}/update-todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedItem.completed }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Failed to update todo:', error.message);
      toast.error("Failed to update status");
    }
  };

  return (
    <ol className="text-white overflow-auto max-h-64 px-2 sm:px-4">
      {todos.length > 0 ? (
        todos.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 border border-amber-300 w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mb-3 justify-between items-start sm:items-center p-4 rounded-md mx-auto"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleDone(item.id)}
                className="w-5 h-5 appearance-none bg-white border border-gray-300 rounded-full checked:bg-green-500 checked:border-transparent focus:outline-none cursor-pointer"
              />
              <p className={`break-words ${item.completed ? "line-through text-gray-400" : ""}`}>
                {item.title}
              </p>
            </div>

            <div className="flex text-2xl gap-3 self-end sm:self-auto">
              <button onClick={() => handleClick("edit", item.id)}>
                <MdModeEdit className="cursor-pointer hover:text-yellow-400" />
              </button>
              <button onClick={() => handleClick("delete", item.id)}>
                <MdOutlineDelete className="cursor-pointer hover:text-red-500" />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-lg text-center">Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
};

export default TODOList;
