import React, { useContext, useState } from 'react'
import AuthContext from '../store/contexts/AuthContext';
import { login } from '../services/Api'
import * as User from '../services/User'
import Button from './Button'
import Input from './Input'
import Label from './label'
import Image from './Image'
import Logo from './Logo'
import styled from 'styled-components'


const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const StyledDiv = styled.div`
  margin-bottom: 20px;
  width: 70%;
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = React.useState('')

  const { dispatch } = useContext(AuthContext);

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const logIn = async (e) => {
    e.preventDefault()
    if (username && password) {
      const res = await login({ username, password })
      if (res.token) {
        await User.login({ dispatch, token: res.token })
      }
    }
  }

  return (
    <Form onSubmit={logIn}>
      <Image src={"./assets/cover-login.jpg"}></Image>

      <Logo src={"./assets/logo-tt.png"}></Logo>
      <StyledDiv className="">
        <Label>Nom d'utilisateur</Label>
        <Input name="username" placeholder="Nom d'utilisateur" value={username} onChange={onUsernameChange} type="text"></Input>
      </StyledDiv>

      <StyledDiv>
        <Label>Mot de passe</Label>
        <Input name="password" placeholder="Mot de passe" value={password} onChange={onPasswordChange} type="password"></Input>
      </StyledDiv>

      <Button type="submit">Connexion</Button>

    </Form>
  )
}


export default LoginForm