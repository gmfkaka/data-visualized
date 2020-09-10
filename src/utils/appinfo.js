export const getPlatId = () => {
  let pathname = window.location.pathname
  let match = pathname.split('/')
  return match[1]
}
