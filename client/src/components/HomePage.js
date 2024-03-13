import React from "react";
import { Image, Grid, Card, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
        <>
        <Segment className="ui inverted segment">
            <br></br>
            <h1>News & Updates</h1>
            <Grid stackable padded relaxed>
                <Grid.Column className='left-column' width={6}>
                    <Card className="ui inverted" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted" header="POST" description="this is a test post"></Card>
                    <Card className="ui inverted" header="POST" description="this is a test post"   ></Card>

                </Grid.Column>
                <Grid.Column width={9}>
                    <Image className="ui circular image" style={{padding: "25px"}} src="https://static.wixstatic.com/media/1d469b_5c29733c234c42a18ef26608b515744a~mv2.jpg/v1/fill/w_1197,h_1080,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/1d469b_5c29733c234c42a18ef26608b515744a~mv2.jpg"></Image>
                </Grid.Column>
            </Grid>
        </Segment>
        </>
    )

}