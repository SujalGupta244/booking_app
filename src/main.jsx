import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import {UserContext} from './UserContext'
import {Provider} from 'react-redux'
import store from './app/store'
import { PayPalScriptProvider} from "@paypal/react-paypal-js";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      {/* <UserContext> */}
      <Provider store={store}>
        <PayPalScriptProvider options={{ clientId: "test" }}>
          <App />
        </PayPalScriptProvider>
      </Provider>
      {/* </UserContext> */}
    </BrowserRouter>
)
