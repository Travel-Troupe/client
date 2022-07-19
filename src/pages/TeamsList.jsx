import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import Accordion from '../components/Accordion'


const StyledTitle = styled.h2`
  font-size: 0.675rem;
  color: var(--color-white);
`

const TeamsList = () => {
  const { data, error, loading } = useFetch('/team/all')

  const hasData = data && data.length
  return (
    <div>
      <StyledTitle>Liste de toutes vos troupes: </StyledTitle>
      {hasData && (
        data.map(({name, teamComposition, _id: id}) => (
          <Accordion name={name} members={teamComposition}/>
        ))
      )}
    </div>
  )
}

export default TeamsList