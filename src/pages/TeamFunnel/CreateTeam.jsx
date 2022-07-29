import React, { useRef, useState } from 'react'
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  form {
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }
  .share {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--color-green);
    border-radius: 6px;
    border: none;
    outline: none;
    color: var(--color-white);

    i {
      transform: scale(.7);
    }

    span {
      display: block;
      margin-left: 20px;
    }
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

  const input = useRef()
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

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(input.current.value);

    console.log("Copied!", navigator.clipboard);
  }

  const hasData = data && data?.name

  return (
    <StyledTeam>
      <Text>Choisissez un nom</Text>
      {hasData && (
        <div className='content'>
          <Input ref={input} value={data.slug} disabled />
          <button className='share'>
            <i class="gg-share"></i>
            <span onClick={copyToClipBoard}>Partager</span>
          </button>
          <br></br>
          <Button ternary as={Link} to="/">Suivant</Button>
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