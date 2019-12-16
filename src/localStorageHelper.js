const keyPrefix = 'bretsShoppingCart'
export const ITEM_KEY = 'shopping-cart'

export const setItemsInLocalStorage = (itemKey, items) => {
  if (!isLocalStorageSupported()) return false
  localStorage.setItem(itemKey, JSON.stringify(items))
}

export const fetchItemsFromLocalStorage = (itemKey) => {
  if (!isLocalStorageSupported()) return null

  return JSON.parse(localStorage.getItem(itemKey))
}

export const removeItemsFromLocalStorage = (itemKey) => {
  if (!isLocalStorageSupported()) return null
  return localStorage.removeItem(itemKey)
}

const isLocalStorageSupported = () => {
  try {
    const key = `${keyPrefix}-test-local-storage`
    localStorage.setItem(key, key)
    localStorage.removeItem(key)
    return true
  } catch (e) {
    return false
  }
}