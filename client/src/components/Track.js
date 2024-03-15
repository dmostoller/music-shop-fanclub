import React, {useState, useEffect} from "react"
import EditTrackForm from "./EditTrackForm";

// import song from "../audio/Superluminal - Multi Dimensional Perception 152 A TRK M 16 Bit.wav"

export default function Track({id, onDeleteTrack}) {
    const [isFormVis, setIsFormVis] = useState(false);
    const [track, setTrack] = useState({});

    useEffect(() => {
        fetch(`/tracks/${id}`)
        .then((res) => res.json())
        .then((track) => setTrack(track))
    }, [id]);

    const handleDeleteTrack = (e) => {
        if(window.confirm("Are you sure you want to delete this track?")){ 
        fetch(`/tracks/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteTrack(id)
        })
    }}

    function showEditForm(){
        setIsFormVis(!isFormVis)
    }
    function updateTrack(editedTrack) {
        showEditForm()
        setTrack(editedTrack)
    }

    return (
        <div className="item" style={{padding: "10px"}}>
            {isFormVis ? 
            <EditTrackForm id={id} onChangeIsFormVis={showEditForm} onEditTrack={updateTrack}/>
                :
            <div className="content">
                <div>
                    <h5>{track.title}</h5>
                </div>
                <div className="meta">
                    <span>{track.artist_names}</span>
                    <span>{track.bpm} bpm</span>
                </div>
                <div className="description">
                    <div>{track.audio}</div>
                </div>
                <div className="actions tiny">
                    <a onClick={showEditForm} className="delete">Edit  </a>
                    <a onClick={handleDeleteTrack} className="delete">  Delete</a>
                </div>
            </div>
            }
        </div>
    )

}