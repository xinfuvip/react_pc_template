import { BrowserRouter } from 'react-router-dom'
import Router from '@/routers'
import AuthRouter from '@/routers/AuthRouter'

const App = () => {
  return (
    <BrowserRouter basename="/">
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  )
}

export default App
