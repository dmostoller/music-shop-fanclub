import React, { useState, useEffect} from "react";
import Track from "./Track"
import AddTrackForm from "./AddTrackForm";



function TrackList({ releaseId }) {
    const [tracks, setTracks] = useState([]);

    const [isFormVis, setIsFormVis] = useState(false)
    function changeIsFormVis() {
        setIsFormVis(!isFormVis)
    }

    useEffect(() => {
        fetch(`/tracks_by_release_id/${releaseId}`)
        .then((res) => res.json())
        .then((tracks) => {setTracks(tracks)})
      }, [releaseId]);

    const deleteTrack = (deleted_track_id) => {
        setTracks(tracks => tracks.filter((track) => track.id !== deleted_track_id))
        // console.log(deleted_track_id)
    }
    function updateTracks() {
        setTracks(tracks)
    }
    // function reloadTrack (tracks) {
    //     setTracks(tracks)
    // }


    const tracks_on_release = tracks.map((track) => {
            return <Track
            key={track.id}
            id={track.id}
            title={track.title}
            bpm={track.bpm}
            audio={track.audio}
            artist_names={track.artist_names}
            onDeleteTrack={deleteTrack}
            updateTracks={updateTracks}            />
    })

    const addTrack = (newTrack) => {
        setTracks([...tracks, newTrack])
        changeIsFormVis()
    }

    return (
            <div className="ui one column inverted stackable grid" style={{margin: "5px"}}>
                <div className="ui inverted items">
                    {tracks_on_release}
                <div className="item" style={{padding: "5px"}}>
                    {isFormVis ? <AddTrackForm onAddTrack={addTrack} releaseId={releaseId} onChangeIsFormVis={changeIsFormVis} /> : <button onClick={changeIsFormVis} className="ui inverted grey button tiny">Add New Track</button>}
                </div>

                </div>
            </div>
    )
}

export default TrackList