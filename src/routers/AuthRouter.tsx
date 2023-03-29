import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '@/store'
import { clearRequestListeners } from '@/request'

const AuthRouter: FC<PropsWithChildren> = (props) => {
  const { token } = useStore()
  const location = useLocation()
  // 切换路由清空当前进行的请求
  clearRequestListeners()
  if (!token && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  return <>{props.children}</>
}

export default AuthRouter
