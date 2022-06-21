import { API_URL } from "../utils/constants";

export const login = async ({ username, password }) => {
  try {
    if (username && password) {
      console.log('requesting', `${API_URL}/login`)
      const req = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username, password })
      })
      const res = await req.json()

      return res
    }
    throw new Error('please provide a valid username and password')
  } catch(e) {
    console.error(e)
    return { error: e.message }
  }
}