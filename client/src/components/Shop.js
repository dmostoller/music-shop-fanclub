import React from "react";
import { Grid } from 'semantic-ui-react';
import LeftPanel from './LeftPanel'
import ProductContainer from './ProductContainer'

export default function Shop() {
    return (
        <>
        <Grid centered stackable padded relaxed>
        <Grid.Column className='left-column' width={5}>
          <LeftPanel />
        </Grid.Column>
        <Grid.Column width={9}>
          <ProductContainer />
        </Grid.Column>
      </Grid>
      </>
    )
}