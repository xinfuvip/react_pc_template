import create from 'zustand'
// 调用redux的浏览器插件
import { devtools, persist } from 'zustand/middleware'
import { GlobalProps, globalStore } from './globalStore'

export const useStore = create<GlobalProps>()(
  persist(
    devtools((...arg) => ({
      ...globalStore(...arg)
    })),
    {
      name: 'userInfo'
    }
  )
)
