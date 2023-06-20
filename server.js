require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)

app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const checkoutRoutes = require('./api/checkout/checkout.routes')
const authRoutes = require('./api/auth/auth.routes')


app.use('/api/checkout', checkoutRoutes)
app.use('/api/auth', authRoutes)


const storeItems = new Map([
    [1, { price: 5, name: 'one test' }],
    [2, { price: 50, name: 'ogdan a' }]
])


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
