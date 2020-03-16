//const https = require('https')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001;

const getData = require('./routes/getData')

// test
app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.use(getData)
app.listen(port, () => console.log(`app listening on port ${port}!`))

