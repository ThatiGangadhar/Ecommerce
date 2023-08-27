const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const validateLogin = asyncHandler((req, res, next) => {
    console.log('Validate Login', req.headers.authorization)
    const bearerToken = req.headers.authorization
    if (!bearerToken){
        res.status(400)
        throw new Error('Missing Required Token')
    }
    const token = bearerToken.split(' ')[1]
    jwt.verify(token, process.env.SECRET_STR, (error, payload) => {
        if (error){
            res.status(404)
            throw new Error('Invalid token')
        }
        req.user = payload.user
        next()
    })
})

module.exports = validateLogin