const jwt = require('jsonwebtoken')
const secret = "g_^QMdT?7Mm{8{;"
const sessionIdToUserMap = new Map()

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token){
    if (!token) return null;
    try{
        return jwt.verify(token, secret)
    } catch (err) {
        return null;
    }
    
}

module.exports = {
    setUser, getUser
}