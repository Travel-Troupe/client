import React, { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { logout } from '../services/User'
import AuthContext from '../store/contexts/AuthContext'
import AppHeader from '../components/AppHeader'

const Settings = () => {
  const { dispatch } = useContext(AuthContext)
  const navigateTo = useNavigate();

  const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 50%;
    width: fit-content;
  }
`

  return (
    <StyledContent>
      <AppHeader title="Paramètres" subtitle="Se déconnecter"></AppHeader>
      <Button onClick={() => {logout({ dispatch }); window.location.href = '/'}}>Se déconnecter</Button>
    </StyledContent>
  )
}

export default Settings