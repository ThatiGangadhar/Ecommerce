const ecmrsUser = require('../models/userModle')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegister = asyncHandler(async (req, res) => {
    console.log(' Register called', req.body)
    const {name, password, email} = req.body
    if (!name || !password || !email){
        res.status(400)
        throw new Error('Missing Required Info')
    }
    const userExist = await ecmrsUser.findOne({name})
    if (userExist){
        res.status(203)
        res.json('User already exist with same name')
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    const response = await ecmrsUser.create({name, email, password: hashedPwd})
    res.status(201).json(response)
})

const userLogin = asyncHandler(async(req, res) => {
    console.log('login called', req.body)
    const {name, password} = req.body
    if (!name || !password){
        res.status(400)
        throw new Error('Missing required fields.')
    }
    const response = await ecmrsUser.findOne({name})
    console.log('Response', response)
    const isPwdMatched = await bcrypt.compare(password, response.password)
    if(!isPwdMatched){
        res.status(404)
        throw new Error('Validation Failed')
    }
    const token = jwt.sign({user: {name,id: response._id, email: response.email}}, process.env.SECRET_STR)
    res.json({token})
})


module.exports = {userLogin, userRegister}