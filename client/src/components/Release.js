import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import TrackList from "./TrackList";


export default function Release({id, title, artist, record_label, description, date_released, image}) {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [tracks, setTracks] = useState([]);
    
    console.log(id)

    useEffect(() => {
        fetch(`/tracks_by_release_id/${id}`)
        .then((res) => res.json())
        .then((tracks) => {setTracks(tracks)})
      }, [id]);

      console.log(tracks)
    
    return (
        <div className="ui container" style={{paddingTop:"5px", marginTop: "20px"}}>
        <div style={{margin: "10px"}} className="ui inverted horizontal card fluid">
            <div className="item">
                <img className="ui large image" src={image} alt={title}></img>
            </div>
            <div className="content">
                <div className="header">
                    {title}
                </div>
                <div className="meta">
                    <span className="category">{artist}</span>
                </div>
                <div className="meta">
                    <p>{record_label}</p>
                </div>
                <div className="meta">
                    <p>{date_released}</p>
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
                <div classname="ui inverted segment">
                    <TrackList tracks={tracks}/>
                </div>
                <div style={{padding: "10px"}}> 
                    <Link to="/" className="circular ui icon inverted grey button"><i className="undo icon"></i></Link>
                    <Link to="/releases" className="circular ui icon inverted grey button">
                        <i className="cart icon" style={{visibility: "visible"}}></i>
                    </Link>
                    { user && isAdmin ? (
                        <>
                            <Link 
                                // to={`/releases/${id}/edit`} 
                                to=''
                                className="circular ui icon inverted grey button">
                                <i className="edit icon" style={{visibility: "visible"}}></i>
                            </Link>
                            <button className="circular ui icon inverted grey button">
                                <i className="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </>
                        )
                        : <></>    
                    } 
                </div>
            </div>
    </div>
    </div>

    );
}