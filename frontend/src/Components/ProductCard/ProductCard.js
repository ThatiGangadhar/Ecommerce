import React, { useEffect, useState } from 'react'
import './ProductCardStyle.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { cartProducts, getProduct } from '../Redux/Reducers/productsSlice'
import { addProduct } from '../Services/PoductService'

export default function ProductCard() {
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.products.currProduct)
    const [currentImg, setCurrentImg] = useState('')
    const {id} = useParams()
    const {title, brand, description, images, price, rating} = product
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `https://dummyjson.com/products/${id}`
                }
                const response = await axios(options)
                dispatch(getProduct(response.data))
                setCurrentImg(response.data.images[0])
                setLoading(false)
            
            } catch (error) {
                setLoading(true)
                console.log('Error Fetching Product')
            }
        }
        fetchProduct()
    }, [])

    const handleAddToCart = async() => {
        const addedProduct = {...product, uniqueId: v4() }
        try {
            const response = await addProduct(addedProduct)
            console.log('Addded item ', response)
            dispatch(cartProducts(addedProduct))
            navigate('/cart')
        } catch (error) {
            console.log('Error adding product', error)
        }
    }

    const handleImageChange = (event) => {
        setCurrentImg(event.target.src)
    }
    
  return (
    <>
    {loading && <p>Loading......</p>}
    {!loading &&
        <div style={{ minHeight: '90vh',display: 'flex', gap: '50px', width: '95%', padding: '20px'}}>
            <div>
                <img style={{height: '500px', width: '500px', borderRadius: '10px'}} src={currentImg} alt={title}/>
                <div className='thumbnail-container'>
                    {images.map(each => {
                        return <img key={each} onClick={handleImageChange} className='thumbnail' src={each} alt={each}/>
                    })}
                </div>
            </div>
            <div style={{padding: '10px'}}>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Brand: {brand}</p>
                <p>Rating: {rating}</p>
                <p>Price:<strong> {price}</strong>/-</p>

                <button onClick={handleAddToCart} style={{marginBottom: '50px',cursor: 'pointer', padding: '10px'}}>
                Add to cart</button>
            </div>
        </div> 
    }
    </>
  )
}
