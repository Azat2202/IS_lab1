import { useAuthenticateMutation } from "../../store/types.generated";
import React, { useState } from "react";

export function MainPage() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ authenticate, { isLoading, isSuccess, isError, data, error } ] = useAuthenticateMutation();
  const handleLogin = async () => {
    try {
      const jwtDto = { username, password };
      const response = await authenticate({ jwtDto }).unwrap();
      console.log('Login successful:', response);
    } catch ( err ) {
      console.error('Login failed:', err);
    }
  };
  return <div>
    <h1>Login</h1>
    <input
      type="text"
      placeholder="Username"
      value={ username }
      onChange={ (e) => setUsername(e.target.value) }
    />
    <input
      type="password"
      placeholder="Password"
      value={ password }
      onChange={ (e) => setPassword(e.target.value) }
    />
    <button onClick={ handleLogin } disabled={ isLoading }>
      { isLoading ? 'Logging in...' : 'Login' }
    </button>

    { isSuccess && <div>Login successful: { JSON.stringify(data) }</div> }
    { isError && <div>Error</div> }
  </div>
}