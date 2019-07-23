import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/225750' : ''
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({},config.data,{
    // window.localStorage.getItem('authTokken')
    authToken:'authToken'
  })
  return config
})

service.interceptors.response.use((response)=>{
  if (response.data.code == 200) {
    return response.data.data
  } else {
    //catch error
  }
})

export const getArticles = (offset=0,limited=10) => {
  return service.post('/api/v1/articleList',{offset,limited})
}