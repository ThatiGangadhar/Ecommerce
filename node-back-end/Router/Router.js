
const express = require('express')
const router = express.Router()
const {
    addProductToCart,
    removeProductFromCart,
    placeOrder,
    getProductsFromCart,
    getOrders
} = require('../controllers/productContorller')


router.route('/getProducts').get(getProductsFromCart)
router.route('/addProduct').post(addProductToCart)
router.route('/removeProduct').post(removeProductFromCart)
router.route('/placeOrder').get(placeOrder)
router.route('/getOrders').get(getOrders)



module.exports = router
