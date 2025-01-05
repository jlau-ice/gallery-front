import { generateService } from '@umijs/openapi'

void generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://localhost:8099/api/v2/api-docs',
  serversPath: './src',
})
