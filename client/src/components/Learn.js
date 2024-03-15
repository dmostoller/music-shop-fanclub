
import React  from "react"
// const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

// export async function getServerSideProps() {
//     const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLkiLSmC1caWvoUoGTKuBhbS&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`);
//     const data = await res.json();
//     return data 
//     }


function Learn() {

// console.log('data', data)

    return (
        <>
        <div className="ui inverted segment" style={{marginTop: "45px"}}>
            <div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                <iframe src='https://vimeo.com/showcase/11038900/embed' 
                allowfullscreen 
                frameborder='0' 
                style={{position: "absolute", top:"0", left:"0", width:"100%", height:"100%"}}>
                </iframe>
            </div>
        </div>    
        </>

    )

}

export default Learn
