import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function EventSearchResult({ title, image, details, id, date}) {

    return (
        <>
            <Link to={`/events/${id}`}  style={{margin:"25px"}} className="ui centered card">
                <div className="image">
                    <img src={image}></img>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">
                        {date}
                    </div>
                    <div className="meta">
                        {details.substring(0,50)}...
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