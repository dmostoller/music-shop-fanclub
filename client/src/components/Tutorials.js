import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";


export default function Tutorials() {

return (<>
    <div className="column">
        <YouTubePlaylist
        apiKey={process.env.REACT_APP_YOUTUBE_API_KEY}
        playlistId="PLkiLSmC1caWur5fzZycc6Sh65tYb3OKhS"
        uniqueName="Tutorials"
        />
    </div>
</>)
}