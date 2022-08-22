import React from 'react'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { StyledCenteredButton } from './TravelFunnel/Team'

const StyledButton = styled(StyledCenteredButton)`
  margin-top: 8px;
`
const StyledContainer = styled.div`
  min-height: 100%;
`

const StyledContent = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
`

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')

  const hasData = data && !!data.length

  const buttonText = hasData ? 'Ajouter un voyage' : 'Se lancer'

  return (
    <StyledContainer>
      <AppHeader title="Mes voyages" subtitle="Liste des voyages en cours et passés :"/>
      <StyledContent>
        {hasData && data.map((travel, i) => (
          <Card
            key={travel._id ?? i}
            as={Link}
            to={`/travel/${travel._id}`}
            travel={travel}
          />
        ))}
        {!hasData && loading && <p>loading…</p>}
        {!hasData && !loading && <p>Vous n'avez aucun voyages</p>}
        {error && <p>{'Une erreur est survenue =('}</p>}
        </StyledContent>
        <StyledButton as={Link} to="/teams">{buttonText}</StyledButton>
    </StyledContainer>
  )
}

export default TravelsList