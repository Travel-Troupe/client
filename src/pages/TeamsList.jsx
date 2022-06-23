import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'

const StyledCard = styled.div`
  background-color: var(--color-white);
  padding: 12px;
  border-radius: 6px;
  margin: 8px;
`

const TeamsList = () => {
  const { data, error, loading } = useFetch('/team/all')

  const hasData = data && data.length
  return (
    <div>
      <h2>TeamsList</h2>
      {hasData && (
        data.map(({name, teamComposition, _id: id}) => (
          <StyledCard key={id}>
            {name}<br/>
            {teamComposition.length} membres
          </StyledCard>
        ))
      )}
    </div>
  )
}

export default TeamsList