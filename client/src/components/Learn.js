
import React, { useState } from "react"
import Tutorials from "./Tutorials";
import GigVideos from "./GigVideos";

// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

// export async function getServerSideProps() {
//     const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLkiLSmC1caWvoUoGTKuBhbS&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`);
//     const data = await res.json();
//     return data 
//     }


function Learn() {

    const [tutVis, setTutVis] = useState(true);
// console.log('data', data)
    function changeTab(){
        setTutVis(!tutVis)
    }

    return (
        <>
        <div className="ui inverted segment" style={{marginTop: "45px"}}>
            <div className="ui inverted centered secondary pointing menu">
                
                { tutVis ?
                <a onClick={changeTab} className="active item">Tutorials</a>
                :
                <a onClick={changeTab} className="item">Tutorials</a>
                }
                
                
                { !tutVis ? 
                <a onClick={changeTab} className="active item">Music</a>
                :
                <a onClick={changeTab} className="item">Music</a>
                }
            
            </div>
            <div className="ui middle aligned center aligned grid" style={{padding: "10px", minHeight:"100vh"}}>

            {/* <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                <iframe src='https://vimeo.com/showcase/11038900/embed' 
                allowfullscreen 
                frameborder='0' 
                style={{position: "absolute", top:"0", left:"0", width:"100%", height:"100%"}}>
                </iframe>
            </div> */}
            {tutVis ?
                <Tutorials/>
            :
                <GigVideos/>
            }
            </div>    
        </div>
        </>

    )

}

export default Learn
