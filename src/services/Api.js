import { API_URL } from "../utils/constants";
import {getItem} from "../utils/AppStorage";

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

export const createTravel = async ({ teamId, name, startDate, locationPoi }) => {
  try {
    if (teamId && name && startDate && locationPoi) {
      console.log('requesting', `${API_URL}/travel/add`)
      const token = (await getItem('token')) || ''
      const req = await fetch(`${API_URL}/travel/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, teamId, startDate, locationPoi })
      })
      const res = await req.json()

      return res
    }
    throw new Error('please provide valid params')
  } catch(e) {
    console.error(e)
    return { error: e.message }
  }
}

export const addStep = async ({ travelId, name, description = '', startDate, address }) => {
  try {
    if (travelId && name && startDate && address) {
      console.log('requesting', `${API_URL}/travel/newStep`)
      const token = (await getItem('token')) || ''
      const req = await fetch(`${API_URL}/travel/newStep`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, travelId, startDate, address, description })
      })
      const res = await req.json()

      return res
    }
    console.log(teamId)
    throw new Error('please provide valid params')
  } catch(e) {
    console.error(e)
    return { error: e.message }
  }
}
