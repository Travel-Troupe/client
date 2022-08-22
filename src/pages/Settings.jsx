import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { logout } from '../services/User'
import AuthContext from '../store/contexts/AuthContext'

const Settings = () => {
  const { dispatch } = useContext(AuthContext)
  const navigateTo = useNavigate();


  return (
    <Button onClick={() => {logout({ dispatch }); window.location.href = '/'}}>Se déconnecter</Button>
  )
}

export default Settings