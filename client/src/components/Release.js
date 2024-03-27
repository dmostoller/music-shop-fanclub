import React, { useState, useEffect } from "react";
import {Link, useAsyncError} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import TrackList from "./TrackList";
import CommentsList from "./CommentsList";


export default function Release({id, title, artist, record_label, description, date_released, image, onDeleteRelease, savedItems, buyLink}) {
    const { user } = useUser();
    const { isAdmin } = useAdmin();
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState();
    const [savedId, setSavedId] = useState("");
    const [savedAvatars, setSavedAvatars] = useState([])

    function changeIsSaved() {
        setIsSaved(!isSaved)
    }

    useEffect(() => {
        savedItems.map((saved_item) => {
            if (user && saved_item.user.id == user.id) {
                setIsSaved(true)
                setSavedId(parseInt(saved_item.id))

            }
        }
        )
      }, [savedItems]);
  
    useEffect(() => {
     setSavedAvatars(savedItems.map((saved_item) => {
        return (
                <div className="ui rounded image mini" style={{margin: "5px"}}><img src={saved_item.user.avatar}></img></div>
            )
    })
     )}, [savedItems, isSaved, savedId]);

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
            fetch("/saved", {
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

        // const linkForFB = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fposts%2F${id}&amp;src=sdkpreparse`
        const linkForFB = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.kabayun.com%2Fsuperluminal&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore`


return (
<div className="ui container" style={{paddingTop:"5px", marginTop: "5px"}}>
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
                <div className="center aligned meta" style={{marginBottom:"10px"}}>
                <p> {date_released}</p>
                </div>
                <div className="center aligned grid" style={{padding: "10px"}}>
                { user && isAdmin ? (
                        <>
                            <Link to={`/releases/${id}/edit`} className="circular ui icon secondary button small" style={{marginRight: "5px"}}>
                                <i className="edit icon" style={{visibility: "visible"}}></i>
                            </Link>
                            <button onClick={handleDeleteRelease} className="circular ui icon secondary button small">
                                <i className="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </>
                        )
                        : <></>
                    }
                    <div className="center aligned grid" style={{padding: "10px"}}>
                        <div className="meta"><span class="ui small inverted grey text">Saved by</span></div>
                        {savedAvatars}
                    </div>
                </div>
            </div>
            <div className="content">
                <div classname="ui inverted segment" >
                <h4 className="ui horizontal inverted divider">Tracklist</h4>
                    <TrackList releaseId={id}/>
                </div>

                <h4 class="ui horizontal inverted divider">Release Info</h4>
                <div className="description">
                    <p>{description}</p>
                </div>
                <div className="center aligned grid" style={{padding: "10px"}}> 
                <Link to={linkForFB}
                    target="_blank"
                    className="ui circular icon facebook button small"  
                    data-inverted="" 
                    data-tooltip="Share to Facebook" 
                    style={{marginRight: "5px"}}
                    data-position="bottom center">
                            <i class="facebook icon"></i> Share
                    </Link>

                    { user ? isSaved ? 
                        <button onClick={unSaveRelease} className="ui circular icon red button small" style={{marginRight: "5px"}}>
                            <i className="heart icon" style={{visibility: "visible"}}></i> Saved
                        </button>   
                        :
                        <button onClick={saveRelease} className="ui circular icon violet button small" style={{marginRight: "5px"}}>
                            <i className="heart icon" style={{visibility: "visible"}}></i> Save
                        </button>  
                        :<></>
                        }   


                    <Link to={`${buyLink}`} 
                    target="_blank" 
                    style={{marginRight: "5px"}} 
                    className="ui circular icon violet button small"
                    data-inverted="" 
                    data-tooltip="Buy on Bandcamp" 
                    data-position="bottom center">
                        <i className="cart icon"></i>  Buy
                    </Link>


                                         
                </div>
            </div>
            <div className="ui bottom attached inverted segment">
            <h4 className="ui horizontal inverted divider">Comments</h4>
            <div><CommentsList releaseId={id}/></div> 
            { !user ?
            <div className="ui centered grid" style={{padding: "5px"}}>
                <div className="ui inverted message">
                <span className="ui medium violet text">
                    Please <Link to='/login'>Login</Link> or <Link to='/signup'>Create an Account</Link> to leave a comment
                </span>
                </div>
            </div>
            :
            <></>
            }

            </div>
        </div>
    </div>

);
}