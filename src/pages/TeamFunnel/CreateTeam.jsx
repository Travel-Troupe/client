import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Input from '../../components/Input'
import useFetch from '../../hooks/useFetch'
import styled from 'styled-components'

const StyledTeam = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }

  button {
    margin-top: 10px;
  }

  input {
    &:disabled {
      background-color: var(--color-grey);
      color: var(--color-white);
    }
  }
  `

const CreateTeam = () => {
  const [state, setState] = useState('')
  const { data, error, loading, refetch } = useFetch('/team/add', {
    method: 'POST', 
    body: JSON.stringify({ name: state })
  }, [state], false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!!state && state.length > 3) {
      try {
        await refetch()
      } catch(e) {
        console.error(e)
      }
    }
  }

  const hasData = data && data?.name

  return (
    <StyledTeam>
      <Text>Choisissez un nom</Text>
      {hasData && (
        <div>
          <Input value={data.slug} disabled />
          <Button secondary>Partager</Button>
          <br></br>
          <Button as={Link} to="/">Créer un voyage</Button>
        </div>
      )}
      {!hasData && (
        <form onSubmit={onSubmit}>
          <Input onChange={e => setState(e.target.value)} />
          <Button type="submit">Valider</Button>
        </form>
      )}
    </StyledTeam>
  )
}

export default CreateTeam