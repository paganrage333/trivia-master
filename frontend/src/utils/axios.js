import Axios from 'axios';
// import { ShowLoaderAction, RemoveLoaderAction } from '../modules/actions/Loader/LoaderShowAction';
// import store from '../modules/store/store';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const axios = Axios.create({
    baseURL: baseURL,
    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export const get = async (endpoint, loader = false) => {

    let config = {}
    if (cookies.get('token')) {
        config = {
            headers: {
                'authorization': "Bearer "+cookies.get('token')
            }
        }
    }

    // store && loader && store.dispatch(ShowLoaderAction(1));
    const res = await axios.get(endpoint, config);
    // store && store.dispatch(RemoveLoaderAction(1));
    if (res && res.data && res.data.authRequired) {
        cookies.remove('token');
        window.location.href = '/login';
    }
    return res.data;
};

export const post = async (endpoint, data, loader = false) => {

    let config = {}
    if (cookies.get('token')) {
        config = {
            headers: {
                'authorization': "Bearer "+cookies.get('token')
            }
        }
    }

    // store && loader && store.dispatch(ShowLoaderAction(1));
    const res = await axios.post(endpoint, data, config);
    // store && store.dispatch(RemoveLoaderAction(1));

    if (res && res.data && res.data.authRequired) {
        cookies.remove('token');
        window.location.href = '/login';
    }
    return res.data; 
};

    export const upload = (file,path,onUploadProgress) => {
      let formData = new FormData();
      // console.log(path,file)
      formData.append("file", file);
  
      return axios.post(`${baseURL}${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'authorization': "Bearer "+cookies.get('token')
        },
        onUploadProgress,
      });
    };  
   

   