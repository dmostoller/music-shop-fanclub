import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import TrackList from "./TrackList";


export default function Release({id, title, artist, record_label, description, date_released, image}) {
    const { user } = useUser()
    const { isAdmin } = useAdmin()
    const [tracks, setTracks] = useState([]);
    
    // console.log(id)

    useEffect(() => {
        fetch(`/tracks_by_release_id/${id}`)
        .then((res) => res.json())
        .then((tracks) => {setTracks(tracks)})
      }, [id]);

    //   console.log(tracks)
    
    return (
        <div className="ui container" style={{paddingTop:"5px", marginTop: "20px"}}>
        <div style={{margin: "10px"}} className="ui inverted horizontal card fluid">
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
                <div className="center aligned meta">
                    <p>{date_released}</p>
                </div>
                <div className="center aligned grid" style={{padding: "10px"}}> 
                    {/* <Link to="/" className="circular ui icon inverted grey button"><i className="undo icon"></i></Link>
                    <Link to="/releases" className="circular ui icon inverted grey button">
                        <i className="cart icon" style={{visibility: "visible"}}></i>
                    </Link> */}
                    <Link to="/shop" className="ui icon inverted grey button"><i className="cart icon"></i>  Buy</Link>
                    </div>
                    <div className="center aligned grid" style={{paddingBottom:"10px"}}> 
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
            <div className="content">
                
                <div classname="ui inverted segment">
                <h4 class="ui horizontal inverted divider">Tracklist</h4>
                    <TrackList tracks={tracks}/>
                </div>

                <h4 class="ui horizontal inverted divider">Release Info</h4>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
    </div>
    </div>

    );
}