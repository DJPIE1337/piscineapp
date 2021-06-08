import React, { useState } from 'react';
import { setUserSession } from './utils/common';
import Header from './header';
import {apiPost} from './api';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const name = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    apiPost('users/login', { name: name.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.status === 400) setError(error.message);
      else setError("Something went wrong. Please try again later.");
    });
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleLogin();
    }
  }
  return (
    <div>
      {Header()}
      <center>
      <br />
      <br />
      <h1>Piscine App Login</h1>
      <div>
        Login<br />
        <input type="text" {...name} autoComplete="login" onKeyPress={handleKeyPress} />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="password" onKeyPress={handleKeyPress} />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </center>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;