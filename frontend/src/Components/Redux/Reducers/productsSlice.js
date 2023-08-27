import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartProducts } from "../../Services/PoductService";


export const fetchCartProducts = createAsyncThunk( 'products/fetchCartProducts' , async() => {
    try {
        const response = await getCartProducts()
        console.log('Get products Response', response)
        return response.data.products
    } catch (error) {
        console.log('Error Fetching User Cart Proudcts', error)
    }
})

const productsSclice = createSlice({
    name: 'products',
    initialState: {
        cartStatus: 'idle',
        products: [],
        currProduct: {},
        cartProducts: []
    },
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload
        },
        getProduct: (state, action) => {
            state.currProduct = action.payload
        },
        cartProducts: (state, action) => {
            state.cartProducts.push(action.payload)
        },
        removeProduct: (state, action) => {
            state.cartProducts = state.cartProducts.filter(each => each.uniqueId !== action.payload)
        },
        makeCartEmpty: (state, action) => {
            state.cartProducts = []
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
            state.cartStatus = 'completed'
            state.cartProducts = action.payload
        })
        .addCase(fetchCartProducts.pending, (state, action) => {
            state.cartStatus = 'loading'
        })
        .addCase(fetchCartProducts.rejected, (state, action) => {
            state.cartStatus = 'rejected'
        })
    }
})

export const {getProducts, getProduct, cartProducts, removeProduct, makeCartEmpty} = productsSclice.actions

export default productsSclice