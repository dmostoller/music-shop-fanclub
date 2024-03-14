
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

const YOUTUBE_API_KEY='AIzaSyCKD1qNrpomBtNzBvp00dRWpwK616ibQ7U'

export async function getServerSideProps() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLkiLSmC1caWvoUoGTKuBhbS&maxResults=50&key=${YOUTUBE_API_KEY}`);
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
