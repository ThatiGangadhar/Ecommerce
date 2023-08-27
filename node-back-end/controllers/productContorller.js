const userProducts = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const getProductsFromCart = asyncHandler( async(req, res) => {
    console.log('get products')
    const response = await userProducts.find({userId: req.user.id, status: 'cart'})
    res.status(200).json({products: response})
})

const addProductToCart = asyncHandler( async(req, res) => {
    console.log('Add product', req.body)
    const {id, uniqueId, title, price, rating, description, images, brand} = req.body
    if (!id || !uniqueId || !title || !price || !rating ||!brand || !description  || !images){
        res.status(400)
        throw new Error('Missing Required Fields.')
    }
    const response = await userProducts.create(
        {id, uniqueId, title, price, brand, description, rating,images,userId: req.user.id, status: 'cart'})
    res.status(201).json(response)
})

const removeProductFromCart = asyncHandler( async(req, res) => {
    console.log('remove Product From Cart', req.body)
    const {uniqueId} = req.body
    if ( !uniqueId){
        res.status(400)
        throw new Error('Missing Required Fields.')
    }
    const response = await userProducts.deleteOne({uniqueId, userId: req.user.id})
    res.status(200).json(response)
})

const placeOrder = asyncHandler( async(req, res) => {
    console.log('Place Order')
    
    const response = await userProducts.find({userId: req.user.id, status: 'cart'})
    console.log('response', response)
    const output = response.map(async(each) => {
        return await userProducts.findByIdAndUpdate(
            each._id,
            {status: 'ordered'},
            {new: true}
        )
    })
    console.log(output)
    res.status(200).json(output)
})

const getOrders = asyncHandler( async(req, res) => {
    console.log('get Order', req.user)
    const response = await userProducts.find({userId: req.user.id, status: 'ordered'})
    res.status(200).json({orders: response})
})


module.exports = {addProductToCart, removeProductFromCart, placeOrder, getProductsFromCart, getOrders}