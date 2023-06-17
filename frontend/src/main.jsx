import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store';


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>

  </React.StrictMode>
);
