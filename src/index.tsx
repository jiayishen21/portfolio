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
    <div style={{
      opacity: 0,
      zIndex: -100,
    }}>
      <App />
    </div>
  </React.StrictMode>
);
