import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

const AuthPage = () => {
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request(
        'http://localhost:5000/api/auth/register',
        'POST',
        'no-cors',
        {
          ...form,
        }
      );
      console.log('Data ', data);
    } catch (error) {}
  };
  return (
    <div className='row'>
      <div className='col s-6 offset-s3'>
        <h1>Do link shorter</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Autorization</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Input email'
                  id='email'
                  type='text'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Input password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow darken-4'
              style={{ marginRight: '10px' }}>
              Login
            </button>
            <button
              className='btn grey lighten-1 black-text'
              onClick={registerHandler}
              disabled={loading}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
