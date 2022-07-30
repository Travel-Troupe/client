import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../assets/profil.jpg'
import whiteStart from '../assets/icons/white-star.png'

const StyledDateContainer = styled.div `
    width: 100%;
    background-color: var(--color-grey-dark);
    display: felx;
    align-items: center;
`

const StyledDateProposition = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 6px 19px 19px 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    margin-left: 5px;
    max-height: 45px;
  }
  p{
    color: #191919;
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
    }
    img {
        margin-left: 5px;
    }
`


const VotedDates = ()  => {
  return (
      <StyledDateContainer>
        <StyledDateProposition>
            <img src={img} alt="" />
            <p> 18/06/2023 - 11/07/2023</p>
        </StyledDateProposition>
        <StyledVoteAction>
        <p>Voter</p>
        <img src={whiteStart} alt="" />
      </StyledVoteAction>
      </StyledDateContainer>
  );
};

export default VotedDates;