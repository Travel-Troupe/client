import React from 'react';
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import formatDate from "../../utils/formatDate";
import {Link} from "react-router-dom";
import AppHeader from '../../components/AppHeader'
import Button from '../../components/Button';

const StyledItem = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-white);
  border-radius: 8px;
  margin: 16px 0;
  & > span {
    width: 50%;
    padding: 16px;
    color: var(--color-grey-dark);
  }
`

const StyledValidatedDate = styled.div`
  text-decoration: none;
  width: 50%;
  background-color: ${ props => props.validatedStartDate ? 'var(--color-green)' : 'var(--color-grey-dark)'};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  color: var(--color-white);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;

  span {
    text-transform: uppercase;
  }

  i {
    margin-right: 10px;
  }
`

export const StyledCenteredButton = styled(Button)`
  display: block;
  margin: 0 auto 16px;
  width: fit-content;
`

const Team = () => {
  const { data, error, loading } = useFetch('/team/all')
  const hasData = data && data.length

  return (
    <div>
      <AppHeader title="Mes troupes" subtitle="Liste de toutes vos troupes :"/>

      {hasData && (
        <ul>
          {data.map(({name, _id: id, validatedStartDate, validatedEndDate}) => {
            return <StyledItem key={id}>
              <span>{name}</span>
              {
                validatedEndDate && validatedStartDate ? (
                  <StyledValidatedDate validatedStartDate={validatedStartDate}  as={Link} to={`/travel/create-travel/destination/${id}`}>
                    {formatDate(validatedStartDate)} - {formatDate(validatedEndDate)}
                  </StyledValidatedDate>
                ) : (
                  <StyledValidatedDate as={Link} to={`/team-funnel/availability/${id}`}>
                    <i className="gg-calendar-two"></i>
                    <span>À définir</span>
                  </StyledValidatedDate>
                )
              }
            </StyledItem>
          })}
        </ul>
      )}
      <StyledCenteredButton as={Link} to={'/team-funnel'} className='btn'>Trouver une troupe</StyledCenteredButton>
    </div>
  );
};

export default Team;
