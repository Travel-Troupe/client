import React, { useContext, useState } from 'react'
import AuthContext from '../store/contexts/AuthContext';
import { login } from '../services/Api'
import * as User from '../services/User'
import Button from './Button'
import Input from './Input'
import Label from './label'
import Logo from './Logo'
import styled from 'styled-components'
import cover from '../assets/cover.jpg'
import logo from '../assets/logo-tt.png'
import { Link, useSearchParams } from 'react-router-dom'
import Text from './Text';
import { StyledDiv } from './RegisterForm';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: no-repeat url(${cover}) center center;
  background-size: cover;

  .label, .valid-text {
    color: white;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }

  .valid-text {
    margin-top: 20px;
    width: 70%;
  }
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = React.useState('')

  
  const { dispatch } = useContext(AuthContext);
  
  const [searchParams] = useSearchParams();
  const [accountCreated] = useState(searchParams.get('accountCreated') === "true")
  const [error, setError] = useState(null)

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const logIn = async (e) => {
    e.preventDefault()
    if (username && password) {
      const res = await login({ username: username.trim(), password })
      if (res.token) {
        await User.login({ dispatch, token: res.token })
      } else if (res.error) {
        setError(res.error)
      } else {
        setError('An error occured, please try again later')
      }
    }
  }

  return (
    <Form onSubmit={logIn}>
      <Logo src={logo} />
      {accountCreated && <Text className='valid-text'>Votre compte a bien été crée, vous pouvez désormais vous connecter</Text>}
      {error && <StyledDiv error={error}>{error}</StyledDiv>}
      <StyledDiv>
        <Label>Nom d'utilisateur</Label>
        <Input name="username" placeholder="Nom d'utilisateur" value={username} onChange={onUsernameChange} type="text"></Input>
      </StyledDiv>

      <StyledDiv>
        <Label>Mot de passe</Label>
        <Input name="password" placeholder="Mot de passe" value={password} onChange={onPasswordChange} type="password"></Input>
      </StyledDiv>

      <Link className='label' to="/register">S'inscrire</Link>

      <Button type="submit">Connexion</Button>

    </Form>
  )
}


export default LoginForm