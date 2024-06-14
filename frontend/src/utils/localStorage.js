export const getFromLocalStorage = key => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`)
    return null
  }
}

export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`)
  }
}

export const removeFromLocalStorage = key => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`)
  }
}

export const resetLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`)
  }
}
