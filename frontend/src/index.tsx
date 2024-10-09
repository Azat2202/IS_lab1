import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { App } from "./app";
import { api } from "./store/baseApi";
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApiProvider api={ api }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
