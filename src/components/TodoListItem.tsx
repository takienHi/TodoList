import React, { useState } from 'react';

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  // onRemoveTodo: RemoveTodo;
  onEdit: OnEdit;
  deleteTodo: DeleteTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleComplete, deleteTodo, onEdit }) => {
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo.text);

  const onDelete = (id: string) => {
    deleteTodo(id);
  };

  const onTodoUpdate = (e: any) => {
    let text = e.target.value;
    setInputText(text);
    onEdit(text);
  };

  return (
    <li className={todo.complete ? 'todo-row completed' : 'todo-row'}>
      <label>
        <input type='checkbox' onChange={() => toggleComplete(todo)} checked={todo.complete} />
        {isEditOn ? (
          <input className='edit-input' type='text' value={inputText} onChange={(e) => onTodoUpdate(e)} />
        ) : (
          todo.text
        )}
      </label>
      <div className=''>
        <button className='todo-list-button green' onClick={() => onEdit(todo.id)}>
          🖊️
        </button>
        <button className='todo-list-button red' onClick={() => onDelete(todo.id)}>
          🗑️
        </button>
      </div>
    </li>
  );
};
