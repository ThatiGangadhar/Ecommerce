const mongoose = require('mongoose')

const ecmrsUser = mongoose.Schema({
    name: String,
    password: String,
    email: String
})

module.exports = mongoose.model('EcmrsUser', ecmrsUser)