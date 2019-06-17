import axios from 'axios';
import { notification } from 'antd';

const newAxios = axios.create({
  baseURL: `http://localhost:4200/api`,
})

newAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  notification.open({
    message: 'cos',
    description: `${error}`
  });
})

newAxios.interceptors.response.use(function (response) {
  // Do something with response data

  return response;
}, function (error) {
  // Do something with response error
  const {response} = error;

  if(response.status >= 500){
    notification.error({
      message: `Nieobsługiwany błąd o kodzie : ${response.status}`,
      description: `${response.data.msg}`
    });
  } else  if(response.status >= 400){
    notification.error({
      message: `Błąd o statusie: ${response.status}`,
      description: `${response.data.msg}`
    });
  }
   else {
    notification.warn({
      message: `Odpowiedź o statusie : ${response.status}`,
      description: `${response.statusText}`
    });
  }
  

});;

export default newAxios;