import { MockMethod } from 'vite-plugin-mock'

const adminRouterList = [
  'addCase',
  'checkPoint',
  'closeCase',
  'siteVisualization',
  'videoSurveillance',
  'screen'
]
const userRouterList = ['addCase', 'checkPoint', 'screen']

const noLoginRes = {
  code: 21000,
  data: null
}

export default [
  {
    url: '/getUserInfo',
    method: 'get',
    timeout: 300,
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return {
          ...noLoginRes
        }
      }
      if (query.token && query.token === 'admin') {
        return {
          code: 0,
          data: {
            userInfo: {
              name: 'admin',
              age: 12,
              routerList: adminRouterList
            }
          }
        }
      }
      return {
        code: 0,
        data: {
          userInfo: {
            name: 'user',
            age: 12,
            routerList: userRouterList
          }
        }
      }
    }
  },
  {
    url: '/login', // 注意，这里只能是string格式
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      let token = ''
      if (body.username === 'admin') {
        token = 'admin'
      } else {
        token = 'user'
      }
      return {
        code: 0,
        data: {
          messsage: '登录成功',
          token
        }
      }
    }
  }
] as MockMethod[]
