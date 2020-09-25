import axios from "axios";

export const http = {
  get,
  post,
  postFile,
  del,
  put
};

// export function authHeader() {
//   // return authorization header with jwt token
//   const currentUser = localStorage.getItem('user');
//   if (currentUser && currentUser.token) {
//     return { Authorization: `Bearer ${currentUser.token}` };
//   } else {
//     return {};
//   }
// }

const user = localStorage.getItem('user');                    
const temporaryToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IldlYkFwaS5FbnRpdGllcy5Pd25lciIsIm5iZiI6MTYwMTAzNjAwOSwiZXhwIjoxNjAxNjQwODA5LCJpYXQiOjE2MDEwMzYwMDl9.zffsldm8P_R_hiCu_PfwG3pPu6YEEKdPIuiZY9IP9y4w";


const config = {
  headers: { Authorization: `Bearer ${temporaryToken}` }
};
// function get(url) {
//   return axios.get(url, config).then((response) => {
//     return handleResponseError(response);
//   });
// }

function get(url) {
  return axios.get(url, config).then((response) => {
    return handleResponseError(response);
  });
}

function post(url, body) {
  return axios.post(url, body, config).then((response) => {
    return handleResponseError(response);
  });
}

function postFile(url, body) {
  return axios.post(url, body).then((response) => {
    return handleResponseError(response);
  });
}

function del(url, body) {
  return axios.delete(url, body).then((response) => {
    return handleResponseError(response);
  });
}

function put(url, body) {
  return axios.put(url, body).then((response) => {
    return handleResponseError(response);
  });
}



async function handleResponseError(response) {

  if (response.ok || response.status === 200 || response.status === 201) {
    if (response.status === 204) {
      return response;
    }
    return response.data;
  }

  if (response.status === 409)
    throw ("The data was modified in the meantime. Please refresh the page.");

  if (response.status === 401) {
    throw ("Unathorized");
  }

  if (response.status === 400) {
    let error = await response.json();
    throw error;
  }
}

