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

const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: 70%;
`

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = React.useState('')

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (username && password) {
      const res = await register({ username, password })
      if (res.name) {
        navigate('/?accountCreated=true')
      } else if (res.error) {

      }
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Logo src={logo} />
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