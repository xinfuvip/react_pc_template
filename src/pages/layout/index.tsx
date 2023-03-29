import { routerConfig } from '@/routers'
import type { RouteType } from '@/routers/util'
import { useStore } from '@/store'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ProLayout from '@ant-design/pro-layout'
import { layoutConfig } from '../../../config/layoutConfig'
import LoginImg from '/logo.png'
import RightContent from '@/components/RightContent'
import { useLayoutEffect } from 'react'

const Layout = () => {
  const { userInfo, token } = useStore()
  const routerList = userInfo?.routerList
  const location = useLocation()
  const navigate = useNavigate()
  // 1 过滤掉 path='/' && !children
  // 2 将 path='/' && children 中chidlren提升
  // 3 根据权限筛选路由
  // 4 如果父级路由没权限，子级路由也将没有权限
  // 5 如果父级路由权限，但是子级路由都没有权限 父级菜单将不展示
  const menuHandle = (routeList: RouteType[]) => {
    const fliterRouteList: RouteType[] = []
    routeList.forEach((routeItem) => {
      if (routeItem.path === '/' && !routeItem.children?.length) {
        return
      } else if (routeItem.path === '/' && routeItem.children?.length) {
        fliterRouteList.push(...routeItem.children)
      } else {
        fliterRouteList.push(routeItem)
      }
    })
    const menuList: RouteType[] = []
    fliterRouteList.forEach((routeItem) => {
      if (routeItem.code) {
        if (routerList?.includes(routeItem.code)) {
          menuList.push(routeItem)
        }
      } else if (routeItem.children?.length) {
        menuList.push({
          ...routeItem,
          children: menuHandle(routeItem.children)
        })
      } else {
        menuList.push(routeItem)
      }
    })
    return menuList
  }

  // 有些chidlren可能为[] 需要过滤掉 否则菜单会展示父级却无子级
  const filterMenuList = (routeList: RouteType[]) => {
    const menuList: RouteType[] = []
    routeList.forEach((routeItem) => {
      if (routeItem.children?.length) {
        menuList.push({
          ...routeItem,
          children: filterMenuList(routeItem.children)
        })
      } else if (!routeItem.children) {
        menuList.push(routeItem)
      }
    })
    return menuList
  }

  const requestUserInfo = async () => {
    await useStore.getState().requestUserInfo()
  }

  useLayoutEffect(() => {
    requestUserInfo()
  }, [])

  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      {!userInfo || !token ? (
        <></>
      ) : (
        <ProLayout
          {...layoutConfig}
          menuItemRender={(item, dom) => (
            <a
              onClick={() => {
                if (location.pathname !== item.path) {
                  navigate(item.path || '/')
                }
              }}
            >
              {dom}
            </a>
          )}
          disableContentMargin={true}
          route={{
            routes: filterMenuList(menuHandle(routerConfig))
          }}
          menu={{
            loading: false
          }}
          logo={LoginImg}
          rightContentRender={() => <RightContent />}
          contentStyle={{
            margin: 16
          }}
        >
          <Outlet />
        </ProLayout>
      )}
    </div>
  )
}

export default Layout
