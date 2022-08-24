import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import useFetch from '../../hooks/useFetch'
import Text from '../../components/Text'
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

  p {
    margin: 10px 0;
    color: var(--color-white);
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

const JoinTeam = () => {
  const [state, setState] = useState('')
  const { data, error, loading, refetch } = useFetch('/team/join', {
    method: 'POST', 
    body: JSON.stringify({ slug: state })
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

  const hasData = data && data?.message

  return (
    <StyledTeam>
      <Text>Rejoindre une team</Text>
      {hasData && (
        <div>
          <p>bravo vous avez bien rejoins la team</p>
          <Button as={Link} to="/">Voir mes voyages</Button>
        </div>
      )}
      {!hasData && (
        <form onSubmit={onSubmit}>
          <Input error={error} onChange={e => setState(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <Button type="submit">Rejoindre</Button>
        </form>
      )}
    </StyledTeam>
  )
}

export default JoinTeam