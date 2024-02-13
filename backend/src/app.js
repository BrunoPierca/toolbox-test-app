const express = require('express')
const filesRouter = require('./routes/files.js')
const docsRouter = require('./routes/docs.js')
const cors = require('cors')

const app = express()

app.use(cors())

const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.use('/files', filesRouter)

app.use('/docs', docsRouter)

module.exports = app
