import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loading from './Loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>
);
