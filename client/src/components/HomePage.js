import React from "react";
import { Image, Segment } from "semantic-ui-react";
import PostsList from "./PostsList";

export default function HomePage() {
    return (
        <Segment style={{backgroundColor: "#303030"}}>
            <div className="ui container centered">
                <Image className="ui rounded image" 
                    src="https://static.wixstatic.com/media/1d469b_3bedb45162264b3598e6d9a9d90e4e2e~mv2.png/v1/fill/w_1230,h_680,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_auto/1d469b_3bedb45162264b3598e6d9a9d90e4e2e~mv2.png">
                </Image>
            </div>    
            {/* <h1 style={{color: "white", textAlign:"center"}}>News & Updates</h1> */}
            <h4 style={{marginTop: "25px", marginBottom:"40px"}} className="ui horizontal inverted divider">News & Updates</h4>
            <div className="ui container centered">
            <PostsList/>
            </div>
        </Segment>
    )

}