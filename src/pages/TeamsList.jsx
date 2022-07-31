import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import Accordion from '../components/Accordion'
import { Link } from 'react-router-dom'


const StyledTitle = styled.h2`
  font-size: 0.675rem;
  color: var(--color-white);
`

const TeamsList = () => {
  const { data, error, loading } = useFetch('/team/all')

  const hasData = data && data.length
  console.log("dataa=> ", data)
  return (
    <div>
      <StyledTitle>Liste de toutes vos troupes: </StyledTitle>
      {hasData && (
        data.map(({name, teamComposition, validatedStartDate, _id: teamId}) => (
          <Link to={validatedStartDate? '' : `/team-funnel/availability/${teamId}`} style={{ textDecoration: 'none' }}>
            <Accordion name={name} members={teamComposition}/>
          </Link>
        ))
      )}
    </div>
  )
}

export default TeamsList