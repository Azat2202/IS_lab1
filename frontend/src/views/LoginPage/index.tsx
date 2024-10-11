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
  return <div className="flex flex-col h-screen p-8 ">
    <header className="text-center space-y-2 mb-10">
      <p>Министерство науки и высшего образования Российской Федерации</p>
      <p>Федеральное государственное автономное образовательное учреждение</p>
      <p>Высшего образования</p>
      <p className="italic">Факультет Программной Инженерии и Компьютерной Техники</p>
    </header>
    <main className="flex flex-col items-center space-y-2 mb-10">
      <h1 className="text-lg font-bold">Лабораторная работа 1 по Информационным Системам</h1>
      <p>Управление коллекцией StudyGroup</p>
      <p>Вариант №368796</p>
    </main>
    <footer className="space-y-8 text-center">
      <div className="flex flex-col space-y-2 mr-32 mb-20">
        <p className="text-right">
          Группа: P3316<br/>
          Выполнил: <br/>
          <input type={ "text" } placeholder={ "Сиразетдинов" } value={ username }
                 onChange={ e => setUsername(e.target.value) }
                 className="w-32 placeholder:text-black"
          />
          <input type={ "password" } placeholder={ "А. Н." } value={ password }
                 onChange={ e => setPassword(e.target.value) }
                 className="w-10 placeholder:text-black"
          />
          <br/>
          <button onClick={ handleLogin } disabled={ isLoading }>
            { isLoading ? 'Проверяю...' : 'Проверил' }
          </button><br/> Бострикова Д. А.</p>
      </div>
      <div>
        <p>г. Санкт-Петербург</p>
        <p>2024</p>
      </div>
    </footer>
    {/*<input*/ }
    {/*  type="text"*/ }
    {/*  placeholder="Username"*/ }
    {/*  value={ username }*/ }
    {/*  onChange={ (e) => setUsername(e.target.value) }*/ }
    {/*/>*/ }
    {/*<input*/ }
    {/*  type="password"*/ }
    {/*  placeholder="Password"*/ }
    {/*  value={ password }*/ }
    {/*  onChange={ (e) => setPassword(e.target.value) }*/ }
    {/*/>*/ }
    {/*<button onClick={ handleLogin } disabled={ isLoading }>*/ }
    {/*  { isLoading ? 'Logging in...' : 'Login' }*/ }
    {/*</button>*/ }

    {/*{ isSuccess && <div>Login successful: { JSON.stringify(data) }</div> }*/ }
    {/*{ isError && <div>Error</div> }*/ }
  </div>
}