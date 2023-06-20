const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
// const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    // signup,
    login,
    getLoginToken,
    validateToken
}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    let user
    if (username === process.env.ADMIN_USERNAME) user = { fullname: 'רועי חזן', cart: [], username: process.env.ADMIN_USERNAME }
    if (!user) return Promise.reject('Invalid username or password')

    // console.log('password ,process.env.ADMIN_PASSWORD', password, process.env.ADMIN_PASSWORD)
    // const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD)
    // console.log('match', match)
    if (password !== process.env.ADMIN_PASSWORD) return Promise.reject('Invalid username or password')
    console.log('3')

    return user
}


// async function signup(payload) {
//     const saltRounds = 10
//     const { username, password, fullname } = payload

//     logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
//     if (!username || !password || !fullname) return Promise.reject('Missing required signup information')

//     const userExist = await userService.getByUsername(username)
//     if (userExist) return Promise.reject('Username already taken')

//     const hash = await bcrypt.hash(password, saltRounds)
//     return userService.add({ ...payload, password: hash })
// }

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}
