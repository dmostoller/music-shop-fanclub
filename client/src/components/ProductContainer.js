import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js';
import { Grid, Divider } from 'semantic-ui-react';
import ProductCard from '../components/ProductCard';

const ProductContainer = ({addToCart}) => {

    const commerce = new Commerce(process.env.REACT_APP_COMMERCE_API_KEY)
    const [products, setProducts] = useState([])

    useEffect(() => {
        commerce.products.list()
          .then(res => {
            setProducts(res.data)
          })
          .catch(err => console.log(err))
    },[commerce.products])

    return (
        <>
            <Divider horizontal>Shop All Products</Divider>
            <Grid stackable columns='equal' centered>
                {products.map(product => <Grid.Column width={5} key={product.id}>
                    <ProductCard product={product} addToCart={addToCart}/>
            </Grid.Column>)}
            </Grid>
        </>
    );
};

export default ProductContainer;