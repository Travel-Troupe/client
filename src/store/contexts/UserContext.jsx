import React, { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";

const getStateDefaultValue =  () => ({
  // travels: [], // comment me for development purposes
  travels: [1], // uncomment me for development purposes
})

const UserContext = createContext({ state: { ...getStateDefaultValue() }, dispatch: () => {} })

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, { ...getStateDefaultValue(), dispatch: () => {} })
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext