import axios from 'axios'
import Cookies from 'js-cookie'

let baseUrl = 'http://localhost:5000'

export const getCartProducts = async () =>{
    console.log('Get Product From Cart')
    const options = {
        url: baseUrl + '/getProducts',
        method: 'GET',
        headers: {
            'application-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token')
        }
    }
    const response = await axios(options)
    return response
}

export const addProduct = async (data) =>{
    console.log('Add Product', data)
    const options = {
        url: baseUrl + '/addProduct',
        method: 'POST',
        headers: {
            'application-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        data
    }
    const response = await axios(options)
    return response
}

export const removeProductFromCart = async (data) =>{
    console.log('remove Product From Cart', data)
    const options = {
        url: baseUrl + '/removeProduct',
        method: 'POST',
        headers: {
            'application-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token')
        },
        data
    }
    const response = await axios(options)
    return response
}

export const placeOrder = async () =>{
    console.log('Order Place')
    const options = {
        url: baseUrl + '/placeOrder',
        method: 'GET',
        headers: {
            'application-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token')
        },
    }
    const response = await axios(options)
    return response
}

export const fetchOrders = async () =>{
    console.log('Fetch Orders')
    const options = {
        url: baseUrl + '/getOrders',
        method: 'GET',
        headers: {
            'application-type': 'application/json',
            Authorization: 'Bearer ' + Cookies.get('token')
        },
    }
    const response = await axios(options)
    return response
}