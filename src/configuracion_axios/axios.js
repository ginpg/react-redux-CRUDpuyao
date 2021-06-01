import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: 'https://sgp-api-stg.shokworks.io/',
  headers:{Authorization:`Bearer ${localStorage.getItem('access_token')}`}
})

export default clienteAxios