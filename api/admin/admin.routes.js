const express = require('express')
const { getOrderList } = require('./admin.controller')

const router = express.Router()

router.get('/order', getOrderList)

module.exports = router