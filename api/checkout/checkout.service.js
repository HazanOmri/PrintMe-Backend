module.exports = {
    getLineItems
}

function getLineItems(items) {
    return items.map(item => {
        if (item.charAt(0) === 'o') {
            if (item.charAt(1) === '1') {
                return {
                    price_data: {
                        currency: 'ils',
                        product_data: {
                            name: item
                        },
                        unit_amount: 5000,
                    },
                    quantity: 1
                }
            }
            if (item.charAt(2) === '2') {
                return {
                    price_data: {
                        currency: 'ils',
                        product_data: {
                            name: item
                        },
                        unit_amount: 6000,
                    },
                    quantity: 1
                }
            }
            if (item.charAt(3) === '3') {
                return {
                    price_data: {
                        currency: 'ils',
                        product_data: {
                            name: item
                        },
                        unit_amount: 7000,
                    },
                    quantity: 1
                }
            }
        }

        else {
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
        }
    })
}