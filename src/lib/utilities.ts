export function localStorageBoolean(value: string) {
  return window.localStorage.getItem(value) === 'true'
}
