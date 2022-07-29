import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import TravelsList from './pages/TravelsList';
import AppBottomBar from './components/AppBottomBar';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


const LoginNavigation = () => {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
    </BrowserRouter>
  )
}

export default LoginNavigation
