import React from 'react';
import styled from "styled-components";
import Museum from '../assets/icons/museum.svg?component'

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  margin: 18px 0;
  
  border-radius: 8px;
  background-color: var(--color-white);
  
  color: var(--color-grey);
  text-decoration: none;
`

const StyledTitle = styled.h2`
  margin-bottom: 8px;

  color: var(--color-black);
  font-size: 20px;
  font-weight: normal;
  &::first-letter {
    text-transform: capitalize;
  }
`

const StyledPlaceName = styled.address`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  color: var(--color-orange);
  font-style: normal;
  font-weight: 200;

  i {
    flex-shrink: 0;
  }

  span {
    display: block;
    margin-left: 8px;
  }
`

const StyledStepIcon = styled.div`
  --icon-size: 50px;
  width: var(--icon-size);
  height: var(--icon-size);
  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: var(--icon-size);
  background-color: var(--color-green);

  color: var(--color-white);
  
  svg {
    width: 30px;
  }
`

const StyledCardContent = styled.div`
  flex: 2;
  margin-left: 8px;
`


const StepCard = ({ name, description, address, ...props }) => {
  return name ? (
    <StyledCard {...props}>
      <StyledStepIcon>
        <Museum />
      </StyledStepIcon>
      <StyledCardContent>
        <StyledTitle>{name}</StyledTitle>
        {address && <StyledPlaceName>
          <i className="gg-pin"/>
          <span>{address.place_name}</span>
        </StyledPlaceName>
        }
        {description && <p>{description}</p>}
      </StyledCardContent>
    </StyledCard>
  ) : null;
};

export default StepCard;
