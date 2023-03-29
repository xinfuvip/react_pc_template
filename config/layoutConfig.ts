import type { ProSettings } from '@ant-design/pro-layout'

/** @description layout布局配置 */

export const layoutConfig: ProSettings & {
  pwa?: boolean
  logo?: string
  siderWidth?: number
} = {
  fixSiderbar: true,
  navTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  colorWeak: true,
  fixedHeader: true,
  title: false,
  iconfontUrl: '',
  siderWidth: 208
}
