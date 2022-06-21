import React, { createContext, useEffect, useReducer } from "react";
import { getItem } from "../../utils/AppStorage";
import { LOGIN } from "../actions/AuthActions";
import AuthReducer from "../reducers/AuthReducer";

const getStateDefaultValue =  () => ({
  user: null, // comment me for development purposes
  // user: { name: 'vive la vie' }, // uncomment me for development puprpose
})

const AuthContext = createContext({ state: { ...getStateDefaultValue() }, dispatch: () => {} })

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { ...getStateDefaultValue(), dispatch: () => {} })

  useEffect(() => {
    (async () => {
      const userObject = await getItem('user')
      if (userObject) {
        dispatch({ action: LOGIN, payload: userObject })
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext