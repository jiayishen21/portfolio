import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loading from './Loading';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>
);
