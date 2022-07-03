import React, { useState } from 'react';
import Input from "../../components/Input";
import MapboxAutocomplete from "../../components/MapboxAutocomplete";
import Button from "../../components/Button";
import styled from "styled-components";

const StyledForm = styled.form``
const StyledFormContainer = styled.div``

const Destination = () => {
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
    if (!!name && !!destination) {
      console.log(name, destination)
    } else {
      console.error('please fill every values')
    }
  }

  return (
    <StyledForm onSubmit={onFormSubmit}>
      <StyledFormContainer>
        <span>Donnez un nom à votre voyage :</span>
        <Input onChange={onNameChange} />
        <span>Choisissez une destination :</span>
        <MapboxAutocomplete locationTypes={['country']} onChange={onDestinationChange}/>
      </StyledFormContainer>
      <Button type="submit">Valider</Button>
    </StyledForm>
  );
};

export default Destination;
