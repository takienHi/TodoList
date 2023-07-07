import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  addTodo: AddTodo;
  currentTodo: Todo | null;
  editTodo: (name: string) => void;
  finishEditTodo: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo, currentTodo, editTodo, finishEditTodo }) => {
  const [todoText, setTodoText] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(currentTodo);

    if (currentTodo) {
      editTodo(value);
    } else {
      setTodoText(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (currentTodo) {
      finishEditTodo();
      if (todoText) setTodoText('');
    } else {
      addTodo(todoText);
      setTodoText('');
    }
  };

  return (
    <form className='todo-form'>
      <input
        type='text'
        value={currentTodo ? currentTodo.text : todoText}
        className='todo-input'
        placeholder='Add a todo'
        onChange={handleChange}
      />
      <button type='submit' className='todo-button' onClick={handleSubmit}>
        {currentTodo ? 'Edit' : 'Add Todo'}
      </button>
    </form>
  );
};
