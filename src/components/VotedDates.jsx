import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../assets/profil.jpg'
import whiteStar from '../assets/icons/white-star.png'
import OrangStar from '../assets/icons/star-voted.png'

const StyledDateContainer = styled.div `
    width: 100%;
    background-color: var(--color-grey-dark);
    display: flex;
    align-items: center;
    margin-top: 10px;
`

const StyledDateProposition = styled.div`
  width: 80%;
  background-color: ${props => props.color || '#fff'};
  border-radius: 6px 19px 19px 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-left: 5px;
    max-height: 45px;
  }
  p{
    color: ${props => props.textColor || '#fff'};
    font-size: 14px;
    margin-left: 5px;
    font-weight: bolder;
  }
`;

const StyledVoteAction = styled.div `
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left:5px;
    p {
        font-size: 12px;
        color: ${props => props.color || '#fff'};
    }
    img {
        margin-left: 5px;
    }
`


const VotedDates = ()  => {
  const [voted, setVote] = useState(false);

  return (
      <StyledDateContainer>
        <StyledDateProposition color={voted ? '#fb8d47' : 'white'} textColor={voted ? 'white' : '#191919'}>
            <img src={img} alt="" />
            <p> 18/06/2023 - 11/07/2023</p>
        </StyledDateProposition>
        <StyledVoteAction color={voted ? '#fb8d47' : 'white'} onClick={setVote}>
          <p>Voter</p>
          <img src={voted ? OrangStar : whiteStar} alt="" />
        </StyledVoteAction>
      </StyledDateContainer>
  );
};

export default VotedDates;