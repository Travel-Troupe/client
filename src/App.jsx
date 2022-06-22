import { useContext, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import AppNavigation from './AppNavigation'
import { LOGIN } from './store/actions/AuthActions'
import AuthContext from './store/contexts/AuthContext'
import { getItem } from './utils/AppStorage'

function App() {
  const { state, dispatch } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      const user = await getItem('user')
      if (user) {
        dispatch({ type: LOGIN, payload: user })
      }
    })()
  }, [])



  const isLogged = !!(state.user)

  // if (isLogged && !hasTravels) {
  //   return <TravelTunnel />
  // }

  return isLogged ? <AppNavigation /> : <LoginForm />
}

export default App
