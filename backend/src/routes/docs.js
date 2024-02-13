const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerData = require('../config/swagger.json')

const router = Router()

router.use('/', swaggerUi.serve)

router.get('/', swaggerUi.setup(swaggerData))

module.exports = router
