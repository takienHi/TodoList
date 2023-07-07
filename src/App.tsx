import React, { useEffect, useState } from 'react';
import './App.css';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import SearchBar from './components/SearchBar';
import Login from './components/Login';

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [searchStr, setSearchStr] = useState<string>('');
  const [todoStatus, setTodoStatus] = useState<string>('all');
  const [todosDisplay, setTodosDisplay] = useState<Array<Todo>>([]);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User>({ userName: '', password: '' });
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
    const todosString = localStorage.getItem('todos');
    const todosObj: Todo[] = JSON.parse(todosString || '[]');
    const newTodosObj = handleNewTodos(todosObj);
    localStorage.setItem('todos', JSON.stringify(newTodosObj));
  };

  const syncUserToLocal = (HandleNewUser: HandleNewUser) => {
    const usersString = localStorage.getItem('users');
    const userObj: User[] = JSON.parse(usersString || '[]');
    const newTodosObj = HandleNewUser(userObj);
    localStorage.setItem('users', JSON.stringify(newTodosObj));
  };

  const sortTodoList = (todoList: Todo[]) => {
    let statusOrder = [false, true];
    return todoList.reverse().sort((a, b) => statusOrder.indexOf(a.complete) - statusOrder.indexOf(b.complete));
  };

  useEffect(() => {
    const userSS: User = JSON.parse(sessionStorage.getItem('user') || '{"userName":"","password":""}');
    if (userSS.userName) {
      setUser(userSS);
    } else {
      setUser(JSON.parse(localStorage.getItem('user') || '{"userName":"","password":""}'));
    }
    const todosString = localStorage.getItem('todos');
    const todosObj: Todo[] = JSON.parse(todosString || '[]');
    setTodos(sortTodoList(todosObj.filter((todo) => todo.userName === userSS.userName)));
    setTodosDisplay(sortTodoList(todosObj.filter((todo) => todo.userName === userSS.userName)));
  }, []);

  useEffect(() => {
    const todosString = localStorage.getItem('todos');
    const todosObj: Todo[] = JSON.parse(todosString || '[]');
    setTodos(sortTodoList(todosObj.filter((todo) => todo.userName === user.userName)));
    setTodosDisplay(sortTodoList(todosObj.filter((todo) => todo.userName === user.userName)));
  }, [user]);

  useEffect(() => {
    if (searchStr && (todoStatus === 'done' || todoStatus === 'notDone')) {
      if (todoStatus === 'done') {
        const newTodos = todos.filter((todo) => todo.text.match(searchStr) && todo.complete);
        setTodosDisplay(newTodos);
      } else {
        const newTodos = todos.filter((todo) => todo.text.match(searchStr) && !todo.complete);
        setTodosDisplay(newTodos);
      }
    } else if (searchStr) {
      const newTodos = todos.filter((todo) => todo.text.match(searchStr));
      setTodosDisplay(newTodos);
    } else if (todoStatus === 'done' || todoStatus === 'notDone') {
      if (todoStatus === 'done') {
        const newTodos = todos.filter((todo) => todo.complete);
        setTodosDisplay(newTodos);
      } else {
        const newTodos = todos.filter((todo) => !todo.complete);
        setTodosDisplay(newTodos);
      }
    } else {
      setTodosDisplay(todos);
    }
  }, [searchStr, todoStatus, todos]);

  const toggleComplete: ToggleComplete = (selectedTodo) => {
    const todosString = localStorage.getItem('todos');
    const todosObj2: Todo[] = JSON.parse(todosString || '[]');
    const updatedTodos2 = todosObj2.map((todo2) => {
      if (todo2.id === selectedTodo.id) {
        return { ...todo2, complete: !todo2.complete };
      }
      return todo2;
    });

    localStorage.setItem('todos', JSON.stringify(updatedTodos2));
    setTodos(sortTodoList(updatedTodos2).filter((todo) => todo.userName === user.userName));
  };

  const addTodo: AddTodo = (newTodo) => {
    if (newTodo !== '') {
      const todo: Todo = {
        text: newTodo,
        complete: false,
        id: new Date().toISOString(),
        userName: user.userName,
      };
      setTodos((prev) => [todo, ...prev]);
      syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo]);
    }
  };

  const onEdit = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      setCurrentTodo(foundTodo);
    }
  };

  const editTodo = (text: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, text };
      return null;
    });
  };

  const finishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo;
        }
        return todo;
      });
    };

    setCurrentTodo(null);
    syncReactToLocal(handler);
    setTodos(handler);
  };

  const deleteTodo = (todoId: string) => {
    if (currentTodo) {
      setCurrentTodo(null);
    }

    const handler = (todoObj: Todo[]) => {
      const findedIndexTodo = todoObj.findIndex((todo) => todo.id === todoId);
      if (findedIndexTodo > -1) {
        const result = [...todoObj];
        result.splice(findedIndexTodo, 1);
        return result;
      }
      return todoObj;
    };

    setTodos(handler);
    syncReactToLocal(handler);
  };

  const searchTodo: SearchTodo = (searchString: string) => {
    setSearchStr(searchString);
  };

  const userNameChanged: UserNameChanged = (userNameStr: string) => {
    setUserName(userNameStr);
  };

  const passwordChanged: PasswordChanged = (passwordStr: string) => {
    setPassword(passwordStr);
  };

  const filterTodo: FilterTodo = (todoStatusStr: string) => {
    setTodoStatus(todoStatusStr);
  };

  const loginAction: LoginAction = (user2: User) => {
    const usersString = localStorage.getItem('users');
    const usersObj: User[] = JSON.parse(usersString || '[]');
    const userFound = usersObj.find((userObj) => userObj.userName === user2.userName);
    if (userFound) {
      if (userFound.password === user2.password) {
        sessionStorage.setItem('user', JSON.stringify(user2));
        localStorage.setItem('user', JSON.stringify(user2));
        setUser(user2);
      } else {
        alert('Password incorrect');
      }
    } else {
      syncUserToLocal((usersObj: User[]) => [...usersObj, user2]);
      sessionStorage.setItem('user', JSON.stringify(user2));
      localStorage.setItem('user', JSON.stringify(user2));
      setUser(user2);
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    setUser({ userName: '', password: '' });
  };

  return (
    <div className='todo-app'>
      {!user?.userName ? (
        <>
          <header>
            <h1>Login</h1>
          </header>
          <Login
            userName={userName}
            password={password}
            userNameChanged={userNameChanged}
            passwordChanged={passwordChanged}
            loginAction={loginAction}
          />
        </>
      ) : (
        <>
          <header>
            <h1>Todo App</h1>
            <button className='logout-btn' onClick={logoutUser}>
              Logout
            </button>
          </header>
          <TodoForm addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
          <h2>Todo List</h2>
          <SearchBar searchStr={searchStr} todoStatus={todoStatus} searchTodo={searchTodo} filterTodo={filterTodo} />
          <TodoList todos={todosDisplay} toggleComplete={toggleComplete} onEdit={onEdit} deleteTodo={deleteTodo} />
        </>
      )}
    </div>
  );
}

export default App;
