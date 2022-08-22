import React, { useState } from 'react';
import Input from "../../components/Input";
import MapboxAutocomplete from "../../components/MapboxAutocomplete";
import Button from "../../components/Button";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import {createTravel} from "../../services/Api";
import AppHeader from "../../components/AppHeader"

const StyledForm = styled.form`
.btn {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 120px;
}`
const StyledFormContainer = styled.div`
  margin-top: 20px;

  .label {
    color: var(--color-white);
    display: block;
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
  }
`

const Destination = () => {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const { data, error, loading } = useFetch(`/team/${teamId}`)

  const [destination, setDestination] = useState();
  const [name, setName] = useState('')

  /**
   *
   * @param e {{ label: string; value: string; }}
   */
  const onDestinationChange = (e) => {
    setDestination(e)
  }

  /**
   * onNameChange
   * @param e {React.FormEvent<HTMLInputElement>}
   */
  const onNameChange = (e) => setName(e.target.value)

  /**
   * onFormSubmit
   * @param e {React.SyntheticEvent}
   */
  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (
      !!name &&
      !!destination &&
      destination.locationPoi &&
      data &&
      data.validatedStartDate
    ) {
      try {
        const { _id: id } = await createTravel({
          teamId,
          name,
          locationPoi: destination.locationPoi,
          startDate: data.validatedStartDate,
        });
        navigate(`/travel/${id}`, {replace: true})
      } catch(e) {
        // handle error in the front
        throw new Error(e.message)
      }
    } else {
      console.error('please fill every values')
    }
  }

  const hasData = data && data._id


  return (
    hasData && (
      <StyledForm onSubmit={onFormSubmit}>
        <AppHeader title="Mon voyage" subtitle=""/>
        <StyledFormContainer>
          <span className='label'>Donnez un nom à votre voyage :</span>
          <Input onChange={onNameChange}/>
          <span className='label'>Choisissez une destination :</span>
          <MapboxAutocomplete onChange={onDestinationChange}/>
        </StyledFormContainer>
        <Button className='btn' type="submit">Valider</Button>
      </StyledForm>
    )
  );
};

export default Destination;
