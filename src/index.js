import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import esES from "antd/es/locale/es_ES";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConfigProvider locale={esES} theme={{
          // algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#af000e',
            colorInfo: "#f5222d",
            borderRadius: 16,
          },
        }}>
        <App />
    </ConfigProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
