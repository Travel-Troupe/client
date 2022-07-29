import React, { useContext, useState } from 'react'
import AuthContext from '../store/contexts/AuthContext';
import { register } from '../services/Api'
import * as User from '../services/User'
import Button from './Button'
import Input from './Input'
import Label from './label'
import Logo from './Logo'
import styled from 'styled-components'
import cover from '../assets/cover-login.jpg'
import logo from '../assets/logo-tt.png'

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

const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: 70%;
`

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = React.useState('')

  const { dispatch } = useContext(AuthContext);

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const register = async (e) => {
    e.preventDefault()
    if (username && password) {
      const res = await register({ username, password })
      if (res.token) {
        await User.register({ dispatch, token: res.token })
      }
    }
  }

  return (
    <Form onSubmit={register}>
      <Logo src={logo} />
      <StyledDiv className="">
        <Label>Nom d'utilisateur</Label>
        <Input name="username" placeholder="Nom d'utilisateur" value={username} onChange={onUsernameChange} type="text"></Input>
      </StyledDiv>

      <StyledDiv>
        <Label>Mot de passe</Label>
        <Input name="password" placeholder="Mot de passe" value={password} onChange={onPasswordChange} type="password"></Input>
      </StyledDiv>

      <a className='label' href="/login">Se connecter</a>

      <Button type="submit">S'inscrire</Button>

    </Form>
  )
}


export default RegisterForm