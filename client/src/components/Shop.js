import React, { useEffect, useState } from "react";
import { Grid, Nav } from 'semantic-ui-react';
import LeftPanel from './LeftPanel'
import ProductContainer from './ProductContainer'
import Commerce from '@chec/commerce.js';


export default function Shop() {

    const commerce = new Commerce(process.env.REACT_APP_COMMERCE_API_KEY)

    const [cart, setCart] = useState()
    const [variantInfo, setVariantInfo] = useState()


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
        <>
        <div className="ui container" style={{marginTop: "40px"}}>
            <Grid centered stackable padded relaxed>
                <Grid.Column className='left-column' width={4}>
                    <LeftPanel />
                </Grid.Column>
                <Grid.Column width={12}>
                    <ProductContainer 
                        addToCart={addToCart} 
                    />
                </Grid.Column>
            </Grid>
        </div>
      </>
    )
}