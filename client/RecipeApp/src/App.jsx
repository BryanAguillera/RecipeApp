import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Authentication from './pages/authentication'
import CreateRecipe from './pages/createRecipe'
import SaveRecipe from './pages/saveRecipe'
import Navbar from './components/navbar'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/create-recipe' element={<CreateRecipe/>}/>
          <Route path='/save-recipes' element={<SaveRecipe/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
