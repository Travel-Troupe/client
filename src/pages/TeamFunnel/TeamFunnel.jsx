import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import iconCreate from '../../assets/create-troupe.png'
import iconJoin from '../../assets/solo.png'
import Text from '../../components/Text'

const StyledFunnel = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  img {
    width: 100px;
    height: 100px;
  }

  a {
    margin-top: 20px;
    text-decoration: none;
    text-align: center;
  }

  p {
    margin-top: 10px;
    text-transform: uppercase;
    color: var(--color-white);
    font-size: 14px;
  }

  hr {
    width: 60%;
    height: 2px;
    background-color: var(--color-white);;
  }
  `

const TeamFunnel = () => {
  return (
    <StyledFunnel>
      <Text>Rejoindre ou créer une troupe</Text>
      <Link to={'/team-funnel/create'}>
        <img src={iconCreate} alt="create team" />
        <p>Creer une team</p>
      </Link>
      <hr />
      <Link to={'/team-funnel/join'}>
        <img src={iconJoin} alt="Join team" />
        <p>Rejoindre une team</p>
      </Link>
    </StyledFunnel>
  )
}

export default TeamFunnel