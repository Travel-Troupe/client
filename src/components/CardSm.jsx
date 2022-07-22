import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledCardSm = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48%;
  aspect-ratio: 1;
  padding: 12px;
  margin-top: 15px;
  background-color: var(--color-white);
  border-radius: 10px;

  i {
    color: var(--color-grey-dark) !important;
    transform: scale(1.5);
  }

  p {
    position: absolute;
    font-size: 12px;
    bottom: 20px;
    font-weight: 500;
    color: black;
  }


`

const CardSm = (props) => {
  return (
    <StyledCardSm {...props}
      as={Link}
      to={`/travel}`}>
      <i className={props.icon}></i>
      <p>{props.children}</p>
    </StyledCardSm>
  )
}

export default CardSm