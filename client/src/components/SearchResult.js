import React from "react";
import { Link } from "react-router-dom";


export default function SearchResult({ title, image, artist, recordLabel, id }) {

    return (
        <>

            <Link to={`/releases/${id}`}  style={{margin:"10px"}} className="ui centered card">
                <div className="image">
                    <img alt={title} src={image}></img>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">
                        {artist}
                    </div>
                    <div className="meta">
                        {recordLabel}
                    </div>
                </div>
                <div className="extra content">
                    <span className="right floated">
                    </span>
                    <span className="left floated">
                    </span>
                </div>
            </Link>
        </>

    )

}