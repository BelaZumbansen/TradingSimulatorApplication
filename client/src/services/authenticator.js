import axios from 'axios';

export const isLoggedIn = () => {

  axios.get('/api/auth/persistentLogin',
  {
    withCredentials: true,
  })
    .then((response) => {
      if (response.status === 200) {
        
        console.log('User logged in.');
        localStorage.setItem('user', response.data);
        return true;
      } else if (response.status === 401) {

        console.log('Access token expired or nonexistent.');
        
        if (attemptRefresh(true)) {
          console.log('User Logged in.');
          return true;
        }
      } else {

        console.log('Unforeseen problem occured.');
        localStorage.clear();
        return true;
      }
    }, (err) => {
      console.log(err);
      localStorage.clear();
      return false;
    });
}

export const attemptRefresh = (updateUser) => {

  axios.get('/api/auth/refresh',
  {
    withCredentials: true,
  })
    .then((response) => {

      // Refresh token valid and not expired
      // Cookies are updated
      if (response.status === 200) {
        
        if (updateUser) {
          localStorage.setItem('user', response.data);
        }
        return true;
      }
      else if (response.status === 401) {
        console.log('Entirely logged out.');
        return false;
      } else {
        console.log('Unforeseen error encountered.');
        localStorage.clear();
        return false;
      }
    }, (err) => {
      console.log(err);
      localStorage.clear();
      return false;
    }); 
}