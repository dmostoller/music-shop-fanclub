import React from "react"
// import song from "../audio/Superluminal - Multi Dimensional Perception 152 A TRK M 16 Bit.wav"

export default function Track({title, artist_names, bpm, audio, onDeleteTrack, id}) {
    const handleDeleteTrack = (e) => {
        fetch(`/tracks/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteTrack(id)
        })
    }



    return (
        <div className="item" style={{padding: "10px"}}>
            <div className="content">
                <div><h5>{title}</h5></div>
                <div className="meta">
                    <span>{artist_names}</span>
                    <span>{bpm} bpm</span>
                </div>
                <div className="description">
                    <div>AUDIO FILE GOES HERE{audio}</div>
                </div>
                <div className="actions tiny">
                <a onClick={handleDeleteTrack} className="delete">Delete Track</a>
            </div>
            </div>


        </div>
    )

}