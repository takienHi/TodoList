import React, { FormEvent } from 'react';
interface LoginProps {
  userName: string;
  password: string;
  userNameChanged: UserNameChanged;
  passwordChanged: PasswordChanged;
  loginAction: LoginAction;
}

function Login(props: LoginProps) {
  const { userName, password, userNameChanged, passwordChanged, loginAction } = props;

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userLogin = { userName: userName, password: password };
    loginAction(userLogin);
  };
  return (
    <form className='todo-form'>
      <div>
        <span className='title-login-input'>Username</span>
        <input
          type='text'
          name='username'
          value={userName}
          className='login-input'
          onChange={(e) => userNameChanged(e.target.value)}
        />
      </div>
      <div>
        <span className='title-login-input'>Password</span>
        <input
          type='password'
          value={password}
          className='login-input'
          onChange={(e) => passwordChanged(e.target.value)}
        />
      </div>
      <button type='submit' className='login-button' onClick={handleSubmit}>
        Login
      </button>
    </form>
  );
}

export default Login;
