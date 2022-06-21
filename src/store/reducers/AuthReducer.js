import { LOGIN, LOGOUT } from "../actions/AuthActions"

export default function AuthReducer(prevState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...prevState,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...prevState,
        user: null
      }
    default:
      return prevState
  }
}