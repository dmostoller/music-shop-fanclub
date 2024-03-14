
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getServerSideProps() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLkiLSmC1caWvoUoGTKuBhbS&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`);
    const data = await res.json();
    return data 
    }


function Videos() {

// console.log('data', data)

    return (
        
        <>
        </>

    )

}

export default Videos
