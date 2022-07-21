import React, { useState } from 'react';
import Input from "../../components/Input";
import MapboxAutocomplete from "../../components/MapboxAutocomplete";
import Button from "../../components/Button";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import {createTravel} from "../../services/Api";


const StyledForm = styled.form``
const StyledFormContainer = styled.div``

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
        <StyledFormContainer>
          <span>Donnez un nom à votre voyage :</span>
          <Input onChange={onNameChange}/>
          <span>Choisissez une destination :</span>
          <MapboxAutocomplete locationTypes={['country']} onChange={onDestinationChange}/>
        </StyledFormContainer>
        <Button type="submit">Valider</Button>
      </StyledForm>
    )
  );
};

export default Destination;
