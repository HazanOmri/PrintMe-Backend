const express = require('express')
const { checkout } = require('./controller')

const router = express.Router()

router.post('/', checkout)

module.exports = router