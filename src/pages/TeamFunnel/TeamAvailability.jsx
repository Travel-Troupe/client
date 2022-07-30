import React from 'react'
import styled from 'styled-components'
import DateInput from '../../components/DateInput'
const StyledTitle = styled.h2`
  font-size: 0.875rem;
  color: var(--color-white);
`

const StyledTSubitle = styled.p`
  font-size: 0.675rem;
  color: var(--color-white);
  margin-top: .5rem;
`

const TeamAvailability = ({team, ...props}) => {
console.log("coucou => ")
  return (
    <div>
      <StyledTitle> Sélectionner une date </StyledTitle>
      <StyledTSubitle>   Sélectionner la période où vous serez disponible, les membres de votre troupe la verront aussi :</StyledTSubitle>
      <DateInput type="text" placeholder="Choississez une date"/>
    </div>"
  )
}

export default TeamAvailability