import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../Services/PoductService'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
    const[orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getMyOrders = async () => {
        try {
            const response = await fetchOrders()
            console.log('My Orders', response)
            setOrders(response.data.orders)
            setLoading(false)
        } catch (error) {
           console.log("Error Fetching My Orders", error) 
        }
    }

    useEffect(() => {
        getMyOrders()
    }, [])

    const handleOpenProduct = (id) => {
        navigate(`/product/${id}`)
    }

  return (
    <div style={{padding: '20px'}}>
        <h1>My Orders </h1>
        {loading && <h1>loading....</h1>}
        {!loading && orders.length===0 && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>No Orders</div>}
        <div style={{display: 'flex' , gap: '50px'}}>
        {orders.length > 0 && orders.map(each => {
            return(
                <div onClick={() => handleOpenProduct(each.id)} key={each.uniqueId} style={{display: 'flex', gap: '30px', cursor: 'pointer', borderRadius: '10px', width: '300px', boxShadow: '0px 10px 15px 3px black'}}>
                    <img style={{height: '100%', width: '110px', borderRadius: '10px'}} src={each.images[0]} alt={each.title}/>
                    <div style={{borderRadius: '10px', marginRight: '10px'}}>
                        <h3 style={{ margin: '0px'}}>{each.title}</h3>
                        <p  style={{ margin: '5px'}}>Price: <strong>{each.price}/-</strong></p>
                        <p style={{color: 'blue', margin: '0px'}}><strong>Delivered</strong></p>
                    </div>
                </div>
            )
        })}
        </div>
    </div>   
  )
}
