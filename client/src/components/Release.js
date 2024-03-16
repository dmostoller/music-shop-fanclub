import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import TrackList from "./TrackList";
import CommentsList from "./CommentsList";


export default function Release({id, title, artist, record_label, description, date_released, image, onDeleteRelease}) {
    const { user } = useUser();
    const { isAdmin } = useAdmin();
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();
    const [savedId, setSavedId] = useState("");

    function changeIsSaved() {
        setIsSaved(!isSaved)
    }
    
    const handleDeleteRelease = (e) => {
        if(window.confirm("Are you sure you want to delete this release?")){ 
        fetch(`/releases/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteRelease(id)
        })
    }}

    function saveRelease() {
        if (user) {
            const userId = user.id
            fetch("saved", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    release_id: parseInt(id),
                }),
            }).then((r) => {
                if (r.ok) {
                r.json().then(saved_release => {
                    changeIsSaved()
                    setSavedId(parseInt(saved_release.id))
                    // console.log(saved_release.id)
                })
                } else {
                    r.json().then(error => setError(error.message))
                }
            })
        }}

        const unSaveRelease = (e) => {
            if (user) {
            const savedItemId = parseInt(savedId)
            fetch(`/saved/${savedItemId}`,{
                method:"DELETE"
            })
            .then(() => {
                changeIsSaved()
                setSavedId("")
            })
        }
        }

return (
<div className="ui container" style={{paddingTop:"5px", marginTop: "20px"}}>
        <div style={{margin: "10px"}} className="ui inverted attached horizontal card fluid">
            <div className="item">
                <img className="ui large image" src={image} alt={title}></img>
                <div className="header">
                    <h2 style={{color: "white", textAlign: "center", marginTop: "10px"}}>{title}</h2>
                    <h4 class="ui inverted divider"></h4>
                    <h4 style={{color: "white", textAlign: "center"}}>{artist}</h4>
                </div>
                <div className="center aligned meta">
                    {record_label}
                </div>
                <div className="center aligned grid" style={{padding: "10px"}}> 
                <iframe style={{border: "0", width: "100%", height: "275px"}}
                src="https://bandcamp.com/EmbeddedPlayer/album=4128960796/size=large/bgcol=333333/linkcol=ffffff/artwork=none/track=2355594853/transparent=true/" seamless>
                    <a href="https://kabayun.bandcamp.com/album/superluminal-first-contact">Superluminal - First Contact by Kabayun / Superluminal</a>
                </iframe>
                </div>
               
            </div>
            <div className="content">
                <div classname="ui inverted segment" >
                <h4 class="ui horizontal inverted divider">Tracklist</h4>
                    <TrackList releaseId={id}/>
                </div>

                <h4 class="ui horizontal inverted divider">Release Info</h4>
                <div className="description">
                    <p>{description}</p>
                    <p>Released: {date_released}</p>
                </div>
                <div className="center aligned grid" style={{padding: "10px"}}> 
                    {/* <Link to="/" className="circular ui icon inverted grey button"><i className="undo icon"></i></Link>
                    <Link to="/releases" className="circular ui icon inverted grey button">
                        <i className="cart icon" style={{visibility: "visible"}}></i>
                    </Link> */}
                    <Link to="/shop" style={{marginRight: "15px"}} className="ui icon inverted grey button"><i className="cart icon"></i>  Buy</Link>
                    {/* </div>
                    <div className="center aligned grid" style={{paddingBottom:"10px"}}>  */}
                    { user && isAdmin ? (
                        <>
                            <Link to={`/releases/${id}/edit`} className="circular ui icon inverted grey button">
                                <i className="edit icon" style={{visibility: "visible"}}></i>
                            </Link>
                            <button onClick={handleDeleteRelease} className="circular ui icon inverted grey button">
                                <i className="trash icon" style={{visibility: "visible"}}></i>
                            </button>

                        </>
                        )
                        : <>
                        { user ? isSaved ? 
                        <button onClick={unSaveRelease} className="circular ui icon inverted red button">
                            <i className="heart icon" style={{visibility: "visible"}}></i>
                        </button>   
                        :
                        <button onClick={saveRelease} className="circular ui icon inverted grey button">
                            <i className="heart icon" style={{visibility: "visible"}}></i>
                        </button>  
                        :<></>
                        }                      
                        </>    
                    } 

                </div>
            </div>
            <div className="ui bottom attached inverted segment">
            <h4 class="ui horizontal inverted divider">Comments</h4>
            <div><CommentsList releaseId={id}/></div> 

            </div>
        </div>
    </div>

);
}