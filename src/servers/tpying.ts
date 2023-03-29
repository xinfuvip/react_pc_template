export interface Login {
  username: string
  password: string
}

export interface LoginResult {
  code: number
  message: string
  data: {
    token: string
  }
}

export interface UserInfo {
  code: number
  message: string
  data: {
    userInfo: {
      name?: string
      age?: number
      routerList?: string[]
      avatar?: string
    }
  }
}
