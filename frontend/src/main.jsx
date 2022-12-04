import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import Login from "./components/login/Login.jsx";
import Home from "./components/home/Home.jsx";
import Navbar from "./components/navbar/Navbar.jsx";

const DefaultContainer = () => (
    <div>
        <div className="container">
            <Navbar />
            <Route  element={<App/>} path="/"  >
                <Route  element={<Home/>} index  />
            </Route>


        </div>
    </div>
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </React.StrictMode>
)
