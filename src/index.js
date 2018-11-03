import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, HashRouter } from 'react-router-dom';

// Use HashRouter For Electron because there's no server to redirect the routes to index.html
const Router = !!window.require? HashRouter : BrowserRouter;

ReactDOM.render(<Router><Main /></Router>, document.getElementById('root'));

registerServiceWorker();
