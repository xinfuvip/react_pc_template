import Permission from '@/components/Permission'
import { ReactNode, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

export type RouteOther = {
  /* 用来判断权限 为了和之前umi那种写法对齐 */
  code?: string
  name?: string
  icon?: ReactNode
  children?: RouteType[]
}

export type RouteType = RouteObject & RouteOther

/**
 *
 * @param Component 懒加载的组件
 * @returns
 */
export const lazyLoad = (Component: JSX.Element) => {
  return (
    <Permission>
      <Suspense fallback={<div>loading.......</div>}>{Component}</Suspense>
    </Permission>
  )
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const findRouteByPath = (
  path: string,
  routes: RouteType[] = []
): RouteType => {
  let result: RouteType = {}
  for (const item of routes) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      const res = findRouteByPath(path, item.children)
      if (Object.keys(res).length) {
        result = res
      }
    }
  }
  return result
}
