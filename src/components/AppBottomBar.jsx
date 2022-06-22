import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  padding: 8px 16px;
`

const items = [
  {
    path: '/',
    name: 'Mes voyages',
    icon: 'je sais pas gros'
  },
  {
    path: '/teams',
    name: 'Mes troupes',
    icon: 'aucune idée'
  },
  {
    path: '/settings',
    name: 'Paramètres',
    icon: 'aucune idée'
  },

]
const AppBottomBar = () => {
  return (
    <StyledContainer>
      {items.map(({path, name}, index) => (
        <StyledLink key={index} to={path}>
          {name}
        </StyledLink>
      ))}
    </StyledContainer>
  )
}

export default AppBottomBar