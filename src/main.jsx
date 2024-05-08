import React from 'react'
import ReactDOM from 'react-dom/client'
import ControlGastosApp from './components/ControlGastosApp'
import './assets/css/styles.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <ControlGastosApp/>
    </Provider>
  </>
)
