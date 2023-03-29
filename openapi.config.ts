const { generateService } = require('@umijs/openapi')

// https://www.npmjs.com/package/@umijs/openapi

generateService({
  schemaPath: 'http://wuyuanqing.bcc-gzbh.baidu.com:8800/v3/api-docs?group=api',
  serversPath: './src',
  requestLibPath: "import {request} from '@/request'",
  projectName: 'services'
})
