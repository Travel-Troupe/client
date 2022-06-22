import React from 'react'
import styled from 'styled-components'
import img from '../assets/cover.jpg'

const StyledCard = styled.div`
  display: flex;
  width: 80%;
  padding: 12px;
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: 6px;

  img {
    width: 60%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 6px;
  }

  .content {
    width: 50%;
    padding: 10px;
  }

  .title {
    font-size: 12px;
  }

  .subtitle {
    font-size: 10px;
    color: var(--color-grey);
  }

  .desc {
    margin-top: 5px;
    font-size: 10px;
    font-weight: 600;
  }
`

const Card = () => {
  return (
    <StyledCard>
      <img src={img} alt="" />
      <div className='content'>
        <h2 className='title'>Road Trip USA 2022 </h2>
        <span className='subtitle'>Budget : 22 984$</span>
        <p className='desc'>Voyage de Chicago à New York en passant par Boston</p>
      </div>
    </StyledCard>
  )
}

export default Card