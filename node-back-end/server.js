const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const { userLogin, userRegister } = require('./controllers/userController')
const errorHandler = require('./middleware/errorHandler')
const router = require('./Router/Router')
const cors = require('cors')
const validateLogin = require('./middleware/validateLogin')

const app = express() 
app.use(cors()) 
app.use(express.json())

app.post('/register', userRegister)
app.post('/login', userLogin)
app.use('/', validateLogin , router)


app.use(errorHandler)

const port = process.env.PORT
const dbConnectionUrl = process.env.DB_CONNECTION_URL

app.listen(port, async () => {
    try {
        const dbConect = await mongoose.connect(dbConnectionUrl)
        console.log('conection', dbConect.connection.host, dbConect.connection.name)
        console.log(`Server started at http://localhost:${port}`)
    } catch (error) {
        console.log('Error', error)
        process.exit(1)
    }
})