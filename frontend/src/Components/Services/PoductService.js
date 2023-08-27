import axios from 'axios'
import Cookies from 'js-cookie'

let baseUrl = 'https://ecommerce-hn4v.onrender.com'

export const getCartProducts = async () =>{
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