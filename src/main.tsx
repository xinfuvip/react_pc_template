import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './global.less'
import App from './App'

import 'virtual:uno.css'
import 'virtual:unocss-devtools'

const queryClient = new QueryClient()
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
