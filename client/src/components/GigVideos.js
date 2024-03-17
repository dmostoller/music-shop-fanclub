import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";


export default function GigVideos() {

return (<>
    <div className="column">
        <YouTubePlaylist
        apiKey="AIzaSyCKD1qNrpomBtNzBvp00dRWpwK616ibQ7U"
        playlistId="PLkiLSmC1caWvoUoGTKuBhbS_99aImarWp"
        uniqueName="Gigs"
        />
    </div>
</>)
}