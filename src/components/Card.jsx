import React from 'react'
import styled from 'styled-components'
import img from '../assets/cover.jpg'
import getUserAvatar from '../utils/getUserAvatar'

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: 6px;
  text-decoration: none;

  .content {
    width: 50%;
    padding: 10px;
  }

  .title {
    font-size: 12px;
    text-decoration: none;
    color: initial;
  }
  
  .subtitle {
    font-size: 10px;
    color: var(--color-grey);
    text-decoration: none;
    color: initial;
  }
  
  .desc {
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;
    text-decoration: none;
    color: initial;
  }
`

const StyledImg = styled.img`
  width: 60%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 6px;
`

const StyledRoundedImage = styled.img `
  height: 30px;
  width: 30px;
  border-radius: 30px;
  display: inline-block;
  margin-left: 4px;
`
const Card = ({travel, ...props}) => {
  const { name, location, picture } = travel
  return (
    <StyledCard {...props}>
      <StyledImg src={picture ?? img} alt="" />
      <div className='content'>
        <h2 className='title'>{location?.place_name ?? "Destination inconnu"}</h2>
        <span className='subtitle'>{name}</span>
        <p className='subtitle' style={{ marginTop: 8 }}>Troupe: {travel.team.name}</p>
        { travel?.team?.teamComposition?.length && <div style={{marginTop: 8, marginLeft: -4, marginRight: 4}}>
          {travel.team.teamComposition.map(user => (
          <StyledRoundedImage src={getUserAvatar(user)} />
        ))}
        </div> }
         {/*<p className='desc'>Voyage de Chicago à New York en passant par Boston</p> */}
      </div>
    </StyledCard>
  )
}

export default Card
