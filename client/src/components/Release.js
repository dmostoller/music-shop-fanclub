import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import TrackList from "./TrackList";



export default function Release({id, title, artist, record_label, description, date_released, image, onDeleteRelease}) {
    const { user } = useUser();
    const { isAdmin } = useAdmin();
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

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
        fetch(`/save_release/${id}`,{
            method:"POST",
        }).then((r) => {
            if (r.ok) {
              r.json().then(saved_release => {
                changeIsSaved(saved_release)
                navigate('/releases')
            })
            } else {
                r.json().then(error => setError(error.message))
            }
        })
      }

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
                            <Link to={`/releases/${id}/edit`} className="circular ui icon inverted grey button">
                                <i className="edit icon" style={{visibility: "visible"}}></i>
                            </Link>
                            <button onClick={handleDeleteRelease} className="circular ui icon inverted grey button">
                                <i className="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                            <button onClick={saveRelease} className="circular ui icon inverted grey button">
                                <i className="heart icon" style={{visibility: "visible"}}></i>
                            </button>   
                        </>
                        )
                        : <>
                        <button onClick={saveRelease(id)} className="circular ui icon inverted grey button">
                            <i className="red heart icon" style={{visibility: "visible"}}></i>
                        </button>                        
                        </>    
                    } 

                </div>
            </div>
            <div className="content">
                
                <div classname="ui inverted segment">
                <h4 class="ui horizontal inverted divider">Tracklist</h4>
                    <TrackList releaseId={id}/>
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