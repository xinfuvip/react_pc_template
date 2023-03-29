import type { AxiosRequestConfig } from 'axios'

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

export const getMsgToStatus = (status: number) => {
  const msgMap = new Map([
    [400, '错误请求'],
    [401, '请求未授权'],
    [404, '请求路径错误'],
    [405, '请求方法不允许'],
    [500, '服务器异常']
  ])
  return msgMap.get(status)
}
