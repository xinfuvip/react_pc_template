import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import { viteMockServe } from 'vite-plugin-mock'
import theme from './config/theme'

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      tsconfigPaths(),
      Unocss({}),
      react(),
      viteMockServe({
        mockPath: './mock',
        localEnabled: true
      }),
      createStyleImportPlugin({
        resolves: [AntdResolve()],
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style`
            }
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: { ...theme }
        }
      }
    },
    resolve: {
      alias: [
        // 解决引入ProComponents报错
        {
          find: /^~/,
          replacement: ''
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    server: {
      open: true,
      host: '0.0.0.0'
      // proxy: {
      //   // with options
      //   '/api': {
      //     target: loadEnv(mode, process.cwd()).VITE_TARGET,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    }
  })
}
