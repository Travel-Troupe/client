import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import AppBottomBar from './components/AppBottomBar';
import TravelsList from './pages/TravelsList';

const AppNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TravelsList />}></Route>
      </Routes>
      <AppBottomBar />
    </BrowserRouter>
  )
}

export default AppNavigation