// REACT
import React from 'react'
import ReactDOM from 'react-dom/client'

// APP IMPORT 
import App from './App.jsx'

// STORE IMPORT 
import { Provider } from 'react-redux';
import store from './components/Store/Store';

// REACT QUERY IMPORTS
import { QueryClient, QueryClientProvider } from 'react-query'

// CSS
import './index.css'


const Client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={Client}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>,
)
