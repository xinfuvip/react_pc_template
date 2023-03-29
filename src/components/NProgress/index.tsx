import nprogress from 'nprogress'
import { Component } from 'react'

nprogress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3
})

export { nprogress }

export default class Nprogress extends Component {
  constructor(props: any) {
    super(props)
    nprogress.start()
  }
  componentDidMount() {
    nprogress.done()
  }
  render() {
    return <></>
  }
}
