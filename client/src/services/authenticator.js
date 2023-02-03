import axios from 'axios';

export const loggedIn = async () => {
  
  const response = await isLoggedIn();

  if (
    ! response || 
    !(response instanceof Response)) {
    
    localStorage.clear();
    return false;
  }

  if (response.status === 200) {
    localStorage.setItem('user', response.data);
    return true;
  } else {
    localStorage.clear();
    return false;
  }
}

export const isLoggedIn = async () => {

  return await axios.get('/api/auth/persistentLogin',
  {
    withCredentials: true,
  })
    .then(async (response) => {
      if (response.status === 200) {
        return response;
      } else if (response.status === 401) {

        console.log('Access token expired or nonexistent.');
        
        const res = await attemptRefresh();
        return res;
      } else {
        console.log('Unforeseen problem occured.');
      }
      return response;
    }, (err) => {
      console.log(err);
      return err
    });
}

const attemptRefresh = async () => {

  axios.get('/api/auth/refresh',
  {
    withCredentials: true,
  })
    .then((response) => {

      // Refresh token valid and not expired
      // Cookies are updated
      if (response.status === 200) {
        return response;
      }
      else if (response.status === 401) {
        console.log('Entirely logged out.');
      } else {
        console.log('Unforeseen error encountered.');
      }
      return response;
    }, (err) => {
      console.log(err);
      return null;
    }); 
}