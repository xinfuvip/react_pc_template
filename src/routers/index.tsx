import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { RouteType } from './util'
import { lazyLoad } from './util'
import Layout from '@/pages/layout'
import {
  AppstoreOutlined,
  AreaChartOutlined,
  DashboardOutlined,
  FileTextOutlined,
  FlagOutlined
} from '@ant-design/icons'
import Login from '@/pages/login'

const AddCase = lazy(() => import('@/pages/addCase'))
const CheckPoint = lazy(() => import('@/pages/checkPoint'))
const CloseCase = lazy(() => import('@/pages/closeCase'))
const Screen = lazy(() => import('@/pages/screen'))
const SiteVisualization = lazy(() => import('@/pages/siteVisualization'))
const VideoSurveillance = lazy(() => import('@/pages/videoSurveillance'))
const NoFind = lazy(() => import('@/pages/noFind'))
const NoPermission = lazy(() => import('@/pages/noPermission'))

export const routerConfig: RouteType[] = [
  {
    path: '/',
    element: <Navigate to="/addCase/index" replace />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/addCase',
        name: '立案审核',
        icon: <AppstoreOutlined />,
        children: [
          {
            path: '/addCase/index',
            element: lazyLoad(<AddCase />),
            code: 'addCase',
            name: '立案审核',
            icon: <AppstoreOutlined />
          }
        ]
      },
      {
        path: '/checkPoint',
        element: lazyLoad(<CheckPoint />),
        code: 'checkPoint',
        name: '检测点管理',
        icon: <AreaChartOutlined />
      },
      {
        path: '/closeCase',
        name: '结案审核',
        icon: <DashboardOutlined />,
        code: 'closeCase',
        children: [
          {
            path: '/closeCase/1',
            element: lazyLoad(<CloseCase />),
            name: '结案审核1'
            // code: 'closeCase1'
          },
          {
            path: '/closeCase/2',
            element: lazyLoad(<CloseCase />),
            name: '结案审核2'
            // code: 'closeCase2'
          }
        ]
      },
      {
        path: '/siteVisualization',
        element: lazyLoad(<SiteVisualization />),
        code: 'siteVisualization',
        name: '站点可视化',
        icon: <FileTextOutlined />
      },
      {
        path: '/videoSurveillance',
        element: lazyLoad(<VideoSurveillance />),
        code: 'videoSurveillance',
        name: '视频监控',
        icon: <FlagOutlined />
      },
      {
        path: '/403',
        element: lazyLoad(<NoPermission />)
      },
      {
        path: '*',
        element: lazyLoad(<NoFind />)
      }
    ]
  },
  {
    path: '/screen',
    element: lazyLoad(<Screen />),
    name: '大屏',
    icon: <FlagOutlined />
    // code: 'screen'
  },
  {
    path: '/login',
    element: <Login />
  }
]

const Router = () => {
  const routes = useRoutes(routerConfig)
  return routes
}

export default Router
