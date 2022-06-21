import React, { useContext, useState } from 'react'
import AuthContext from '../store/contexts/AuthContext';
import { login } from '../services/Api'
import * as User from '../services/User'


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
    <form onSubmit={logIn}>
      <input name="username" value={username} onChange={onUsernameChange} type="text" />
      <input name="password" value={password} onChange={onPasswordChange} type="password" />
      <button type="submit">ok</button>

    </form>
  )
}

export default LoginForm