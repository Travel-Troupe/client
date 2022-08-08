import React, { useState } from 'react'
import { register } from '../services/Api'
import Button from './Button'
import Input from './Input'
import Label from './label'
import Logo from './Logo'
import styled, { css } from 'styled-components'
import cover from '../assets/cover-login.jpg'
import logo from '../assets/logo-tt.png'
import { Link, useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: no-repeat url(${cover}) center center;
  background-size: cover;

  .label {
    color: white;
    font-size: 14px;
    margin-bottom: 15px;
  }
`

export const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: 70%;

  ${({error}) => error && css`
    padding: 8px;
    color: white;
    border-radius: 3px;
    background-color: red;
  `}
`

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (username && password) {
      const res = await register({ username, password })
      if (res.name) {
        navigate('/?accountCreated=true')
      } else if (res.error) {
        setError(res.error.toString())
      }
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Logo src={logo} />
      {error && <StyledDiv error={error}>{error}</StyledDiv>}
      <StyledDiv className="">
        <Label>Nom d'utilisateur</Label>
        <Input name="username" placeholder="Nom d'utilisateur" value={username} onChange={onUsernameChange} type="text"></Input>
      </StyledDiv>

      <StyledDiv>
        <Label>Mot de passe</Label>
        <Input name="password" placeholder="Mot de passe" value={password} onChange={onPasswordChange} type="password"></Input>
      </StyledDiv>


      <Link className='label' to="/">Se connecter</Link>


      <Button type="submit">S'inscrire</Button>

    </Form>
  )
}


export default RegisterForm