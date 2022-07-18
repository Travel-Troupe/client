import React, { useState } from 'react';
import styled from 'styled-components';
import img from '../assets/profil.jpg'
import arrowDown from '../assets/icons/down-arrow.png'
import arrowUp from '../assets/icons/up-arrow.png'

const StyledAccordion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  background: var(--color-white);
  color: var(--color-grey-dark);
  padding: 12px;
  margin-top: 20px;
  margin-inline: 10%;
  border-radius: 6px;
  text-decoration: none;
  text-align:left;
`;


const StyledWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  p {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const StyledDropdown = styled.div`
  margin-top: .25rem;
  border-top: 1px solid rgba(25, 25, 25, 0.2);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  p {
    margin-top: .5rem;
    font-size: 0.625rem;
  }
`;

const StyledMembersList = styled.div`
  margin-top: .5rem;
  display: flex;
  flex-direction: row;
  align-items: start;

  img {
    width: 28px;
    height: 28px;
    margin-right: .5rem;
  }
`;

const Accordion = ({name, members, ...props})  => {
  const [clicked, setClicked] = useState(false);

  const toggle = () => {
    setClicked(!clicked);
  };

  console.log("members => ", members)
  return (
      <StyledAccordion {...props}>
            <StyledWrap onClick={() => toggle()} >
                        <p>{name}</p>
                        <span>{clicked ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />}</span>
            </StyledWrap>
            {clicked && (
                  <StyledDropdown>
                    <p>Mes membres</p>
                    <StyledMembersList>
                    {members && (
                      members.map( member => (
                        <img src={member.image ? member.image : img} alt="" />

                      ))
                    )}
                    </StyledMembersList >
                  </StyledDropdown>
                )}
    </StyledAccordion>
  );
};

export default Accordion;