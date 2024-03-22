import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function SavedItem({ releaseId, id, onDeleteSaved }) {

    const [release, setRelease] = useState({});

    useEffect(() => {
        fetch(`/releases/${releaseId}`)
        .then((res) => res.json())
        .then((release) => setRelease(release))
    }, [releaseId]);


    const unSave = (e) => {
        const savedItemId = parseInt(id)
        fetch(`/saved/${savedItemId}`,{
            method:"DELETE"
        })
        .then(() => {
            onDeleteSaved(id)
        })
    
    }
    return (
        <>

            <div className="card">
                <div className="image">
                    <img src={release.image}></img>
                </div>
                <div className="content">
                    <div className="header">{release.title}</div>
                    <div className="meta">
                        <a>{release.artist}</a>
                    </div>
                    <div className="description">
                        {/* {release.description.slice(0,300)}.... */}
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                        <button onClick={unSave} className="ui circular violet icon button mini">
                            <i className="trash icon"></i>
                        </button>
                    </span>
                    <span className="left floated">
                        <Link to={`/releases/${release.id}`} className="ui circular violet icon button mini"><i className="arrows alternate icon"></i></Link>
                    </span>
                </div>
            </div>
        </>

    )

}