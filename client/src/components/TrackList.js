import React from "react";
import Track from "./Track"


function TrackList({ tracks }) {
    const tracks_on_release = tracks.map((track) => {
            return <Track
            key={track.id}
            id={track.id}
            title={track.title}
            bpm={track.bpm}
            audio={track.audio}
            artist_names={track.artist_names}
            />
    })

    return (
            <div className="ui one column inverted stackable grid" style={{margin: "25px"}}>
                <div className="ui inverted items">
                    {tracks_on_release}
                </div>
            </div>
    )
}

export default TrackList