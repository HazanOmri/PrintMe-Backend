

function getOrderList(req, res) {
    return res.json([{ id: 1 }, { id: 2 }])
}


module.exports = {
    getOrderList
}