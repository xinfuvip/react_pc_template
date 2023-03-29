import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import React from 'react'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.module.less'
import { useStore } from '@/store'
import headerImg from '@/assets/imgs/avatar.png'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { userInfo, clearStore } = useStore()
  const concatUserInfo = userInfo || {}

  const loginOut = async () => {
    try {
      clearStore()
    } catch (err) {
      console.log(new Error(JSON.stringify(err)))
    }
  }

  const onMenuClick = (event: any) => {
    const { key } = event
    if (key === 'logout') {
      loginOut()
      return
    }
  }

  const menuItems: ItemType[] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    },
    {
      key: 'person',
      icon: <UserOutlined />,
      label: '个人中心'
    }
  ]

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  )

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={concatUserInfo.avatar || headerImg}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>
          {concatUserInfo.name || ''}
        </span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
