export const API_URL = 'http://localhost:4000';
export const CLIENT_ROOT_URL = 'http://localhost:3000';
export const auth={
    isAuthenticated() {
        if (typeof window == "undefined")
          return false
    
        if (sessionStorage.getItem('jwt'))
          return JSON.parse(sessionStorage.getItem('jwt'))
        else
          return false
      },
    authenticate(jwt){
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
    }
}