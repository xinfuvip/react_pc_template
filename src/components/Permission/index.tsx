import { PropsWithChildren, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Result } from 'antd'
import { findRouteByPath } from '@/routers/util'
import { routerConfig } from '@/routers'
import { useStore } from '@/store'

const Permission: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const { userInfo, loading } = useStore()
  const location = useLocation()
  const routeItem = findRouteByPath(location.pathname, routerConfig)

  // 防止用户信息加载时候先展示403
  // if (loading) {
  //   console.log(111)

  //   return <></>
  // }
  if (!routeItem.code || userInfo?.routerList?.includes(routeItem.code)) {
    return <>{children}</>
  }

  return <Result status="403" title="暂无权限访问" />
}

export default Permission
