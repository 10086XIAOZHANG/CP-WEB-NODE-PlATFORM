import axios from 'axios'

const $http = axios.create({
  baseURL: "",
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // withCredentials: true,
  responseType: 'json', // default
  timeout: 30000
})

$http.interceptors.request.use(config => {
  // console.log('$http', config)
  return config
}, error => {
  return Promise.reject(error)
})

$http.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  return Promise.reject(error.response)
})

export default $http