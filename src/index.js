import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from './hooks/use-auth';

// import reportWebVitals from './reportWebVitals';

function mockServer() {
  const { worker } = require('./mocks/browser.js')
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  })
}

mockServer();

/* if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
} */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
