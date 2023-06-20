const stripe = require('stripe')(process.env.STRIPE_KEY)

async function checkout(req, res) {
    try {
        console.log('Object.keys(req.body)', Object.keys(req.body))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: Object.keys(req.body).map(item => {
                return {
                    price_data: {
                        currency: 'ils',
                        product_data: {
                            name: item
                        },
                        unit_amount: 500,
                    },
                    quantity: 1
                }
            }),
            success_url: `http://localhost:3000/?#/success`,
            cancel_url: `http://localhost:3000/?#/cancel`
        })
        console.log('session', session)
        res.json({ url: session })
    } catch (err) {
        res.status(500).json({ error: err.messege })
    }
}

module.exports = {
    checkout
}