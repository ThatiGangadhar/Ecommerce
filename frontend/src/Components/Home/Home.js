import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../Redux/Reducers/productsSlice';
import '../ProductCard/ProductCardStyle.css'
import './HomeStyle.css'
import { useNavigate } from 'react-router-dom';


export default function Home() {

    const [serachText, setSearchText] = useState('')
    const [products, setProducts] = useState([])
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const globalProducts = useSelector((state) => state.products.products)
    
    const fetchProductsData = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://dummyjson.com/products',
                headers: {
                    'content-type': 'application/json'
                }
            }
            const response = await axios(options)
            dispatch(getProducts(response.data.products))
            setProducts(response.data.products)
            console.log('response: ', response)

        } catch (error) {
            console.log(`Error in Fetching Products ${error}`)
        }
    }
    
    useEffect(() => {
        fetchProductsData()
    }, [])

    const handleProduct = (id) => {
        navigate(`product/${id}`)
    }

    const handleInputChage = (event) => {
        setSearchText(event.target.value)
    }

    const handleReset = () => {
        setProducts(globalProducts)
        setSearchText('')
    }

    const handleSearch = () => {
        if(serachText.trim() !== ''){
            const filterProducts = globalProducts.filter(each => each.title.toLowerCase().includes(serachText))
            setProducts(filterProducts)
        }
    }

  return (
    <div>
        <div className='home-container'>
            <input
            onChange={handleInputChage}
            placeholder='Serach items'
            type='search'
            value={serachText}
            className='search-input'/>
            <button onClick={handleSearch} className='serach-btn'>Serach</button>
            <button onClick={handleReset} className='serach-btn'>Reset</button>
        </div>
        <div style={{display: 'flex',justifyContent: 'center', gap: '50px', padding: '20px', flexWrap: 'wrap'}}>
            {products.length === 0 && <h1>Loading......</h1>}
            {products.length > 0  && products.map((each) => {
                const {title, images, price, rating} = each
            return (
                <div onClick={() => handleProduct(each.id)} key={each.id} className='product-bg-container'>
                    <img 
                    style={{width: '100%', height: '150px',  borderRadius: '10px'}} src={images[0]}
                    alt={title}/>
                    <div style={{paddingLeft: '10px'}}>
                        <h3>{title}</h3>
                        <p>Rating: {rating}</p>
                        <p>Price:<strong> {price}</strong>/-</p>
                    </div>
                </div>
            )
            })}
        </div>
    </div>
  )
}
