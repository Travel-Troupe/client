export const setItem = async (key, value) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value))
  } catch(e) {
    console.error('an error occured :(', e?.message)
  }
}

export const getItem = async (key) => {
  try {
    const value = await window.localStorage.getItem(key)
    if(value !== null) {
      return JSON.parse(value)
    }
  } catch(e) {
    console.error('an error occured :(', e?.message)
  }
}
