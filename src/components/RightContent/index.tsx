import imgEnter from '@/assets/imgs/rukouIcon.svg'
import { Button, Space } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from './AvatarDropdown'
import styles from './index.module.less'
export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: FC = () => {
  const className = styles.right
  const navigate = useNavigate()

  return (
    <Space className={className}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button className={styles.btn} onClick={() => navigate('/screen')}>
          <img src={imgEnter} alt="" />
          <span>进入大屏界面</span>
        </Button>
        <Avatar />
      </div>
    </Space>
  )
}

export default GlobalHeaderRight
