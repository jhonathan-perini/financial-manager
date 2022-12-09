import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'

import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient} >
          <App/>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
)
