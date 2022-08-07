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

export const register = async ({ username, password }) => {
  try {
    if (username && password) {
      console.log('requesting', `${API_URL}/register`)
      const req = await fetch(`${API_URL}/register`, {
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
        body: JSON.stringify({ name, travelId, startDate, address, description }
        )
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

export const proposeDate = async ({ teamId, startDate, endDate}) => {
  try {
    if (teamId && endDate && startDate) {
      console.log('requesting', `${API_URL}/team/propose`)
      const token = (await getItem('token')) || ''
      const req = await fetch(`${API_URL}/team/propose`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId, startDate, endDate })
      })
      const res = await req.json()

      return res
    }
    console.log(teamId)
    throw new Error('please provide valid params')
  } catch(e) {
    console.log("erreur coté api")
    console.error(e)
    return { error: e.message }
  }
}

export const voteForDate = async ({ teamId, proposalId}) => {
  try {
    if (teamId && proposalId) {
      console.log('requesting', `${API_URL}/team/vote`)
      const token = (await getItem('token')) || ''
      const req = await fetch(`${API_URL}/team/vote`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId, proposalId })
      })
      const res = await req.json()

      return res
    }
    console.log(teamId)
    throw new Error('please provide valid params')
  } catch(e) {
    console.log("erreur coté api")
    console.error(e)
    return { error: e.message }
  }
}

export const validDate = async ({ teamId, startDate, endDate}) => {
  try {
    if (teamId && startDate && endDate) {
      console.log('requesting', `${API_URL}/team/dates/valid`)
      const token = (await getItem('token')) || ''
      const req = await fetch(`${API_URL}/team/dates/valid`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId, startDate, endDate})
      })
      const res = await req.json()

      return res
    }
    console.log(teamId)
    throw new Error('please provide valid params')
  } catch(e) {
    console.log("erreur coté api")
    console.error(e)
    return { error: e.message }
  }
}
