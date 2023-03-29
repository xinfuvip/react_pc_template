import { request } from '@/request'
import type { Login, UserInfo, LoginResult } from './tpying'
import { useStore } from '@/store'

export const getUserInfo = async () => {
  const token = useStore.getState().token || ''

  return await request<UserInfo>('/getUserInfo', {
    method: 'GET',
    params: { token }
  })
}

export const login = async (values: Login) => {
  return await request<LoginResult>('/login', {
    method: 'POST',
    data: { ...values }
  })
}
