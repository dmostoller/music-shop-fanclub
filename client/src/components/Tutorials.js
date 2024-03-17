import { YouTubePlaylist } from "@codesweetly/react-youtube-playlist";


export default function Tutorials() {

return (<>
    <div className="column">
        <YouTubePlaylist
        apiKey="AIzaSyCKD1qNrpomBtNzBvp00dRWpwK616ibQ7U"
        playlistId="PLkiLSmC1caWur5fzZycc6Sh65tYb3OKhS"
        uniqueName="Tutorials"
        />
    </div>
</>)
}