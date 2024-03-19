import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js';



function ShoppingCart() {

    const commerce = new Commerce(process.env.REACT_APP_COMMERCE_API_KEY)

    const [cart, setCart] = useState()

    useEffect(() => {
        commerce.cart.retrieve()
            .then(res => {
                setCart(res)
            })
    },[])


    const addToCart = (productId, variantInfo) => {
        if(variantInfo) {
            commerce.cart.add(productId, 1, variantInfo)
                .then(res => {
                    setCart(res.cart)
                })
        } else {
            window.alert('Please Select a Shirt Size')
        }
    }





    return (
        <></>
    )

}

export default ShoppingCart