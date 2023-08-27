import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCartProducts, makeCartEmpty, removeProduct } from '../Redux/Reducers/productsSlice'
import CustomeModal from '../Modal/Modla'
import { placeOrder, removeProductFromCart } from '../Services/PoductService'

export default function Cart() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const products = useSelector(state => state.products.cartProducts)
  const cartStatus = useSelector(state => state.products.cartStatus)
  const navigate = useNavigate()

  
  useEffect(() => {
    if(cartStatus === 'idle'){
      dispatch(fetchCartProducts())
    }
  }, [])
  
  const handleProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const handleRemoveProduct = async(uniqueId) => {
    try {
      const response = await removeProductFromCart({uniqueId})
      console.log('Removed item', response)
      dispatch(removeProduct(uniqueId))
    } catch (error) {
      console.log('Error Removing Product', error)
    }
  }

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder()
      setOpenModal(true)
      dispatch(makeCartEmpty())
      console.log('Order Placed', response)
    } catch (error) {
      console.log('Error Placing Order', error)
    }
  }

  return (
    <div style={{padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
      <CustomeModal openModal={openModal} setOpenModal={setOpenModal} />
    {products.length === 0 && cartStatus==='completed'  && <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center',width: '100%', height: '90vh'}}>No Items In Cart</div>}
    {cartStatus==='loading' && <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center',width: '100%', height: '90vh'}}>loading....</div>}
    <div style={{padding: '20px', display: 'flex',  flexWrap: 'wrap', gap: '30px'}}>
      {products.length > 0 && products.map((each) => {
        const {title, images, price, rating} = each
          return (
            <div key={each.uniqueId} style={{boxShadow: '10px 10px 10px 10px grey', borderRadius: '10px',height: '350px',width: '270px',}}>
              <div style={{display: 'flex', flexDirection: 'column'}} key={each.id}>
                  <img 
                  onClick={() => handleProduct(each.id)}
                  style={{width: '100%', cursor: 'pointer', height: '150px',  borderRadius: '10px'}} src={images[0]}
                  alt={title}/>
                  <div style={{paddingLeft: '10px', width: '270px'}}>
                      <h3>{title}</h3>
                      <p>Rating: {rating}</p>
                      <p>Price:<strong> {price}</strong>/-</p>
                  </div>
              </div>
              <div style={{textAlign: 'end', margin: '10px'}}>
                <button style={{cursor: 'pointer'}} onClick={() => handleRemoveProduct(each.uniqueId)}>Remove</button>
              </div>
            </div>
          )
        })
      }
    </div>
    {products.length > 0 && <button onClick={handlePlaceOrder} style={{padding: '10px', marginTop: '10px', cursor: 'pointer'}}>Place Order</button>}
    </div>
  )
}
