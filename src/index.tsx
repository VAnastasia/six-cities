import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/app/app';
import {store} from './store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory} basename='/six-cities'>
          <ToastContainer />
          <App />
        </HistoryRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
