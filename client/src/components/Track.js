import React, {useState, useEffect} from "react"
import EditTrackForm from "./EditTrackForm";
import { useAdmin } from "../context/admin";

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
                        <iframe style={{border: "0", width: "42px", height: "42px"}}
                            src={track.audio} seamless>
                        </iframe>    
                    </th>
                    <th style={{padding: "5px", width: "300px"}}>
                        <div className="content">
                            <h5>{track.title}</h5>
                        </div>
                        <div className="meta">
                            <span className="ui small text">{track.artist_names}</span>
                            <span className="ui small text">{track.bpm} bpm</span>
                        </div>

                        { isAdmin ? 
                        <div>
                            <a onClick={showEditForm}><span className="ui small text">Edit  </span></a>
                            <a onClick={handleDeleteTrack}> <span className="ui small text">   Delete</span></a>
                        </div>
                        :
                        <></> 
                        }
                    </th>
                </tr>
            </tbody>
            </table>   
            }
        </div>
    )
}