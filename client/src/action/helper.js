export const API_URL = 'http://localhost:4000';
export const CLIENT_ROOT_URL = 'http://localhost:3000';
export const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  getAvatar() {
    if (typeof window == "undefined")
      return false
    if (sessionStorage.getItem('avatar'))
      return JSON.parse(sessionStorage.getItem('avatar'))
    else
      return false
  },
  getName() {
    if (typeof window == "undefined")
      return false
    if (sessionStorage.getItem('name'))
      return JSON.parse(sessionStorage.getItem('name'))
    else
      return false
  },
  setAvatar(avatar) {
    sessionStorage.setItem('avatar', JSON.stringify(avatar));
  },
  authenticate(jwt) {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
    if(jwt.user.avatar){
      sessionStorage.setItem('avatar', JSON.stringify(jwt.user.avatar));
    }
    if(jwt.user.name){
      sessionStorage.setItem('name', JSON.stringify(jwt.user.name));
    }
  }
}