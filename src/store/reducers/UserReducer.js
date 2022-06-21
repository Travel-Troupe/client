import { ADD_TRAVEL } from "../actions/UserActions"

export default function UserReducer(prevState, action) {
  switch (action.type) {
    case ADD_TRAVEL:
      return {
        ...prevState,
        travels: [...prevState.travels, action.payload]
      }
    default:
      return prevState
  }
}
