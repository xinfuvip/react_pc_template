import Axios, { AxiosResponse } from 'axios'
import { notification } from 'antd'
import qs from 'qs'
import { contentTypes, defaultOptions, FetchParams } from './constant'
import { RequestResult } from '@/servers/tpying'

const axios = Axios.create(defaultOptions)

axios.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse<RequestResult>) => {
    const data = response.data

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data.message || response.statusText || 'Error'
    })

    if (response.status === 401) {
      window.location.href = '/login'
    }

    return data
  },
  (error) => {
    console.log('err:', error, error.response) // for debug
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          window.location.href = '/login'

          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          window.location.href = '/login'
          break
        // 404请求不存在
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || 'Error'
          })
          break
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || 'Error'
          })
          break
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || 'Error'
          })
      }
    }

    // throw new Error(error);
    return Promise.reject(error)
  }
)

export const fetchApi = <T>({
  url,
  prefixUrl = 'api',
  method = 'get',
  contentType = 'json', // json || urlencoded || multipart
  data = {},
  options = {}
}: FetchParams) => {
  if (!url) {
    const error = new Error('请传入url')
    return Promise.reject(error)
  }
  const fullUrl = `/${prefixUrl}${url}`

  const newOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      'Content-Type':
        (options.headers && options.headers['Content-Type']) ||
        contentTypes[contentType]
    },
    method
  }
  if (method === 'get') {
    newOptions.params = data
  }

  if (method !== 'get' && method !== 'head') {
    newOptions.data = data
    if (data instanceof FormData) {
      newOptions.headers = {
        'x-requested-with': 'XMLHttpRequest',
        'cache-control': 'no-cache'
      }
    } else if (newOptions.headers['Content-Type'] === contentTypes.urlencoded) {
      newOptions.data = qs.stringify(data)
    } else {
      Object.keys(data).forEach((item) => {
        if (
          data[item] === null ||
          data[item] === undefined ||
          data[item] === ''
        ) {
          delete data[item]
        }
      })
    }
  }
  return axios({
    url: fullUrl,
    ...newOptions
  }) as unknown as Promise<RequestResult<T>>
}
