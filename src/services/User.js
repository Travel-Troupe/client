import jwtDecode from "jwt-decode";
import { LOGIN, LOGOUT } from "../store/actions/AuthActions";
import { setItem } from "../utils/AppStorage";

/**
 * Login
 * @param {Object} payload 
 * @param {React.Dispatch} payload.dispatch 
 * @param {string} payload.token 
 */
export const login = async ({ dispatch, token }) => {
  const user = jwtDecode(token)
  await setItem('user', user)
  await setItem('token', token)
  return dispatch({ type: LOGIN, payload: user })
}

/**
 * @param {Object} payload 
 * @param {React.Dispatch} payload.dispatch
 */
export const logout = async ({ dispatch }) => {
  await setItem('user', null)
  await setItem('token', null)
  return dispatch({ type: LOGOUT })
}