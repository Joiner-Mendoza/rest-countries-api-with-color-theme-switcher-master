import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { Home } from './Home';
import { Menu } from './Menu';
function App() {


  return (
    <HashRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}/>

      </Routes>
      
    </HashRouter>
  )
}

export default App
