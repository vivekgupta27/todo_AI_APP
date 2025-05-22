import supabase from '../config/supabaseClient.js';

export const getTodos = async (req, res) => {
  try {
    const { data } = await supabase.from('TodoList').select('*');
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send('Title is required');

  try {
    const { error } = await supabase.from('TodoList').insert([{ title }]);
    if (error) throw error;
    res.status(200).send('Todo added');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('TodoList').delete().eq('id', id);
    if (error) throw error;
    res.status(200).send('Todo deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  if (!updateFields || Object.keys(updateFields).length === 0) {
    return res.status(400).send("No fields provided for update.");
  }

  try {
    const { data, error } = await supabase
      .from('TodoList')
      .update(updateFields)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ message: `Todo with ID ${id} updated successfully.`, data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};