import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Rentals from './pages/Rentals'
import Compare from './pages/Compare'
import Favorites from './pages/Favorites'
import SavedSearches from './pages/SavedSearches'
import Neighborhoods from './pages/Neighborhoods'
import Profile from './pages/Profile'
import Footer from './pages/Footer'
import Properties from './pages/Properties'
import Map from './pages/Map'
const App = () => {
  return (
    <div>
     
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/rentals' element = {<Rentals/>}/>
        <Route path='/compare' element = {<Compare/>}/>
        <Route path='/favorites' element = {<Favorites/>}/>
        <Route path='/saved-searches' element = {<SavedSearches/>}/>
        <Route path='/neighborhoods' element = {<Neighborhoods/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path="/properties/:id" element={<Properties />} />
        <Route path='/map' element={<Map/>}/>
        
       
      </Routes>
      <Footer/>
    </div>
  )
}

export default App