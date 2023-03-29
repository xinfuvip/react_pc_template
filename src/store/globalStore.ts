/**
 * @description 存放全局共用的数据
 */

import type { Login, UserInfo } from '@/servers/tpying'
import { getUserInfo, login } from '@/servers/user'
import type { StateCreator } from 'zustand'

export interface GlobalProps {
  userInfo?: {
    name?: string
    age?: number
    routerList?: string[]
    avatar?: string
  }
  loading?: boolean
  token?: string
  requestUserInfo: () => Promise<UserInfo>
  saveToken: (values: Login) => Promise<any>
  clearStore: () => void
}

export const globalStore: StateCreator<
  GlobalProps,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  GlobalProps
> = (set) => ({
  loading: false,
  // 异步修改用户信息方法
  requestUserInfo: async () => {
    set({ loading: true })
    const res = await getUserInfo()
    set({ userInfo: res?.data?.userInfo, loading: false })
    return res
  },
  // 登录成功存储token
  saveToken: async (values: Login) => {
    const res = await login(values)
    set({ token: res.data.token })
    return res
  },
  // 清空store
  clearStore: () => {
    set({ userInfo: undefined, token: undefined })
  }
})
