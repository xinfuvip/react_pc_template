const { generateService } = require('@umijs/openapi')

// https://www.npmjs.com/package/@umijs/openapi

generateService({
  schemaPath: '',
  serversPath: './src',
  requestLibPath: "import {request} from '@/request'",
  projectName: 'services'
})
