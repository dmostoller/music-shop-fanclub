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
                    <div>
                        {/* <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" 
                        src={track.audio}>
                        </iframe>   */}
                        <iframe style={{border: "0", width: "42px", height: "42px"}}
                            src="https://bandcamp.com/EmbeddedPlayer/album=3331109125/size=small/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=none/track=3177692716/transparent=true/" seamless>
                        </iframe>     
                    </div>
                    {/* <Reaplay tracks={songList} >
                        {(player) => {    
                            return (
                                <>
                                <input
                                    type='range'
                                    value={player.trackProgress}
                                    step='1'
                                    min='0'
                                    max={player.duration ? player.duration : `${player.duration}`}
                                    onChange={(e) => player.onScrub(e.target.value)}
                                    onMouseUp={(e) => player.onScrubEnd(e)}
                                    onKeyUp={(e) => player.onScrubEnd(e)}
                                    />

                                    <button onClick={() => player.toPrevTrack()}>prev</button>
                                    <button onClick={() => player.play()}>Play</button>
                                    <button onClick={() => player.pause()}>Pause</button>
                                    <button onClick={() => player.toNextTrack()}>next</button>

                                    <input
                                    type='range'
                                    value={player.volume}
                                    step='1'
                                    min='0'
                                    max='100'
                                    onChange={(e) => player.setVolume(+e.target.value)}
                                    />
                                    <button onClick={() => player.mute()}>mute</button>
                                    <button onClick={() => player.unmute()}>unmute</button>
                                </>
                            )
                            }
                        }
                    </Reaplay> */}
                </div>
                { isAdmin ? 
                <div className="actions tiny">
                    <a onClick={showEditForm} className="delete">Edit  </a>
                    <a onClick={handleDeleteTrack} className="delete">  Delete</a>
                </div>
                :
                <></>    
            }
            </div>
            }
        </div>
    )

}