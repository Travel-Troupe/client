import React from 'react'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { StyledCenteredButton } from './TravelFunnel/Team'

const StyledButton = styled(StyledCenteredButton)`
  margin-top: 8px;
`
const StyledContainer = styled.div`
  height: 100%;

  ${({ hasData }) => !hasData && css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`

export const StyledNoContent = styled.div`
  color: var(--color-grey);
  padding: 32px;
  font-size: 14px;
  background-color: var(--color-white);
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
`

const StyledContent = styled.div`
  display: flex;
  height: 80%;
  overflow:scroll;
  flex-direction: column;
  align-items: center;
`

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')

  const hasData = !loading && data && !!data.length

  const buttonText = hasData ? 'Ajouter un voyage' : 'Se lancer'

  return (
    <StyledContainer hasData={hasData}>
      <AppHeader title="Mes voyages" subtitle="Liste des voyages en cours et passés :"/>
        {hasData && <StyledContent>
          {data.map((travel, i) => (
            <Card
              key={travel._id ?? i}
              as={Link}
              to={`/travel/${travel._id}`}
              travel={travel}
            />
          ))}
        </StyledContent>}
        {!hasData && loading && <p>loading…</p>}
        {!hasData && !loading && <StyledNoContent>
          Nous n’avons trouvé aucun voyage…<br/><br/>
          Commencez une nouvelle aventure dès maintenant !
        </StyledNoContent>}
        {error && <p>{'Une erreur est survenue =('}</p>}
        <StyledButton as={Link} to="/teams">{buttonText}</StyledButton>
    </StyledContainer>
  )
}

export default TravelsList