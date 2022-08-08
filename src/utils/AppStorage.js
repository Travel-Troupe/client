export const setItem = (key, value) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value))
  } catch(e) {
    console.error('an error occured :(', e?.message)
  }
}

export const getItem = (key) => {
  try {
    const value = window.localStorage.getItem(key)
    if(value !== null) {
      return JSON.parse(value)
    }
  } catch(e) {
    console.error('an error occured :(', e?.message)
  }
}
