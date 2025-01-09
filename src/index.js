import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/*<CssBaseline /> /!* 重置全局样式 *!/*/}
      <App />
  </React.StrictMode>
);
