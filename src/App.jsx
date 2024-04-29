import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokedexId from './pages/PokedexId'
import ProtectedRoutes from './pages/ProtectedRoutes'
import "./App.css"
function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />} >
            <Route path="/pokedex" element={ <Pokedex /> } />
            <Route path="/pokedex/:id" element={<PokedexId /> } />       
          </Route>
          <Route path="*" element={<h2>Poke 404</h2>} />
      </Routes>
    </>
  )
}

export default App
