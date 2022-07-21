import React from 'react';
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import formatDate from "../../utils/formatDate";
import {Link} from "react-router-dom";

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
  }
`

const StyledValidatedDate = styled.div`
  text-decoration: none;
  width: 50%;
  background-color: var(--color-grey-dark);
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
`

const Team = () => {
  const { data, error, loading } = useFetch('/team/all')
  const hasData = data && data.length

  return (
    <div>
      <h2>Sélectionnez votre troupe pour ce voyage :</h2>
      {hasData && (
        <ul>
          {data.map(({name, _id: id, validatedStartDate, validatedEndDate}) => {
            return <StyledItem key={id}>
              <span>{name}</span>
              {
                validatedEndDate && validatedStartDate ? (
                  <StyledValidatedDate as={Link} to={`/travel/create-travel/destination/${id}`}>
                    {formatDate(validatedStartDate)} - {formatDate(validatedEndDate)}
                  </StyledValidatedDate>
                ) : (
                  <StyledValidatedDate>
                    À définir
                  </StyledValidatedDate>
                )
              }
            </StyledItem>
          })}
        </ul>
      )}
    </div>
  );
};

export default Team;
