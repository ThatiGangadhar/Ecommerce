import axios from 'axios'

let baseUrl = 'https://ecommerce-hn4v.onrender.com'

export const registerUser = async (data) =>{

    const options = {
        url: baseUrl + '/register',
        method: 'POST',
        headers: {
            'application-type': 'application/json',
        },
        data
    }
    const response = await axios(options)
    return response
}

export const login = async (data) =>{
    
    const options = {
        url: baseUrl + '/login',
        method: 'POST',
        headers: {
            'application-type': 'application/json',
        },
        data
    }
    const response = await axios(options)
    return response
}