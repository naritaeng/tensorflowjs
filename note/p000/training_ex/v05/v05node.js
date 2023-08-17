const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const path = require('path')
const port = 3000

app.use(history())
const _path = path.join(__dirname, './dist')

app.use('/', express.static(_path))

app.listen(port, console.log(`listening on ${port}`))
