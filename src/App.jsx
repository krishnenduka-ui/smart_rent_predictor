import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import ComparePage from './pages/ComparePage'
import Favorites from './pages/Favorites'
import Neighborhoods from './pages/Neighborhoods'
import Login from './pages/Login'
import Footer from './pages/Footer'
import Properties from './pages/Properties'
import Map from './pages/Map'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/Signup'
import SavedSearches from './pages/SavedSearches'
import RentEstimator from './pages/RentEstimator'


const App = () => {
  return (
    <div>
     
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/rentals' element = {<Rentals/>}/>
        <Route path='/compare' element = {<ComparePage/>}/>
        <Route path='/favorites' element = {<Favorites/>}/>
        <Route path='/saved-searches' element ={<SavedSearches/>}/>
        <Route path='/neighborhoods' element = {<Neighborhoods/>}/>
        <Route path='/rent-estimator' element = {<RentEstimator/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/properties/:id" element={<Properties />} />
        <Route path='/map/:id' element={<Map/>}/>
        <Route path='/dashboard' element={<ProtectedRoute>
                                              <Dashboard/>
                                          </ProtectedRoute>}/>
        
       
      </Routes>
      <Footer/>
    </div>
  )
}

export default App