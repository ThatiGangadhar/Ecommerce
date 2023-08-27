import axios from 'axios'

let baseUrl = 'http://localhost:5000'

export const registerUser = async (data) =>{
    console.log('resigter user data', data)
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
    console.log('resigter user data', data)
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