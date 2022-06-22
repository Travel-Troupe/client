import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import iconHome from '../assets/icons/globe.png'
import iconTeam from '../assets/icons/team.png'
import iconParams from '../assets/icons/settings.png'

const StyledContainer = styled.div`
  height: 67px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 10px;
  background-color: var(--color-white);
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  color: var(--color-black);
  font-size: 14px;
  text-decoration: none;
  text-align: center;

  img {
    width: 22px;
    height: 22px;
    margin-bottom: 5px;
  }
`

const items = [
  {
    path: '/',
    name: 'Mes voyages',
    icon: iconHome
  },
  {
    path: '/teams',
    name: 'Mes troupes',
    icon: iconTeam
  },
  {
    path: '/settings',
    name: 'Paramètres',
    icon: iconParams
  },

]
const AppBottomBar = () => {
  return (
    <StyledContainer>
      {items.map(({path, name, icon}, index) => (
        <StyledLink key={index} to={path}>
          <img src={icon} alt={name} />
          {name}
        </StyledLink>
      ))}
    </StyledContainer>
  )
}

export default AppBottomBar