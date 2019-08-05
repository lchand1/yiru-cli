import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/base.css';
import * as serviceWorker from './serviceWorker';
import Router from './Router/route'



ReactDOM.render(<div><Router/></div>, document.getElementById('root'));
serviceWorker.register();
