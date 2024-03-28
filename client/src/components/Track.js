import React, {useState, useEffect} from "react"
import EditTrackForm from "./EditTrackForm";
import { useAdmin } from "../context/admin";
import Player from "./Player";

export default function Track({id, onDeleteTrack}) {
    const [isFormVis, setIsFormVis] = useState(false);
    const [track, setTrack] = useState({});
    const {isAdmin} = useAdmin();

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
        <div className="item">
            {isFormVis ? 
            <EditTrackForm id={id} onChangeIsFormVis={showEditForm} onEditTrack={updateTrack}/>
                :
            <table className="ui selectable inverted table" > 
            <tbody>
                <tr>
                    <th>
                        {/* <iframe title="track_audio" style={{border: "0", width: "42px", height: "42px"}}
                            src="{track.audio}" seamless>
                        </iframe>     */}
 
                    </th>
                    <th style={{padding: "5px", width: "500px"}}>
                        <div className="content">
                            <h5>{track.title}
                            { isAdmin && 
                                <span style={{float: "right"}}>
                                    <button onClick={showEditForm} className="circular ui icon inverted secondary button mini">
                                        <i className="edit icon" style={{visibility: "visible"}}></i>
                                    </button>
                                    <button className="circular ui icon inverted secondary button mini" onClick={handleDeleteTrack}>
                                        <i className="trash icon" style={{visibility: "visible"}}></i>
                                    </button>
                                </span>
                                }
                            </h5>
                        </div>
                        <div className="meta">
                            <span className="ui small text">{track.artist_names}</span>
                            <span className="ui small text">{track.bpm} bpm</span>
                        </div>
                        <div className="content">
                            <Player track={track.audio}/>
                        </div>


                    </th>
                </tr>
            </tbody>
            </table>   
            }
        </div>
    )
}