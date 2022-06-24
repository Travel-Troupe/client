import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import img from '../assets/profil.jpg'

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

const Accordion = ({name, ...props})  => {
  const [clicked, setClicked] = useState(false);

  const toggle = () => {
    setClicked(!clicked);
  };

  return (
      <StyledAccordion {...props}>
            <StyledWrap onClick={() => toggle()} >
                        <p>{name}</p>
                        <span>{clicked ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
            </StyledWrap>
            {clicked && (
                  <StyledDropdown>
                    <p>Mes membres</p>
                    <StyledMembersList>
                        <img src={img} alt="" />
                        <img src={img} alt="" />
                        <img src={img} alt="" />
                        <BsFillPlusCircleFill size={28} color="#79BFA4" />
                    </StyledMembersList >
                  </StyledDropdown>
                )}
    </StyledAccordion>
  );
};

export default Accordion;