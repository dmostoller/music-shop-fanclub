import React, {useEffect, useState} from 'react';
import { Card, Grid, Button, Icon, Dropdown } from 'semantic-ui-react';

const ProductCard = ({product, addToCart}) => {

    const [sizes, setSizes] = useState([])
    const [variantInfo, setVariantInfo] = useState()

    const handleButtonAddCart = e => {
        e.preventDefault()
        addToCart(product.id)
    }

  
    // console.log(product, 'props from Container')
    
    return (
        <Grid.Column width={5}>
            <Card className='ui inverted segment'
                image={product.image.url}
                header={product.name}
                meta={product.price.formatted_with_symbol}
                description={product.description.replace(/(<([^>]+)>)/ig,"")}
            />
            <Dropdown
            className="sizes-drop"
            onChange=""
            value={sizes.text}
            fluid
            placeholder='Select Size'
            selection
            options={sizes}
        />
            <Button fluid className='add-button' onClick={handleButtonAddCart}>
                Add to Cart
                <Icon name='arrow right' />
            </Button>
        </Grid.Column>
    );
};

export default ProductCard;
