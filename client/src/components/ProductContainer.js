import React, { useState, useEffect } from 'react';
import Commerce from '@chec/commerce.js';
import { Grid, Divider } from 'semantic-ui-react';
import ProductCard from '../components/ProductCard';

const ProductContainer = () => {

    const commerce = new Commerce('pk_test_56414dee2201fa19cb0c2c4f8e281d8d9d87b71bf789c')
    const [products, setProducts] = useState([])

    useEffect(() => {
        commerce.products.list()
          .then(res => {
            setProducts(res.data)
          })
          .catch(err => console.log(err))
    },[])



    return (
        <>
            <Divider horizontal>Shop All Products</Divider>
            <Grid stackable columns='equal' centered>
                {products.map(product => <Grid.Column width={5} key={product.id}><ProductCard product={product} /></Grid.Column>)}
            </Grid>
        </>
    );
};

export default ProductContainer;