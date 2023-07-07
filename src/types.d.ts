type AddTodo = (newTodo: string) => void;
type RemoveTodo = (todoToRemove: Todo) => void;
type EditTodo = (todoToEdit: Todo) => void;
type OnEdit = (todoId: string) => void;
type DeleteTodo = (todoId: string) => void;
type SearchTodo = (searchStr: string) => void;
type FilterTodo = (todoStatusStr: string) => void;
type HandleNewTodos = (todos: Todo[]) => Todo[];
type UserNameChanged = (userNameStr: string) => void;
type PasswordChanged = (passwordStr: string) => void;
type LoginAction = (user: User) => void;
type HandleNewUser = (Users: User[]) => User[];

type User = {
  userName: string;
  password: string;
};
type Todo = {
  text: string;
  complete: boolean;
  id: string;
  userName: string;
};

type ToggleComplete = (selectedTodo: Todo) => void;

type Option = {
  value: string;
  onClick: (id: string) => void;
  color?: string;
  todoId: string;
};
