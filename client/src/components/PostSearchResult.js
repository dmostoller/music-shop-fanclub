import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function PostSearchResult({ title, image, description, id, date}) {

    return (
        <>

            <Link to={`/releases/${id}`}  style={{margin:"25px"}} className="ui centered card">
                <div className="image">
                    <img src={image}></img>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">
                        <a>{date}</a>
                    </div>
                    <div className="meta">
                        <a>{description}</a>
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