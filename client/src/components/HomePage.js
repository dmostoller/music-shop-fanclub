import React from "react";
import { Image, Grid, Card, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
        <>
        <Segment style={{backgroundColor: "#303030"}} className="ui segment">
            <br></br>

            <Grid stackable padded relaxed>
                
                <Grid.Column className='left-column' width={10}>
                    <Image className="ui circular image" style={{padding: "5px"}} 
                        src="https://static.wixstatic.com/media/1d469b_3bedb45162264b3598e6d9a9d90e4e2e~mv2.png/v1/fill/w_1230,h_680,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_auto/1d469b_3bedb45162264b3598e6d9a9d90e4e2e~mv2.png">
                    </Image>
                </Grid.Column>
                <Grid.Column  width={5}>
                <h1 style={{color: "white"}}>News & Updates</h1>
                    <Card className="ui inverted fluid segment" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted fluid segment" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted fluid segment" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted fluid segment" header="POST" description="this is a test post"   ></Card>

                </Grid.Column>
            </Grid>
        </Segment>
        </>
    )

}