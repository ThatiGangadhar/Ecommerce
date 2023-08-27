const mongoose = require('mongoose')

const userProducts = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'ecmrsusers'
    },
    id: String,
    uniqueId: String,
    title: String,
    price: String,
    rating: String,
    status: String,
    brand: String,
    description: String,
    images: [String]

})

module.exports = mongoose.model('UserProducts', userProducts)