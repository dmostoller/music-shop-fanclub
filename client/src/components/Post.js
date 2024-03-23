import React from "react";
import {Link } from "react-router-dom";



export default function Post ({id, title, content, image_url, date_added}) {
    return (
            
            <Link to={`/posts/${id}`} className="ui centered card" style={{margin:"10px", marginBottom: "15px"}}>
                <div className="image">
                    <img className="ui fluid image" src={image_url} alt={title}></img>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{title}</div>
                    <div className="meta">{date_added}</div> 
                    <div className="description">{content}</div>
                </div>
            </Link>
    );
}
