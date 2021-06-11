import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production') {console.log = console.warn = console.error = () => {};}

ReactDOM.render(<App />, document.getElementById('root'));