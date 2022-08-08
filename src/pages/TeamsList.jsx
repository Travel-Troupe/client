import React from 'react'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import Accordion from '../components/Accordion'
import Button from '../components/Button'
import AppHeader from '../components/AppHeader'
import { Link } from 'react-router-dom'

const StyledTitle = styled.h2`
  font-size: 0.675rem;
  color: var(--color-white);
`


const StyledContent = styled.div`
  display: flex;
  flex-direction: column;

  .btn {
    align-self: center;
    margin-top: 10px;
    width: fit-content;
  }
`

const TeamsList = () => {
  const { data, error, loading } = useFetch('/team/all')

  const hasData = data && data.length
  return (
    <StyledContent>
      <AppHeader></AppHeader>
      <StyledTitle>Liste de toutes vos troupes: </StyledTitle>
      {hasData && (
        data.map(({name, teamComposition, _id: id}) => (
          <Accordion name={name} members={teamComposition}/>
        ))
      )}

      <Button as={Link} to={'/team-funnel'} className='btn'>Trouver une troupe</Button>
    </StyledContent>
  )
}

export default TeamsList