import type { AxiosRequestConfig, Method } from 'axios'

export type FetchParams = {
  url: string
  prefixUrl?: string
  method?: Method
  contentType?: 'json' | 'urlencoded' | 'multipart'
  data?: any
  options?: any
}

export const contentTypes = {
  json: 'application/json; charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
  multipart: 'multipart/form-data'
}

export const defaultOptions: AxiosRequestConfig = {
  withCredentials: true, // 允许把cookie传递到后台
  headers: {
    Accept: 'application/json',
    'Content-Type': contentTypes.json
  },
  timeout: 15000
}
