import {configureStore} from '@reduxjs/toolkit'
import productsSclice from '../Reducers/productsSlice'


const store = configureStore({
    reducer: {
        products: productsSclice.reducer
    }
})

export default store