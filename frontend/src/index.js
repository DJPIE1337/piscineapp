import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
const { ISPROD } = require("./config/config");

if (ISPROD) {console.log = console.warn = console.error = () => {};}

ReactDOM.render(<App />, document.getElementById('root'));