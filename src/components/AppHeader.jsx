import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Profil from './Profil'
import { getItem } from '../utils/AppStorage'
import getUserAvatar from '../utils/getUserAvatar'

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: var(--color-white);
`

const AppHeader = ({ title= "", subtitle = "" }) => {
  return (
    <StyledContainer>
      <div>
      <Text>{title}</Text>
      <Text small>{subtitle}</Text>
      </div>
      <Profil src={getUserAvatar(getItem('user'))} alt=""></Profil>
    </StyledContainer>
  )
}

export default AppHeader