import React from 'react'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
`

const TravelsList = () => {
  const { data, error, loading } = useFetch('/travel/all')

  const hasData = data && !!data.length
  return (
    <StyledContainer>
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
    </StyledContainer>
  )
}

export default TravelsList