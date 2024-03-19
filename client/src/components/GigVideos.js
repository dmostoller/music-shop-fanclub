import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";


export default function GigVideos() {

return (<>
    <div className="column">
        <YouTubePlaylist
        apiKey={process.env.REACT_APP_YOUTUBE_API_KEY}
        playlistId="PLkiLSmC1caWvoUoGTKuBhbS_99aImarWp"
        uniqueName="Gigs"
        />
    </div>
</>)
}