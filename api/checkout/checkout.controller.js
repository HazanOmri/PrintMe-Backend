const stripe = require('stripe')(process.env.STRIPE_KEY)
const checkoutService = require('./checkout.service')

async function checkout(req, res) {
    try {
        console.log('Object.keys(req.body)', Object.keys(req.body))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: checkoutService.getLineItems(Object.keys(req.body)),
            success_url: `http://localhost:3000/?#/success`,
            cancel_url: `http://localhost:3000/?#/cancel`
        })
        res.json({ url: session })
    } catch (err) {
        res.status(500).json({ error: err.messege })
    }
}

module.exports = {
    checkout
}