import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import History from './components/History/History'
import Mood from './components/Mood/Mood'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Mood/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
