import React from 'react';
import { TodoListItem } from './TodoListItem';

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
  onEdit: OnEdit;
  deleteTodo: DeleteTodo;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, onEdit, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};
