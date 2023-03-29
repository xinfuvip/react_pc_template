import { Form, Button, Input, message } from 'antd'
import { useStore } from '@/store'
import styles from './style.module.less'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { saveToken } = useStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const res = await saveToken(values)
      if (res.code === 0) {
        message.success('登录成功', 0.3, () => navigate('/', { replace: true }))
      } else {
        message.success('登录失败')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBox}>
        <header>欢迎登录 统一个人管理平台</header>
        <main>
          <Form wrapperCol={{ span: 24 }} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input placeholder="用户名: admin / user" allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码: 123456" allowClear />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </main>
      </div>
    </div>
  )
}

export default Login
