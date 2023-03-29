import Axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { message, notification } from 'antd'
import { defaultOptions, getMsgToStatus } from './config'
import { RequestResult } from '@/servers/tpying'
import { nprogress } from '@/components/NProgress'
import { useStore } from '@/store'

// 声明一个容器存储当前正在进行的请求
const requestListeners: AbortController[] = []

// 暴露一个清空容器的方法
export const clearRequestListeners = () => {
  requestListeners.length &&
    requestListeners.forEach((controller) => {
      controller.abort()
      console.log('路由跳转了取消所有请求')
    })
  requestListeners.length = 0
}

const axios = Axios.create(defaultOptions)
axios.interceptors.request.use((config) => {
  nprogress.start()
  const token = useStore.getState().token || ''
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  // 存储controller用于取消请求
  const controller = new AbortController()
  requestListeners.push(controller)
  config.signal = controller.signal
  return config
})

// response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse<RequestResult>) => {
    nprogress.done()
    const data = response.data
    if (data.code === 21000) {
      message.error('登录已过期')
      window.location.href = '/login'
    } else if (data.code !== 0) {
      message.error(response.data.message || '请求数据异常，请稍后再试')
    }
    return data
  },
  (error) => {
    nprogress.done()
    if (Axios.isCancel(error)) {
      console.log('取消请求...')
      return Promise.reject(error)
    }
    const status = error?.response?.status
    const errMsg = getMsgToStatus(status) || '服务异常'
    if (error.response && error.response.status) {
      notification.error({
        message: errMsg,
        description: error.response.data?.msg || 'Error'
      })
    }
    return Promise.reject(error)
  }
)

export const request = <T>(
  url: string,
  {
    method,
    data = {},
    params = {},
    ...options
  }: AxiosRequestConfig & { method: Method }
) => {
  return axios.request({
    url,
    method,
    data,
    params,
    ...(options || {})
  }) as Promise<T> // 因为拦截器我们过滤的一层data所以需要断言一下
}
