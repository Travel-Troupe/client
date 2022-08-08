import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import Profil from './Profil'
import ImgProfil from '../assets/profil.jpg'
import { getItem } from '../utils/AppStorage'
import getUserAvatar from '../utils/getUserAvatar'

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px;
  color: var(--color-white);
`

const AppHeader = () => {
  return (
    <StyledContainer>
      <div>
      <Text>Header</Text>
      <Text small>Liste des voyages en cours et passés :</Text>
      </div>
      <Profil src={getUserAvatar(getItem('user'))} alt=""></Profil>
    </StyledContainer>
  )
}

export default AppHeader