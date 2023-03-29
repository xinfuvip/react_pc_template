import { getUserInfo } from '@/servers/user'
import { PageContainer } from '@ant-design/pro-layout'
import { Button } from 'antd'

const AddCase = () => {
  return (
    <PageContainer>
      <div>AddCase</div>
      <Button
        type="primary"
        onClick={() => {
          getUserInfo()
        }}
      >
        调用接口
      </Button>
    </PageContainer>
  )
}

export default AddCase
